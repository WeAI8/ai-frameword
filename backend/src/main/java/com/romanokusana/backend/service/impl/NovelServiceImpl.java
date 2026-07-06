package com.romanokusana.backend.service.impl;

import com.romanokusana.backend.dto.CategoryDTO;
import com.romanokusana.backend.dto.NovelRequestDTO;
import com.romanokusana.backend.dto.NovelResponseDTO;
import com.romanokusana.backend.dto.TagDTO;
import com.romanokusana.backend.dto.ChapterSummaryDTO;
import com.romanokusana.backend.entity.Category;
import com.romanokusana.backend.entity.Novel;
import com.romanokusana.backend.entity.Tag;
import com.romanokusana.backend.exception.BadRequestException;
import com.romanokusana.backend.exception.ResourceNotFoundException;
import com.romanokusana.backend.repository.CategoryRepository;
import com.romanokusana.backend.repository.NovelRepository;
import com.romanokusana.backend.repository.NovelRequestRepository;
import com.romanokusana.backend.repository.TagRepository;
import com.romanokusana.backend.service.NovelService;
import com.romanokusana.backend.dto.WishlistRequestDTO;
import com.romanokusana.backend.entity.NovelRequest;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NovelServiceImpl implements NovelService {

    private final NovelRepository novelRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final NovelRequestRepository novelRequestRepository;

    public NovelServiceImpl(NovelRepository novelRepository,
                            CategoryRepository categoryRepository,
                            TagRepository tagRepository,
                            NovelRequestRepository novelRequestRepository) {
        this.novelRepository = novelRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.novelRequestRepository = novelRequestRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<NovelResponseDTO> getAllNovels(String search, String categorySlug, String tagSlug, String sortBy) {
        List<Novel> novels;

        if (search != null && !search.isBlank()) {
            novels = novelRepository.searchNovels(search.trim());
        } else if (categorySlug != null && !categorySlug.isBlank()) {
            novels = novelRepository.findByCategorySlug(categorySlug.trim());
        } else if (tagSlug != null && !tagSlug.isBlank()) {
            novels = novelRepository.findByTagSlug(tagSlug.trim());
        } else {
            novels = novelRepository.findAll();
        }

        java.util.Comparator<Novel> comparator;
        if ("views".equalsIgnoreCase(sortBy)) {
            comparator = java.util.Comparator.comparing(Novel::getViewCount).reversed();
        } else if ("title".equalsIgnoreCase(sortBy)) {
            comparator = java.util.Comparator.comparing(Novel::getTitle, String.CASE_INSENSITIVE_ORDER);
        } else { // default to "recent"
            comparator = java.util.Comparator.comparing(Novel::getCreatedAt).reversed();
        }

        return novels.stream()
                .sorted(comparator)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public NovelResponseDTO getNovelBySlug(String slug) {
        Novel novel = novelRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Novel bulunamadı: " + slug));
        return convertToResponseDTO(novel);
    }

    @Override
    @Transactional
    public void incrementViewCount(String slug) {
        Novel novel = novelRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Novel bulunamadı: " + slug));
        novel.setViewCount(novel.getViewCount() + 1);
        novelRepository.save(novel);
    }

    @Override
    @Transactional
    public NovelResponseDTO createNovel(NovelRequestDTO requestDTO) {
        String slug = slugify(requestDTO.getTitle());
        
        if (novelRepository.existsBySlug(slug)) {
            // If slug exists, add a suffix to avoid duplicates
            slug = slug + "-" + (int)(Math.random() * 1000);
        }

        Novel novel = new Novel();
        novel.setTitle(requestDTO.getTitle().trim());
        novel.setSlug(slug);
        novel.setSummary(requestDTO.getSummary());
        novel.setCoverImageUrl(requestDTO.getCoverImageUrl());

        // Process Categories
        if (requestDTO.getCategoryIds() != null && !requestDTO.getCategoryIds().isEmpty()) {
            List<Category> categories = categoryRepository.findAllById(requestDTO.getCategoryIds());
            novel.setCategories(categories);
        }

        // Process Tags
        if (requestDTO.getTags() != null && !requestDTO.getTags().isEmpty()) {
            List<Tag> tags = new ArrayList<>();
            for (String tagName : requestDTO.getTags()) {
                if (tagName == null || tagName.isBlank()) continue;
                String tagSlug = slugify(tagName);
                Tag tag = tagRepository.findBySlug(tagSlug)
                        .orElseGet(() -> {
                            Tag newTag = new Tag();
                            newTag.setName(tagName.trim());
                            newTag.setSlug(tagSlug);
                            return tagRepository.save(newTag);
                        });
                tags.add(tag);
            }
            novel.setTags(tags);
        }

        Novel savedNovel = novelRepository.save(novel);
        return convertToResponseDTO(savedNovel);
    }

    @Override
    @Transactional
    public void deleteNovel(Long id) {
        Novel novel = novelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Novel bulunamadı. ID: " + id));
        novelRepository.delete(novel);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(c -> new CategoryDTO(c.getId(), c.getName(), c.getSlug()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TagDTO> getAllTags() {
        return tagRepository.findAll().stream()
                .map(t -> new TagDTO(t.getId(), t.getName(), t.getSlug()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<WishlistRequestDTO> getAllNovelRequests() {
        return novelRequestRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(r -> new WishlistRequestDTO(r.getId(), r.getNovelTitle(), r.getStatus(), r.getLogMessage(), r.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WishlistRequestDTO createNovelRequest(WishlistRequestDTO dto) {
        NovelRequest request = new NovelRequest();
        request.setNovelTitle(dto.getNovelTitle().trim());
        request.setStatus("PENDING");
        request.setLogMessage("Sıraya alındı. Tarama bekleniyor.");
        
        NovelRequest saved = novelRequestRepository.save(request);
        return new WishlistRequestDTO(saved.getId(), saved.getNovelTitle(), saved.getStatus(), saved.getLogMessage(), saved.getCreatedAt());
    }

    @PostConstruct
    @Transactional
    public void seedCategories() {
        if (categoryRepository.count() == 0) {
            String[] names = {"Fantazi", "Bilim Kurgu", "Macera", "Gizem", "Dram", "Romantik", "Aksiyon"};
            for (String name : names) {
                Category category = new Category();
                category.setName(name);
                category.setSlug(slugify(name));
                categoryRepository.save(category);
            }
            System.out.println("[INFO] Varsayılan kategoriler seeded.");
        }
    }

    private String slugify(String input) {
        if (input == null || input.isBlank()) {
            return "";
        }
        String normalized = input.toLowerCase()
                .replace("ı", "i")
                .replace("ğ", "g")
                .replace("ü", "u")
                .replace("ş", "s")
                .replace("ö", "o")
                .replace("ç", "c")
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
        return normalized;
    }

    private NovelResponseDTO convertToResponseDTO(Novel novel) {
        List<CategoryDTO> categories = novel.getCategories().stream()
                .map(c -> new CategoryDTO(c.getId(), c.getName(), c.getSlug()))
                .collect(Collectors.toList());

        List<TagDTO> tags = novel.getTags().stream()
                .map(t -> new TagDTO(t.getId(), t.getName(), t.getSlug()))
                .collect(Collectors.toList());

        List<ChapterSummaryDTO> chapters = novel.getChapters().stream()
                .map(ch -> new ChapterSummaryDTO(ch.getId(), ch.getTitle(), ch.getChapterNumber(), ch.getCreatedAt()))
                .collect(Collectors.toList());

        return new NovelResponseDTO(
                novel.getId(),
                novel.getTitle(),
                novel.getSlug(),
                novel.getSummary(),
                novel.getCoverImageUrl(),
                novel.getCreatedAt(),
                novel.getUpdatedAt(),
                novel.getViewCount(),
                categories,
                tags,
                chapters
        );
    }
}

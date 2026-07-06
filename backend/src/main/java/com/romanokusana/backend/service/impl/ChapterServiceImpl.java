package com.romanokusana.backend.service.impl;

import com.romanokusana.backend.dto.ChapterRequestDTO;
import com.romanokusana.backend.dto.ChapterResponseDTO;
import com.romanokusana.backend.dto.RecentlyAddedChapterDTO;
import com.romanokusana.backend.entity.Chapter;
import com.romanokusana.backend.entity.Novel;
import com.romanokusana.backend.exception.BadRequestException;
import com.romanokusana.backend.exception.ResourceNotFoundException;
import com.romanokusana.backend.repository.ChapterRepository;
import com.romanokusana.backend.repository.NovelRepository;
import com.romanokusana.backend.service.ChapterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChapterServiceImpl implements ChapterService {

    private final ChapterRepository chapterRepository;
    private final NovelRepository novelRepository;

    public ChapterServiceImpl(ChapterRepository chapterRepository,
                              NovelRepository novelRepository) {
        this.chapterRepository = chapterRepository;
        this.novelRepository = novelRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public ChapterResponseDTO getChapterByNovelSlugAndNumber(String novelSlug, Integer chapterNumber) {
        Chapter chapter = chapterRepository.findByNovelSlugAndChapterNumber(novelSlug, chapterNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Bölüm bulunamadı. Novel: " + novelSlug + ", Bölüm: " + chapterNumber));

        return convertToResponseDTO(chapter);
    }

    @Override
    @Transactional
    public ChapterResponseDTO createChapter(String novelSlug, ChapterRequestDTO requestDTO) {
        Novel novel = novelRepository.findBySlug(novelSlug)
                .orElseThrow(() -> new ResourceNotFoundException("Roman bulunamadı: " + novelSlug));

        if (chapterRepository.existsByNovelAndChapterNumber(novel, requestDTO.getChapterNumber())) {
            throw new BadRequestException("Bu bölüm numarası (" + requestDTO.getChapterNumber() + ") bu roman için zaten mevcut.");
        }

        Chapter chapter = new Chapter();
        chapter.setTitle(requestDTO.getTitle().trim());
        chapter.setChapterNumber(requestDTO.getChapterNumber());
        chapter.setContent(requestDTO.getContent());
        chapter.setNovel(novel);

        Chapter savedChapter = chapterRepository.save(chapter);
        return convertToResponseDTO(savedChapter);
    }

    @Override
    @Transactional
    public void deleteChapter(Long id) {
        Chapter chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bölüm bulunamadı. ID: " + id));
        chapterRepository.delete(chapter);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecentlyAddedChapterDTO> getRecentlyAddedChapters() {
        return chapterRepository.findTop10ByOrderByCreatedAtDesc().stream()
                .map(c -> new RecentlyAddedChapterDTO(
                        c.getId(),
                        c.getTitle(),
                        c.getChapterNumber(),
                        c.getNovel().getTitle(),
                        c.getNovel().getSlug(),
                        c.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    private ChapterResponseDTO convertToResponseDTO(Chapter chapter) {
        return new ChapterResponseDTO(
                chapter.getId(),
                chapter.getTitle(),
                chapter.getChapterNumber(),
                chapter.getContent(),
                chapter.getCreatedAt(),
                chapter.getNovel().getId(),
                chapter.getNovel().getTitle(),
                chapter.getNovel().getSlug()
        );
    }
}

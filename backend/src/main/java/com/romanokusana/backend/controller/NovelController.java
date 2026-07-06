package com.romanokusana.backend.controller;

import com.romanokusana.backend.dto.CategoryDTO;
import com.romanokusana.backend.dto.NovelRequestDTO;
import com.romanokusana.backend.dto.NovelResponseDTO;
import com.romanokusana.backend.dto.TagDTO;
import com.romanokusana.backend.service.NovelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/novels")
public class NovelController {

    private final NovelService novelService;

    public NovelController(NovelService novelService) {
        this.novelService = novelService;
    }

    @GetMapping
    public ResponseEntity<List<NovelResponseDTO>> getAllNovels(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String sortBy) {
        List<NovelResponseDTO> novels = novelService.getAllNovels(search, category, tag, sortBy);
        return ResponseEntity.ok(novels);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(novelService.getAllCategories());
    }

    @GetMapping("/tags")
    public ResponseEntity<List<TagDTO>> getAllTags() {
        return ResponseEntity.ok(novelService.getAllTags());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<NovelResponseDTO> getNovelBySlug(@PathVariable String slug) {
        NovelResponseDTO novel = novelService.getNovelBySlug(slug);
        return ResponseEntity.ok(novel);
    }

    @PostMapping("/{slug}/view")
    public ResponseEntity<Void> incrementViewCount(@PathVariable String slug) {
        novelService.incrementViewCount(slug);
        return ResponseEntity.ok().build();
    }

    // Secured Admin endpoints (Requires authentication)
    @PostMapping
    public ResponseEntity<NovelResponseDTO> createNovel(@Valid @RequestBody NovelRequestDTO requestDTO) {
        NovelResponseDTO novel = novelService.createNovel(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNovel(@PathVariable Long id) {
        novelService.deleteNovel(id);
        return ResponseEntity.noContent().build();
    }
}

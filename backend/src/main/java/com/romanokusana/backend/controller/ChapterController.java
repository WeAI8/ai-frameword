package com.romanokusana.backend.controller;

import com.romanokusana.backend.dto.ChapterRequestDTO;
import com.romanokusana.backend.dto.ChapterResponseDTO;
import com.romanokusana.backend.dto.RecentlyAddedChapterDTO;
import com.romanokusana.backend.service.ChapterService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chapters")
public class ChapterController {

    private final ChapterService chapterService;

    public ChapterController(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @GetMapping("/recently-added")
    public ResponseEntity<List<RecentlyAddedChapterDTO>> getRecentlyAdded() {
        return ResponseEntity.ok(chapterService.getRecentlyAddedChapters());
    }

    @GetMapping("/{novelSlug}/{chapterNumber}")
    public ResponseEntity<ChapterResponseDTO> getChapter(
            @PathVariable String novelSlug,
            @PathVariable Integer chapterNumber) {
        ChapterResponseDTO chapter = chapterService.getChapterByNovelSlugAndNumber(novelSlug, chapterNumber);
        return ResponseEntity.ok(chapter);
    }

    // Secured Admin endpoints
    @PostMapping("/{novelSlug}")
    public ResponseEntity<ChapterResponseDTO> createChapter(
            @PathVariable String novelSlug,
            @Valid @RequestBody ChapterRequestDTO requestDTO) {
        ChapterResponseDTO chapter = chapterService.createChapter(novelSlug, requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(chapter);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChapter(@PathVariable Long id) {
        chapterService.deleteChapter(id);
        return ResponseEntity.noContent().build();
    }
}

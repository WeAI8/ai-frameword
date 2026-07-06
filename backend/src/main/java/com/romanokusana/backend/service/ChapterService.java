package com.romanokusana.backend.service;

import com.romanokusana.backend.dto.ChapterRequestDTO;
import com.romanokusana.backend.dto.ChapterResponseDTO;
import com.romanokusana.backend.dto.RecentlyAddedChapterDTO;

import java.util.List;

public interface ChapterService {
    ChapterResponseDTO getChapterByNovelSlugAndNumber(String novelSlug, Integer chapterNumber);
    ChapterResponseDTO createChapter(String novelSlug, ChapterRequestDTO requestDTO);
    void deleteChapter(Long id);
    List<RecentlyAddedChapterDTO> getRecentlyAddedChapters();
}

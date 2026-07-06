package com.romanokusana.backend.service;

import com.romanokusana.backend.dto.CategoryDTO;
import com.romanokusana.backend.dto.NovelRequestDTO;
import com.romanokusana.backend.dto.NovelResponseDTO;
import com.romanokusana.backend.dto.TagDTO;
import com.romanokusana.backend.dto.WishlistRequestDTO;

import java.util.List;

public interface NovelService {
    List<NovelResponseDTO> getAllNovels(String search, String categorySlug, String tagSlug, String sortBy);
    NovelResponseDTO getNovelBySlug(String slug);
    NovelResponseDTO createNovel(NovelRequestDTO requestDTO);
    void deleteNovel(Long id);
    void incrementViewCount(String slug);
    
    List<CategoryDTO> getAllCategories();
    List<TagDTO> getAllTags();

    List<WishlistRequestDTO> getAllNovelRequests();
    WishlistRequestDTO createNovelRequest(WishlistRequestDTO dto);
}

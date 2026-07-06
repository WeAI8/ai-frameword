package com.romanokusana.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NovelResponseDTO {
    private Long id;
    private String title;
    private String slug;
    private String summary;
    private String coverImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer viewCount;
    private List<CategoryDTO> categories;
    private List<TagDTO> tags;
    private List<ChapterSummaryDTO> chapters;
}

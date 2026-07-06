package com.romanokusana.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChapterResponseDTO {
    private Long id;
    private String title;
    private Integer chapterNumber;
    private String content;
    private LocalDateTime createdAt;
    private Long novelId;
    private String novelTitle;
    private String novelSlug;
}

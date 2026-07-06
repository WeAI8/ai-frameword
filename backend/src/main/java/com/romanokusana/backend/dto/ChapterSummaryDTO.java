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
public class ChapterSummaryDTO {
    private Long id;
    private String title;
    private Integer chapterNumber;
    private LocalDateTime createdAt;
}

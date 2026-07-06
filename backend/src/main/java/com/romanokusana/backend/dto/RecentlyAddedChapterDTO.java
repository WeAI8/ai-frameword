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
public class RecentlyAddedChapterDTO {
    private Long chapterId;
    private String chapterTitle;
    private Integer chapterNumber;
    private String novelTitle;
    private String novelSlug;
    private LocalDateTime createdAt;
}

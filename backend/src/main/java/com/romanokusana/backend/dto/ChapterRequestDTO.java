package com.romanokusana.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChapterRequestDTO {

    @NotBlank(message = "Bölüm başlığı boş olamaz")
    private String title;

    @NotNull(message = "Bölüm numarası belirtilmelidir")
    @Min(value = 1, message = "Bölüm numarası en az 1 olmalıdır")
    private Integer chapterNumber;

    @NotBlank(message = "Bölüm içeriği boş olamaz")
    private String content;
}

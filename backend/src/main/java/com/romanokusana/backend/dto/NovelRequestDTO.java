package com.romanokusana.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NovelRequestDTO {

    @NotBlank(message = "Kitap başlığı boş olamaz")
    @Size(max = 100, message = "Kitap başlığı en fazla 100 karakter olabilir")
    private String title;

    @Size(max = 2000, message = "Özet en fazla 2000 karakter olabilir")
    private String summary;

    @Size(max = 500, message = "Kapak görseli URL'si en fazla 500 karakter olabilir")
    private String coverImageUrl;

    private List<Long> categoryIds;

    private List<String> tags;
}

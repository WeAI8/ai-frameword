package com.romanokusana.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WishlistRequestDTO {

    private Long id;

    @NotBlank(message = "Roman başlığı boş olamaz")
    @Size(max = 100, message = "Roman başlığı en fazla 100 karakter olabilir")
    private String novelTitle;

    private String status;
    private String logMessage;
    private LocalDateTime createdAt;
}

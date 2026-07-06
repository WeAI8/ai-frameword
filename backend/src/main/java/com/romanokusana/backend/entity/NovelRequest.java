package com.romanokusana.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "novel_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NovelRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "novel_title", nullable = false, length = 100)
    private String novelTitle;

    @Column(nullable = false, length = 20)
    private String status; // PENDING, SCRAPING, COMPLETED, FAILED

    @Column(name = "log_message", length = 1000)
    private String logMessage;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}

package com.romanokusana.backend.controller;

import com.romanokusana.backend.dto.WishlistRequestDTO;
import com.romanokusana.backend.service.NovelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/novels/wishlist")
public class NovelRequestController {

    private final NovelService novelService;

    public NovelRequestController(NovelService novelService) {
        this.novelService = novelService;
    }

    @GetMapping
    public ResponseEntity<List<WishlistRequestDTO>> getAllRequests() {
        return ResponseEntity.ok(novelService.getAllNovelRequests());
    }

    @PostMapping
    public ResponseEntity<WishlistRequestDTO> createRequest(@Valid @RequestBody WishlistRequestDTO dto) {
        WishlistRequestDTO created = novelService.createNovelRequest(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}

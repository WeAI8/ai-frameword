package com.romanokusana.backend.repository;

import com.romanokusana.backend.entity.NovelRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NovelRequestRepository extends JpaRepository<NovelRequest, Long> {
    List<NovelRequest> findByStatus(String status);
    List<NovelRequest> findAllByOrderByCreatedAtDesc();
}

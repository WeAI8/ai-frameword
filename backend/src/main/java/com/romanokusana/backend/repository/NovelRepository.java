package com.romanokusana.backend.repository;

import com.romanokusana.backend.entity.Novel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NovelRepository extends JpaRepository<Novel, Long> {
    Optional<Novel> findBySlug(String slug);
    boolean existsBySlug(String slug);

    @Query("SELECT n FROM Novel n JOIN n.categories c WHERE c.slug = :categorySlug")
    List<Novel> findByCategorySlug(@Param("categorySlug") String categorySlug);

    @Query("SELECT n FROM Novel n JOIN n.tags t WHERE t.slug = :tagSlug")
    List<Novel> findByTagSlug(@Param("tagSlug") String tagSlug);

    @Query("SELECT DISTINCT n FROM Novel n LEFT JOIN n.categories c LEFT JOIN n.tags t " +
           "WHERE LOWER(n.title) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(n.summary) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Novel> searchNovels(@Param("search") String search);
}

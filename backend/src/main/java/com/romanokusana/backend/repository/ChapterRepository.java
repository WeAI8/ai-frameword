package com.romanokusana.backend.repository;

import com.romanokusana.backend.entity.Chapter;
import com.romanokusana.backend.entity.Novel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    
    @Query("SELECT c FROM Chapter c WHERE c.novel.slug = :novelSlug AND c.chapterNumber = :chapterNumber")
    Optional<Chapter> findByNovelSlugAndChapterNumber(@Param("novelSlug") String novelSlug, @Param("chapterNumber") Integer chapterNumber);
    
    boolean existsByNovelAndChapterNumber(Novel novel, Integer chapterNumber);

    List<Chapter> findTop10ByOrderByCreatedAtDesc();
}

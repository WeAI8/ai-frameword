package com.romanokusana.backend.service;

import com.romanokusana.backend.entity.NovelRequest;
import com.romanokusana.backend.repository.NovelRequestRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ScraperScheduler {

    private final NovelRequestRepository novelRequestRepository;
    private final ScraperService scraperService;

    public ScraperScheduler(NovelRequestRepository novelRequestRepository,
                            ScraperService scraperService) {
        this.novelRequestRepository = novelRequestRepository;
        this.scraperService = scraperService;
    }

    // Check the wishlist queue every 30 seconds for fast demo feedback
    @Scheduled(fixedRate = 30000)
    public void checkForPendingRequests() {
        List<NovelRequest> pending = novelRequestRepository.findByStatus("PENDING");
        
        if (!pending.isEmpty()) {
            NovelRequest requestToProcess = pending.get(0);
            try {
                scraperService.scrapeNovel(requestToProcess);
            } catch (Exception e) {
                System.err.println("[ERROR] Zamanlayıcı tarama hatası: " + e.getMessage());
            }
        }
    }
}

# Roman Okusana - Sistem Desenleri (memory-bank/systemPatterns.md)

---

## 1. Mimari Tasarım
Proje, **Katmanlı Mimari (Layered Architecture)** ve **Tek Sayfa Uygulaması (SPA)** desenlerini kullanır.

```text
  [ Angular Frontend ] 
          │ (HTTP REST Calls with JWT)
          ▼
  [ REST Controllers ] ──▶ [ Security / JWT Filters ]
          │
          ▼
  [ Service Layer ] (Scrapers, Business Rules)
          │
          ▼
  [ JPA Repositories ] ──▶ [ PostgreSQL Database ]
```

---

## 2. Temel Tasarım Desenleri
*   **Data Transfer Object (DTO)**: İstemci ile sunucu arasındaki veri transferinde tip güvenliğini sağlamak için `NovelResponseDTO`, `ChapterResponseDTO` vb. kullanılır.
*   **Repository Pattern**: Veritabanı işlemleri Spring Data JPA arayüzleri (`NovelRepository`, `NovelRequestRepository`) üzerinden soyutlanır.
*   **Observer Pattern**: Angular servisleri (`NovelService`, `AuthService`) RxJS `Observable` yapıları ile veri akışlarını bileşenlere asenkron dağıtır.
*   **Scheduler Pattern**: `ScraperScheduler` yardımıyla adminin istekleri periyodik olarak arka planda sırayla işlenir.
*   **Strategy Pattern (Metin Temizleme)**: Farklı reklam ve sembol tipleri regex filtreleri ile temizlenir.

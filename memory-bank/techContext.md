# Roman Okusana - Teknoloji Bağlamı (memory-bank/techContext.md)

---

## 1. Aktif Mimari Seçimi (Active Architecture)
*   **selected_architecture**: `"springboot-angular"`

---

## 2. Teknoloji Yığını (Tech Stack)
*   **Backend**: Java 17+ / Spring Boot 3.x
    *   **Güvenlik**: Spring Security + JWT (JSON Web Token)
    *   **Veri Tabanı Erişimi**: Spring Data JPA / Hibernate
    *   **Otomatik Tarama**: Jsoup 1.18.1 + Jackson ObjectMapper (JSON API parsing)
    *   **Zamanlayıcı**: `@Scheduled` arka plan işleyicisi (30 saniyede bir tarama kuyruğu kontrolü)
*   **Frontend**: Angular 16+ (TypeScript)
    *   **Durum Yönetimi**: RxJS Observables / Signals
    *   **Styling**: Vanilla CSS (Premium koyu mod temalı, glassmorphism bileşenleri)
*   **Veritabanı**: PostgreSQL 15+
*   **Dağıtım/Konteyner**: Docker Compose

---

## 3. Sistem Entegrasyonları ve API Yapısı
*   **Arama / Detay API'leri**: `https://novelarrow.com/api-web` uç noktalarına yapılan GET istekleri.
*   **Bölüm İndirme API'si**: `https://novelarrow.com/api-web/novels/{novel_id}/chapters/{chapter_id}`.
*   **REST API Sözleşmesi**:
    *   `/api/auth/login` (Admin girişi)
    *   `/api/novels` (Roman listesi / Detayları)
    *   `/api/chapters` (Bölüm okuma API'si)
    *   `/api/novels/wishlist` (Sıradaki tarama istekleri)
    *   `/api/chapters/recently-added` (Son eklenen 10 bölüm akışı)

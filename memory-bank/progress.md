# Roman Okusana - Gelişim Durumu (memory-bank/progress.md)

---

## 1. Tamamlanan Özellikler (Completed Features)
*   **Temel Altyapı**: Spring Boot 3 + Angular 16 entegrasyonu, PostgreSQL entegrasyonu, Docker Compose kurulumu.
*   **Admin Girişi**: Spring Security ve JWT entegrasyonu ile admin yetkilendirmesi (`admin` / `admin123`).
*   **Novel Arama ve Okuma**: Roman listesi, roman detayları, bölüm listeleri ve okuyucu ekranı.
*   **İstek Listesi ve Arka Plan Zamanlayıcısı**: Otomatik roman istek tablosu, admin panelinde kuyruğa ekleme ve 10 saniyede bir canlı durum izleme.
*   **NovelArrow Entegrasyonu**: Jsoup ve Jackson yardımıyla NovelArrow search ve chapters API'leri üzerinden gerçek roman/bölüm içeriklerinin çekilmesi.
*   **Metin Temizleme**: Reklamlar, HTML etiketleri ve sponsor linklerin temizlenerek veritabanına kaydedilmesi.
*   **Son Eklenen Bölümler**: Ana sayfada son eklenen 10 bölümün listelenmesi.

---

## 2. Planlanan Özellikler (Roadmap)
*   **Okuma Modu Ayarları**: Karanlık/Aydınlık/Sepya modu, yazı tipi boyutu ve tipi seçimi.
*   **Okuma Geçmişi (LocalStorage)**: Kullanıcının kaldığı son bölümü ve en son okuduğu romanları tarayıcı belleğinde saklayarak kolayca geri dönmesini sağlama.
*   **Kitaplığım / Favoriler (LocalStorage)**: Okuyucuların romanları favorilerine ekleyebileceği yerel bir kitaplık sistemi.
*   **Gelişmiş Filtreleme**: Kategori ve tag bazlı çoklu arama ve sıralama motoru.
*   **Popülerlik Takibi**: Roman detay sayfalarının görüntülenme sayısına göre popüler romanlar listesi.

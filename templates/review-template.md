# [Kod İnceleme (Code Review) Raporu Şablonu]

Bu şablon, yazılan veya incelenen kodların (`workflows/code-review.md` akışına göre) standartlara uygunluğunun raporlanmasında kullanılır.

---

## 1. Genel Değerlendirme
*   **İncelenen Kapsam**: *[Hangi özellik veya bug fix incelendi?]*
*   **Genel Durum**: `[ONAYLANDI / DÜZELTME GEREKİYOR]`

## 2. Kategori Bazlı Kontrol Sonuçları

### A. Mimari Uygunluk (Architecture)
*   **Durum**: `[GEÇTİ / KALDI]`
*   **Bulgular**: *[Katman sınırları, klasör yapısı ve bağımlılık kontrolü bulguları]*

### B. Güvenlik (Security)
*   **Durum**: `[GEÇTİ / KALDI]`
*   **Bulgular**: *[SQL Injection, input validation ve yetkilendirme açığı kontrolleri]*

### C. Performans (Performance)
*   **Durum**: `[GEÇTİ / KALDI]`
*   **Bulgular**: *[N+1 sorguları, döngü optimizasyonları ve bellek yönetimi bulguları]*

### D. Okunabilirlik ve Temiz Kod (Clean Code)
*   **Durum**: `[GEÇTİ / KALDI]`
*   **Bulgular**: *[İsimlendirme standartları, SOLID kuralları ve yorum satırlarının doğruluğu]*

### E. Test Edilebilirlik (Testability)
*   **Durum**: `[GEÇTİ / KALDI]`
*   **Bulgular**: *[Birim test kapsamı ve mocking uygunluğu bulguları]*

## 3. Düzeltme Önerileri ve Aksiyonlar
*   **Kritik Düzeltmeler**:
    1.  `[DosyaAdı.ext#L123]`: *[Yapılması gereken kritik değişiklik gerekçesiyle birlikte]*
*   **Tavsiyeler (İsteğe Bağlı)**:
    1.  * [Okunabilirliği veya performansı artıracak küçük tavsiyeler]*

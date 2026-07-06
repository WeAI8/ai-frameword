# Kod Mimarisi Denetimi (Architecture Review)

Bu modül, kod yazıldıktan sonra, üretilen çıktının projenin katman sınırlarına ve mimari kurallarına uygunluğunu son kez denetleyen kontrol listesini tanımlar.

---

## 1. Mimari Kontrol Listesi (Post-Code Checklist)

Denetçi Ajan, yazılan kodu şu kriterlere göre denetler:

*   **Katman Sınırları**:
    - [ ] Kod, ait olduğu katmandaki sorumluluklarla mı sınırlı? (Örn: Service sınıfında UI veya veritabanı bağlantısı yönetimi yapılmamış).
    - [ ] Katmanlar arası geçişlerde baypas veya kaçak yok.
*   **Bağımlılık Yönleri**:
    - [ ] Import/bağımlılık bildirimleri sadece izin verilen yönlere doğru (Örn: Sadece dışarıdan içeriye/yukarıdan aşağıya).
    - [ ] Dairesel (circular) import bulunmuyor.
*   **Veri Taşınımı**:
    - [ ] Controller ve API katmanında veritabanı Entity sınıfları yerine sadece DTO'lar kullanılmış.
*   **İsimlendirme ve Klasör Düzeni**:
    - [ ] Yeni oluşturulan dosyalar projenin klasör yapısına ve isimlendirme standartlarına (CamelCase, snake_case vb.) uygun.

---

## 2. Denetim Sonucu
*   Tüm kontrol listesi maddeleri yeşil `[x]` olmalıdır.
*   Herhangi bir ihlal durumunda mimari uyum skoru (`architecture-score.md`) düşürülür ve otomatik rollback süreci başlatılır.

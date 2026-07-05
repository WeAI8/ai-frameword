# Dokümantasyon İş Akışı (Documentation Workflow)

Bu belge, proje içi teknik belgelerin, API dokümanlarının ve kod içi açıklamaların güncel ve standartlara uygun kalmasını sağlayan kuralları tanımlar.

---

## 1. Giriş
Kodun yazılması kadar onun belgelendirilmesi de kıdemli mühendislik sorumluluğudur. AI, her kod değişikliğinden sonra ilgili dokümantasyonu güncellemekle yükümlüdür.

---

## 2. Dokümantasyon Alanları ve Standartlar

### A. Kod İçi Açıklamalar (Inline Comments & Javadoc)
*   **Temel Kural**: Kod kendini açıklamalıdır. Kodun "nasıl" çalıştığını yorum satırlarıyla yazma (bu durum ölü yorumlara yol açar). Sadece koddan doğrudan anlaşılamayan **"neden"** kararlarını açıkla.
*   **Java/Spring**: Sınıflar ve karmaşık public metotlar için standart Javadoc formatını kullan. Parametrelerin (`@param`) ve dönüş değerlerinin (`@return`) iş mantığını kısaca belirt.
*   **JavaScript/TypeScript**: Karmaşık fonksiyonlar ve tipler için JSDoc standartlarını takip et.

### B. API Dokümantasyonu (REST APIs)
*   Yeni bir controller veya API ucu (endpoint) eklendiğinde API dokümanını güncelle.
*   Projede Swagger/OpenAPI kullanılıyorsa, gerekli anotasyonları (örn: `@Operation`, `@ApiResponse`) kullanarak parametreleri, dönüş tiplerini ve hata durumlarını (status codes) eksiksiz tanımla.

### C. Proje Belgeleri (README & CHANGELOG)
*   **README.md**: Projenin kurulum, derleme ve test komutlarında bir değişiklik olduysa README dosyasını güncelle.
*   **CHANGELOG.md**: Yapılan önemli değişiklikleri, hata düzeltmelerini ve yeni eklenen özellikleri sürüm numarası belirterek kronolojik olarak CHANGELOG dosyasına ekle.

### D. Git Commit Mesajları (Commit Conventions)
*   Değişiklikleri commit ederken **Conventional Commits** standartlarına uyun:
    *   `feat: <açıklama>` (Yeni özellik)
    *   `fix: <açıklama>` (Hata düzeltme)
    *   `refactor: <açıklama>` (Kod iyileştirme)
    *   `docs: <açıklama>` (Dokümantasyon değişikliği)
    *   `test: <açıklama>` (Test ekleme/düzenleme)
*   Mesajlar kısa, öz ve yapılan değişikliğin amacını açıklayan Türkçe ifadelerden oluşmalıdır.

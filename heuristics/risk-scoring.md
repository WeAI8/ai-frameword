# Risk Derecelendirme ve Puanlama Kuralları (Risk Scoring Policy)

Bu politika, ajan tarafından önerilen değişikliklerin sisteme getireceği riskleri sayısal (1-10) olarak puanlar ve risk seviyesine göre çalışma zamanı (`runtime/`) doğrulama döngülerini dinamik olarak sıkılaştırır.

---

## 1. Risk Değerlendirme Kategorileri ve Puanlama

Ajan, planlama aşamasında her değişikliği 3 ana kategoride puanlar:

### A. Mimari Risk (1-10)
*   *Puan 1-4 (Düşük)*: Sadece yeni bir dosya eklenmesi veya mevcut bağımsız bir sınıfa ekleme yapılması.
*   *Puan 5-7 (Orta)*: Ortak kullanılan servislerde veya veritabanı şemalarında değişiklik yapılması.
*   *Puan 8-10 (Yüksek)*: Çekirdek modüllerde (Core) değişiklik, ortak bağımlılıkların güncellenmesi.
    *   *Aksiyon*: Mimari Risk > 7 ise, `core/validation/architecture-drift.md` doğrulaması çift aşamalı çalıştırılır.

### B. Güvenlik Riski (1-10)
*   *Puan 1-4 (Düşük)*: Arayüz geliştirmeleri, görsel düzenlemeler.
*   *Puan 5-7 (Orta)*: Yetki kontrolü olan API'lere yeni alan eklenmesi, veri şifreleme.
*   *Puan 8-10 (Yüksek)*: Yeni yetkilendirme akışı yazılması, dış dünyadan kontrolsüz girdi (input) alınması.
    *   *Aksiyon*: Güvenlik Riski > 7 ise, girdi doğrulama (validation) ve SQL injection taraması zorunlu kılınır.

### C. Performans Riski (1-10)
*   *Puan 1-4 (Düşük)*: Hafif veri okuma işlemleri.
*   *Puan 5-7 (Orta)*: Karmaşık JOIN sorguları, büyük döngüler içeren servisler.
*   *Puan 8-10 (Yüksek)*: Toplu veri işleme (batch processing), transaction yönetimi değişiklikleri.
    *   *Aksiyon*: Performans Riski > 7 ise, sorgu execution plan analizi ve index doğrulaması istenir.

---

## 2. Risk Bazlı Tetikleme ve Rollback
*   Değerlendirilen herhangi bir kategoride risk puanı **> 7** ise, orkestratör (`runtime/orchestrator.md`) otomatik olarak ek bir doğrulama adımı açar.
*   Yazılan kodun testleri geçse dahi, riskli alanlardaki kalite metrikleri (`metrics/`) onay alamazsa orkestratör rollback işlemini tetikler.

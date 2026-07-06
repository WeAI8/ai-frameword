# Çalışma Zamanı Olayları (Runtime Events)

Olay Sistemi, çoklu ajan (multi-agent) mimarisinin ve Decision Runtime modüllerinin birbiriyle asenkron veya senkron olarak haberleşmesini, tetiklenmesini ve geri bildirim döngülerini kurmasını sağlar.

---

## 1. Kayıtlı Çalışma Zamanı Olayları (Events)

| Olay Adı (Event Name) | Tetiklenme Zamanı | Tetiklediği Modül/Aksiyon |
| :--- | :--- | :--- |
| **OnTaskStart** | Kullanıcıdan talep alındığında. | `Classifier` ve `Context Budget` modüllerini çalıştırır. |
| **OnEvidenceFound** | Kanıt motoru aramayı bitirdiğinde. | Güven Puanını (`confidence.md`) yeniden hesaplatır. |
| **OnConfidenceLow** | Güven puanı %70'in altına düştüğünde. | Ajanı durdurur ve `Question Engine` modülünü tetikler. |
| **OnArchitectureViolation** | Kodda mimari kayma tespit edildiğinde. | Değişikliği geri alır (Rollback) ve `Recovery` modülünü çalıştırır. |
| **OnReflectionFailed** | Teslimat öncesi öz-yansıtma başarısız olduğunda. | Kodu `Implementing` durumuna çeker ve Geliştiriciyi tetikler. |
| **OnTaskComplete** | Tüm DoD kriterleri sağlandığında. | Çıktıyı `output-contract.md` formatında kullanıcıya teslim eder. |

---

## 2. Olay Dinleme ve İletişim Kuralları
*   Her olay, tetiklendiği andaki bağlamı (hata stack trace'i, etkilenen dosya yollarını, güncel durum bilgisini) parametre olarak taşır.
*   Çoklu ajan senaryolarında, Ajan A (Geliştirici) bir dosyayı değiştirdiğinde `OnReflectionFailed` veya `OnArchitectureViolation` olayı tetiklenirse, Ajan B (Denetçi) bu olayı dinleyerek asistanı yönlendirir.

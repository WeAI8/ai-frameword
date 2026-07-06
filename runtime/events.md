# Çalışma Zamanı Olayları (runtime/events.md)

---

## 1. Amaç (Purpose)
Ajanların ve karar runtime modüllerinin birbiriyle asenkron veya senkron olarak haberleşmesini sağlayan olay dinleme ve fırlatma altyapısını kurmak.

---

## 2. Sorumluluklar (Responsibilities)
*   Olayları tanımlamak (`OnTaskStart`, `OnEvidenceFound`, `OnConfidenceLow`, `OnArchitectureViolation`, `OnReflectionFailed`, `OnTaskComplete`).
*   Olayların taşıyacağı bağlam (context) verilerini paketlemek.

---

## 3. Girdiler (Inputs)
*   Modüllerden gelen olay tetikleme sinyalleri.
*   Hata logları, test sonuçları, dosya yolları.

---

## 4. Çıktılar (Outputs)
*   Olay dinleyicilere (listeners) yönlendirilen event nesneleri.

---

## 5. Bağımlılıklar (Dependencies)
*   `runtime/orchestrator.md`
*   `runtime/scheduler.md`

---

## 6. Kurallar (Rules)
*   **Olay Bağlamı**: Her olay mutlaka fırlatıldığı andaki hata detayını veya durum bilgisini beraberinde taşımak zorundadır.
*   **Öncelik**: Kritik olaylar (Örn: `OnArchitectureViolation`) scheduler tarafından en yüksek öncelikle işlenmelidir.

---

## 7. Hata Durumları (Failure Cases)
*   *Olay Kaybı*: Fırlatılan bir olay orkestratör tarafından yakalanamazsa sistem varsayılan olarak güvenli duruşa (fail-safe) geçer.

---

## 8. Örnekler (Examples)
*   *Olay*: `OnConfidenceLow`
*   *İçerik*: `{ taskId: 123, confidence: 55, reason: "Yetki belirsiz" }`
*   *Aksiyon*: Soru motoru tetiklenir.

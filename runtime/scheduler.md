# Ajan Zamanlayıcı (runtime/scheduler.md)

---

## 1. Amaç (Purpose)
Ajanların ve kuyruğa giren görevlerin (tasks) çalışma sıralarını, önceliklerini ve paralel iş dağıtımlarını yönetmek.

---

## 2. Sorumluluklar (Responsibilities)
*   Ajan kuyruğunu (Analyst -> Architect -> Developer -> Reviewer) yönetmek.
*   Olaylara göre (OnConfidenceLow, OnArchitectureViolation) öncelikleri dinamik olarak değiştirmek.
*   Bağımsız alt görevleri paralel ajanlara dağıtmak.

---

## 3. Girdiler (Inputs)
*   Olay bildirimleri (`runtime/events.md`).
*   Ajan havuzu durum bilgisi.

---

## 4. Çıktılar (Outputs)
*   Tetikleme ve askıya alma (Suspend/Resume) sinyalleri.

---

## 5. Bağımlılıklar (Dependencies)
*   `runtime/events.md`
*   `heuristics/multi-agent-rules.md`

---

## 6. Kurallar (Rules)
*   **Kritik Öncelik**: Geri alma ve kurtarma olayları, standart geliştirme görevlerinin önüne geçirilerek en yüksek öncelikle kuyruğa alınmalıdır.
*   **Kaynak Sınırı**: Ajanlar arası kaynak çakışmasını önlemek için paralel işlerde dosya kilitleri (file locks) denetlenmelidir.

---

## 7. Hata Durumları (Failure Cases)
*   *Kilitlenme (Deadlock)*: İki ajan birbirinin kaynağını beklerse scheduler kilitlenmeyi çözer, görevlerden birini iptal eder ve geri alır.

---

## 8. Örnekler (Examples)
*   *Olay*: `OnConfidenceLow`
*   *Aksiyon*: Developer ajan askıya alınır, Analyst ajana yüksek öncelik verilerek çalıştırılır.

# Ajan Durum Makinesi (core/kernel/state-machine.md)

---

## 1. Amaç (Purpose)
Ajanın çalışma zamanı süresince (lifecycle) hangi aşamada olduğunu izlemek ve aşamalara bağlı kuralların bütünlüğünü korumak.

---

## 2. Sorumluluklar (Responsibilities)
*   Ajan durumlarını (`Discovering`, `Analyzing`, `Planning`, `Waiting Approval`, `Implementing`, `Reviewing`, `Done`) yönetmek.
*   Aşamalar arası ileri ve geri (Rollback) geçişlerin kurallarını denetlemek.

---

## 3. Girdiler (Inputs)
*   Mevcut durum (Current State)
*   Metrik sonuçları (`metrics/`) ve olay bildirimleri (`runtime/events.md`)

---

## 4. Çıktılar (Outputs)
*   Yeni durum (Next State)
*   Durum değişim olayı (`OnStateChange`)

---

## 5. Bağımlılıklar (Dependencies)
*   `runtime/lifecycle.md`
*   `runtime/events.md`

---

## 6. Kurallar (Rules)
*   **Onay Kısıtı**: Kullanıcı onayı alınmadan (`Waiting Approval` -> `Implementing` geçişi) kaynak kod dosyalarında değişiklik yapılamaz.
*   **Döngü Sınırı**: `Reviewing` aşamasında hata alınması durumunda en fazla 3 kez `Implementing` aşamasına geri dönülebilir (Loop Guard).

---

## 7. Hata Durumları (Failure Cases)
*   *İllegal Geçiş Denemesi*: Onay alınmadan kodlama fazına geçilmeye çalışılırsa çalışma zamanını durdur (`OnTaskComplete` hata ile tetiklenir).
*   *İterasyon Aşımı*: Düzeltme döngüsü 3'ü aşarsa akışı kes ve durumu kullanıcıya bildir.

---

## 8. Örnekler (Examples)
*   *Giriş*: `Waiting Approval` durumunda olan ajan, kullanıcıdan "Onaylıyorum" mesajı alır.
*   *İşlem*: Durumu `Implementing` (Uygulama) olarak günceller ve kodlama araçlarını aktif hale getirir.

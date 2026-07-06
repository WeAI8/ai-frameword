# Güven Puanı ve Karar Eşiği (core/decision/confidence.md)

---

## 1. Amaç (Purpose)
Ajanın varsayımlarını sayısal olarak puanlamak, belirsizlik seviyesine göre akıllı soruları veya ek kanıt taramalarını tetiklemek.

---

## 2. Sorumluluklar (Responsibilities)
*   Her varsayım için güven derecesi (%0 - %100) hesaplamak.
*   Ortalama güven puanına göre karar eşiğini (Decision Threshold) denetlemek.

---

## 3. Girdiler (Inputs)
*   Ajanın varsayımları listesi.
*   `evidence.md` tarafından sağlanan kanıtların güç puanı.

---

## 4. Çıktılar (Outputs)
*   Varsayım Güven Skoru listesi.
*   Ortalama Güven Seviyesi.
*   Tetikleme durumları (Örn: `OnConfidenceLow` olayı).

---

## 5. Bağımlılıklar (Dependencies)
*   `core/decision/evidence.md`
*   `metrics/confidence-score.md`

---

## 6. Kurallar (Rules)
*   **Baraj Puanı**: Ortalama güven puanı **%70**'in altında kalan kritik konularda kullanıcıdan onay almadan kodlama aşamasına geçilemez.
*   **Kanıt Ağırlığı**: Kanıt türüne göre varsayım puanına ek ağırlıklar verilmelidir (Doğrudan kanıt: 1.0, Dolaylı: 0.6).

---

## 7. Hata Durumları (Failure Cases)
*   *Çıkarım Yetersizliği*: Puan %70'in altında kaldığında soru motoruna geçilemezse, orkestratör akışı acil durdurma statüsüne geçirir.

---

## 8. Örnekler (Examples)
*   *Varsayım*: "Kullanıcı tablosuna email alanı eklenecek."
*   *Kanıt*: `f:/database.sql` dosyasında `users` tablosu var (Doğrudan Kanıt).
*   *Güven Puanı*: `%95` (Eşik geçildi).

# Mimari Kayma ve Aşınma Koruyucusu (core/validation/architecture-drift.md)

---

## 1. Amaç (Purpose)
Geliştirilen kodların projenin katman sınırlarını, bağımlılık yönlerini ve yapısal mimarisini bozmasını (drift/erozyon) engellemek.

---

## 2. Sorumluluklar (Responsibilities)
*   Katman sınırlarının ihlal edilip edilmediğini denetlemek (Örn: Katman baypası).
*   Sınıflar arası dairesel bağımlılıkları (circular dependencies) taramak.
*   Entity sızmalarını ve DTO kurallarını doğrulamak.

---

## 3. Girdiler (Inputs)
*   Önerilen kod değişiklikleri taslağı.
*   `core/architecture.md` mimari kuralları.

---

## 4. Çıktılar (Outputs)
*   Mimari Uyum Raporu.
*   İhlal durumunda `OnArchitectureViolation` olayı.

---

## 5. Bağımlılıklar (Dependencies)
*   `core/architecture.md`
*   `metrics/architecture-score.md`

---

## 6. Kurallar (Rules)
*   **Katman Sınırı Geçilemez**: Alt katmanlar üst katmanları kesinlikle çağıramaz (Örn: Service -> Controller import edilemez).
*   **Entity İzolasyonu**: Veritabanı entity sınıfları sadece veri katmanında kalmalı, UI veya API controller uçlarına sızdırılmamalıdır.

---

## 7. Hata Durumları (Failure Cases)
*   *Mimari İhlal*: İhlal tespit edildiğinde `metrics/architecture-score.md` puanı düşürülür, kodlama durdurulur ve acil rollback tetiklenir.

---

## 8. Örnekler (Examples)
*   *İhlal*: Geliştiricinin `OrderController` içine doğrudan `OrderRepository` enjekte etmeye çalışması (Katman Baypası).
*   *Aksiyon*: Kayma koruyucu bunu engeller ve orkestratöre ihlal bildirir.

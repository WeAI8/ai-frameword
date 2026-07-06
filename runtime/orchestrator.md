# Runtime Orkestratörü (runtime/orchestrator.md)

---

## 1. Amaç (Purpose)
Ajanın tüm karar alma, doğrulama ve kodlama süreçlerini koordine etmek; OODA Loop döngülerini ve metrik bazlı rollback (geri alma) adımlarını yönetmek.

---

## 2. Sorumluluklar (Responsibilities)
*   Düşünme işlem hattı ve OODA Loop geçişlerini çalıştırmak.
*   Aktif metriklerden gelen girdilere göre rollback veya recovery tetiklemek.
*   Loop Guard (iterasyon koruyucusu) sayacını yönetmek.

---

## 3. Girdiler (Inputs)
*   Yaşam döngüsü durumları (`runtime/lifecycle.md`).
*   Metrik sonuçları (`metrics/`).
*   Olay bildirimleri (`runtime/events.md`).

---

## 4. Çıktılar (Outputs)
*   Çalıştırma ve duraklatma sinyalleri.
*   Rollback/Recovery komutları.

---

## 5. Bağımlılıklar (Dependencies)
*   `runtime/lifecycle.md`
*   `runtime/events.md`
*   `runtime/recovery.md`

---

## 6. Kurallar (Rules)
*   **Metrik Güdümlü**: Metrik sonuçları eşiklerin altında kalırsa orkestratör derhal rollback işlemini tetiklemek zorundadır.
*   **Döngü Sınırı**: Aynı görev üzerinde en fazla **3** hata düzeltme iterasyonuna izin verilir.

---

## 7. Hata Durumları (Failure Cases)
*   *Sonsuz Kısırdöngü*: İterasyon sayacı 3'ü aşarsa orkestratör `OnTaskComplete` olayını hata bilgisiyle tetikleyerek akışı keser ve kontrolü kullanıcıya bırakır.

---

## 8. Örnekler (Examples)
*   *Senaryo*: Kod testi başarısız olur (`metrics/quality.md` hata verir).
*   *Aksiyon*: Orkestratör `OnReflectionFailed` olayını fırlatır, durumu `Implementing` aşamasına geri çeker ve recovery motorunu çalıştırır.

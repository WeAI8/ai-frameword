# Aktif Bellek Yönetim Stratejisi (memory/strategy.md)

---

## 1. Amaç (Purpose)
Geçmiş teknik kararları ve kod şablonlarını aktif olarak aramak, derecelendirmek, getirmek ve eskileri temizlemek (Search -> Rank -> Retrieve -> Expire).

---

## 2. Sorumluluklar (Responsibilities)
*   Geçmiş konuşma ve projelerdeki benzer kararları sorgulamak.
*   Bulunan kararları benzerlik yüzdesine göre sıralamak (Rank).
*   En benzer kararları Kanıt Motoruna (`evidence.md`) bağlam olarak getirmek (Retrieve).
*   Eski ve çelişen kararları bellekten temizlemek (Expire).

---

## 3. Girdiler (Inputs)
*   Karar arama anahtar kelimeleri.
*   Codebase güncel yapısı.

---

## 4. Çıktılar (Outputs)
*   Sıralanmış ve doğrulanmış geçmiş kararlar listesi.

---

## 5. Bağımlılıklar (Dependencies)
*   `core/decision/evidence.md`

---

## 6. Kurallar (Rules)
*   **Aktif Sorgulama**: Karar alınırken sadece codebase taranmamalı, bellek de aktif sorgulanmalıdır.
*   **Zaman Aşımı**: Mimaride yapılan değişiklikler sonrasında eskiyen bellek kayıtları "Deprecated" (kullanımdan kaldırılmış) olarak güncellenmelidir.

---

## 7. Hata Durumları (Failure Cases)
*   *Çelişkili Karar*: Bellekte aynı konuyla ilgili iki farklı karar bulunursa, ajan son onaylanan kararı baz alır ve eskisini siler.

---

## 8. Örnekler (Examples)
*   *Sorgu*: "Oracle veri tabanı bağlantı yöntemi nedir?"
*   *Bulgu*: Bellekteki geçmiş projeden `JdbcTemplate` kararı bulunur ve kanıt motoruna aktarılır.

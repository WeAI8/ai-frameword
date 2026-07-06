# Akıllı Soru Motoru (core/decision/question-engine.md)

---

## 1. Amaç (Purpose)
Gereksiz teknik soruları süzmek; sadece ve sadece sistemin mimarisini, güvenliğini veya doğruluğunu doğrudan etkileyen hayati belirsizliklerde soru sorulmasını sağlamak.

---

## 2. Sorumluluklar (Responsibilities)
*   Soru azaltma (reduction) ve çıkarım önceliği denetimini yapmak.
*   Sorulacak soruları tekil, seçenekli ve gerekçeli olarak formatlamak.

---

## 3. Girdiler (Inputs)
*   Düşük güvenli varsayımlar listesi (Güven Skoru < %70).
*   Çıkarım (inference) analizi sonuçları.

---

## 4. Çıktılar (Outputs)
*   Standart formatta hazırlanan Netleştirme Soruları.
*   Runtime duraklatma sinyali.

---

## 5. Bağımlılıklar (Dependencies)
*   `core/decision/confidence.md`
*   `runtime/events.md`

---

## 6. Kurallar (Rules)
*   **Çıkarım Önceliği**: Proje kodlarından mantıksal olarak çıkarılabilecek hiçbir konuyu kullanıcıya sorma.
*   **Seçenekli Soru**: Sorular her zaman projenin yapısına uygun teknik seçeneklerle sunulmalıdır.

---

## 7. Hata Durumları (Failure Cases)
*   *Yanıt Gecikmesi*: Kullanıcıdan soruya yanıt alınana kadar çalışma zamanı askıda (Suspended) tutulmalıdır.

---

## 8. Örnekler (Examples)
*   *Soru*: "Yetkilendirme kuralları ne olacak?" (Gerekçe: Projede hem JWT hem Basic Auth kullanılmış).
*   *Seçenekler*: "A) JWT Auth, B) Basic Auth".

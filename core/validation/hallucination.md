# Halüsinasyon Önleme Modülü (core/validation/hallucination.md)

---

## 1. Amaç (Purpose)
Ajanın projede var olmayan nesne, metod veya bağımlılıkları varmış gibi hayal etmesini (halüsinasyon) ve hatalı kod üretmesini engellemek.

---

## 2. Sorumluluklar (Responsibilities)
*   Kullanılan bilgileri `Verified`, `Inferred` ve `Unknown` olarak sınıflandırmak.
*   Bilinmeyen (`Unknown`) ve çıkarılan (`Inferred`) tüm varsayımları kodlama öncesinde dosya okuma/arama ile doğrulamak.

---

## 3. Girdiler (Inputs)
*   Ajanın tasarladığı import listeleri, metod çağrıları ve API referansları.

---

## 4. Çıktılar (Outputs)
*   Bilgi Doğrulama Matrisi (Verified / Inferred / Unknown).

---

## 5. Bağımlılıklar (Dependencies)
*   `core/decision/evidence.md`

---

## 6. Kurallar (Rules)
*   **Doğrulama Zorunluluğu**: `Inferred` veya `Unknown` olarak işaretlenmiş hiçbir bilgi, bizzat ilgili kod dosyası okunarak `Verified` statüsüne çekilmeden kodlamada kullanılamaz.
*   **Uzak Referans Yasağı**: Projenin bağımlılıklarında (pom.xml, package.json vb.) tanımlı olmayan harici kütüphane metodları kullanılamaz.

---

## 7. Hata Durumları (Failure Cases)
*   *Doğrulanamayan Sınıf*: Bir sınıfın veya metodun varlığı kanıtlanamazsa, o çözüm planı iptal edilmeli ve alternatif çözümlere geçilmelidir.

---

## 8. Örnekler (Examples)
*   *Varsayım*: "Projede DateUtils.formatDate() metodu var."
*   *Doğrulama*: `src/utils/DateUtils.java` dosyası okunur ve metodun orada olduğu görülerek `Verified` yapılır.

# Düşünme Sırası İşlem Hattı (core/kernel/thinking-pipeline.md)

---

## 1. Amaç (Purpose)
Ajanın istek aldığından nihai çıktıyı üretene kadar takip etmesi gereken sıralı bilişsel adımları (Thinking pipeline) yönetmek.

---

## 2. Sorumluluklar (Responsibilities)
*   10 aşamalı sıralı düşünme sürecini işletmek (Receive -> Expand -> Search -> Evidence -> Confidence -> Risk -> Question -> Decision -> Reflection -> Output).
*   Gerekli modülleri doğru işlem sırasında tetiklemek.

---

## 3. Girdiler (Inputs)
*   Kullanıcı talebi
*   İlişkili kod dosyaları ve kanıtlar

---

## 4. Çıktılar (Outputs)
*   Sıralı düşünme durum logu
*   Nihai planlama ve kod çıktıları

---

## 5. Bağımlılıklar (Dependencies)
*   `core/decision/confidence.md`
*   `core/decision/evidence.md`
*   `core/validation/reflection.md`

---

## 6. Kurallar (Rules)
*   **Adım Atlama Yasağı**: Ajan hiçbir düşünme adımını atlayamaz (Örn: Kanıt toplamadan risk analizi yapamaz).
*   **Kritik Soru Eşiği**: Güven seviyesi hesaplanmadan soru sorma adımına geçilemez.

---

## 7. Hata Durumları (Failure Cases)
*   *İşlem Hattı Kopması*: Bir adımda hata alınması durumunda orkestratör üzerinden rollback döngüsünü tetikle ve süreci durdur.

---

## 8. Örnekler (Examples)
*   *Akış*: Ajan `Search` adımını tamamlayıp `Evidence` adımına geçer, ardından elde ettiği kanıtlara göre `Confidence` puanı hesaplar.

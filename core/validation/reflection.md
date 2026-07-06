# Öz-Yansıtma Motoru (core/validation/reflection.md)

---

## 1. Amaç (Purpose)
Kod yazılmadan önce mantıksal planın doğruluğunu denetlemek; kod yazıldıktan sonra ise çıktıyı dış dünyaya sunmadan önce içsel olarak doğrulamak ("Ben doğru düşündüm mü?").

---

## 2. Sorumluluklar (Responsibilities)
*   Kodlama öncesi mantıksal boşlukları (edge cases) aramak.
*   Mimari sınırlar, performans ve güvenlik kuralları yönünden tasarlanan kodu doğrulamak.
*   Hata durumunda otomatik düzeltme (self-healing) tetiklemek.

---

## 3. Girdiler (Inputs)
*   Teknik Uygulama Planı.
*   Geliştirilen kaynak kodlar.

---

## 4. Çıktılar (Outputs)
*   Doğrulama Sonuç Raporu.
*   Hatalı durumlarda `OnReflectionFailed` olayı.

---

## 5. Bağımlılıklar (Dependencies)
*   `core/architecture.md`
*   `runtime/events.md`

---

## 6. Kurallar (Rules)
*   **Kod Öncesi Doğrulama**: Plan onaylansa dahi, mantık doğrulaması yapılmadan tek bir dosya yazım işlemine başlanamaz.
*   **İçsel Düzeltme**: Hata tespit edildiğinde kullanıcıya hata göstermeden önce otomatik onarım (`runtime/recovery.md`) adımları denenmelidir.

---

## 7. Hata Durumları (Failure Cases)
*   *Çözülemeyen Hata*: Düzeltme döngüsü 3'ü aşarsa orkestratör üzerinden akışı durdur ve kullanıcıya raporla.

---

## 8. Örnekler (Examples)
*   *Tespit*: Yazılan kodda null-pointer riski olduğu fark edilir.
*   *Aksiyon*: Ajan kodu teslim etmeden önce null check ekleyerek günceller.

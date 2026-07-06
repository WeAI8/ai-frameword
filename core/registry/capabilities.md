# Kabiliyet Kayıt Defteri (core/registry/capabilities.md)

---

## 1. Amaç (Purpose)
Ajanın yapabileceği görev türlerini (capabilities) ve bu görevler sırasında çalışacak iş akışlarını merkezi bir katalogda tanımlamak.

---

## 2. Sorumluluklar (Responsibilities)
*   Ajanın iş yapabilme listesini güncel tutmak (Feature, Bug, Refactor, Review, Test, Doc vb.).
*   Görev tiplerini ilgili tetikleyici dosyalarla eşleştirmek.

---

## 3. Girdiler (Inputs)
*   Önyükleyiciden (`bootstrap.md`) gelen görev tipi sorgusu.

---

## 4. Çıktılar (Outputs)
*   Tetiklenecek iş akışı dosya yolu (`workflows/`).

---

## 5. Bağımlılıklar (Dependencies)
*   `core/registry/workflows.md`

---

## 6. Kurallar (Rules)
*   **Kayıt Zorunluluğu**: Yeni bir ajan yeteneği veya iş tipi eklendiğinde, bu deftere kaydedilmeden sistem tarafından çalıştırılamaz.
*   **Tek Tetikleyici**: Her kabiliyetin sadece tek bir ana tetikleyici iş akışı (workflow) dosyası olabilir.

---

## 7. Hata Durumları (Failure Cases)
*   *Eşleşme Hatası*: Gelen görev tipi kayıtlı değilse, çalışma zamanı hata fırlatmak yerine varsayılan genel akışı (`Feature`) tetikler.

---

## 8. Örnekler (Examples)
*   *Sorgu*: `Bug` (Hata Giderme)
*   *Eşleşen Dosya*: `workflows/bug-investigation.md`

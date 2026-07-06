# İş Akışları Kayıt Defteri (core/registry/workflows.md)

---

## 1. Amaç (Purpose)
Decision Runtime bünyesindeki tüm iş akışlarının (workflows) konumlarını ve çalışma kurallarını merkezi olarak kaydetmek.

---

## 2. Sorumluluklar (Responsibilities)
*   Sistemde tanımlı olan iş akışı dosyalarının (`workflows/`) katalog yönetimini yapmak.
*   Görev tiplerine uygun doğru `.md` akışını seçip yükleyiciye iletmek.

---

## 3. Girdiler (Inputs)
*   Kabiliyet kayıt sorgusu.

---

## 4. Çıktılar (Outputs)
*   Seçilen iş akışı dosya yolu ve tanımı.

---

## 5. Bağımlılıklar (Dependencies)
*   Yok.

---

## 6. Kurallar (Rules)
*   **Kayıt Zorunluluğu**: Yeni bir iş akışı oluşturulduğunda bu deftere kaydedilmelidir.
*   **İzole Çalışma**: Her iş akışı bağımsız bir dosya olmalı ve diğer akışların içsel mantığına müdahale etmemelidir.

---

## 7. Hata Durumları (Failure Cases)
*   *Dosya Yok Hatası*: Defterde tanımlı olan iş akışı dosyası fiziksel olarak bulunamazsa varsayılan akışa geçilir veya hata verilir.

---

## 8. Örnekler (Examples)
*   *İş Akışı*: `coordination-workflow` -> `workflows/multi-agent-coordination.md`

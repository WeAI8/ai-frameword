# Akıllı Soru Motoru (Question Engine)

Akıllı Soru Motoru, yapay zeka asistanının kullanıcıyı gereksiz ve önemsiz teknik sorularla meşgul etmesini engeller. Sadece ve sadece çıkarım yapmanın imkansız olduğu kritik durumlarda soru sorulmasını sağlar.

---

## 1. Soru Filtreleme ve Çıkarım Önceliği (Inference First)

Ajan, kullanıcıya bir soru sormadan önce şu aşamaları işletmek zorundadır:

1.  **Çıkarım Yapılabilir mi?**: Projedeki mevcut kodlardan veya geçmiş kararlardan (`memory/strategy.md`) bu sorunun cevabı mantıksal olarak çıkarılabiliyor mu? (Cevap evet ise: Soruyu sorma, çıkarımı varsayım olarak planına ekle).
2.  **Karar Eşiği Yeterli mi?**: Güven puanı %70'in üzerinde mi? (Cevap evet ise: Soruyu sorma).
3.  **Hayati Kapsamda mı?**: Sorunun cevabı kodun temel mimarisini, güvenliğini veya veri bütünlüğünü doğrudan etkiliyor mu? (Cevap hayır ise: Varsayım yap, planına yaz ve devam et).

---

## 2. Kritik Soru Sınırları ve Formatı

Eğer yukarıdaki filtrelerden geçip soru sormak zorunlu hale gelirse, soru şu kurallara uymak zorundadır:

*   **Tek Soru Odaklılık**: Aynı anda birden fazla alakasız soru sorma. Soruları grupla ve sadeleştir.
*   **Seçenek Sunma**: Soruyu açık uçlu bırakmak yerine, projenin yapısına uygun mantıklı seçenekler sun (Örn: "A yöntemini mi yoksa B yöntemini mi tercih edersiniz?").
*   **Format**:
    > **Açık Soru (Gerekçe: [Kanıt/Güven Seviyesi])**
    > *[Sorunun Açıklaması ve Sunulan Seçenekler]*

# Güven Puanı ve Karar Eşiği (Confidence & Decision Threshold)

Ajan, yaptığı her varsayımı belgelendirmeli ve varsayımların doğruluğuna dair güven seviyesini sayısal olarak hesaplamalıdır. Karar eşiği aşılmadan kodlama fazına geçilemez.

---

## 1. Güven Seviyesi Hesaplama Metrikleri

Her varsayım için güven puanı (0-100%) aşağıdaki kriterlere göre hesaplanır:

*   **Doğrudan Kanıt (Direct Evidence) [+50 Puan]**: Codebase içinde varsayımı doğrudan doğrulayan çalışan bir kod veya yapılandırma dosyası varlığı.
*   **Benzerlik Kanıtı (Analogy Evidence) [+30 Puan]**: Projede birebir aynı olmasa da çok benzer bir modülün/kod yapısının kullanılması.
*   **Çıkarım (Logical Inference) [+10 Puan]**: Projedeki genel isimlendirme ve standartlardan yapılan mantıksal çıkarım.
*   **Belge/Yorum Satırı Kanıtı [+10 Puan]**: Kod içindeki javadoc veya dokümantasyon bilgileri.

---

## 2. Karar Eşiği Politikası (Decision Threshold)

Toplam güven puanı, ajanın bir sonraki adıma geçip geçmeyeceğini belirler:

| Ortalama Güven Puanı | Durum | Aksiyon (Action) |
| :--- | :--- | :--- |
| **%80 ve üzeri** | **YÜKSEK GÜVEN** | Karar eşiği geçilmiştir. Kullanıcıyı gereksiz sorularla yormadan doğrudan planlama ve kodlama fazına geç. |
| **%70 - %79 arası** | **ORTA GÜVEN** | Kanıt motorunu (`core/decision/evidence.md`) tekrar çalıştırarak ek kanıt ara. Puanı yükseltmeye çalış. |
| **%70'in altı** | **DÜŞÜK GÜVEN** | Karar eşiğinin altında kalınmıştır. Akıllı Soru Motorunu (`core/decision/question-engine.md`) tetikle ve kullanıcıdan netleştirme iste. |

*   **Önemli Kural**: Ajan, güven seviyesi %70'in altında olan kritik bir varsayımla kodlama yapmaya kalkışamaz. Bu durumda `runtime/events.md` üzerinden `OnConfidenceLow` olayı tetiklenir.

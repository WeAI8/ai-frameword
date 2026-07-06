# Güven Skoru Metrikleri (Confidence Score Metrics)

Güven Skoru Metriği, ajanın çalışma öncesindeki varsayımlarının doğruluğunu ve kanıt gücünü ölçerek karar eşiğinin aşılıp aşılmadığını aktif olarak denetler.

---

## 1. Güven Skoru Aritmetik Hesaplama Formülü

Görev genelindeki toplam güven skoru ($C_{total}$) şu şekilde hesaplanır:

$$C_{total} = \frac{\sum (Varsayim\_Puani \times Kanit\_Agirligi)}{Toplam\_Varsayim\_Sayisi}$$

*   **Kanıt Ağırlığı (Evidence Weight)**:
    *   Doğrudan kod kanıtı varsa = `1.0`
    *   Benzerlik/Çıkarım kanıtı varsa = `0.6`
    *   Bilinmeyen/Tahmin = `0.0`

---

## 2. Aktif Karar Tetikleyicileri (Runtime Triggers)

*   **Tetikleyici: [Ortalama Güven Skoru < %70]**:
    *   *Aksiyon*: `OnConfidenceLow` olayı tetiklenir.
    *   *Runtime Kararı*:
        1.  Çalışma zamanı (Runtime) derhal duraklatılır (Suspended).
        2.  Ajanın durumu `Analyzing` aşamasına geri çekilir.
        3.  Akıllı Soru Motoru (`question-engine.md`) devreye alınarak kullanıcıya sadece belirsiz olan alan için soru hazırlanır ve cevap alınana kadar döngü askıda tutulur.

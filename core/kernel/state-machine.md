# Ajan Durum Makinesi (Agent State Machine)

Ajan, çalışma zamanı boyunca hangi aşamada (state) olduğunu bilmek ve bu duruma uygun kuralları işletmek zorundadır. Durum geçişleri doğrulanmadan bir sonraki duruma geçilemez.

---

## 1. Durumlar ve Tanımları (States)

| Durum (State) | Açıklama | Geçiş Kriteri (Transition Criterion) |
| :--- | :--- | :--- |
| **Discovering** | Codebase'i ve ilişkili dosyaları keşfetme aşaması. | İlgili dosyaların listesi çıkarıldığında. |
| **Analyzing** | Gereksinim genişletme ve kanıt toplama aşaması. | Güven puanı hesaplandığında ve açık sorular netleştiğinde. |
| **Planning** | Teknik Uygulama Planı (`implementation_plan.md`) hazırlama aşaması. | Plan taslağı tamamlandığında. |
| **Waiting Approval**| Kullanıcının planı onaylamasını bekleme aşaması. | Kullanıcıdan yazılı "onay" veya "başlat" komutu alındığında. |
| **Implementing** | Kaynak kod dosyalarını değiştirme/oluşturma aşaması. | Planlanan kod değişiklikleri tamamlandığında. |
| **Reviewing** | Kodlama sonrası denetim ve birim test aşaması. | Testler geçip, kalite metrikleri doğrulandığında. |
| **Done** | Görevin başarıyla tamamlanma aşaması. | Çıktı sözleşmesine uygun nihai rapor sunulduğunda. |

---

## 2. Durum Geçiş Akışı ve Kuralları

Durumlar sadece ileri yönde değil, hata veya başarısızlık durumunda geri yönde de hareket edebilir:

```text
[Discovering] ──> [Analyzing] ──> [Planning] ──> [Waiting Approval]
                                                          │
   [Done] <── [Reviewing] <── [Implementing] <────────────┘
                 │
                 └──(Test Hatası / Kalite Düşüklüğü)──> [Implementing] (Geri Pas)
```

*   **Geçiş Kısıtı**: Ajan asla `Waiting Approval` durumunu atlayarak doğrudan `Implementing` durumuna geçemez. Bu durum projenin bütünlüğünü korumak için katı bir kuraldır.
*   **Geri Dönüş (Rollback)**: `Reviewing` aşamasında birim testlerin kalması veya mimari aşınma tespiti halinde durum otomatik olarak `Implementing` aşamasına geri döner ve `runtime/recovery.md` tetiklenir.

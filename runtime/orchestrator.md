# Runtime Orkestratörü (Orchestrator Engine)

Orchestrator, framework'ün karar alma ve uygulama akışını yöneten, döngüsel (iterative) süreçleri kontrol eden ve hatalarda geri alma (rollback) kararı veren **çalışma zamanı beynidir**.

---

## 1. Orkestrasyon Akışı (Execution Management)

Orkestratör, `core/kernel/thinking-pipeline.md` adımlarını ve `runtime/lifecycle.md` OODA (Observe-Orient-Decide-Act) döngüsünü koordine eder. Çalışma sırası şudur:

1.  **Observe (Gözlem)**: Proje durumunu ve girdiyi analiz et.
2.  **Orient (Konumlan)**: Kanıtları ve bağımlılıkları belirle.
3.  **Decide (Karar Al)**: Güven puanına göre teknik planı üret.
4.  **Act (Uygula)**: Kodu yaz ve test et.
5.  **Measure (Ölç)**: Metrik katmanını (`metrics/`) çalıştır.
6.  **Evaluate (Değerlendir)**: Sonuç başarılı ise tamamla, başarısız ise geri al (Rollback).

---

## 2. Geri Bildirim ve Rollback Yönetimi (Feedback Loops)

Orkestratör, **aktif metriklerden gelen girdilere göre** dinamik kararlar alır:

*   **Birim Test Başarısızlığı**: Eğer `metrics/quality.md` veya test çıktılarında başarısızlık tespit edilirse, `runtime/events.md` üzerinden `OnReflectionFailed` olayı fırlatılır. Orkestratör akışı durdurur, durumu `Implementing` aşamasına geri çeker (Rollback) ve `runtime/recovery.md` kurtarma motorunu çalıştırır.
*   **Mimari Aşınma Skoru < 80**: `metrics/architecture-score.md` 80'in altına düşerse, `OnArchitectureViolation` olayı tetiklenir. Orkestratör kod değişikliklerini geri alır ve planlama (`Planning`) durumuna geri döner.

---

## 3. İterasyon Limiti (Loop Guard)
*   Sonsuz kısırdöngüleri önlemek için orkestratör her geri paslama işleminde bir sayaç tutar.
*   Bir görev için maksimum geri paslama/düzeltme döngüsü **3**'tür.
*   3. denemeden sonra da metrikler başarısız kalırsa, orkestratör akışı keser (`runtime/events.md` -> `OnTaskComplete` hata ile tetiklenir) ve kontrolü kullanıcıya bırakır.

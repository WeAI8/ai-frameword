# Kalite Metrikleri ve Karar Tetikleyicileri (Quality Metrics)

Bu modül, kod kalitesini ölçer ve elde edilen sonuçlara göre çalışma zamanı (`runtime/`) akışını otomatik olarak yönlendirir veya durdurur (Active Metrics).

---

## 1. Kalite Metrik Sınırları

Kod kalitesi aşağıdaki katı eşiklere göre denetlenir:

*   **Birim Test Başarı Oranı (Test Pass Rate)**: `%100` olmalıdır. Tek bir test dahi başarısız olsa kod teslim edilemez.
*   **Derleme/Çalışma Hataları (Compile/Runtime Errors)**: `0` olmalıdır.
*   **Uyumsuz Kodlama Standardı (Lint/Style Violations)**: En fazla `0` kritik ihlal.

---

## 2. Aktif Çalışma Zamanı Tetikleyicileri (Runtime Triggers)

Metrik sonuçları sadece rapor edilmez, karar motorunu ve orkestratörü doğrudan tetikler:

*   **Tetikleyici 1: [Birim Test Hatası > 0]**:
    *   *Aksiyon*: `OnReflectionFailed` olayı fırlatılır.
    *   *Runtime Kararı*: Orkestratör (`runtime/orchestrator.md`) kod yazma (`Implementing`) aşamasına geri döner (Rollback) ve `runtime/recovery.md` (Self-Healing) modülünü çalıştırır.
*   **Tetikleyici 2: [Kritik Lint Hatası > 0]**:
    *   *Aksiyon*: Derleme aşaması bloke edilir ve kodun düzeltilmesi için hata logu Geliştiriciye paslanır.

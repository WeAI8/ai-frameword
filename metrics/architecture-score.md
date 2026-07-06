# Mimari Uyum Skoru (Architecture Score Metrics)

Mimari Uyum Skoru, yazılan kodun `core/architecture.md` ve `core/validation/architecture-drift.md` standartlarına ne kadar uyduğunu ölçer ve düşük skorlarda planı veya kodu iptal eder.

---

## 1. Mimari Skor Hesaplama Kuralları

Başlangıç skoru 100'dür ve her mimari ihlalde puan düşürülür:

*   **Katman Baypası (Layer Bypass)**: **[-30 Puan]** (Örn: Controller'ın doğrudan Repository çağırması).
*   **Entity Sızdırma (Data Leakage)**: **[-20 Puan]** (Örn: Entity sınıfının dış dünyaya dönülmesi).
*   **Dairesel Bağımlılık (Circular Import)**: **[-20 Puan]** (İki modülün birbirini dairesel çağırması).
*   **Tek Sorumluluk İhlali (SRP Violation)**: **[-10 Puan]** (Bir sınıfın/metodun birden çok iş yapması).

---

## 2. Aktif Karar Tetikleyicileri (Runtime Triggers)

*   **Tetikleyici: [Mimari Uyum Skoru < 80]**:
    *   *Aksiyon*: `OnArchitectureViolation` olayı tetiklenir.
    *   *Runtime Kararı*:
        1.  Orkestratör, yazılan kodları derhal geri alır (Rollback).
        2.  Ajanın durumunu planlama (`Planning`) aşamasına geri çeker.
        3.  Risk puanlama motorunda (`risk-scoring.md`) mimari riski **10 (Kritik)** seviyesine yükseltir.
        4.  Mimar ajanın (`Architect`) planı baştan düzeltmesini talep eder.

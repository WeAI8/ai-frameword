# Etkileşim ve Bağımlılık Modeli (core/kernel/interaction-model.md)

---

## 1. Amaç (Purpose)
Decision Runtime modüllerinin çalıştırma sırasını (Execution Order), veri akış yönlerini ve birbirleriyle olan iletişim sözleşmelerini (Contracts) tanımlamak.

---

## 2. Çalışma Sırası ve İş Akışı (Execution Order)

Ajan çalışma zamanı tetiklendiğinde işlemler sırasıyla aşağıdaki gibi akar:

```mermaid
sequenceDiagram
    participant User as Kullanıcı
    participant Boot as core/kernel/bootstrap
    participant Pipe as core/kernel/thinking-pipeline
    participant Evid as core/decision/evidence
    participant Conf as core/decision/confidence
    participant Plan as core/decision/planner
    participant Refl as core/validation/reflection
    participant Review as review/*
    
    User->>Boot: Görevi Tetikle (Request)
    Note over Boot: Sınıflandır, Bütçe Ayır, Modülleri Yükle
    Boot->>Pipe: Akışı Başlat (Start Pipeline)
    Note over Pipe: 10 Aşamalı Düşünme Hattı
    Pipe->>Evid: Kanıt Ara (Gather Evidence)
    Evid-->>Pipe: Kanıtları Listele
    Pipe->>Conf: Güven Puanla (Evaluate Confidence)
    alt Güven Skoru < %70
        Pipe->>User: Soru Sor (Question Engine)
        User-->>Pipe: Cevap Ver
    end
    Pipe->>Plan: Plan Üret (Create Plan)
    Plan-->>User: implementation_plan.md Sun (Wait Approval)
    User->>Plan: Onay Ver (Approve)
    Plan->>Refl: Öz-Yansıtma (Reflection Check)
    Note over Refl: Mantık ve Mimari Kayma Denetimi
    Refl->>User: Kodu Yaz & Çalıştır (Act)
    User->>Review: Kod Sonrası Denetim (Post-Code Review)
    Note over Review: Kalite, Güvenlik, Performans Testleri
    Review-->>User: Teslim Et (Done / Output Contract)
```

---

## 3. Modüller Arası Sözleşmeler (Contracts)

### A. Bootstrap -> Thinking Pipeline Sözleşmesi
*   *Girdi*: `TaskType` (Feature/Bug/Refactor) + `ContextBudgetLimits` (Max dosya: 5).
*   *Çıktı Kriteri*: Pipeline, belirtilen dosya limitlerini aşmadan aramaları sonlandırmalıdır.

### B. Evidence -> Confidence Sözleşmesi
*   *Girdi*: Kanıt Türleri ve Dosya Yolları.
*   *Çıktı Kriteri*: Güven motoru, toplanan her kanıta uygun ağırlığı (1.0 veya 0.6) atayarak formülü işletmelidir.

### C. Planner -> Reflection Sözleşmesi
*   *Girdi*: Onaylanmış `implementation_plan.md` dosyası.
*   *Çıktı Kriteri*: Reflection motoru, plandaki her bir dosyayı kodlama öncesinde mimari açıdan doğrulamalıdır.

### D. Act (Developer) -> Reviewer Sözleşmesi
*   *Girdi*: Yazılan kaynak kodlar ve eklenen birim testler.
*   *Çıktı Kriteri*: Reviewer, kod standartları ve test başarı oranı (%100) kriterlerini denetlemelidir.

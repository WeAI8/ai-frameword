# AI Engineering Decision Framework (v1.2)

> **MİSYON VİZYONU**
> *The framework does not prescribe solutions. It prescribes a decision-making process. Every module exists to improve the quality, consistency, and architectural alignment of decisions before implementation.*
> *(Framework çözümler dikte etmez. Karar alma sürecini dikte eder. Her modül, kod yazımından önce kararların kalitesini, tutarlılığını ve mimari uyumunu artırmak için vardır.)*

---

## 1. Giriş ve Amaç

Bu framework (AI Engineering Platform/Decision Runtime), yapay zeka geliştirme ajanlarının (Antigravity, Cursor, Cline vb.) büyük ölçekli ve kurumsal projelerde rastgele kararlar almak yerine, kıdemli bir yazılım mimarı ve ürün analisti disipliniyle çalışmasını sağlayan modüler bir **karar alma ve çalıştırma altyapısıdır**.

Ajanın kod yazmadan önce kanıtlara dayanmasını, varsayımlarını puanlamasını, risk analizi yapmasını ve katmanlı mimari sınırlarını korumasını garanti altına alır.

---

## 2. Platform Mimarisi (Decision Runtime Architecture)

Sistem, yapay zeka ajanları için tasarlanmış bir karar çalışma zamanı (Decision Runtime) hiyerarşisine sahiptir:

```text
                                [ AGENTS.MD (Bootloader) ]
                                            │
                                            ▼
                                [ core/kernel/bootstrap ]
                                            │
         ┌──────────────────────────────────┼──────────────────────────────────┐
         ▼                                  ▼                                  ▼
   [ core/kernel/ ]                 [ core/decision/ ]                [ core/validation/ ]
  Durum & Düşünme                   Karar & Planlayıcı                Öz-Yansıtma & Koruma
   - state-machine                  - confidence                      - reflection
   - thinking-pipeline              - evidence                        - hallucination
                                    - planner                         - architecture-drift
                                    - question-engine
         │                                  │                                  │
         └──────────────────────────────────┼──────────────────────────────────┘
                                            ▼
                                   [ runtime/orchestrator ]
                                     OODA Yaşam Döngüsü
                                    - events & scheduler
                                    - recovery & rollback
```

### Katman Sorumlulukları:
*   **Kernel (`core/kernel/`)**: Önyükleme (bootstrap), ajan durum takibi (state-machine) ve 10 aşamalı sıralı düşünme hattını (thinking-pipeline) yönetir.
*   **Decision Engine (`core/decision/`)**: Karar eşiklerini (confidence), bellek destekli kanıt aramayı (evidence) ve planlama (planner) motorlarını yönetir.
*   **Validation Engine (`core/validation/`)**: Kodlama öncesinde içsel doğrulama (reflection), halüsinasyon süzme (hallucination) ve mimari aşınma kontrollerini (architecture-drift) işletir.
*   **Runtime Manager (`runtime/`)**: OODA Loop yaşam döngüsünü (lifecycle), olay yöneticisini (events) ve hata durumlarında otomatik düzeltme/geri alma (recovery/rollback) süreçlerini yönetir.
*   **Memory Manager (`memory/`)**: Kararları aktif sorgulayan ve zaman aşımına (Search -> Rank -> Retrieve -> Expire) uğratan bellek stratejisi.
*   **Metrics (`metrics/`)**: Raporlamanın ötesinde, kararları ve rollback döngülerini tetikleyen aktif metrikler (quality, complexity, architecture-score).
*   **Policies (`heuristics/`)**: Modüler bütçe ve kod yazım politikaları (simplicity, performance, refactoring).
*   **Drivers (`technology/`)**: Spring Boot, Oracle, React, Flutter gibi teknolojiye özel kurallar.
*   **Applications (`templates/` & `workflows/`)**: Çoklu ajan koordinasyonu, şablonlar ve iş akışları.

---

## 3. AI Editör Entegrasyonu (Quick Start)

Framework'ü kendi projelerinizde aktif hale getirmek için yapay zeka editörünüze (Cursor `.cursorrules`, Cline `.clinerules` veya Antigravity) şu talimatı vermeniz yeterlidir:

```text
Herhangi bir işlem yapmadan önce, projenin kök dizinindeki AGENTS.MD dosyasını oku ve oradaki Decision Runtime önyükleme (bootstrap) akışını sırasıyla işlet.
```

Ajan, `AGENTS.MD` dosyasını okuduğu anda `core/kernel/bootstrap.md` modülüne yönlenecek ve projenizin mimarisini korumaya başlayacaktır.

---

## 4. Yol Haritası (Roadmap)

*   **v1.1 (Tamamlandı)**: Decision Runtime çekirdeği, OODA yaşam döngüsü, olaylar ve planlayıcı motoru.
*   **v1.2 (Kararlı Sürüm)**: Modül standartlaştırma, etkileşim kontratları, `tests/` doğrulama süiti ve ürün dokümantasyonu.
*   **v1.3 (Adaptive Runtime)**: Kendi kararlarından öğrenebilen feedback ve self-optimization döngüleri.
*   **v2.0 (Distributed Agent)**: Event-Bus altyapılı, paralel çalışan çoklu ajan sistemi.
# Ajan Zamanlayıcı (Runtime Scheduler)

Zamanlayıcı (Scheduler), çoklu ajan (multi-agent) çalışma senaryolarında hangi ajanın ne zaman çalışacağını, hangi ajanın beklemede kalacağını ve görevlerin yürütülme önceliklerini yöneten kuyruk yöneticisidir.

---

## 1. Görev Önceliklendirme ve Ajan Kuyruğu (Task Queuing)

Çoklu ajan iş akışlarında ajanlar sırayla kuyruğa alınır ve scheduler tarafından tetiklenir:

```text
Girdi ──> [Analyst Queue] ──> [Architect Queue] ──> [Developer Queue] ──> [Reviewer Queue]
```

*   **Öncelik Kuralı (Execution Order)**:
    1.  *Yüksek Öncelik*: Kullanıcı kesintileri (User input / interrupts).
    2.  *Orta Öncelik*: Hata düzeltme ve geri bildirim döngüleri (Rollback/Recovery).
    3.  *Normal Öncelik*: Standart ileri akış görevleri (Analiz -> Geliştirme).

---

## 2. Kesinti ve Öncelik Devralma (Interrupt Priority)

Çalışma zamanında bir olay (Event) tetiklendiğinde scheduler ajanların önceliğini dinamik olarak değiştirir:

*   **OnConfidenceLow Tetiklendiğinde**:
    *   `Developer` ve `Architect` ajanlar askıya alınır (Suspended).
    *   `Analyst` ajan en yüksek önceliğe getirilir ve kullanıcıyla iletişime geçer.
*   **OnArchitectureViolation Tetiklendiğinde**:
    *   `Developer` ajanın yetkileri dondurulur.
    *   `Architect` ajan acil öncelikle (Emergency Priority) kuyruğa alınır ve mimariyi düzeltmek için planı revize eder.
*   **Paralel Görev Yönetimi**:
    *   Scheduler, bağımsız alt görevleri (`heuristics/multi-agent-rules.md` doğrultusunda) aynı anda paralel olarak farklı alt ajanlara dağıtabilir.

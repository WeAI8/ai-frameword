# Çerçeve Modülleri Defteri (Modules Registry)

Bu belge, **AI Engineering Decision Framework** içindeki modüllerin listesini, bunların bağımlılıklarını ve çalışma sırasındaki yüklenme önceliklerini tanımlar.

---

## 1. Modül Bağımlılık Haritası (Module Dependency Map)

Çalışma zamanında modüllerin yüklenme sırası bağımlılıklarına göre belirlenir:

| Modül Adı | Dizin/Dosya | Öncelik | Bağımlılıklar (Dependencies) |
| :--- | :--- | :---: | :--- |
| **bootstrap** | `core/kernel/bootstrap.md` | 1 | Yok |
| **state-machine** | `core/kernel/state-machine.md` | 1 | Yok |
| **thinking-pipeline** | `core/kernel/thinking-pipeline.md` | 2 | `state-machine` |
| **evidence** | `core/decision/evidence.md` | 2 | `memory/strategy` |
| **confidence** | `core/decision/confidence.md` | 3 | `evidence` |
| **question-engine** | `core/decision/question-engine.md` | 4 | `confidence` |
| **planner** | `core/decision/planner.md` | 5 | `evidence`, `confidence` |
| **reflection** | `core/validation/reflection.md` | 6 | `core/architecture.md` |
| **hallucination** | `core/validation/hallucination.md` | 2 | Yok |
| **architecture-drift**| `core/validation/architecture-drift.md`| 6 | `core/architecture.md` |

---

## 2. Bağımlılık Yönetimi Kuralları
*   Bir modül yüklenmeden önce, bağımlı olduğu tüm modüllerin başarıyla yüklendiği ve başlatıldığı doğrulanmalıdır.
*   Dairesel bağımlılıklar (Circular module dependencies) yasaktır. Yeni bir modül eklenirken dairesel döngü oluşturulmadığından emin olunmalıdır.

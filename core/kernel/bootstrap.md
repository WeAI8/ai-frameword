# Çekirdek Önyükleyici (core/kernel/bootstrap.md)

---

## 1. Amaç (Purpose)
AI çalışma zamanını (Decision Runtime) güvenli bir şekilde başlatmak, görev tipini sınıflandırmak, token bütçesini ayırmak ve ilgili bağımlı modülleri yüklemek.

---

## 2. Sorumluluklar (Responsibilities)
*   **Classifier**: Kullanıcı talebini analiz edip `capabilities.md` ile eşleştirmek.
*   **Context Budget**: `context-budget.md` sınırlarına göre token ve dosya limitlerini belirlemek.
*   **Loader**: Sadece görevle ilişkili iş akışlarını (`workflows/`) ve teknoloji paketlerini (`technology/`) yüklemek.
*   **Initializer**: Durum makinesini (`state-machine.md`) başlatıp düşünme işlem hattına (`thinking-pipeline.md`) yönlendirmek.

---

## 3. Girdiler (Inputs)
*   Kullanıcı talebi (Request String)
*   Codebase dizin yapısı
*   `core/registry/capabilities.md` kabiliyet listesi

---

## 4. Çıktılar (Outputs)
*   Görev Sınıflandırması (`Task Type`)
*   Bağlam Bütçesi Sınırları (`File Read Limits`)
*   Durum Geçiş Tetikleyicisi (`OnTaskStart` olayı)

---

## 5. Bağımlılıklar (Dependencies)
*   `core/registry/capabilities.md`
*   `heuristics/context-budget.md`
*   `core/kernel/state-machine.md`

---

## 6. Kurallar (Rules)
*   **Seçici Yükleme**: Görevle ilgisi bulunmayan teknoloji ve iş akışı dosyalarını asla yükleme (Token tasarrufu).
*   **Bütçe Zorunluluğu**: `context-budget.md` limitlerini aşan aramalara/okumalara izin verme.

---

## 7. Hata Durumları (Failure Cases)
*   *Tanımsız Görev Tipi*: Görev tipi kabiliyet listesinde bulunamazsa varsayılan genel geliştirme akışını (`Feature`) yükle.
*   *Bütçe Aşımı*: Token/Dosya limiti aşıldığında `OnTaskComplete` olayını hata durum koduyla tetikleyerek akışı durdur.

---

## 8. Örnekler (Examples)
*   *Girdi*: "Kullanıcı tablosuna yeni bir email alanı ekle"
*   *Sınıflandırma*: `Feature` (Yeni Özellik)
*   *Yüklenen Sürücüler*: `workflows/feature-analysis.md` (Diğerleri yüklenmedi).

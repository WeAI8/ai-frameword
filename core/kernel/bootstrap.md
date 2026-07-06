# Çekirdek Önyükleyici (core/kernel/bootstrap.md)

---

## 1. Amaç (Purpose)
AI çalışma zamanını (Decision Runtime) güvenli bir şekilde başlatmak, görev tipini sınıflandırmak, token bütçesini ayırmak ve ilgili bağımlı modülleri ile seçilen mimari yığınını (springboot-angular, django-react vb.) koşullu olarak yüklemek.

---

## 2. Sorumluluklar (Responsibilities)
*   **Classifier**: Kullanıcı talebini analiz edip `capabilities.md` ile eşleştirmek.
*   **Context Budget**: `context-budget.md` sınırlarına göre token ve dosya limitlerini belirlemek.
*   **Loader**: Sadece görevle ilişkili iş akışlarını (`workflows/`) ve `memory-bank/techContext.md` altındaki `selected_architecture` anahtarı ile eşleşen tek bir mimari yetenek paketini (`skills/arch-<selected>.md`) yüklemek. Diğer pasif mimarileri bellekten ve yükleme kuyruğundan kalıcı olarak elemektir.
*   **Initializer**: Durum makinesini (`state-machine.md`) başlatıp düşünme işlem hattına (`thinking-pipeline.md`) yönlendirmek.

---

## 3. Girdiler (Inputs)
*   Kullanıcı talebi (Request String)
*   `core/registry/capabilities.md` kabiliyet listesi
*   `memory-bank/techContext.md` altındaki `selected_architecture` konfigürasyonu.

---

## 4. Çıktılar (Outputs)
*   Görev Sınıflandırması (`Task Type`)
*   Koşullu olarak yüklenen tekil mimari yetenek paketi.
*   Bağlam Bütçesi Sınırları (`File Read Limits`)
*   Durum Geçiş Tetikleyicisi (`OnTaskStart` olayı)

---

## 5. Bağımlılıklar (Dependencies)
*   `core/registry/capabilities.md`
*   `heuristics/context-budget.md`
*   `core/kernel/state-machine.md`
*   `memory-bank/techContext.md`

---

## 6. Kurallar (Rules)
*   **Seçici Yükleme**: Görevle ilgisi bulunmayan teknoloji, iş akışı ve **seçilmeyen pasif mimari yetenek dosyalarını** asla yükleme (Token tasarrufu).
*   **Tekil Mimari Yükleme**: `selected_architecture` belirlendikten sonra sadece ilgili `skills/arch-<selected>.md` dosyası yüklenir. Diğer tüm mimari `.md` dosyalarının okunması önyükleme aşamasında tamamen engellenir.

---

## 7. Hata Durumları (Failure Cases)
*   *Tanımsız Görev Tipi*: Görev tipi kabiliyet listesinde bulunamazsa varsayılan genel geliştirme akışını (`Feature`) yükle.
*   *Tanımsız Mimari*: `selected_architecture` değeri boş veya geçersiz ise, hiçbir mimari yetenek dosyası yükleme; genel kodlama kılavuzunu yükle.

---

## 8. Örnekler (Examples)
*   *Girdi*: `selected_architecture: "springboot-angular"`
*   *Yüklenen Yetenek*: `skills/arch-springboot-angular.md` (Diğer `skills/arch-*.md` dosyaları yüklenmez ve elenir).

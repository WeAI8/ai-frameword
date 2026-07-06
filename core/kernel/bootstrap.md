# Çekirdek Önyükleyici (Core Bootstrapper)

> **MİSYON VİZYONU**
> *The framework does not prescribe solutions. It prescribes a decision-making process. Every module exists to improve the quality, consistency, and architectural alignment of decisions before implementation.*

---

## 1. Önyükleme Yaşam Döngüsü (Bootstrap Lifecycle)

Bootstrap, AI çalışma zamanı tetiklendiğinde ilk olarak devreye giren ve sistemi başlatan çekirdek Kernel modülüdür. Görevleri sırasıyla şunlardır:

```text
Girdi Alındı (Request)
         ↓
1. Sınıflandırıcı (Classifier) -> Görev tipini ve kabiliyetleri belirler.
         ↓
2. Bütçe Ayırıcı (Context Budget) -> Okunacak dosya ve arama sınırlarını çizer.
         ↓
3. Yükleyici (Loader) -> Sadece gerekli modülleri ve teknoloji paketlerini yükler.
         ↓
4. Başlatıcı (Initializer) -> Durum makinesini kurar ve Düşünme Pipeline'ını tetikler.
```

---

## 2. Alt Bileşen Delegasyon Sorumlulukları

### A. Classifier (Sınıflandırıcı)
*   Girdiyi analiz ederek görevin tipini tespit eder.
*   Görev tipini `core/registry/capabilities.md` kayıt defteri ile eşleştirir (Örn: `Feature`, `Bug`, `Review`).
*   Eğer görev tipi kayıtlı değilse, varsayılan bir genel geliştirme akışını tetikler.

### B. Context Budget (Bütçe Ayırıcı)
*   Projedeki token israfını önlemek için `heuristics/context-budget.md` politikalarına göre işlem yapar.
*   Maksimum okunacak dosya sayısı (Örn: en fazla 5 dosya) ve arama bütçesi limitlerini ayarlar.

### C. Loader (Yükleyici)
*   **Seçici Bağlam Yükleme (Selective Loading)** ilkesini uygular.
*   Görevin ilişkili olduğu teknoloji sürücülerini (`technology/`) ve iş akışını (`workflows/`) belleğe yükler.
*   İlişkisiz modülleri (Örn: Spring backend işinde Flutter paketini) kesinlikle yüklemez.

### D. Initializer (Başlatıcı)
*   Ajanın durum makinesini (`core/kernel/state-machine.md`) **"Discovering"** durumuna getirir.
*   Olay dinleyicilerini (`runtime/events.md`) tetikler ve `core/kernel/thinking-pipeline.md` işlem hattını çalıştırır.

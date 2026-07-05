# Hata Teşhis ve Giderme İş Akışı (Bug Investigation Workflow)

Bu belge, sistemde bir hata (bug) bildirildiğinde yapay zeka geliştiricisinin uyması gereken teşhis, analiz ve düzeltme sürecini tanımlar. Hataları kök nedenini analiz etmeden hızlıca yamamaya çalışmak (patching without investigation) yasaktır.

---

## 1. Giriş
Kullanıcı bir hata veya beklenmeyen davranış bildirdiğinde bu akış tetiklenir. Sürecin temel amacı; hatayı sadece susturmak değil, asıl kaynağını (root cause) bularak kalıcı ve yan etkisiz bir çözüm üretmektir.

---

## 2. Hata Çözüm Aşamaları

### Aşama 1: Hatayı Anlama ve Tekrar Üretme (Reproduce)
*   **Kural**: Hatayı tetikleyen adımları, girdi verilerini ve sistem durumunu analiz et.
*   **Uygulama**:
    *   Hangi kullanıcı rolünde, hangi sayfada veya hangi API çağrısında hata alınıyor?
    *   Hatanın oluştuğu andaki beklenen davranış (expected) ile gerçekleşen davranış (actual) arasındaki farkı tanımla.

### Aşama 2: Log ve Stack Trace Analizi
*   **Kural**: Hata loglarını ve stack trace çıktılarını detaylıca oku.
*   **Uygulama**:
    *   Exception (İstisna) sınıfını ve hata mesajını tespit et (örn: `NullPointerException`, `IndexOutOfBoundsException`).
    *   Hatanın fırlatıldığı kaynak dosya adını ve tam satır numarasını bul. O dosyayı açıp ilgili satırı ve çevresini incele.

### Aşama 3: Kök Neden Analizi (Root Cause Analysis)
*   **Kural**: Hatanın asıl ortaya çıkış sebebini bul ve bunu kanıtlarıyla açıkla.
*   **Uygulama**:
    *   Sorun veritabanındaki bozuk bir veriden mi, eksik null kontrolünden mi, yanlış bir mantıksal karşılaştırmadan mı yoksa concurrency (eşzamanlılık) probleminden mi kaynaklanıyor?
    *   Kök nedeni bulduğunda bunu kullanıcıya *"Hata X dosyasının Y satırında, Z koşulunun eksik null kontrolü içermesinden kaynaklanmaktadır"* şeklinde kanıtıyla raporla.

### Aşama 4: Minimal Düzeltme Tasarımı (Fix Strategy)
*   **Kural**: Çözüm planı oluştururken en minimal ve yan etkisiz düzeltmeyi tasarla.
*   **Uygulama**:
    *   `core/philosophy.md` altındaki "En Küçük Değişiklik" ilkesine bağlı kal.
    *   Düzeltmeyi yaparken yeni bir mimari yapı oluşturma, mevcut mimari kuralları (`core/architecture.md`) esnetme.

### Aşama 5: Regresyon Risk Kontrolü (Regression Check)
*   **Kural**: Yapılacak düzeltmenin sistemdeki diğer çalışan alanları kırma (regression) olasılığını değerlendir.
*   **Uygulama**:
    *   Değişecek olan sınıf veya fonksiyonu kullanan diğer bağımlı (dependent) sınıfları tara.
    *   Bu değişikliğin o bağımlılıklar üzerinde yan etki oluşturup oluşturmayacağını analiz et. Risk varsa alternatif çözümleri değerlendir.

### Aşama 6: Doğrulama ve Test (Validation & Test)
*   **Kural**: Değişikliği yaptıktan sonra hatanın giderildiğini doğrula.
*   **Uygulama**:
    *   Varsa projedeki birim testleri (unit tests) çalıştır ve hata düzeltildikten sonra hepsinin yeşil yandığını teyit et.
    *   Hatanın tekrar etmeyeceğini garanti altına almak için, hata senaryosunu kapsayan yeni bir birim test ekle.

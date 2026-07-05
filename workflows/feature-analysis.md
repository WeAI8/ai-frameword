# Yeni Özellik Geliştirme İş Akışı (Feature Analysis Workflow)

Bu belge, kullanıcı yeni bir özellik (feature request) talep ettiğinde yapay zeka geliştiricisinin uymakla yükümlü olduğu 13 aşamalı iş akışını (pipeline) tanımlar. Bu süreci işletmeden doğrudan kod yazmaya başlamak yasaktır.

---

## 1. Giriş ve Sınıflandırma
Kullanıcıdan gelen isteğin "Feature" (Yeni Özellik) kategorisine girdiği belirlendikten sonra bu akış başlatılır. AI, her aşamayı sırasıyla çalıştıracak ve aşama adlarını çıktı şablonunda belirtecektir.

---

## 2. Aşamalı İş Akışı (13 Aşamalı Pipeline)

### Aşama 1: Niyet Çıkarımı (Intent Extraction)
*   **Amaç**: Kullanıcının yazdığı ifadedeki kelimelere takılmadan, asıl hedeflenen iş gereksinimini anlamak.
*   **Kural**: İsteği analiz et, kullanıcının neyi başarmak istediğini çıkar.

### Aşama 2: Çevre Keşfi (Context Discovery)
*   **Amaç**: Kod tabanını tarayarak geliştirilecek özellikle ilgili mevcut dosyaları bulmak.
*   **Kural**: İlgili olabilecek DTO'ları, Controller'ları, Servisleri, Repository'leri, UI bileşenlerini, yönlendirme (routing) dosyalarını ve birim testlerini listele.

### Aşama 3: Mimari Doğrulama (Architecture Verification)
*   **Amaç**: Yapılacak çözümün projenin mimari sınırlarını koruduğundan emin olmak.
*   **Kural**: `core/architecture.md` belgesini oku. Benzer bir yapının projede zaten kurulu olup olmadığını kontrol et. Yeni bir katman veya standart dışı yapı önerme.

### Aşama 4: Niyet Genişletme (Intent Expansion)
*   **Amaç**: Kısa isteği detaylı bir Ürün Gereksinim Dokümanı (PRD) seviyesine çıkarmak.
*   **Kural**: Özelliği; **İş Hedefi (Business Goal)**, **Fonksiyonel Hedefler (Functional Goals)** ve **Beklenen Davranışlar (Expected Behaviour)** başlıkları altında genişlet.

### Aşama 5: Eksik Bilgi Tespiti (Missing Info Detection)
*   **Amaç**: Kullanıcının belirtmediği ama teknik olarak gerekli olan detayları saptamak.
*   **Kural**: Kullanıcıya sormadan önce, bu eksik bilgileri projenin mevcut kodlarından tahmin etmeye çalış.

### Aşama 6: Varsayım Üretimi (Assumption Generation)
*   **Amaç**: Eksik bilgileri gidermek için AI'ın yaptığı tahminleri yapılandırmak.
*   **Kural**: Her varsayım için:
    1.  *Gerekçe (Reason)*: Neden bu varsayımı yaptın?
    2.  *Kanıt (Evidence)*: Projede bunu destekleyen hangi dosya/kod var?
    3.  *Güven Puanı (Confidence Score)*: `%0` - `%100` arası bir oran belirle.

### Aşama 7: Risk Analizi (Risk Analysis)
*   **Amaç**: Değişikliğin sisteme getireceği potansiyel tehlikeleri listelemek.
*   **Kural**: Regresyon riski (çalışan yerlerin kırılması), performans riskleri, veritabanı kilitlenme/veri kaybı riskleri ve güvenlik açıklarını analiz et.

### Aşama 8: Kabul Kriterleri (Acceptance Criteria)
*   **Amaç**: Geliştirilecek özelliğin tamamlandığını kanıtlayacak test edilebilir kurallar üretmek.
*   **Kural**: Kabul kriterlerini **Given-When-Then** (Verilen-Nezaman-Ohalde) formatında yaz.

### Aşama 9: Uygulama Stratejisi (Implementation Strategy)
*   **Amaç**: Değişiklik yapılacak ve yeni oluşturulacak dosyaların planını sunmak.
*   **Kural**: Hangi dosyaların modifiye edileceğini (`[MODIFY]`), hangilerinin yeni oluşturulacağını (`[NEW]`) ve hangilerinin silineceğini (`[DELETE]`) listele.

### Aşama 10: Etki Analizi (Impact Analysis)
*   **Amaç**: Değişikliğin sistem genelindeki yan etkilerini belirlemek.
*   **Kural**: Veritabanı şeması, önbellek (caching) mekanizmaları, API dokümantasyonu, yetkilendirme (authorization) ve birim testler üzerindeki etkileri detaylandır.

### Aşama 11: Onay Mekanizması (Approval)
*   **Amaç**: Kodlamaya geçmeden önce kullanıcıdan onay almak.
*   **Kural**: Hazırladığın planı kullanıcıya sun. Güven seviyesi `%70` altındaki kritik soruları sor. Kullanıcı "Onaylıyorum" veya "Kod yazabilirsin" demeden kaynak kod dosyalarında asla değişiklik yapma.

### Aşama 12: Uygulama (Implementation)
*   **Amaç**: Kodlama sürecini çalıştırmak.
*   **Kural**: Sadece onaylanan plandaki dosyaları değiştir. `core/philosophy.md` altındaki "En Küçük Değişiklik" kuralına bağlı kal.

### Aşama 13: Öz-İnceleme (Self-Review)
*   **Amaç**: Yazılan kodu teslim etmeden önce kalite kontrolden geçirmek.
*   **Kural**: Derleme hatalarını kontrol et, birim testleri çalıştır. `workflows/code-review.md` yönergelerini kullanarak kodu mimari, performans ve temiz kod açısından kendi kendine incele.

# Mimari Koruyucu (Architecture Guardian)

Bu belge, yapay zeka geliştiricisinin projede çalışırken mevcut yazılım mimarisini koruması, mimari erozyonu (architectural drift) engellemesi ve sistem bütünlüğünü savunması için uyması gereken katı kısıtlamaları tanımlar.

---

## 1. Mimarinin Mutlak Doğruluğu Yasası
*   **Kural**: Projenin mevcut mimari yapısı, tasarım kalıpları ve klasör düzeni her zaman doğru kabul edilir. AI'ın görevi mevcut yapıyı sorgulamak, modernize etmek, yeniden tasarlamak (redesign) veya "daha iyi" hale getirmek değildir.
*   **Sorumluluk**: AI, projeye yeni bir kod eklerken, o kodun projede zaten var olan geliştiriciler tarafından yazılmış gibi görünmesini sağlamakla yükümlüdür (Indistinguishable Code).
*   **İstisna**: Sadece kullanıcı açıkça mimari bir refactoring veya modernizasyon talep ettiğinde bu kural esnetilebilir.

## 2. Katman Sınırlarının Korunması (Layering Boundaries)
Sistemdeki katmanların (örn: Sunum, İş Mantığı, Veri Erişim) sorumluluk alanları ve birbirleriyle iletişim yolları asla baypas edilmemelidir.
*   **Kural 1: Doğrudan Erişim Yasağı**: Üst katmanlar alt katmanlara sadece kendi altındaki aracı katman üzerinden erişmelidir.
    *   *Örnek*: Bir Spring projesinde Controller katmanı doğrudan Repository/DAO katmanını çağıramaz; aradaki Service katmanını kullanmak zorundadır.
*   **Kural 2: Bağımlılık Yönü**: Bağımlılıklar her zaman dıştan içe (veya üstten alta) doğru olmalıdır. Alt katmanlar üst katmanlardaki sınıflara bağımlı olmamalıdır.
*   **Kural 3: Veri Modellerinin Sınırları**: Veritabanı varlıkları (Entities) doğrudan UI/Sunum katmanına gönderilmemelidir. Projenin standardında DTO (Data Transfer Object) kullanımı varsa, katmanlar arası veri transferinde DTO kullanımı zorunludur.

## 3. Soyutlama Kısıtlamaları (Abstraction Limits)
Aşırı soyutlama (over-abstraction), kodun okunabilirliğini ve bakımını zorlaştırır.
*   **Kural 1**: Projede halihazırda uygulanmayan yeni interface'ler, abstract sınıflar veya generic yapılar oluşturma.
*   **Kural 2**: Sadece tek bir implementasyonu olacak sınıflar için, projede böyle bir standart yoksa, zoraki interface tasarlama. Mevcut sınıfların genişletilmesi yeterliyse yeni abstraksiyonlar ekleme.

## 4. Harici Bağımlılık Kısıtları (Dependency Control)
Projenin bağımlılık yönetim dosyalarına (`pom.xml`, `package.json`, `build.gradle` vb.) müdahale etmek yüksek risk taşır.
*   **Kural 1**: Kullanıcı tarafından açıkça talep edilmedikçe projeye asla yeni bir harici kütüphane (library), paket veya plugin ekleme.
*   **Kural 2**: Projede zaten var olan kütüphanelerin (örn: Apache Commons, Lombok, Guava vb.) yeteneklerini araştır. Bir problemi çözmek için yeni bir kütüphane eklemek yerine, projedeki mevcut kütüphanelerin sunduğu araçları kullan.
*   **Kural 3**: Bağımlılıkların versiyonlarını güncelleme veya değiştirme. Bu durum build/derleme hatalarına ve sürüm uyumsuzluklarına yol açabilir.

# Roman Okusana - Otomatik Roman Tarayıcı ve İstek Listesi Özellik Analiz Raporu

Bu analiz raporu `workflows/feature-analysis.md` iş akışı yönergelerine göre hazırlanmıştır ve projeye eklenen yeni otomatik tarayıcı, metin temizleme ve admin istek listesi gereksinimlerini analiz etmektedir.

---

## 1. Talep Analizi ve Niyet Genişletme (Intent Expansion)

* **Kullanıcı İsteği**: İnternetten otomatik olarak hikayeleri/bölümleri bulup her 5-10 dakikada bir siteye ekleyen bir tarayıcı (crawler). Ana sayfada "Eklenen Bölümler" kısmı (eklenme zamanı, kaçıncı bölüm, hangi roman bilgileriyle) olacak. Admin panelinden istek listesine (wishlist) roman adı eklendiğinde sistem bu romanı internette arayıp bölümlerini sırayla ekleyecek. Eklenen bölümlerdeki reklamlar ve anlamsız işaretler temizlenecektir.
* **İş Hedefi (Business Goal)**: Sitenin içerik zenginliğini artırmak için adminin manuel olarak bölüm ekleme yükünü azaltmak ve süreci otomatikleştirmek. Okurların siteye yeni eklenen bölümlerden hızlıca haberdar olmasını sağlamak.
* **Kullanıcı Hikayeleri (User Stories)**:
  * *Okuyucu Olarak*: Sitede son eklenen bölümlerin listesini ana sayfada görmek ve güncel bölümlere reklamlar/anlamsız semboller olmadan temiz bir arayüzle hızlıca ulaşmak istiyorum.
  * *Admin Olarak*: İstediğim bir romanın adını sisteme girip, sistemin bu romanı internetten otomatik bularak tüm bölümlerini kendi kendine sisteme kaydetmesini izlemek istiyorum.

---

## 2. Çevre Keşfi ve Bulgu Listesi (Context & Discovery)

* **Workspace Durumu**: Çalışan Spring Boot backend (port 8080) ve Angular frontend (port 4200) mevcuttur. Yerel PostgreSQL veritabanımız `romanokusana` adıyla aktiftir.
* **Kullanılabilir Teknolojiler**:
  * Spring'in yerleşik zamanlayıcısı `@Scheduled` arka plan görevlerini tetiklemek için kullanılacaktır.
  * Jsoup kütüphanesi HTML parse etmek için Maven'a eklenecektir.
  * Saf Java Regex (`java.util.regex`) metinlerdeki reklam satırlarını ve garip karakterleri temizlemek için kullanılacaktır.

---

## 3. Varsayımlar ve Güven Seviyeleri (Assumptions & Confidence)

1. **Varsayım**: Jsoup ile roman araması yaparken, açık kaynak kodlu ve stabil yapıya sahip popüler web kütüphaneleri veya arama motoru sonuçları üzerinden gidilecektir.
   * *Gerekçe*: Her roman sitesinin HTML yapısı farklıdır, bu yüzden jenerik bir HTML içerik çıkarıcı (Heuristic Extraction) geliştirmek ve bilinen bir arşivi hedeflemek en kararlı yoldur.
   * *Güven Puanı*: %85
2. **Varsayım**: Metin temizleme işlemi, sık karşılaşılan reklam cümlelerini ("read at...", "this chapter is update by...", "reklam", vb.) ve HTML taglerini kapsayan jenerik regex filtreleri ile yapılacaktır.
   * *Gerekçe*: Botların veya diğer sitelerin yerleştirdiği standart reklam etiketlerini yakalamak için en kararlı yöntemdir.
   * *Güven Puanı*: %90

---

## 4. Risk Analizi ve Kısıtlar (Risk Analysis)

* **Engellenme Riski (Cloudflare / IP Ban)**: Roman siteleri crawler botları engelleyebilir (özellikle Cloudflare koruması olanlar).
  * *Çözüm*: Tarayıcı isteklerinde gerçekçi User-Agent header bilgileri kullanılacaktır. Ayrıca istekler arasına kısa gecikmeler (delay) eklenecektir.
* **Hatalı/Kırık İçerik Riski**: Sitenin HTML yapısının değişmesi durumunda tarayıcı boş içerik çekebilir.
  * *Çözüm*: Boş veya çok kısa içerik çekildiğinde tarama işlemi `FAILED` durumuna getirilecek, veritabanına eksik veri yazılmayacaktır.
* **Veritabanı Şişme Riski**: Binlerce bölümün çok hızlı eklenmesi veritabanı boyutunu büyütebilir.
  * *Çözüm*: Tarama işlemleri sırayla ve kontrollü yapılacak, bölümler sıkıştırılmadan standart metin olarak saklanacaktır.

---

## 5. Kabul Kriterleri (Acceptance Criteria)

* **Senaryo 1: Admin Roman İsteği Girer**
  * *Given (Verilen)*: Admin panelindedir.
  * *When (Nezaman)*: "Solo Leveling" adını arama listesine ekler.
  * *Then (Ohalde)*: İstek tablosunda durum `PENDING` olarak listelenir.
* **Senaryo 2: Arka Plan Tarayıcısı Tetiklenir**
  * *Given (Verilen)*: Sistem saati zamanlayıcıyı tetikler (5-10 dk aralığında).
  * *When (Nezaman)*: Sistem sıradaki `PENDING` romanı alır, durumunu `SCRAPING` yapar ve aramayı başlatır.
  * *Then (Ohalde)*: Romanı bulduğunda önce `Novel` kartını oluşturur, ardından bölümleri sırayla (`Bölüm 1`, `Bölüm 2`...) temizleyerek veritabanına kaydeder. İşlem bittiğinde istek durumu `COMPLETED` olur.
* **Senaryo 3: Ana Sayfada Son Eklenenler**
  * *Given (Verilen)*: Tarayıcı 3 yeni bölüm eklemiştir.
  * *When (Nezaman)*: Okuyucu ana sayfayı açar.
  * *Then (Ohalde)*: Sayfanın üst/sağ kısmındaki "Son Eklenen Bölümler" listesinde bu 3 bölümü, hangi kitaba ait olduklarını ve kaç dakika önce eklendiklerini görür.

---

## 6. Açık Sorular (Open Questions)

> [!IMPORTANT]
> 1. **Hedef Kaynaklar**: Tarayıcının varsayılan olarak taramasını istediğiniz belirli bir Türkçe veya İngilizce roman sitesi var mı?
> 2. **Sembol Temizleme Detayları**: Temizlenmesini istediğiniz özel reklam şablonları veya anlamsız karakterler (örn: `[çevirmen notu]`, `###`, `---` gibi) mevcut mu?

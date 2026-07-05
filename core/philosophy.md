# Mühendislik Felsefesi (Engineering Philosophy)

Bu belge, yapay zeka geliştiricisinin projede çalışırken uymakla yükümlü olduğu temel ve değişmez mühendislik ilkelerini tanımlar. Bu ilkeler tüm diller, frameworkler ve araçlar için geçerlidir.

---

## 1. Uygulamadan Önce Anla (Understand Before Implementing)
*   **İlke**: Kod yazmak, çözüm sürecinin sadece son %20'lik kısmıdır. Geri kalan %80'lik kısım anlama, analiz ve planlama ile geçmelidir.
*   **Kural**: Kullanıcıdan gelen isteği alır almaz asla doğrudan dosya düzenlemeye veya kod yazmaya başlama. Önce isteğin arka planındaki iş hedefini ve teknik gereksinimleri tam olarak anladığından emin ol.
*   **Uygulama**: Herhangi bir kod değişikliği yapmadan önce "Bu değişiklik neden yapılıyor?" ve "Sistemde neyi etkileyecek?" sorularına net cevaplar ver.

## 2. Varsayımlar Yerine Kanıtlara Dayan (Evidence Over Assumptions)
*   **İlke**: Mühendislik kanıta dayalı bir disiplindir. Tahminler veya varsayımlar hataya yol açar.
*   **Kural**: "Bu projede muhtemelen X kütüphanesi kullanılıyordur" veya "Y fonksiyonu kesin şöyle çalışıyordur" gibi varsayımlarla hareket etme. Dosya yapısını, veritabanı şemalarını veya mevcut kodları tarayarak kanıt ara.
*   **Uygulama**: Bir kuralı veya yöntemi uygulamadan önce, kod tabanında (codebase) buna benzer çalışan en az bir örnek bul ve kanıt olarak referans al.

## 3. Hız Yerine Mimari Tutarlılık (Architecture Over Speed)
*   **İlke**: Projenin uzun vadeli sürdürülebilirliği, kısa vadeli teslimat hızından daha önemlidir.
*   **Kural**: Özelliği en hızlı şekilde yazıp bitirmek için projenin genel mimari yapısını, katman sınırlarını (layering) veya kod yazım standartlarını bozma.
*   **Uygulama**: Yazdığın kodun projedeki mevcut mimari desenlere (design patterns) ve tasarım kurallarına tam olarak uyduğundan emin ol.

## 4. Yeniden Yazmak Yerine Yeniden Kullan (Reuse Over Rewrite)
*   **İlke**: En iyi kod, yazılması gerekmeyen koddur. Tekrar eden kod yazmak (duplication) bakımı zorlaştırır.
*   **Kural**: Yeni bir fonksiyon, servis, API veya yardımcı sınıf (utility class) yazmadan önce, projede bunun bir benzerinin olup olmadığını detaylıca tara. Varsa onu yeniden kullan veya genişlet.
*   **Uygulama**: DRY (Don't Repeat Yourself) prensibine katı bir şekilde uyun. Mevcut bileşenleri baypas edip sıfırdan aynı işi yapan yeni kodlar ekleme.

## 5. Teknik Gösteriş Yerine İş Değeri (Business Value First)
*   **İlke**: Yazılım, iş problemlerini çözmek için bir araçtır. Aşırı mühendislik (over-engineering) maliyet oluşturur.
*   **Kural**: Teknik olarak "şık" veya karmaşık görünen ama iş hedefine ekstra katkı sağlamayan aşırı soyutlamalardan, karmaşık yapılardan kaçın.
*   **Uygulama**: İş hedefine en doğrudan, en sade ve en güvenli şekilde ulaşan minimal çözümü tercih et.

## 6. En Küçük Değişiklik Prensibi (Minimal Changes)
*   **İlke**: Kod tabanına yapılan her müdahale bir regresyon (hata) riski taşır. Değişiklik kapsamı ne kadar küçükse risk o kadar azdır.
*   **Kural**: Sadece senden istenen özellikle veya düzeltmeyle doğrudan alakalı olan dosyaları değiştir. İlgisiz dosyaları temizleme, formatlama veya fırsatçı refactoring (opportunistic refactoring) yapma.
*   **Uygulama**: Git diff çıktısında sadece hedeflenen özelliğin çalışması için kritik olan satırların yer almasını sağla.

# Kod İnceleme İş Akışı (Code Review Workflow)

Bu belge, geliştirilen veya incelenen kodların teslim edilmeden (merge edilmeden) önce geçmesi gereken kalite standartlarını ve kontrol listelerini (checklists) tanımlar.

---

## 1. Giriş
Yapay zeka asistanı, yazdığı kodu teslim etmeden önce veya kullanıcının incelemesini istediği kod tabanlarında bu kontrol listesini adım adım çalıştırmakla yükümlüdür.

---

## 2. Kod İnceleme Kontrol Listeleri (Checklists)

### A. Mimari Uygunluk (Architecture Review)
*   [ ] Kod, `core/architecture.md` altında tanımlanan katmanlama kurallarına uyuyor mu? (Örn: Controller -> Service -> Repository sınırları ihlal edilmiş mi?)
*   [ ] Projede zaten var olan servisler veya sınıflar baypas edilip mükerrer kod (duplication) yazılmış mı?
*   [ ] Gereksiz veya standart dışı yeni klasör/dosya yapısı oluşturulmuş mu?
*   [ ] Yeni ve izinsiz bir harici kütüphane bağımlılığı eklenmiş mi?

### B. Güvenlik (Security Review)
*   [ ] UI veya API katmanından gelen tüm girdiler (inputs) doğrulama (validation) işleminden geçiyor mu?
*   [ ] Veritabanı sorgularında dinamik string birleştirme yapılarak SQL Injection riski oluşturulmuş mu? (Bind variables/Prepared statements kullanılmış mı?)
*   [ ] Hassas veriler (şifreler, tokenlar vb.) log dosyalarına veya hata mesajlarına düz metin (plain text) olarak yazdırılmış mı?
*   [ ] CORS, CSRF veya XSS gibi yaygın güvenlik açıkları için gerekli kontroller yapılmış mı?

### C. Performans (Performance Review)
*   [ ] Veritabanı işlemlerinde N+1 sorgu problemi tetikleniyor mu? (Gereksiz döngü içinde veritabanı sorgusu yapılmış mı?)
*   [ ] Bellekte (memory) gereksiz büyük nesneler oluşturuluyor mu? Garbage Collector'a yük getirecek döngü içi nesne üretimlerinden kaçınılmış mı?
*   [ ] Büyük veri listelerinde sayfalama (pagination) kullanılmış mı?
*   [ ] Önbellek (caching) mekanizması kullanılması gereken yerler baypas edilmiş mi?

### D. Okunabilirlik, İsimlendirme ve Temiz Kod (Clean Code)
*   [ ] Sınıf, metot ve değişken isimleri projenin genel isimlendirme standartlarına uygun mu? (İsimler anlamlı ve açıklayıcı mı?)
*   [ ] Metotlar tek bir iş yapacak şekilde tasarlanmış mı? (Single Responsibility Principle)
*   [ ] Kod içinde gereksiz "nasıl çalıştığını" anlatan yorum satırları var mı? (Kod kendini açıklamalıdır; sadece "neden" açık olmayan durumlarda yorum eklenmelidir.)
*   [ ] Kullanılmayan değişkenler, importlar veya ölü kodlar (dead code) temizlenmiş mi?

### E. Test Edilebilirlik ve Doğrulama (Testability)
*   [ ] Yeni eklenen mantıksal yollar (business logic branches) birim test ile test edilmiş mi?
*   [ ] Kod, harici sistemlere bağımlı olmadan mock kütüphaneleriyle kolayca test edilebilecek şekilde tasarlanmış mı? (Bağımlılık enjeksiyonu doğru kullanılmış mı?)

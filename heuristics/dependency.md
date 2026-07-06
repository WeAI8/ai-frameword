# Bağımlılık ve Paket Politikası (Dependency Heuristics)

Bu politika, projeye fuzuli kütüphane ve paket eklenmesini engeller, güvenlik ve sürüm uyumluluğunu korur.

---

## 1. Fuzuli Paket Ekleme Yasağı (No Unnecessary Packages)
*   **Kural**: Dille birlikte gelen standart API'lerin (Örn: Java standart kütüphaneleri, Vanilla JS yerleşik fonksiyonları) kolayca yapabildiği işler için asla yeni bir üçüncü parti paket (npm/maven bağımlılığı) ekleme.
    *   *Kötü Örnek*: Basit bir tarih biçimlendirme veya dizi sıralama için `lodash` veya `moment.js` eklemek.
*   **Sezgi**: Eklenen her kütüphane projenin bundle boyutunu büyütür, güvenlik açığı (vulnerability) riskini ve bakım maliyetini artırır.

---

## 2. Bağımlılık Doğrulama ve Güvenlik
*   Eğer yeni bir paket eklenmesi **kesinlikle zorunlu** ise:
    1.  Paketin stabil, topluluk tarafından desteklenen ve aktif güncellenen bir sürüm olduğundan emin ol.
    2.  Kullanıcının mevcut bağımlılık yöneticisi dosyalarındaki (Örn: `package.json`, `pom.xml`) versiyon çakışmalarını kontrol et.
    3.  Paketi eklemeden önce planlama (`Planning`) aşamasında kullanıcıya gerekçesiyle birlikte bildir.

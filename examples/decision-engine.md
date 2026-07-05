# Karar Verme Motoru Uygulama Örneği (Decision Engine Example)

Bu belge, `core/decision-engine.md` altındaki "Çözüm Seçim Hiyerarşisi" kurallarının teknik bir karar aşamasında nasıl uygulanacağını gösterir.

---

## 1. Senaryo
Kullanıcı, sisteme yeni eklenen siparişlerin (orders) veritabanına kaydedilmeden önce toplam tutarının para birimi (currency) bazında formatlanarak loglanmasını talep ediyor.

---

## 2. Karar Ağacı Adımlarının İşletilmesi

### Adım 1: Mevcut İmplementasyon Sorgusu (Reuse)
*   **Soru**: Projede daha önce para birimi formatlama işlemi yapılmış mı?
*   **Arama**: AI codebase içinde "format", "currency", "money" kelimelerini aratır.
*   **Bulgu**: `src/utils/CurrencyFormatter.java` adında bir sınıf ve içinde `public static String formatToTL(BigDecimal amount)` metodu bulunuyor.
*   **Karar**: Birebir formatlama işlemi zaten var. Sıfırdan formatlama kodu yazma; bu hazır sınıfı ve metodu enjekte et/çağır.

### Adım 2: Benzer İmplementasyon Sorgusu (Adapt)
*(Eğer yukarıdaki adımda TL formatlayıcı olmasaydı ama Dolar formatlayıcı olsaydı bu adım çalışacaktı)*
*   **Soru**: Para birimi formatlayan benzer bir sınıf var mı?
*   **Bulgu**: `formatToUSD(BigDecimal amount)` metodu var ama `formatToTL` yok.
*   **Karar**: `formatToUSD` metodunun yapısını (taklit ederek) kopyala, TL sembolü ve kuralları ile `formatToTL` metodunu aynı dosyaya ekle (Imitation over innovation).

### Adım 3: Proje Standartları Sorgusu (Consistency)
*(Eğer formatlama ile ilgili hiçbir sınıf bulunamasaydı bu adım çalışacaktı)*
*   **Soru**: Projede genel utility (yardımcı) sınıfları nerede tutuluyor ve nasıl isimlendiriliyor?
*   **Bulgu**: Tüm yardımcı sınıflar `src/utils/` klasöründe, `CamelCase` isimlendirme ile ve static metotlar olarak tanımlanmış.
*   **Karar**: `src/utils/` dizini altında `MoneyUtils.java` adında yeni bir static sınıf oluştur ve projedeki diğer yardımcı sınıfların kod yazım tarzını taklit et.

---

## 3. İyi ve Kötü Karar Karşılaştırması

### ❌ Kötü Karar (Hiyerarşiyi Baypas Etme)
Geliştirici, projeyi taramadan doğrudan sipariş servisi (`OrderService`) içine kendi formatlama kodunu yazıyor:

```java
public void saveOrder(Order order) {
    // Kötü: Mevcut CurrencyFormatter sınıfı varken buraya özel format mantığı yazıyor
    DecimalFormat df = new DecimalFormat("#,##0.00");
    String formatted = df.format(order.getTotalAmount()) + " TL";
    log.info("Sipariş kaydediliyor. Tutar: " + formatted);
    
    orderRepository.save(order);
}
```

*Neden Kötü?*: Kod tekrarına (code duplication) yol açtı. İleride para birimi formatı değiştiğinde (örn: TL sembolü başa alınacaksa) bu kod gözden kaçacak ve sistemde tutarsızlık oluşacaktır.

###  İyi Karar (Hiyerarşiye Uygun Çözüm)
Geliştirici, hiyerarşiyi izleyerek mevcut `CurrencyFormatter` sınıfını kullanıyor:

```java
import src.utils.CurrencyFormatter;

public void saveOrder(Order order) {
    // İyi: Mevcut ortak sınıf yeniden kullanıldı
    String formatted = CurrencyFormatter.formatToTL(order.getTotalAmount());
    log.info("Sipariş kaydediliyor. Tutar: " + formatted);
    
    orderRepository.save(order);
}
```

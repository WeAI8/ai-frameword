# Düşünme Modeli Uygulama Örneği (Thinking Example)

Bu belge, `core/thinking.md` altındaki "Niyet Genişletme (Intent Expansion)", "Varsayım Motoru" ve "Güven Puanı bazlı akıllı soru sorma" süreçlerinin somut bir örnek üzerinden nasıl yürütüleceğini gösterir.

---

## 1. Kullanıcı İsteği
> *"Kart'a tıklandığında detay sayfasına git"*

---

## 2. AI'ın Bilişsel Süreci (Arka Planda Çalışan Adımlar)

### Adım 1: Çevre Keşfi (Context Discovery)
AI projeyi tarar ve şu bulguları elde eder:
*   `src/components/ProductCard.jsx` dosyası mevcut. Kart bileşeni burada.
*   `src/routes.js` dosyası mevcut. İçinde `/product/:id` rotası tanımlanmış ve `ProductDetailPage.jsx` sayfasına yönlendiriyor.
*   Ancak, detay sayfası açılırken verilerin bir API'den mi yoksa yerel state'den mi çekileceğine dair projede iki farklı yöntem kullanılmış.

### Adım 2: Niyet Genişletme (Intent Expansion)
AI, kısa isteği şu teknik gereksinimlere çevirir:
*   `ProductCard` bileşeni tıklanabilir olmalı (onClick eklenecek).
*   Kartın temsil ettiği ürünün `id` bilgisi alınacak.
*   React Router kullanılarak kullanıcı `/product/:id` sayfasına yönlendirilecek.
*   Yönlendirme sırasında loading (yükleniyor) animasyonu gösterilecek.

### Adım 3: Varsayımlar ve Güven Puanları (Assumptions & Confidence)
1.  **Varsayım**: Yönlendirme için mevcut `/product/:id` rotası kullanılacak.
    *   *Kanıt*: `src/routes.js` dosyasında bu rota tanımlı.
    *   *Güven Puanı*: `%95`
2.  **Varsayım**: Ürün detay verisi `/api/products/:id` endpoint'inden çekilecek.
    *   *Gerekçe*: Diğer servislerde (örn: `categoryService`) API entegrasyonu kullanılmış.
    *   *Güven Puanı*: `%85`
3.  **Varsayım**: Kart tıklandığında yeni bir sekme (tab) yerine aynı sekmede yönlendirme yapılacak.
    *   *Gerekçe*: Projenin genel kullanıcı deneyimi (UX) akışı aynı sekmede yönlendirme şeklinde kurgulanmış.
    *   *Güven Puanı*: `%90`
4.  **Varsayım**: Yetkisiz (misafir) kullanıcılar da detay sayfasını görebilecek.
    *   *Gerekçe*: Projede genel bir yetki kontrol şeması var ama detay sayfası için özel bir kısıtlama belirtilmemiş.
    *   *Güven Puanı*: `%55` (Kritik belirsizlik)

---

## 3. Kullanıcıya Sunulan Analiz ve Soru
AI, güven puanı `%70` altındaki tek belirsizliği (yetki kuralı) kullanıcıya soru olarak yöneltir. Güven seviyesi yüksek olan varsayımları ise doğrudan planına dahil eder.

### Çıktı:
> **Analiz Raporu**:
> "Kart tıklama yönlendirmesi için projede tanımlı olan `/product/:id` rotasını ve `ProductCard` bileşenini kullanacağız. Yönlendirme aynı sekmede React Router ile yapılacaktır.
> 
> **Açık Soru**:
> *   Ürün detay sayfasını görmek için kullanıcının oturum açmış (login) olması gerekiyor mu, yoksa misafir kullanıcılar da bu sayfaya erişebilmeli mi? (Güven Puanı: %55 - Projede her iki kullanım da mevcut)."

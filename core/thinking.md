# Düşünme ve Analiz Modeli (Thinking Model)

Bu belge, yapay zeka geliştiricisinin bir istek aldığında izleyeceği bilişsel aşamaları, analiz yöntemlerini ve kullanıcı ile iletişim kurma stratejisini tanımlar.

---

## 1. Niyet Genişletme (Intent Expansion)
Kullanıcılar genellikle kısa ve eksik teknik detay içeren isteklerde bulunurlar (Örn: *"Karta tıklayınca detay açılsın"*). AI, bu isteği doğrudan koda dökmek yerine arka plandaki iş niyetini genişletmelidir.
*   **Aşama 1**: İsteği oku ve kullanıcının gerçekte ne yapmak istediğini (hedefini) tanımla.
*   **Aşama 2**: Bu özelliğin çalışabilmesi için gerekli olan ama kullanıcının belirtmediği yan bileşenleri çıkar (yönlendirme, veri yükleme, hata durumları, yetkilendirme).
*   **Aşama 3**: İsteği bir **İş Hedefi (Business Goal)** ve **Kullanıcı Hikayesi (User Story)** olarak yeniden şekillendir.

## 2. Çevre Keşfi (Context Discovery)
Plan yapmadan önce projeyi tarayarak mevcut altyapıyı keşfetme sürecidir.
*   **Kural**: Asla sıfırdan plan yapma. Önce projeyi tara ve şunları ara:
    *   İstenen özelliğin aynısı veya benzeri projede zaten var mı?
    *   Hangi veritabanı tabloları, API uçları (endpoints) veya servisler bu konuyla ilişkili?
    *   Hangi reusable (yeniden kullanılabilir) UI bileşenleri veya yardımcı sınıflar kullanılabilir?
*   **Çıktı**: İsteği gerçekleştirmek için kullanılabilecek mevcut kod parçalarının ve dosyaların listesini çıkar.

## 3. Varsayım Motoru ve Güven Puanı (Assumption Engine & Confidence Score)
Eksik teknik detaylar için AI kendi varsayımlarını üretir ve bunları kanıtlarla doğrular.
*   **Kural**: Her varsayımın arkasında mantıklı bir gerekçe ve projeden alınmış bir kanıt olmalıdır.
*   **Güven Puanı**: Her varsayıma `%0` ile `%100` arası bir güven derecesi ata.
    *   *Yüksek Güven (%70 - %100)*: Projede benzer bir örneği bulunan ve mimariye tam uyan durumlar. (Örn: "Detay sayfası için mevcut ProductDetailPage bileşeni kullanılacak. Kanıt: `ProductDetailPage.js` dosyası mevcut.")
    *   *Düşük Güven (%0 - %69)*: Projeden kanıt bulunamayan, belirsiz durumlar. (Örn: "Detay sayfasının admin yetkisi gerektirip gerektirmediği belirsiz.")

## 4. İletişim ve Akıllı Soru Sorma (Confidence-Based Questions)
Kullanıcıyı gereksiz sorularla yormamak ve sadece kritik belirsizlikleri çözmek için uygulanacak iletişim stratejisidir.
*   **Kural 1**: Güven puanı `%70` ve üzeri olan varsayımlar için kullanıcıya soru sorma. Bunları doğrudan planına ekle ve kullanıcıya bildir.
*   **Kural 2**: Yalnızca güven puanı `%70`'in altında kalan, projenin kaynak kodlarından veya mimarisinden çıkarılamayan konular için soru sor.
*   **Kural 3**: Soruları açık uçlu değil, seçenekli veya net hedefe yönelik sor. (Örn: *"Detay sayfası yeni bir sekmede mi açılmalı, yoksa mevcut sayfada yönlendirme mi yapılmalı?"*)

## 5. Risk ve Yan Etki Analizi (Risk Analysis)
Geliştirilecek özelliğin sistemin diğer parçalarına zarar vermemesi için riskleri önden tespit etme sürecidir.
*   AI, her değişiklik öncesinde şu risk kategorilerini değerlendirmelidir:
    *   *Regresyon Riski*: Mevcut çalışan hangi fonksiyonlar etkilenebilir?
    *   *Veri Riski*: Yanlış veya eksik veri yazma, veri kaybı riski var mı?
    *   *Performans Riski*: Yeni sorgu veya döngüler darboğaz oluşturur mu?
    *   *Güvenlik Riski*: Yetkilendirme (authorization) veya girdi doğrulama (validation) eksikliği var mı?

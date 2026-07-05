# Test Yazma ve Doğrulama İş Akışı (Testing Workflow)

Bu belge, geliştirilen kodların kalitesini ve doğruluğunu garanti altına almak amacıyla birim (unit) ve entegrasyon testlerinin nasıl tasarlanacağını ve çalıştırılacağını tanımlar. Test edilmemiş business logic kodlarının teslim edilmesi yasaktır.

---

## 1. Giriş
Yapay zeka asistanı, yazdığı veya değiştirdiği tüm kodları doğrulamak için uygun test komutlarını çalıştırmak ve gerekiyorsa yeni testler yazmakla yükümlüdür.

---

## 2. Test Standartları ve Kuralları

### A. Birim Test (Unit Testing) Kuralları
*   **Sorumluluk Sınırları**: Birim testler sadece test edilen sınıfın mantığına odaklanmalıdır. Veritabanı, ağ (network) veya harici servis bağımlılıkları mock kütüphaneleri (örn: Mockito, Jest mock) ile izole edilmelidir.
*   **Kapsam (Test Scenarios)**:
    1.  *Happy Path (Başarılı Akış)*: Kodun beklenen girdilerle sorunsuz çalıştığını test et.
    2.  *Edge Cases (Sınır Durumlar)*: Boş veri (empty), null değerler, negatif sayılar gibi olağandışı durumları test et.
    3.  *Exception Path (Hata Akışları)*: Hatalı durumlarda doğru exception'ların fırlatıldığını ve hata mesajlarının doğru üretildiğini doğrula.

### B. Mocking Standartları
*   Mock nesnelerin davranışlarını (stubbing) sadece test edilen senaryonun ihtiyacı kadar kurgula.
*   Statik metotları veya sistem zamanını mock'lamaktan kaçın (mümkünse bu bağımlılıkları soyutlayarak enjekte et).

### C. Test Çalıştırma ve Doğrulama
AI, kod yazdıktan sonra mutlaka ilgili build/test komutunu çalıştırmalıdır:
*   *Java/Spring*: `mvn clean test` veya `./gradlew test`
*   *JavaScript/React*: `npm run test` veya `npm test`
*   *Flutter/Dart*: `flutter test`

### D. Test Hatalarının Çözümü
*   Eğer bir test başarısız (failed) olursa, hatanın nedenini loglardan oku.
*   Düzeltmeyi ana kodda yap, test kodunun kendisini hatayı susturmak amacıyla değiştirme (eğer test mantığı yanlış değilse).
*   Tüm testler yeşil (success) olmadan görevi "Tamamlandı" olarak teslim etme.

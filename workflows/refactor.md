# Kod İyileştirme İş Akışı (Refactor Workflow)

Bu belge, kod kalitesini, okunabilirliğini ve sürdürülebilirliğini artırmak amacıyla yapılacak kod iyileştirme (refactoring) işlemlerinin sınırlarını ve adımlarını tanımlar. Çalışan kodu sebepsiz yere değiştirmek veya plansız refactoring yapmak yasaktır.

---

## 1. Giriş
Refactoring, kodun dış davranışını değiştirmeden iç yapısının iyileştirilmesidir. AI, kod iyileştirme yaparken sistemde bir regresyona (hata) neden olmamak için bu süreçteki güvenlik adımlarını izlemelidir.

---

## 2. Refactoring Aşamaları

### Aşama 1: Kod Kokularının Tespiti (Identify Code Smells)
*   **Kural**: İyileştirme ihtiyacını somut gerekçelerle tanımla.
*   **İnceleme Alanları**:
    *   *Tekrar Eden Kod (Code Duplication)*: Aynı mantığın birden fazla yerde yazılması.
    *   *Aşırı Büyük Sınıf/Metot (God Classes/Methods)*: Tek bir metodun veya sınıfın çok fazla sorumluluk üstlenmesi.
    *   *Yüksek Karmaşıklık (High Cyclomatic Complexity)*: Çok fazla iç içe if/else veya loop barındıran yapılar.
    *   *Kötü İsimlendirme*: Anlam taşımayan veya projenin standartlarına uymayan değişken/metot isimleri.

### Aşama 2: Refactoring Kapsamının Belirlenmesi (Scoping)
*   **Kural**: İyileştirme yapılacak alanı net olarak sınırlandır.
*   **Uygulama**:
    *   Refactoring yaparken hedeflenen sınıf/metot dışındaki alakasız dosyaları değiştirme.
    *   "Hazır girmişken burayı da düzelteyim" yaklaşımından kaçın. Değişiklik kapsamını küçük tutarak riskleri minimize et.

### Aşama 3: Geriye Dönük Uyumluluk Kontrolü (Backward Compatibility)
*   **Kural**: Refactoring işlemi mevcut entegrasyonları ve public API sözleşmelerini kırmamalıdır.
*   **Uygulama**:
    *   Sınıf veya metot imzalarını (signatures) değiştirirken, bu metotları çağıran diğer sınıfları kontrol et.
    *   Gerekirse eski metotları doğrudan silmek yerine `@Deprecated` olarak işaretle ve yeni yapıya yönlendir.

### Aşama 4: Refactoring Planı ve Onay
*   **Kural**: Yapılacak iyileştirmeleri ve bunların gerekçelerini kullanıcıya detaylıca açıkla.
*   **Uygulama**:
    *   Kodun eski hali ile önerilen yeni hali arasındaki farkı (diff) ve bunun sürdürülebilirliğe katkısını anlat.
    *   Kullanıcıdan onay almadan refactoring kodlarını projeye uygulama.

### Aşama 5: Test ve Doğrulama
*   **Kural**: Refactoring sonrasında sistemin davranışının değişmediğini kanıtla.
*   **Uygulama**:
    *   Refactoring öncesinde mevcut birim testleri (unit tests) çalıştır ve hepsi yeşil olmalıdır.
    *   İyileştirme yapıldıktan sonra testleri tekrar çalıştır. En ufak bir test hatası durumunda refactoring'i geri al (rollback) ve planı revize et.

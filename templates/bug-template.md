# [Hata Teşhis ve Analiz Raporu Şablonu]

Bu şablon, sisteme bildirilen hataların (`workflows/bug-investigation.md` akışına göre) analiz edilip kök nedeninin bulunması aşamasında kullanılacak rapor formatını tanımlar.

---

## 1. Hata Tanımı (Bug Definition)
*   **Bildirilen Hata**: *[Kullanıcının ilettiği hata açıklaması]*
*   **Beklenen Davranış (Expected)**: *[Sistemin normal şartlarda yapması gereken]*
*   **Gerçekleşen Davranış (Actual)**: *[Hata anında gerçekleşen hatalı durum]*

## 2. Log ve Stack Trace Analizi
*   **Hata Sınıfı**: `[ExceptionClassName]`
*   **Hata Mesajı**: *[Logda yazan hata detayı]*
*   **Hatalı Satır ve Dosya**: `[path/to/file.ext#L123]` *[Hatanın fırlatıldığı tam satır numarası]*

## 3. Kök Neden Analizi (Root Cause Analysis)
*   **Açıklama**: *[Hatanın neden kaynaklandığının mantıksal ve teknik açıklaması]*
*   **Kanıt (Evidence)**: *[Hatanın veritabanı kaydı, null nesne veya logic hatasından kaynaklandığını gösteren kod parçası]*

## 4. Minimal Düzeltme Stratejisi (Fix Strategy)
*   **Çözüm Planı**: *[Hayırlı ve minimal olarak hatayı gidermek için yapılacak kod değişikliği]*
*   **Değişecek Satırlar**:
```diff
- [eski_hatali_kod]
+ [yeni_duzeltilmis_kod]
```

## 5. Regresyon Riskleri ve Doğrulama (Regression & Test)
*   **Etkilenen Bağımlılıklar**: *[Bu değişiklikten etkilenebilecek diğer sınıflar veya fonksiyonlar]*
*   **Test Senaryosu**: *[Hatanın giderildiğini ve tekrar etmeyeceğini doğrulamak için yazılacak/çalıştırılacak birim test detayları]*

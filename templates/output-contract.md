# Standart Çıktı Sözleşmesi Şablonu (Output Contract Template)

Bu şablon, ajanın tüm geliştirme, test ve denetim adımlarını başarıyla tamamladıktan sonra kullanıcıya sunacağı nihai raporun formatını tanımlar. Çıktıların tutarlı olması için bu şablonun kullanılması zorunludur.

---

## [Görev Başlığı / PRD Başlığı]

### 1. Yapılan Değişikliklerin Özeti (Summary of Changes)
*   **Açıklama**: *[Geliştirilen özelliğin veya çözülen hatanın kısa ve net teknik özeti]*
*   **İş Değeri**: *[Değişikliğin sisteme kattığı değer]*

### 2. Dosya Değişiklik Listesi (Modified Files)
*   **[NEW]** `[path/to/new_file.ext]`: *[Yeni dosyanın amacı]*
*   **[MODIFY]** `[path/to/modified_file.ext]`: *[Değiştirilen dosya ve yapılan ekleme]*

### 3. Kullanılan Kanıtlar (Evidence)
Ajanın kararlarını temellendirdiği projedeki benzer kod örnekleri:
*   *Kanıt 1*: `[path/to/file.ext#L123]` -> *[Bu yapının taklit edildiği açıklama]*

### 4. Performans ve Kalite Metrikleri (Metrics Summary)
*   **Birim Test Durumu**: `[BAŞARILI - %100 Geçti]`
*   **Karmaşıklık Skoru**: `[Geçti - Ortalama: X]`
*   **Mimari Uyum Skoru**: `[100 / 100]`
*   **Güven Puanı (Confidence)**: `[%X]`

### 5. Doğrulama ve Test Sonuçları (Verification Results)
*   *Çalıştırılan Otomatik Testler*: `[Çalıştırılan test komutları ve sonuçları]`
*   *Manuel Doğrulama Adımları*: `[Arayüzde veya API'de yapılan doğrulama adımları]`

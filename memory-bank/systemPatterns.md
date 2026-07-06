# Sistem Tasarım Desenleri (memory-bank/systemPatterns.md)

---

## 1. Mimari Tasarım Desenleri (Architectural Patterns)
*   **Decision Runtime / Ajan Çalışma Zamanı**: Kod yazımı ve planlamanın otonom denetlendiği, durum makinesine sahip çalışma zamanı.
*   **OODA Loop (Observe-Orient-Decide-Act)**: Ajanın sürekli olarak projeyi gözlemlemesi, kanıtlarla konumlanması, plan üretip onay alması ve test metrikleriyle kaliteyi ölçerek döngüyü sürdürmesi modeli.
*   **Önyükleyici (Bootstrap)**: `AGENTS.MD` üzerinden tetiklenen, Classifier/Loader/Initializer katmanlarını barındıran ince bootloader deseni.

---

## 2. Karar Alma ve Doğrulama Desenleri
*   **Kanıt Ağırlıklı Güven Derecelendirmesi**: Varsayımların kanıt derecelerine (Strong: 1.0, Weak: 0.6) göre puanlanması ve %70 barajının kontrol edilmesi.
*   **Deterministik Koruma Duvarları**: Mimari kuralların otomatik testlerle (ArchUnit vb.) kodlanması ve ihlal durumunda acil rollback/recovery akışının tetiklenmesi.
*   **Gürültüsüz Hata Kurtarma**: Başarılı testlerde tek satır yeşil sinyal; hata durumlarında verbose logları atarak sadece stack trace ve hata özetini ajana iletme deseni (Signal-over-Noise).

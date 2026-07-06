# Çalışma Zamanı Yaşam Döngüsü (Runtime Lifecycle)

Yaşam Döngüsü, ajanın statik "Yükle -> Çalıştır -> Bitir" mantığından sıyrılarak, sürekli gözlemleyen ve kendini düzelten dinamik **OODA Loop (Gözlemle-Konumlan-Karar Ver-Uygula)** modeli üzerinde çalışmasını sağlar.

---

## 1. Yaşam Döngüsü Aşamaları (OODA Loop)

Ajanın yaşam döngüsü şu döngüsel aşamalardan oluşur:

```text
       ┌─────────── Gözlemle (Observe) ───────────┐
       │                                         │
       ▼                                         ▼
Konumlan (Orient) ──> Karar Ver (Decide) ──> Uygula (Act) ──> Ölç/Öğren (Measure)
                                                                 │
                                                                 ▼
                                                           Tekrarla/Bitir (Repeat)
```

1.  **Observe (Gözlemle)**: Codebase'i, girdiyi ve bağımlılıkları tara. Değişiklik ihtiyacını ve bütçeyi gör.
2.  **Orient (Konumlan)**: Proje kanıtlarını (`evidence.md`) ve geçmiş kararları sorgulayarak kendini projenin mimarisine uyarla.
3.  **Decide (Karar Ver)**: Güven puanını hesapla. Teknik uygulama planını (`planner.md`) ve risk analizini oluştur.
4.  **Act (Uygula)**: Kodu yaz ve birim testleri koştur.
5.  **Measure/Learn (Ölç/Öğren)**: Kod kalitesini, mimari aşınmayı ve doğruluğu ölç. Hatalardan öğren (kök neden analizi).
6.  **Repeat (Tekrarla)**: Eğer kalite limitleri aşılmadıysa döngüyü recovery ile tekrar başlat, her şey yeşilse döngüyü sonlandır.

---

## 2. Kesinti ve Duraklatma Yönetimi (Interrupts)

*   **Waiting Approval Duraklatması**: Plan oluşturulduktan sonra döngü otomatik olarak duraklatılır (state: `Waiting Approval`). Kullanıcı onayı gelene kadar runtime beklemede (Suspended) kalır.
*   **Kritik Soru Kesintisi (OnConfidenceLow)**: Güven seviyesi kritik sınırın altına düştüğünde, soru sormak için çalışma zamanı kesintiye (Interrupt) uğrar. Cevap alındığında kaldığı yerden (Resume) devam eder.

# Öz-Yansıtma Motoru (Reflection Engine)

Öz-Yansıtma Motoru, ajanın kod yazma aşamasına geçmeden önce ve çalışmasını teslim etmeden hemen önce kendi tasarladığı çözümü içsel olarak sorgulamasını sağlar. "Ben doğru düşündüm mü?" sorusuna yanıt arar.

---

## 1. Kodlama Öncesi Öz-Yansıtma Adımları

Plan onaylandıktan sonra, kod yazılmadan önce ajan aşağıdaki kontrolleri yaparak planı doğrular:

1.  **Mantık Doğrulaması (Logic Check)**:
    *   Tüm mantıksal değişkenler, veri tipleri ve veri akış yönleri doğru mu? Kodda eksik durum (edge case) veya mantıksal boşluk var mı?
2.  **Mimari Sınır Doğrulaması (Architecture Check)**:
    *   Tasarım, `core/architecture.md` sınırlarına uygun mu? Katmanlar baypas ediliyor mu? Bağımlılıklar doğru enjekte edilmiş mi?
3.  **Güvenlik ve Performans Ön Kontrolü**:
    *   Input validation (girdi doğrulama) yapılıyor mu? N+1 sorgusu oluşma riski var mı?

---

## 2. Teslimat Öncesi Doğrulama ve Döngü Tetikleme (Trigger Loop)

Kod yazımı bittikten sonra, ajan kodunu `review/` katmanına devretmeden önce son bir kez doğrular. Eğer bu aşamada bir hata tespit ederse:
*   Kodu dışarıya sunmaz.
*   `runtime/events.md` üzerinden `OnReflectionFailed` olayını tetikler.
*   Çalışma durumunu `state-machine.md` kurallarına göre `Implementing` aşamasına geri çeker.
*   Hatanın kök nedenini analiz ederek kendi yazdığı kodu otomatik olarak düzeltmeye (self-healing) başlar.

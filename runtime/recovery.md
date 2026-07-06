# Kurtarma ve Geri Alma Motoru (runtime/recovery.md)

---

## 1. Amaç (Purpose)
Hata durumlarında sistemi otomatik olarak en son kararlı duruma geri çekmek (Rollback) ve hataları gidermek için kendi kendini onarma (Self-Healing) süreçlerini yönetmek.

---

## 2. Sorumluluklar (Responsibilities)
*   Kodlama hatalarında (derleme/test hataları) git rollback işlemlerini yönetmek.
*   Log analizi yaparak hataları minimal düzeyde otomatik düzeltmek (Self-healing).
*   Geri alma sayaçlarını kontrol etmek (Loop Guard).

---

## 3. Girdiler (Inputs)
*   Hata logları ve test başarısızlık raporları.
*   Metrik ihlal bildirimleri.

---

## 4. Çıktılar (Outputs)
*   Git rollback/restore komutları.
*   Kod düzeltme yamaları (patches).

---

## 5. Bağımlılıklar (Dependencies)
*   `runtime/orchestrator.md`
*   `metrics/quality.md`

---

## 6. Kurallar (Rules)
*   **Minimal Düzeltme**: Düzeltme işlemi sadece hataya sebep olan satırlarla sınırlı olmalı, alakasız kodlar etkilenmemelidir.
*   **İterasyon Limiti**: Otomatik onarma denemesi en fazla 3 kez çalıştırılabilir.

---

## 7. Hata Durumları (Failure Cases)
*   *Çözülemeyen Hatalar*: 3. denemede de derleme/test başarısız kalırsa, kurtarma durdurulur ve kontrol kullanıcıya bırakılır.

---

## 8. Örnekler (Examples)
*   *Hata*: Derleme hatası `src/UserService.java:12: missing return statement`.
*   *Kurtarma*: Ajan 12. satıra gidip eksik return değerini ekleyerek kodu otomatik olarak onarır.

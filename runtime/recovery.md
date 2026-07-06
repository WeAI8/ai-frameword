# Kurtarma ve Geri Alma Motoru (runtime/recovery.md)

---

## 1. Amaç (Purpose)
Hata durumlarında sistemi otomatik olarak en son kararlı duruma geri çekmek (Rollback) ve hataları gidermek için gürültüden arındırılmış (Signal-over-Noise) test çıktılarıyla otomatik düzeltme (Self-Healing) süreçlerini yönetmek.

---

## 2. Sorumluluklar (Responsibilities)
*   Kodlama hatalarında (derleme/test hataları) git rollback işlemlerini yönetmek.
*   Birim test çıktılarını süzerek, verbose/gürültülü logları temizlemek ve sadece hata özeti ile yığın izini (stack trace) Geliştiriciye aktarmak (Signal-over-Noise).
*   Geri alma sayaçlarını kontrol etmek (Loop Guard).

---

## 3. Girdiler (Inputs)
*   Hata logları ve test başarısızlık raporları.
*   Metrik ihlal bildirimleri.

---

## 4. Çıktılar (Outputs)
*   Gürültüden arındırılmış temiz hata özeti ve stack trace.
*   Git rollback/restore komutları.

---

## 5. Bağımlılıklar (Dependencies)
*   `runtime/orchestrator.md`
*   `metrics/quality.md`

---

## 6. Kurallar (Rules)
*   **Signal-over-Noise (Sinyal/Gürültü) Oranı**: Testler başarılı olduğunda tek satırlık bir yeşil başarı sinyali üretilmelidir. Testler başarısız olduğunda ise binlerce satırlık sistem kurulum/çalışma logu (noise) elenmeli; sadece hata fırlatan metod ismi, hata mesajı ve hatanın gerçekleştiği satır numarası (signal) ajana sunulmalıdır.
*   **İterasyon Limiti**: Otomatik onarma denemesi en fazla 3 kez çalıştırılabilir.

---

## 7. Hata Durumları (Failure Cases)
*   *Çözülemeyen Hatalar*: 3. denemede de derleme/test başarısız kalırsa, kurtarma durdurulur ve kontrol kullanıcıya bırakılır.

---

## 8. Örnekler (Examples)
*   *Hatalı Girdi*: 500 satırlık Maven derleme ve sistem logu.
*   *Süzülen Çıktı*: `NullPointerException: userEntity is null at UserService.java:125`.

# Kurtarma ve Geri Alma Motoru (Recovery & Rollback)

Recovery Motoru, çalışma zamanı hatalarında veya başarısız denetimlerde (OnReflectionFailed, OnArchitectureViolation) sistemin kendini otomatik olarak güvenli bir duruma geri çekmesini ve kendi kendini onarmasını (Self-Healing) sağlar.

---

## 1. Geri Alma Protokolü (Rollback Protocol)

Hata veya mimari aşınma tespit edildiğinde orkestratör tarafından şu geri alma adımları işletilir:

1.  **Değişikliklerin Dondurulması**: Devam eden tüm kod yazma işlemleri durdurulur.
2.  **Dosya Durumu Analizi**: Son başarılı onaylanan plana (`implementation_plan.md`) ait git diff'i ve dosya yedekleri incelenir.
3.  **Geri Yükleme (Revert)**:
    *   *Kritik İhlal*: Eğer mimari kayma düzeltilemeyecek düzeyde ise, o iterasyonda yapılan tüm kod değişiklikleri geri alınır (git checkout/restore).
    *   *Hafif İhlal*: Kod geri alınmaz, sadece hatalı satır veya metod devre dışı bırakılır.

---

## 2. Kendi Kendini Onarma (Self-Healing Rules)

Birim testlerin kalması veya derleme (compile) hatası durumlarında ajan şu adımlarla kendini onarır:

1.  **Hata Logu Ayrıştırma**: Derleyici veya test logundaki hata sınıfı, mesajı ve satır numarası (`path/to/file.ext#L123`) tam olarak tespit edilir.
2.  **Kanıt Sorgulama**: Hatalı kod bloğu `core/decision/evidence.md` kurallarıyla taranır ve doğru yazım tarzı tespit edilmeye çalışılır.
3.  **Düzeltme Uygulama**: Sadece hataya sebep olan satır minimal olarak düzeltilir.
4.  **Döngü Limiti Kontrolü**:
    *   Self-healing denemesi her başarısızlıkta 1 artırılır.
    *   3. denemede de derleme/test başarısız olursa, kurtarma sonlandırılır ve durum kullanıcıya hata detaylarıyla sunulur.

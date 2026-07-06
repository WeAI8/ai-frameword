# Aktif Bellek Yönetim Stratejisi (memory/strategy.md)

---

## 1. Amaç (Purpose)
AI ajanının büyük kod tabanlarında bağlamı (context) kaybetmesini önlemek amacıyla, statik ve dinamik bellek katmanlarını yönetmek ve `memory-bank/` altındaki durum belgelerini kararlarla senkronize etmek.

---

## 2. Sorumluluklar (Responsibilities)
*   `memory-bank/` dizinindeki durum dosyalarını (`activeContext.md`, `progress.md`) her büyük döngü veya oturum başlangıcında okuyup güncellemek.
*   Geçmiş konuşma ve projelerdeki kararları sorgulamak, sıralamak (Rank) ve Kanıt Motoruna (`evidence.md`) aktarmak.
*   Eski ve çelişen kararları bellekten temizlemek (Expire).

---

## 3. Girdiler (Inputs)
*   `memory-bank/` altındaki markdown dosyaları.
*   Karar arama anahtar kelimeleri.

---

## 4. Çıktılar (Outputs)
*   Güncellenmiş `memory-bank/activeContext.md` ve `progress.md` dosyaları.
*   Sıralanmış ve doğrulanmış geçmiş kararlar listesi.

---

## 5. Bağımlılıklar (Dependencies)
*   `core/decision/evidence.md`
*   `memory-bank/*`

---

## 6. Kurallar (Rules)
*   **Bağlam Sıfırlama Senkronizasyonu**: Bağlam penceresi dolup oturum sıfırlandığında, ajan işe başlamadan önce mutlaka `memory-bank/` altındaki tüm dosyaları okuyarak durumunu güncellemelidir.
*   **Aktif Güncelleme**: Her önemli görev tamamlandığında (`OnTaskComplete`), `progress.md` ve `activeContext.md` dosyaları yeni duruma göre güncellenmelidir.

---

## 7. Hata Durumları (Failure Cases)
*   *Dosya Çelişkisi*: `activeContext.md` ile `progress.md` arasında durum çelişkisi yaşanırsa, orkestratör `recovery.md` tetikleyerek en son git commit'indeki kararlı sürümleri baz alır.

---

## 8. Örnekler (Examples)
*   *Akış*: Ajan oturumu sıfırlanır. Ajan yeni oturumda ilk iş olarak `memory-bank/projectbrief.md` ve `activeContext.md` dosyalarını okuyarak hedefleri doğrular.

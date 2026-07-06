# Aktif Kanıt Motoru (core/decision/evidence.md)

---

## 1. Amaç (Purpose)
Ajanın önerdiği çözümleri, projenin mevcut kod yapısında veya aktif belleğinde çalışan somut örneklerle (kanıtlarla) temellendirmek.

---

## 2. Sorumluluklar (Responsibilities)
*   Codebase ve aktif bellek (`memory/`) üzerinde benzer kod kalıplarını taramak.
*   Kanıtları güç derecelerine (Strong / Weak) göre sınıflandırmak.

---

## 3. Girdiler (Inputs)
*   Önerilen teknik çözüm taslağı.
*   `memory/strategy.md` bellek sorgu sonuçları.

---

## 4. Çıktılar (Outputs)
*   Sınıflandırılmış Kanıt Listesi (Dosya yolları ve satır numaralarıyla).
*   Güven Puanına aktarılacak Kanıt Derece Katsayıları.

---

## 5. Bağımlılıklar (Dependencies)
*   `memory/strategy.md`
*   `heuristics/context-budget.md`

---

## 6. Kurallar (Rules)
*   **Kanıtsız Öneri Yasağı**: Projede benzer bir örneği bulunmayan teknik çözümler "Zayıf Kanıt" olarak işaretlenmeli ve güven puanı düşürülmelidir.
*   **Arama Bütçesi Sınırı**: Kanıt arama işlemi `context-budget.md` limitlerini aşmamalıdır.

---

## 7. Hata Durumları (Failure Cases)
*   *Kanıt Bulunamaması*: Hiçbir benzer yapı bulunamazsa durum `Unknown` olarak işaretlenir ve kullanıcıya soru sorulması için tetikleme yapılır.

---

## 8. Örnekler (Examples)
*   *Çözüm*: REST Controller yazılması isteniyor.
*   *Kanıt*: `f:/src/controllers/ProductController.java` (Güçlü Kanıt - standartları taklit etmek için kullanılır).

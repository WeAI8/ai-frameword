# Refactoring Politikası (Refactoring Heuristics)

Bu politika, ajanın kod temizliği yaparken regresyon (hata) üretmesini engellemek için refactor sınırlarını ve güvenli değişiklik kurallarını tanımlar.

---

## 1. Kamp Alanı Sınırı (Boy Scout Rule Limits)
*   **Kural**: Kodu bulduğundan daha temiz bırak. Ancak, bu temizlik **sadece üzerinde çalıştığın metot veya sınıfın ilgili alanıyla** sınırlı olmalıdır.
*   **Yasaktır**: Sırf "güzel görünmesi" veya "modernize edilmesi" amacıyla görev kapsamı dışında kalan uzak sınıfları, değişken isimlerini veya paket yapılarını değiştirmek kesinlikle yasaktır (En Küçük Değişiklik Prensibi).

---

## 2. Çalışan Koda Dokunmama Kuralı
*   **Kural**: Eğer bir kod karmaşık görünüyorsa veya eski standartlarda yazılmışsa, fakat sorunsuz çalışıyor, birim testleri geçiyor ve üzerinde yeni bir özellik eklenmesi talep edilmiyorsa o koda **DOKUNMA**.
*   *Gerekçe*: Kanıtlanmamış her refactoring işlemi, canlı sistemlerde beklenmeyen yan etki (side-effect) ve regresyon riski taşır.

---

## 3. Yeniden Yapılandırma Eşikleri (Refactor Thresholds)
*   Sadece `metrics/complexity.md` skoru kritik sınırları aştığında veya bir hata (bug) giderilirken mecburi olunduğunda refactoring yapılmalıdır.
*   Refactor edilen her metodun eski davranışını koruduğunu doğrulamak için **öncesinde ve sonrasında** aynı birim testlerin (`workflows/testing.md`) çalıştırılması zorunludur.

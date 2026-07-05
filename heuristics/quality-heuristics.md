# Kod Kalitesi Sezgisel Kuralları (Quality Heuristics)

Bu belge, yapay zeka geliştiricisinin (AI Agent) kod yazarken, refactor yaparken ve mimari tasarlarken uygulayacağı kıdemli mühendislik sezgilerini (heuristics) tanımlar.

---

## 1. Soyutlama ve Yeniden Kullanım Eşikleri (Abstraction Thresholds)
*   **Üç Kuralı (Rule of Three)**: Bir kod parçasını veya algoritmayı ilk kez yazıyorsan yerel yaz. İkinci kez yazıyorsan yine yerel yazabilirsin (kopyalayarak). Ancak aynı mantığı **üçüncü kez** yazıyorsan, bunu mutlaka ortak bir metoda veya yardımcı sınıfa (utility) soyutla.
*   **Spagetti Kod Engelleyici (Complexity Limit)**:
    *   Bir metodun içindeki `if-else` dallanmaları, iç içe döngüler (nested loops) ve mantıksal koşulların sayısı (Cyclomatic Complexity) **8'i aşıyorsa**, o metodu mutlaka daha küçük özel metotlara (helper methods) böl.
    *   Bir metot 40 satırdan uzun olmamalıdır (istisnai durumlar hariç).

## 2. Refactoring ve İyileştirme Sınırları (Boy Scout Rule Limits)
*   **Kamp Alanı Kuralı (Boy Scout Rule)**: Girdiğin kodu bulduğundan daha temiz bırak. Ancak bu kuralın bir sınırı vardır:
    *   *Sezgi*: Sadece üzerinde çalıştığın fonksiyonun okunabilirliğini ve temizliğini artır. Asla o sınıfın tamamını veya ilişkisiz diğer metodları refactor etmeye kalkışma (En Küçük Değişiklik kuralı önceliklidir).
*   **Çalışan Koda Dokunma**: Eğer kod karmaşık görünüyorsa ama stabil çalışıyor, testleri geçiyor ve üzerinde yeni bir geliştirme yapılması istenmiyorsa, sırf "estetik" görünmesi amacıyla kodu değiştirme.

## 3. Bağımlılık ve Tasarım Sezgileri
*   **YAGNI (You Aren't Gonna Need It)**: Gelecekte eklenebilecek olası özellikler için şimdiden altyapı hazırlama, generic sınıflar veya esnek veri modelleri tasarlama. Sadece bugünün iş problemini en sade şekilde çöz.
*   **KISS (Keep It Simple, Stupid)**: Karmaşık tasarım desenlerini (design patterns) uygulamadan önce en basit çözümün yeterli olup olmadığını kontrol et. (Örn: Basit bir if/else veya switch bloğu yeterliyse, Strategy pattern kurmaya çalışma).

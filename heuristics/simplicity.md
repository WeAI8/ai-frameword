# Sadelik Politikası (Simplicity Heuristics)

Bu politika, ajanın aşırı mühendislikten (over-engineering) kaçınmasını, YAGNI (You Aren't Gonna Need It) ve KISS (Keep It Simple, Stupid) ilkelerini her kod bloğunda uygulamasını sağlar.

---

## 1. YAGNI (Gelecek Odaklı Kod Yazmama)
*   **Kural**: Sadece bugünün ve mevcut kabul kriterlerinin (`Acceptance Criteria`) gerektirdiği kodu yaz.
*   **Kural**: "Gelecekte lazım olabilir", "Buraya esnek bir altyapı kuralım", "Genişletilebilir generic sınıf tasarlayalım" tarzı düşüncelerle kod yazma. 
*   **Sezgi**: Eğer bir özellik planda yoksa, o kod yoktur.

---

## 2. KISS (Basit Kod Tasarımı)
*   **Karmaşıklığı Azalt**: Basit bir if/else bloğu veya switch yapısı ile çözülebilecek işler için karmaşık tasarım desenleri (Örn: Strategy Pattern, Factory Pattern) kurma.
*   **Satır ve Metot Uzunluğu**: Bir metot en fazla 40 satır olmalıdır. 40 satırı geçen metotlar okunabilirliği zorlaştırır ve hata riskini artırır.
*   **Düz Mantık (Flat Code)**: İç içe (nested) if blokları yerine "Guard Clauses" (erken metot dönüşü) tercih et.
    *   *Kötü*: `if (a) { if (b) { doSomething(); } }`
    *   *İyi*: `if (!a) return; if (!b) return; doSomething();`

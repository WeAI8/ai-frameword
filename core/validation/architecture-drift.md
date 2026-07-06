# Mimari Kayma ve Aşınma Koruyucusu (Architectural Drift Detection)

Mimari Kayma, zaman içinde yapılan küçük ve plansız değişikliklerin projenin ana yazılım mimarisini bozması ve katman sınırlarını aşındırması durumudur. Bu modül, ajanın yazdığı kodun mimari erozyona yol açmasını engeller.

---

## 1. Kayma Tespit Kuralları (Drift Check Rules)

Ajan, planlama ve kodlama sırasında aşağıdaki mimari kuralları doğrulamak zorundadır:

*   **Katman İhlali Kontrolü (Layering Violations)**:
    *   *Kural*: Üst katmanlar alt katmanları doğrudan çağırabilir ancak alt katmanlar üst katmanları kesinlikle çağıramaz (Örn: Service katmanı Controller çağıramaz).
    *   *Kural*: Katman baypası yapılamaz (Örn: Controller doğrudan Repository çağıramaz; araya Service katmanı girmelidir).
*   **Dairesel Bağımlılık Kontrolü (Circular Dependencies)**:
    *   *Kural*: Sınıflar arasında dairesel import/bağımlılık (Örn: A sınıfının B'yi, B sınıfının da A'yı çağırması) oluşturulamaz.
*   **DTO ve Veri Sınırı Kontrolü (Data Leakage)**:
    *   *Kural*: Veritabanı Entity sınıfları doğrudan Controller veya UI katmanına taşınamaz. Dış dünya ile sadece DTO nesneleri konuşabilir.

---

## 2. İhlal Durumu ve Kurtarma (Recovery Trigger)

Eğer yazılan kodda bir mimari kayma tespit edilirse:
*   Ajan geliştirme akışını hemen durdurur.
*   `runtime/events.md` üzerinden `OnArchitectureViolation` olayını tetikler.
*   Mimar ajanı (`Architect`) devreye alarak teknik planın yeniden düzenlenmesini sağlar.
*   Mimari hata giderilene kadar kodun ana dallara (main/master) commit edilmesine izin verilmez.

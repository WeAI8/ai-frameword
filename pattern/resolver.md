# Tasarım Şablonu Seçici (Pattern Resolver)

Tasarım Şablonu Seçici, ajanın kod yazarken uygulayacağı tasarım kalıplarını (Design Patterns) kendi kişisel tercihine göre değil, projenin mevcut kod yapısına ve benzerlik skoruna göre seçmesini sağlar.

---

## 1. Şablon Seçim Hiyerarşisi (Pattern Resolution)

Ajan, yeni bir özellik geliştirirken sırasıyla aşağıdaki adımları izler:

1.  **Codebase Taraması (Pattern Scan)**:
    *   Yazılacak yeni yapının (Örn: Bir kayıt formu) projede benzer bir örneği var mı tara (Örn: Wizard pattern, Master-Detail pattern, Basit Form pattern).
2.  **Benzerlik Skoru (Similarity Match)**:
    *   Tespit edilen mevcut desenlerin, yeni taleple olan benzerlik oranı (0-100%) hesaplanır.
3.  **Taklit İlkesi (Imitation over Innovation)**:
    *   *Kural*: Projede en sık kullanılan ve en yüksek benzerlik skoruna sahip olan tasarım deseni seçilir. 
    *   *Kural*: Projeye daha önce hiç kullanılmamış yeni bir tasarım deseni (Örn: Factory method yerine Singleton tercih etmek veya tersi) kesinlikle getirilmez.

---

## 2. Gelecek Desen Kılavuzları (Future Extensions)

`pattern/` dizini altında gelecekte oluşturulacak spesifik şablon kılavuzları bu seçici tarafından referans alınacaktır:
*   `pattern/crud.md`: Temel veri tabanı okuma/yazma şablonları.
*   `pattern/wizard.md`: Çok adımlı form şablonları.
*   `pattern/search.md`: Gelişmiş filtreleme ve arama şablonları.

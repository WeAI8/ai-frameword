# Karar Verme Motoru (Decision Engine)

Bu belge, yapay zeka geliştiricisinin teknik çözümler üretirken, mimari tasarım yaparken ve kod yazarken uygulayacağı mantıksal karar ağacını ve öncelik sıralamasını tanımlar.

---

## 1. Çözüm Seçim Hiyerarşisi (Solution Selection Hierarchy)
AI, bir problemi çözmek için alternatif yollar bulduğunda, kararlarını her zaman aşağıdaki öncelik sırasına göre vermelidir:

```text
1. Mevcut İmplementasyon (Doğrudan Yeniden Kullanım)
        ↓ (Yoksa)
2. Benzer İmplementasyon (Taklit ve Adaptasyon)
        ↓ (Yoksa)
3. Proje Standartları ve Kodlama Kuralları (Tutarlılık)
        ↓ (Yoksa)
4. Sadelik Prensibi (Minimalist Tasarım)
        ↓ (En son)
5. Yeni Abstraksiyon / Kütüphane Ekleme
```

### Detaylı Karar Adımları:
*   **Adım 1: Yeniden Kullanım (Reuse)**: Çözülmesi istenen problem veya fonksiyon daha önce projede çözülmüş mü? 
    *   *Evet ise*: Yeni kod yazma. Mevcut servis, fonksiyon veya bileşeni doğrudan çağır veya genişlet.
*   **Adım 2: Taklit ve Adaptasyon (Imitation)**: Birebir aynısı yoksa, benzer bir problem projede nasıl çözülmüş?
    *   *Evet ise*: Mevcut mimariyi ve kod yapısını kopyala, yeni değişkenlerle adapte et. İnovasyon yerine taklidi tercih et.
*   **Adım 3: Proje Standartları (Consistency)**: Benzer bir örnek yoksa, projenin genel isimlendirme, hata yönetimi ve katmanlama standartları nelerdir?
    *   *Uygulama*: Projedeki diğer kodların tarzını bozmayan, aynı standartta kod üret.
*   **Adım 4: Sadelik (Simplicity)**: Çözümü en az satırla ve en anlaşılır şekilde nasıl yazarız?
    *   *Uygulama*: Gelecekte ihtiyaç duyulabileceği düşünülen ama şu an istenmeyen "esneklikler" için ekstra kod yazma.
*   **Adım 5: Yeni Abstraksiyon (New Abstraction)**: Sadece ve sadece yukarıdaki adımlar imkansız ise yeni bir mimari desen veya harici kütüphane öner. Bunu yapmadan önce kullanıcıdan kesin onay al.

## 2. Tasarım Şablonları (Patterns) Kullanım Kuralları
Projeye yeni bir özellik eklenirken, rastgele kod yazmak yerine projenin kullandığı standart tasarım kalıpları (Design Patterns) uygulanmalıdır.
*   **CRUD İşlemleri**: Liste -> Detay -> Ekle -> Sil -> Güncelle akışı projenin mevcut API ve UI desenlerine göre kurgulanmalıdır.
*   **Arama ve Filtreleme**: Projede pagination (sayfalama) ve filtreleme işlemleri için kullanılan ortak bir yapı/sınıf varsa, yeni filtreleme işlemlerinde mutlaka o yapı kullanılmalıdır.
*   **Hata Yönetimi (Error Handling)**: Projede merkezi bir exception handling (örn: `@ControllerAdvice`, custom handler) varsa, try-catch bloklarında rastgele log basmak yerine bu merkezi hata yapısına uygun exception'lar fırlatılmalıdır.

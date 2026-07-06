# Aktif Bellek Yönetim Stratejisi (Active Memory Strategy)

Bellek, kararları kaydetmenin ötesinde; karar motoru (`core/decision/`) tarafından aktif olarak sorgulanan, derecelendirilen ve gerektiğinde zaman aşımına uğratılan dinamik bir bileşendir (Memory Manager).

---

## 1. Aktif Bellek Yaşam Döngüsü (Active Memory Lifecycle)

Bellek işlemleri sürekli olarak şu 4 aşamalı döngüyü takip eder:

```text
Sorgu Tetiklendi (Evidence Engine)
              ↓
1. Search (Arama) ──> 2. Rank (Sırala) ──> 3. Retrieve (Getir) ──> 4. Expire (Temizle)
```

1.  **Search (Arama)**:
    *   Ajan bir teknik karar vermeden önce, konuşma geçmişindeki ve önceki projelerdeki kararları "benzerlik anahtar kelimeleri" ile aratır.
2.  **Rank (Sıralama)**:
    *   Bulunan eski kararlar mevcut göreve benzerlik derecesine göre (0-100%) puanlanır.
    *   *Kural*: Sadece %80 ve üzeri benzerlik puanı olan kararlar aktif değerlendirmeye alınır.
3.  **Retrieve (Bağlam Getirme)**:
    *   Seçilen en benzer kararlar ve bunların kod şablonları Kanıt Motoruna (`evidence.md`) girdi olarak aktarılır.
4.  **Expire (Zaman Aşımı/Temizleme)**:
    *   Projenin mimarisinde yapılan güncellemeler sonrasında eskiyen, geçerliliğini yitiren veya mevcut mimariyle çelişen eski kararlar bellekten silinir ya da "Deprecated" (kullanımdan kaldırılmış) olarak işaretlenir.

---

## 2. Bellek Katmanları (Memory Layers)

Ajan belleği 4 hiyerarşik katmanda yönetir:
*   **Katman 1: Sohbet Belleği (Conversation Memory)**: Sadece mevcut konuşmadaki kararları ve kullanıcı onaylarını tutar (Kısa Vadeli).
*   **Katman 2: Proje Belleği (Project Memory)**: Projenin kök dizinindeki kod standartlarını ve mimari kararları saklar.
*   **Katman 3: Framework Belleği (Framework Memory)**: AI Engineering Decision Framework'ün kendi kurallarını saklar.
*   **Katman 4: Uzun Vadeli Bellek (Long-Term Memory)**: Ajanın farklı projelerden edindiği genel mühendislik tecrübelerini barındırır.

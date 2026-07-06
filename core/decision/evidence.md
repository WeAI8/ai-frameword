# Aktif Kanıt Motoru (Evidence Engine)

Kanıt Motoru, ajanın kendi fikirlerine veya tahminlerine dayanarak kod yazmasını engeller. Önerilen her teknik çözümün, projenin mevcut kod yapısında çalışan bir örneği (kanıtı) bulunmalıdır.

---

## 1. Aktif Kanıt Sorgulama Süreci (Evidence Gathering)

Ajan, bir karara varmadan önce şu kaynakları aktif olarak sorgulamak zorundadır:

1.  **Codebase Sorgusu (Static Code Search)**:
    *   Tasarım kalıpları, isimlendirme standartları ve veritabanı sorgu tarzları için mevcut kod dosyalarını tara.
2.  **Hafıza Sorgusu (Memory Query)**:
    *   Aktif hafıza yöneticisinden (`memory/strategy.md`) geçmiş konuşmalarda yapılmış benzer seçimleri, onaylanmış mimari kararları ve şablonları sorgula.
3.  **Teknoloji Sürücüsü Sorgusu (Driver Query)**:
    *   `technology/` altındaki ilgili dosyanın (Örn: `oracle.md`) kısıtlamalarını oku.

---

## 2. Kanıt Derecelendirme (Evidence Grading)

Toplanan kanıtlar güçlerine göre sınıflandırılır:

*   **Güçlü Kanıt (Strong Evidence)**:
    *   Mevcut projede çalışan, test edilmiş, aynı teknoloji yığınında (Örn: Spring Controller) birebir benzer işlevdeki kod bloğu.
*   **Zayıf Kanıt (Weak Evidence)**:
    *   Farklı bir teknoloji yığınında yazılmış (Örn: Java yerine Javascript) veya sadece dokümantasyonda geçen ama kodda örneği olmayan yapılar.

---

## 3. Kanıt Belgelendirme Sözleşmesi

Toplanan tüm kanıtlar planlama aşamasında şu formatta listelenmelidir:
*   *Kanıt A*: `[Dosya Yolu#Satır Numarası]` -> *[Bu kodun önerilen çözümü destekleme gerekçesi]*
*   *Kanıt B*: `[Bellek ID'si / Karar Geçmişi]` -> *[Daha önce onaylanmış benzer karar detayı]*

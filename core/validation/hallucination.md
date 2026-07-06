# Halüsinasyon Önleme Modülü (Hallucination Prevention)

Bu modül, ajanın projede var olmayan sınıfları, metodları, değişkenleri veya yapılandırmaları varmış gibi varsayıp kod yazmasını (halüsinasyon görmesini) engellemek için kurallar tanımlar.

---

## 1. Bilgi Derecelendirme Sınıfları (Information Grading)

Ajan, analiz ve planlama sırasında kullandığı tüm bilgileri aşağıdaki 3 sınıfa ayırmak ve doğruluğunu teyit etmek zorundadır:

*   **Verified (Doğrulanmış)**:
    *   *Kriter*: Ajanın dosya okuma (`view_file`) veya arama (`grep_search`) aracıyla doğrudan gördüğü, varlığı kesin olan kod blokları ve dosyalar.
    *   *Kural*: Güvenle kullanılabilir, ek doğrulamaya gerek yoktur.
*   **Inferred (Çıkarılmış)**:
    *   *Kriter*: Projedeki diğer dosyalardan yola çıkılarak var olduğu mantıksal olarak tahmin edilen ancak henüz doğrudan okunmamış olan yapılar. (Örn: `UserService` varsa `UserRepository` de vardır çıkarımı).
    *   *Kural*: Kullanılmadan önce mutlaka ilgili dosya okunarak doğrulanmış (Verified) statüsüne çekilmelidir.
*   **Unknown (Bilinmeyen)**:
    *   *Kriter*: Projede varlığına dair hiçbir iz olmayan, tamamen ajanın kendi hafızasındaki genel bilgilerden veya tahminlerden oluşan yapılar.
    *   *Kural*: **ASLA KULLANMA**. Önce arama yapıp varlığını kanıtla, kanıtlayamıyorsan bu yapının olmadığını kabul et.

---

## 2. Halüsinasyon Kontrol Listesi (Self-Check Checklist)

Ajan planı hazırladıktan sonra şu soruları kendine sorarak halüsinasyon kontrolü yapar:
1.  *Import ettiğim veya çağırdığım tüm sınıfların ve metodların varlığını bizzat dosyasını açarak doğruladım mı?*
2.  *Uzak sunucu API uçlarının veya kütüphane versiyonlarının doğruluğunu projeden teyit ettim mi?*
3.  *Koda eklediğim mantık projenin başka bir yerindeki logic ile çelişiyor mu?*

# Geliştirme Öz-Kritik Denetimi (Self Critique Review)

Öz-Kritik Denetimi, ajanın kod yazma işlemini tamamladıktan sonra, ürettiği çözümü teslim etmeden önce sorması gereken eleştirel soruları tanımlar. Amaç, kodun kalitesini ve taklit doğruluğunu artırmaktır.

---

## 1. Eleştirel Öz-Sorgulama Soruları (Self Critique)

Ajan, geliştirdiği kod bloklarını satır satır incelerken kendine aşağıdaki soruları sormalıdır:

1.  **En Basit Çözüm Mü? (Simplicity)**:
    *   *Soru*: Bu problemi çözmek için yazabileceğim en sade, en az karmaşık kod bu mu? Yoksa gereksiz sınıflar/soyutlamalar mı ekledim?
2.  **Orijinal Ekip Böyle Yazar Mıydı? (Imitation)**:
    *   *Soru*: Bu projeyi geliştiren orijinal yazılım ekibi benim yazdığım kodu görseydi, projenin kendi parçası gibi mi algılardı yoksa yabancı bir geliştiricinin elinden çıktığını anlar mıydı?
3.  **Mükerrer Kod Yazdım Mı? (Duplication)**:
    *   *Soru*: Bu işlevi projede zaten yapan başka bir fonksiyon veya servis varken, ben benzerini sıfırdan mı yazdım?
4.  **Bilinçli Yorum ve Yönergeleri Korumak**:
    *   *Soru*: Değişiklik yaptığım dosyalardaki alakasız yorum satırlarını ve javadoc açıklamalarını yanlışlıkla sildim mi veya bozdum mu?

---

## 2. Denetim Sonrası Aksiyon
*   Eğer yukarıdaki sorulardan herhangi birine verilen yanıt olumsuz ise, ajan çıktıyı onaylamaz.
*   `runtime/events.md` üzerinden `OnReflectionFailed` olayı tetiklenerek kodun düzeltilmesi aşamasına geri dönülür.

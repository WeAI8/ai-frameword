# Kod Güvenlik Denetimi (Security Review)

Bu modül, kod yazımı tamamlandıktan sonra, üretilen çıktıda olası güvenlik açıklarının (SQL Injection, XSS, yetkilendirme bypass vb.) bulunup bulunmadığını son kez denetleyen kontrol listesini tanımlar.

---

## 1. Güvenlik Kontrol Listesi (Security Checklist)

Denetçi Ajan, yazılan kodu şu güvenlik kriterlerine göre inceler:

*   **SQL Injection ve Veri Güvenliği**:
    - [ ] SQL sorgularında dışarıdan gelen değişkenler için her zaman Bind Variable (bağlama değişkeni) kullanılmış.
    - [ ] Dinamik string birleştirme yöntemiyle SQL sorgusu oluşturulmamış.
*   **Girdi Doğrulama ve Sanitizasyon (Input Validation)**:
    - [ ] Dış dünyadan (API parametreleri, formlar) alınan tüm girdiler sınır kontrolünden (length, range) ve tip kontrolünden geçmiş.
    - [ ] XSS (Cross-Site Scripting) saldırılarını engellemek için HTML çıktıları sanitize edilmiş.
*   **Yetkilendirme ve Kimlik Doğrulama (Auth Check)**:
    - [ ] Yeni eklenen API uçları yetki kontrolü (Örn: `@PreAuthorize`, `@RolesAllowed`) ile korunuyor. Yetkisiz veri sızması engellenmiş.
*   **Hassas Veri Sızıntısı**:
    - [ ] Loglama sırasında şifre, kredi kartı numarası, kişisel veriler (KVKK) gibi hassas bilgiler log dosyalarına yazılmamış.

---

## 2. İhlal Durumu ve Aksiyon
*   Güvenlik maddelerinden herhangi birinde ihlal tespit edilirse, kod kesinlikle canlıya alınmaz.
*   Risk puanı (`risk-scoring.md`) maksimuma çekilir ve acil rollback tetiklenir.

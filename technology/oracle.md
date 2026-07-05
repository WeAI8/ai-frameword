# Oracle SQL Teknoloji Standartları (Oracle Tech Pack)

Bu belge, Oracle veritabanı kullanan projelerde yapay zeka geliştiricisinin uyması gereken SQL yazım, performans ve veri modeli standartlarını tanımlar.

---

## 1. Bind Variable (Bağlama Değişkeni) Kullanımı
Oracle veritabanında en kritik performans kurallarından biri SQL sorgularının parse (ayrıştırma) maliyetini düşürmektir.
*   **Kural**: SQL sorgularında dinamik filtre değerleri için asla literal (doğrudan string birleştirme ile) değer kullanma. Her zaman **Bind Variable** (örn: JPQL'de `:userId`, JDBC'de `?`) kullan.
*   **Gerekçe**:
    1.  *Shared Pool Optimizasyonu*: Oracle sorgunun execution planını (çalıştırma planını) önbelleğe alır. Bind variable kullanıldığında sorgu "Soft Parse" ile hızlıca çalıştırılır. Literal kullanıldığında her farklı değer için yeni bir "Hard Parse" yapılır ve işlemciyi yorar.
    2.  *SQL Injection Koruması*: SQL sorgularına dışarıdan parametre sızdırılması engellenir.

---

## 2. İndeks Kullanımı ve Sorgu Performansı
*   **WHERE Koşulları**: Sorgularda filtre olarak kullanılan veya JOIN işlemlerinde bağlanan kolonların indeksli olduğundan emin ol.
*   **İndeks Kırma Hataları**: İndeksli kolonları fonksiyonlar içinde kullanmaktan kaçın. Fonksiyon kullanımı indeksi devre dışı bırakır.
    *   *Kötü*: `WHERE UPPER(email) = 'TEST@TEST.COM'` (email üzerinde standart indeks varsa çalışmaz).
    *   *İyi*: `WHERE email = :email` (değeri Java tarafında uppercase yapıp gönder).
*   **LIKE Sorguları**: Wildcard (`%`) karakterini aramanın başına koymaktan kaçın. `LIKE '%deger'` indeksi kullandırtmaz (Full Table Scan yapar). Mümkünse `LIKE 'deger%'` tercih et.

---

## 3. Veritabanı Nesneleri ve Veri Tipleri
*   **Sequence (Dizi) Kullanımı**: Benzersiz ID üretimi için Oracle Sequence nesneleri kullanılmalıdır. Entity tanımlarında `@SequenceGenerator` ile eşleme yapılmalıdır.
*   **Veri Tipleri Standartları**:
    *   Yazı alanları için `VARCHAR2` (maksimum boyut belirtilerek) kullanılmalıdır. `CHAR` tipi kullanılmamalıdır (gereksiz boşluk doldurma yapar).
    *   Tarih ve zaman bilgisi için `DATE` veya `TIMESTAMP` tipleri kullanılmalıdır. Tarih verisi string olarak saklanmamalıdır.
    *   Sayısal alanlar için hassasiyet belirtilerek `NUMBER` (örn: `NUMBER(10,2)`) kullanılmalıdır.

---

## 4. Sorgu Yazım ve İşlem Kuralları
*   **SELECT * Yasağı**: Sorgularda asla `SELECT *` kullanma. Sadece ihtiyacın olan kolonları ismen belirt. Bu kuralla ağ trafiği (network overhead) ve memory kullanımı azaltılır.
*   **JOIN Standartları**: ANSI SQL JOIN standartlarını (`INNER JOIN`, `LEFT OUTER JOIN` vb.) kullan. Oracle'a özel `(+)` operatörünü kullanmaktan kaçın.
*   **Transaction Yönetimi**: DML (Insert, Update, Delete) işlemlerinden sonra transaction'ı doğru yönet (Spring tarafında `@Transactional` ile commit/rollback işlemlerinin otomatik yapıldığından emin ol).

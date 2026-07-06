# Kod Performans Denetimi (Performance Review)

Bu modül, kod yazımı tamamlandıktan sonra, üretilen çıktının sistem kaynaklarını verimli kullanıp kullanmadığını, potansiyel performans darboğazlarını (N+1 sorguları, döngü karmaşıklığı, kaynak sızıntıları) denetleyen kontrol listesini tanımlar.

---

## 1. Performans Kontrol Listesi (Performance Checklist)

Denetçi Ajan, yazılan kodu şu performans kriterlerine göre inceler:

*   **Veritabanı Sorgu Verimliliği**:
    - [ ] Kod içinde döngüsel veritabanı çağrısı (N+1) bulunmuyor.
    - [ ] Sorgular indeksli kolonlar üzerinden çalışacak şekilde tasarlanmış (indeks kırma hataları yapılmamış).
*   **Kaynak ve Bellek Yönetimi (Resource Leaks)**:
    - [ ] Açılan tüm veritabanı bağlantıları, dosya akışları (I/O Streams) ve ağ soketleri `try-with-resources` veya `finally` bloklarında güvenli bir şekilde kapatılmış.
    - [ ] Gereksiz nesne oluşturulması (object allocation) ve gereksiz bellek tüketimi (memory leaks) engellenmiş.
*   **Algoritma Karmaşıklığı**:
    - [ ] Zaman karmaşıklığı $O(N^2)$ ve üzerinde olan gereksiz döngüler optimize edilmiş.
*   **Ağ ve API Verimliliği**:
    - [ ] API yanıtlarında büyük veri kümeleri pagination (sayfalama) ile sınırlandırılmış.

---

## 2. Denetim Sonrası Aksiyon
*   Performans denetiminde başarısız olan kod blokları orkestratör tarafından geri paslanır ve Geliştirici Ajanın kodu optimize etmesi istenir.

# Performans Politikası (Performance Heuristics)

Bu politika, ajanın kod yazarken veya değiştirirken sistem kaynaklarını (CPU, bellek, ağ ve veritabanı bağlantıları) verimli kullanmasını sağlar.

---

## 1. Veritabanı ve Ağ Optimizasyonu
*   **N+1 Sorgu Önleme (N+1 Query Prevention)**: Döngüler içinde veritabanı sorguları (SQL/JPA) çalıştırma. Verileri toplu (Batch/Bulk) veya JOIN kullanarak tek seferde çek.
*   **Gereksiz Veri Çekmeme**: İhtiyacın olmayan kolonları veritabanından çekme. `SELECT *` yasağına uy ve sadece DTO alanlarını dolduracak kolonları seç.
*   **Ağ Paket Yükü (Network Overhead)**: API çıktılarında gereksiz derinlikte nested (iç içe) nesneler göndermek yerine düzleştirilmiş (flat) DTO'lar tercih et.

---

## 2. Bellek ve Döngü Yönetimi
*   **Gereksiz Nesne Oluşturmama**: Döngüler içinde sürekli yeni nesneler (`new Object()`) örneklemek yerine, nesneleri döngü dışında tanımlamaya çalış.
*   **Döngü Karmaşıklığı**: İç içe (nested) 3 veya daha fazla döngü kullanmaktan kaçın. Zaman karmaşıklığını (Time Complexity) $O(N^2)$'den $O(N)$ seviyesine çekmek için HashMap/Set yapılarını kullan.
*   **Büyük Veri İşleme (Big Data)**: Bellek aşımını (Out of Memory) önlemek için büyük veri yığınlarını parçalar halinde (chunk/pagination) oku ve işle.

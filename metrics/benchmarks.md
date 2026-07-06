# Benchmark Ölçüm ve Stabilizasyon Kılavuzu (metrics/benchmarks.md)

---

## 1. Amaç (Purpose)
Framework'ün kararlılığını, token verimliliğini ve büyük ölçekli projelerdeki (Spring Boot, React, Flutter, Oracle/PLSQL) mimari koruma başarısını ampirik verilerle ölçmek.

---

## 2. Benchmark Ölçüm Kriterleri

Ajanın performansı her majör sürümde veya büyük test döngüsünde aşağıdaki 6 gösterge üzerinden ölçülür:

1.  **Mimari Koruma Oranı (Architecture Preservation) [Hedef: >%95]**:
    *   *Ölçüm*: Geliştirilen kodlardaki katman baypası, entity sızması veya dairesel import ihlallerinin toplam kod satırına oranı.
2.  **Mükerrer Kod Azaltımı (Duplicate Reduction) [Hedef: >%50]**:
    *   *Ölçüm*: Benzer bir işlev varken sıfırdan yazılan kod bloklarının oranı. `evidence.md` ve `memory/strategy.md` kullanımı ile takip edilir.
3.  **Gereksiz Soru Oranı (Clarification Questions) [Hedef: <%20]**:
    *   *Ölçüm*: Kullanıcıya sorulan soruların kaçının çıkarım (inference) yetersizliğinden kaynaklandığı, kaçının önemsiz detaylar olduğu.
4.  **Uygulama Doğruluğu (Implementation Accuracy)**:
    *   *Ölçüm*: Kodun kabul kriterlerini ilk iterasyonda (seferde) hatasız karşılama oranı.
5.  **Token Tüketimi (Token Usage)**:
    *   *Ölçüm*: Görev boyunca harcanan toplam prompt ve completion token miktarı. `context-budget.md` etkinliği ölçülür.
6.  **İş Bitirme Süresi (Completion Time)**:
    *   *Ölçüm*: Talebin alınmasından nihai teslimata (`OnTaskComplete`) kadar geçen süre.

---

## 3. Test ve Stabilizasyon Ortamları

Benchmark testleri aşağıdaki resmi referans projeleri üzerinde koşturulmalıdır:
*   *Backend*: Spring Boot 3 REST API projesi.
*   *Frontend*: React.js (Functional components, Context API) projesi.
*   *Mobil*: Flutter (BLoC, Clean Architecture) projesi.
*   *Veritabanı*: Oracle SQL ve PL/SQL sorgu optimizasyon ortamı.

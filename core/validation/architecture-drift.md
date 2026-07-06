# Mimari Kayma ve Aşınma Koruyucusu (core/validation/architecture-drift.md)

---

## 1. Amaç (Purpose)
Geliştirilen kodların projenin katman sınırlarını, bağımlılık yönlerini ve yapısal mimarisini bozmasını (drift/erozyon) ArchUnit gibi kodlaştırılmış testlerle engellemek.

---

## 2. Sorumluluklar (Responsibilities)
*   Katman sınırlarının ihlal edilip edilmediğini denetlemek.
*   Mimari kuralları doğal dil yerine otomatik birim testlerine (Java'da ArchUnit, JS'de dependency-cruiser vb.) dönüştüren denetimleri çalıştırmak.
*   İhlal durumunda acil rollback/recovery akışını tetiklemek.

---

## 3. Girdiler (Inputs)
*   Önerilen kod değişiklikleri taslağı.
*   ArchUnit veya benzeri mimari test sonuçları.

---

## 4. Çıktılar (Outputs)
*   Mimari Uyum Skoru.
*   İhlal durumunda `OnArchitectureViolation` olayı.

---

## 5. Bağımlılıklar (Dependencies)
*   `core/architecture.md`
*   `metrics/architecture-score.md`

---

## 6. Kurallar (Rules)
*   **Deterministik Test Zorunluluğu**: Mimari kurallar doğal dil yönlendirmeleri ile değil, mutlaka kod olarak yazılmış otomatik birim testleri (ArchUnit kuralları) üzerinden doğrulanmalıdır.
    *   *Kural*: Arayüz katmanı veri erişim katmanına doğrudan bağımlı olamaz (`classes().that().resideInAPackage("..controller..").should().onlyHaveDependenciesInAnyPackage("..service..")`).
    *   *Kural*: Domain Core katmanı dış dünyaya ve adaptörlere bağımlılık içeremez.

---

## 7. Hata Durumları (Failure Cases)
*   *Mimari Aşınma*: ArchUnit testleri başarısız olursa, kodlama durdurulur, `OnArchitectureViolation` tetiklenir, risk puanı 10 yapılır ve plan revizyon döngüsüne girilir.

---

## 8. Örnekler (Examples)
*   *ArchUnit Örneği*: `noClasses().that().resideInAPackage("..service..").should().dependOnClassesThat().resideInAPackage("..controller..")` kuralının test olarak koşturulması.

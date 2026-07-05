# Spring Boot Teknoloji Standartları (Spring Boot Tech Pack)

Bu belge, Java ve Spring Boot framework'ü kullanılan projelerde yapay zeka geliştiricisinin uyması gereken katı mimari, tasarım ve kodlama standartlarını tanımlar.

---

## 1. Katman Sorumlulukları ve İletişim Kuralları

Spring Boot projelerinde 3 katmanlı standart mimariye (Three-Tier Architecture) katı bir şekilde uyulmalıdır:

### A. Denetleyici Katmanı (Controller Layer - Presentation)
*   **Anotasyon**: `@RestController` ve `@RequestMapping` kullanılır.
*   **Kurallar**:
    *   Sadece REST API uçlarını (endpoints) tanımlar.
    *   HTTP status kodlarını (`200 OK`, `201 Created`, `400 Bad Request` vb.) doğru yönetir.
    *   Girdi doğrulamalarını (validation) tetikler (`@Valid` veya `@Validated` ile).
    *   **KESİNLİKLE** iş mantığı (business logic) içeremez. Doğrudan Repository katmanını çağıramaz; araya Service enjekte edilmelidir.

### B. İş Mantığı Katmanı (Service Layer - Business Logic)
*   **Anotasyon**: `@Service` kullanılır.
*   **Kurallar**:
    *   Sistemin tüm iş mantığı (kurallar, hesaplamalar, kontroller) sadece bu katmanda yazılır.
    *   İşlemlerin veritabanı tutarlılığı için gerekli yerlerde `@Transactional` anotasyonu kullanılır.
    *   **Zorunluluk**: Interface ve Implementation ayrımı yapılmalıdır. (Örn: `UserService` interface ve `UserServiceImpl` sınıfı).

### C. Veri Erişim Katmanı (Repository Layer - Data Access)
*   **Anotasyon**: `@Repository` kullanılır.
*   **Kurallar**:
    *   Sadece veritabanı CRUD ve sorgu işlemlerini barındırır.
    *   Spring Data JPA (`JpaRepository`) standartları tercih edilir.
    *   Karmaşık sorgular için JPQL veya Criteria API kullanılır. Native SQL kullanımı minimumda tutulmalıdır.

---

## 2. Veri Transfer Modelleri (DTO vs. Entity)
*   **Entity Sorumluluğu**: Veritabanı tablolarıyla eşlenen sınıflardır (`@Entity`, `@Table`). Bu sınıflar servis katmanının dışına (Controller veya client tarafına) **asla sızdırılmamalıdır**.
*   **DTO (Data Transfer Object) Sorumluluğu**: Controller'dan servis katmanına veri taşımak (`RequestDTO`) ve servisten dış dünyaya yanıt dönmek (`ResponseDTO`) için kullanılır.
*   **Dönüşüm (Mapping)**: Entity - DTO dönüşümleri servis katmanında veya özel mapper sınıflarında (MapStruct vb.) yapılmalıdır.

---

## 3. Hata Yönetimi (Exception Handling)
*   Projede merkezi hata yönetimi (`@RestControllerAdvice`) kullanılmalıdır.
*   Her iş kuralı hatası için generic exception'lar (`RuntimeException`) yerine anlamlı custom exception sınıfları (örn: `UserNotFoundException`, `InsufficientBalanceException`) tanımlanmalıdır.
*   İstemciye (client) dönen hata nesnesi standart bir formatta (örn: timestamp, status code, error message, path) olmalıdır.

---

## 4. Girdi Doğrulama (Validation)
*   Tüm API isteklerindeki DTO'lar javax/jakarta validation anotasyonları (`@NotNull`, `@Size`, `@Email`, `@Min`, `@Max` vb.) ile kısıtlanmalıdır.
*   Controller parametresinde `@Valid` anotasyonu kullanılarak isteklerin otomatik doğrulanması sağlanmalıdır.
*   Doğrulama hataları yakalanıp istemciye anlamlı hata mesajları olarak dönülmelidir.

---

## 5. Lombok Standartları
*   Lombok boilerplate kodları azaltmak için kullanılabilir:
    *   Sınıflarda `@Getter`, `@Setter` kullanımı önerilir.
    *   Yapıcı metotlar için `@NoArgsConstructor` ve `@AllArgsConstructor` kullanılabilir.
    *   **UYARI**: `@Data` anotasyonu circular dependency (döngüsel bağımlılık) ve performans sorunlarına yol açabileceği için JPA entity sınıflarında kullanılmamalıdır. Entity sınıflarında `@EqualsAndHashCode` ve `@ToString` özellikleri sınırlandırılmalıdır.

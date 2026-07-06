# ASP.NET Core + React Yetenek Kuralları (skills/arch-aspnet-react.md)

---

## 1. Amaç (Purpose)
ASP.NET Core (.NET 7/8) ve React (JavaScript/TypeScript SPA) mimari yığınını kullanan projelerde entegrasyon standartlarını tanımlamak.

---

## 2. Entegrasyon Standartları
*   **SPA Entegrasyonu**: React kodu `ClientApp/` klasöründe tutulmalı; ASP.NET Core SPA ara katmanı (SpaServices) kullanılarak geliştirme esnasında proxy ile bağlanmalı, üretim aşamasında derlenerek web sunucusuna gömülmelidir.
*   **Veri Tabanı Erişimi**: Tüm SQL/NoSQL veri işlemleri Entity Framework Core ORM katmanı üzerinden yönetilmelidir.
*   **Kimlik Doğrulama**: Kurumsal kimlik entegrasyonları için IdentityServer4, OAuth2 veya Azure Active Directory (Azure AD/OIDC) tercih edilmelidir.

---

## 3. Kodlama ve Derleme Kuralları
*   **Birim Testler**: .NET tarafında xUnit; React tarafında Jest ve React Testing Library kullanılmalıdır.
*   **API Sözleşmesi**: REST uçları için Swagger/OpenAPI otomatik dokümantasyonu aktif edilmelidir.

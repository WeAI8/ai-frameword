# NestJS + Angular Yetenek Kuralları (skills/arch-nestjs-angular.md)

---

## 1. Amaç (Purpose)
NestJS (Node.js) ve Angular mimari yığınını kullanan tam yığın TypeScript projelerinde entegrasyon kurallarını tanımlamak.

---

## 2. Entegrasyon Standartları
*   **Monorepo Yapısı**: Projeler Nx monorepo araçlarıyla yönetilmeli; DTO'lar (Data Transfer Objects) ve tip tanımları ön uç ve arka uç arasında ortak kütüphaneler (`libs/`) üzerinden paylaşılmalıdır.
*   **Modüler Mimari**: NestJS mimarisi (modüller, servisler, controller'lar) Angular DI (Dependency Injection) yapısıyla paralel sürdürülmelidir.
*   **Veri Tabanı**: TypeORM veya Mongoose (MongoDB) ORM/ODM kütüphaneleri kullanılmalıdır.

---

## 3. Kodlama ve Derleme Kuralları
*   **Birim Testler**: Hem NestJS hem de Angular tarafında Jest test kütüphanesi yapılandırılmalıdır.
*   **Hata Yönetimi**: Global Exception Filter'lar kullanılarak tüm asenkron Node.js hataları yakalanmalı ve loglanmalıdır.

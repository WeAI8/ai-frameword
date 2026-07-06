# Spring Boot + Angular Yetenek Kuralları (skills/arch-springboot-angular.md)

---

## 1. Amaç (Purpose)
Spring Boot 3 (Java) ve Angular 16 (TypeScript) mimari yığınını kullanan projelerde entegrasyon ve kodlama standartlarını tanımlamak.

---

## 2. Entegrasyon Standartları
*   **Katmanlı Mimari Sınırları**: Frontend Angular bileşenleri doğrudan veri tabanına erişemez. Tüm istekler Spring REST controller uçlarına gitmelidir.
*   **CORS Yapılandırması**: Geliştirme aşamasında Angular CLI proxy'si (`proxy.conf.json`) kullanılmalı; üretimde CORS politikaları sadece izin verilen ana bilgisayarlara (domain) göre Spring Security üzerinden kısıtlanmalıdır.
*   **Kimlik Doğrulama**: REST API istekleri Spring Security + JWT (JSON Web Token) taşıyıcı başlığı (`Authorization: Bearer <token>`) ile yetkilendirilmelidir.

---

## 3. Kodlama ve Derleme Kuralları
*   **Dizin Şeması**: Backend kodları `backend/`, frontend kodları `frontend/` monorepo yapısında tutulmalıdır.
*   **Birim Testler**: Spring tarafında JUnit 5 ve Testcontainers; Angular tarafında Jasmine/Karma kullanılmalıdır.

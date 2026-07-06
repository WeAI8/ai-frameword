# Roman Okusana - Proje Kapsamı (memory-bank/projectbrief.md)

---

## 1. Proje Tanımı ve Hedef
**Roman Okusana**, kullanıcıların internetten otomatik olarak çekilen hafif romanları (Light Novel) ve web romanlarını okuyabildiği, temiz, duyarlı ve premium tasarımlı bir novel okuma platformudur.
Proje Spring Boot 3 (Java) ve Angular 16+ (TypeScript) teknoloji yığınını kullanmaktadır.

---

## 2. Temel Gereksinimler
*   **Üye Giriş Kısıtlaması**: Normal okuyucular siteye giriş yapamaz. Sadece sistem yöneticisi (Admin) kimlik bilgileri ile giriş yapabilir.
*   **Yönetici Yetkileri**: Admin hikayeleri, kategorileri ve bölümleri ekleyebilir, düzenleyebilir veya silebilir.
*   **Otomatik Tarayıcı (Web Scraper)**: Sistem, admin tarafından istek listesine eklenen roman isimlerini internet üzerinden (NovelArrow API endpoints) otomatik olarak bulup, bölümlerini sırasıyla sisteme kaydeder.
*   **Reklam ve İşaret Temizliği**: Tarayıcı, bölümlerdeki tüm sponsor linklerini, reklam banner metinlerini, anlamsız sembolleri temizleyerek metinleri veritabanına kaydeder.
*   **Son Eklenen Bölümler Akışı**: Ana sayfada en son güncellenen/eklenen bölümler listelenir.

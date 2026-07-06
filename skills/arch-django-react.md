# Django + React Yetenek Kuralları (skills/arch-django-react.md)

---

## 1. Amaç (Purpose)
Django (Python) backend ve React ön uç mimari yığınını kullanan projelerde entegrasyon kurallarını tanımlamak.

---

## 2. Entegrasyon Standartları
*   **REST API Sözleşmesi**: Django REST Framework (DRF) kullanılarak JSON API uç noktaları tasarlanmalıdır.
*   **Asenkron İş Yükleri**: Milyonlarca kaydı işleyecek arka plan görevleri ve kuyruk yönetimi için Celery + Redis/RabbitMQ entegre edilmelidir.
*   **Güvenlik ve CORS**: Django tarafında `django-cors-headers` ile CORS izinleri yönetilmeli; kullanıcı oturumları JWT veya DRF Token Auth ile korunmalıdır.

---

## 3. Kodlama ve Derleme Kuralları
*   **Birim Testler**: Python tarafında PyTest; React tarafında Jest ve React Testing Library kullanılmalıdır.
*   **Veritabanı**: Django ORM ile PostgreSQL veya Oracle DB migrations uyumu korunmalıdır.

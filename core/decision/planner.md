# Planlayıcı Motoru (Planner Engine)

Planlayıcı, toplanan kanıtlar ve verilen kararlar doğrultusunda, kodlama aşamasına geçmeden önce kullanıcıdan onay alınacak teknik uygulama planını (`implementation_plan.md`) üreten motordur.

---

## 1. Uygulama Planı Üretim Kriterleri

Planlayıcı, planı oluştururken aşağıdaki standartlara uymak zorundadır:

*   **Dosya Kategorizasyonu**: Değişecek tüm dosyalar ismen belirtilmeli ve `[NEW]`, `[MODIFY]`, `[DELETE]` etiketleriyle işaretlenmelidir.
*   **Bağımlılık Sıralaması (Dependency Ordering)**: Planlanan dosya değişiklikleri mantıksal bağımlılık sırasına göre yazılmalıdır (Örn: Veritabanı şeması ve DTO'lar ilk sırada, Servis katmanı ikinci sırada, Controller ve UI en son sırada yazılmalıdır).
*   **Kanıt Entegrasyonu**: Planda değiştirilecek veya oluşturulacak her dosya için, gerekçe olarak `core/decision/evidence.md` tarafından bulunan kanıtlar referans gösterilmelidir.

---

## 2. Etki Analizi (Impact Analysis)

Planlayıcı, önerilen değişikliğin sistem üzerindeki etki alanını analiz etmeli ve şu başlıkları plana eklemelidir:
1.  **Etkilenen Katmanlar**: Değişikliğin sınırları (Örn: Sadece frontend mi, veritabanını etkiliyor mu?).
2.  **Geriye Dönük Uyumluluk (Backward Compatibility)**: API uçlarının veya veritabanı tablolarının mevcut versiyonlarla uyumlu çalışıp çalışmayacağı.
3.  **Performans Etkisi**: Eklenen sorgunun veya arayüz bileşeninin potansiyel yükü.

# Planlayıcı Motoru (core/decision/planner.md)

---

## 1. Amaç (Purpose)
Geliştirme öncesinde, yapılacak tüm dosya değişikliklerini, bağımlılık önceliklerini ve etki alanlarını gösteren onaylanabilir bir teknik plan (`implementation_plan.md`) üretmek.

---

## 2. Sorumluluklar (Responsibilities)
*   Değişecek dosyaları `[NEW]`, `[MODIFY]`, `[DELETE]` olarak sınıflandırmak.
*   Değişiklikleri mantıksal bağımlılık sırasına (Dependency Ordering) göre sıralamak.
*   Mimari, performans ve güvenlik risk etki analizini yapmak.

---

## 3. Girdiler (Inputs)
*   Kabul kriterleri (Acceptance Criteria).
*   Kanıt Motorundan (`evidence.md`) gelen kod örnekleri.
*   Risk puanları (`heuristics/risk-scoring.md`).

---

## 4. Çıktılar (Outputs)
*   Teknik Uygulama Planı (`implementation_plan.md` şablonuna uygun).

---

## 5. Bağımlılıklar (Dependencies)
*   `heuristics/risk-scoring.md`
*   `templates/implementation-plan.md`

---

## 6. Kurallar (Rules)
*   **Bağımlılık Önceliği**: Bağımlı olunan alt katmanlar (Örn: DTO, DB Tablosu) en üstte, üst katmanlar (UI, Controller) en altta planlanmalıdır.
*   **Kanıt Bağlantısı**: Plandaki her değişiklik gerekçelendirilerek kanıtlara link verilmelidir.

---

## 7. Hata Durumları (Failure Cases)
*   *Etki Alanı Belirsizliği*: Değişikliğin geriye dönük uyumluluğu bozma riski varsa planı oluşturma; önce `Question Engine` ile netleştir.

---

## 8. Örnekler (Examples)
*   *Plan Sırası*: 
    1. `[NEW] src/dto/UserDTO.java`
    2. `[MODIFY] src/services/UserService.java`
    3. `[MODIFY] src/controllers/UserController.java`

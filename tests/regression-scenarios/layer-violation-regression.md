# Test Senaryosu: Mimari Aşınma ve Regresyon (Regression Scenario)

---

## 1. Girdi (Input)
*   **Talep**: "Kullanıcı listesini çeken bir REST ucu yazın. Veritabanından gelen User Entity sınıfını doğrudan ResponseEntity içinde dönün."
*   **İlişkili Dosyalar**: `src/controllers/UserController.java` (Spring Boot projesinde test ediliyor).

---

## 2. Beklenen Düşünme Yolu (Expected Reasoning Path)
1.  **Gözlemle (Observe)**: Talebi analiz et. Entity sınıfının doğrudan dış dünyaya dönülmesi talebi mevcut.
2.  **Konumlan (Orient)**: `core/validation/architecture-drift.md` altındaki "Entity İzolasyonu" kuralını oku.
3.  **Karar Ver (Decide)**:
    *   Entity doğrudan dönülürse `metrics/architecture-score.md` puanı 80'in altına düşecektir (İhlal: Entity Sızdırma).
    *   *Aksiyon*: Talebi bu şekilde uygulamayı reddet. Ajanın `OnArchitectureViolation` olayı tetiklenmelidir.
    *   *Çözüm*: Kullanıcıya DTO kullanılması gerektiğini açıklayan bir plan sun.
4.  **Uygula (Act)**: DTO eşlemeli (mapping) güvenli kodu tasarla.
5.  **Ölç/Öğren (Measure)**: Skoru doğrula.

---

## 3. Beklenen Çıktı (Expected Output)
*   Doğrudan Entity dönen kod yazılmamalıdır.
*   Yerine `UserResponseDTO` nesnesini dönen güvenli bir Controller kodu planlanmalıdır.

---

## 4. Başarı / Başarısızlık Kriterleri (Pass/Fail Criteria)
*   **Başarılı (Pass)**: Ajanın mimari ihlali (drift) kod yazılmadan önce yakalaması, kod yazmayı reddetmesi ve düzeltilmiş güvenli planı sunması.
*   **Başarısız (Fail)**: Ajanın talebi körü körüne uygulayarak Entity sızdıran güvensiz kodu yazması ve mimari aşınmaya sebep olması.

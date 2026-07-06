# Test Senaryosu: Kod İyileştirme (Refactor Scenario)

---

## 1. Girdi (Input)
*   **Talep**: "app.js içindeki tarih ve saat doğrulama mantığı çok karmaşıklaştı. Bu mantığı ayrı bir yardımcı fonksiyona (`DateUtils.js`) çıkararak sadeleştirin."
*   **İlişkili Dosyalar**: `examples/todo-app/app.js`

---

## 2. Beklenen Düşünme Yolu (Expected Reasoning Path)
1.  **Gözlemle (Observe)**: `app.js` içindeki `calculateTaskStatus` ve form submit olayındaki tarih/saat kontrol satırlarını bul.
2.  **Konumlan (Orient)**: Bu kontrollerin kod karmaşıklığını (`metrics/complexity.md`) artırıp artırmadığını değerlendir.
3.  **Karar Ver (Decide)**:
    *   *Yeni Yardımcı Dosya*: `examples/todo-app/DateUtils.js` dosyasını oluştur ve `isPastDue(date, endTime)` gibi static metotlar ekle.
    *   *Düzenleme*: `app.js` içinden bu yeni fonksiyonları çağır.
4.  **Uygula (Act)**: Refactoring işlemini yap.
5.  **Ölç/Öğren (Measure)**: `metrics/complexity.md` skorunun düştüğünü ve tüm testlerin yeşil olduğunu teyit et.

---

## 3. Beklenen Çıktı (Expected Output)
*   [DateUtils.js](file:///f:/ai-freamework/examples/todo-app/DateUtils.js) (Yardımcı dosya).
*   [app.js](file:///f:/ai-freamework/examples/todo-app/app.js) (Temizlenmiş ve karmaşıklığı azaltılmış versiyon).

---

## 4. Başarı / Başarısızlık Kriterleri (Pass/Fail Criteria)
*   **Başarılı (Pass)**: Kod karmaşıklığı azalmış, tarih karşılaştırma mantığı sorunsuz çalışıyor ve mevcut görev kartı renkleri bozulmamış.
*   **Başarısız (Fail)**: Geriye dönük uyumluluğun bozulması (örn: mevcut kartların renklerinin yanlış hesaplanması) veya `app.js` dosyasında import hataları oluşması.

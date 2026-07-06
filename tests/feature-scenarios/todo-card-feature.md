# Test Senaryosu: Yeni Özellik Ekleme (Feature Scenario)

---

## 1. Girdi (Input)
*   **Talep**: "Karta tıklandığında görevin detaylarını gösteren bir popup modal açılsın."
*   **İlişkili Dosyalar**: `examples/todo-app/index.html`, `examples/todo-app/app.js`

---

## 2. Beklenen Düşünme Yolu (Expected Reasoning Path)
1.  **Gözlemle (Observe)**: `index.html` içinde modal için bir HTML yapısı var mı kontrol et (Varsayım: Yok).
2.  **Konumlan (Orient)**: Mevcut `style.css` altındaki glassmorphism CSS kurallarını oku.
3.  **Karar Ver (Decide)**:
    *   *Yeni HTML*: Modal yapısını içeren `<div id="task-modal" class="modal">` alanını `index.html`'e ekle.
    *   *Yeni CSS*: Modal'ın açılıp kapanma animasyonlarını ve görünümünü `style.css`'e ekle.
    *   *Yeni JS*: Tıklama olay dinleyicisini (event listener) `app.js`'e ekle ve localStorage'dan verileri çekerek modal içeriğini doldur.
4.  **Uygula (Act)**: Kodları minimal olarak yaz.
5.  **Ölç/Öğren (Measure)**: `metrics/architecture-score.md` puanının 100 olduğunu doğrula.

---

## 3. Beklenen Çıktı (Expected Output)
*   [index.html](file:///f:/ai-freamework/examples/todo-app/index.html) içinde modal HTML kodları.
*   [app.js](file:///f:/ai-freamework/examples/todo-app/app.js) içinde `showModal(todoId)` ve `closeModal()` fonksiyonları.

---

## 4. Başarı / Başarısızlık Kriterleri (Pass/Fail Criteria)
*   **Başarılı (Pass)**: Modal HTML'i eklenmiş, tıklandığında doğru ürün ID'si ile veriler gösteriliyor ve sayfa yenilense dahi kodlar bozulmuyor.
*   **Başarısız (Fail)**: Modal açıldığında tarayıcı konsolunda `undefined` veya null-pointer hatası oluşması, ya da modal CSS kodlarının glassmorphism uyumunu bozması.

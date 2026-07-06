# Test Senaryosu: Hata Giderme (Bug Scenario)

---

## 1. Girdi (Input)
*   **Talep/Hata Bildirimi**: "Görev ekleme formundaki 'Görev Ekle' butonuna basıldığında form temizleniyor ama görev listeye eklenmiyor."
*   **Hata Logu / Stack Trace**: `Uncaught TypeError: Cannot read properties of null (reading 'addEventListener') at app.js:150`

---

## 2. Beklenen Düşünme Yolu (Expected Reasoning Path)
1.  **Gözlemle (Observe)**: `index.html` dosyasında formun ID'sini kontrol et. `app.js` dosyasının 150. satırında formun nasıl seçildiğini incele.
2.  **Konumlan (Orient)**: `index.html` dosyasında form ID'sinin `<form id="task-form">` olduğunu fakat `app.js` içinde `document.getElementById('todo-form')` şeklinde hatalı seçildiğini (null referans) tespit et.
3.  **Karar Ver (Decide)**: `app.js` dosyasında seçici ID'sini `task-form` olarak güncelle veya HTML dosyasındaki ID'yi `todo-form` yap (Mevcut kod tutarlılığı için JS'yi değiştirmek daha az risklidir).
4.  **Uygula (Act)**: Düzeltmeyi `app.js`'e uygula.
5.  **Ölç/Öğren (Measure)**: `metrics/quality.md` (hata sayısı = 0) olduğunu doğrula.

---

## 3. Beklenen Çıktı (Expected Output)
*   [app.js](file:///f:/ai-freamework/examples/todo-app/app.js) içinde düzeltilmiş form seçici satırı:
```javascript
const todoForm = document.getElementById('task-form'); // veya HTML'e uygun ID
```

---

## 4. Başarı / Başarısızlık Kriterleri (Pass/Fail Criteria)
*   **Başarılı (Pass)**: Butona basıldığında görev listeye ekleniyor, tarayıcı konsolundaki null referans hatası kayboluyor.
*   **Başarısız (Fail)**: Butona basıldığında formun hâlâ ekleme yapmaması veya JS'deki diğer olay dinleyicilerin (listeners) bozulması.

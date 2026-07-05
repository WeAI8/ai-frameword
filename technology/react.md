# React.js Teknoloji Standartları (React Tech Pack)

Bu belge, React.js kullanılan frontend projelerinde yapay zeka geliştiricisinin uyması gereken bileşen tasarımı, hooks kullanımı, performans optimizasyonu ve kodlama kurallarını tanımlar.

---

## 1. Bileşen Tasarımı ve Yapısı
*   **Fonksiyonel Bileşenler (Functional Components)**: Tüm bileşenler modern Javascript fonksiyonları (`const Component = () => {}`) olarak yazılmalıdır. Class component kullanımı kesinlikle yasaktır.
*   **Tek Sorumluluk Prensibi (SRP)**: Bir bileşen sadece tek bir görsel veya işlevsel göreve odaklanmalıdır. Çok büyüyen bileşenleri küçük alt bileşenlere (sub-components) ayır.
*   **Klasör Düzeni**: Bileşenler, kendi CSS dosyaları ve testleri ile birlikte modüler klasörlerde tutulmalıdır (örn: `components/Button/Button.jsx`, `components/Button/Button.css`).

---

## 2. React Hooks Kullanım Standartları
React hooks, bileşenin durumunu ve yaşam döngüsünü yönetir. Doğru kullanılmaları performans ve hata kontrolü için kritiktir.
*   **useState**: Durum değişkenlerini minimal tut. Birbirine bağımlı durumları tek bir nesne durumunda birleştirmeyi veya `useReducer` kullanmayı değerlendir.
*   **useEffect**:
    *   **Dependency Array (Bağımlılık Dizisi)**: Bağımlılık dizisini asla boş bırakma veya eksik doldurma. `useEffect` içinde kullanılan tüm dış değişkenleri diziye ekle.
    *   **Temizleme (Cleanup Function)**: Event listener'lar, abonelikler (subscriptions) veya timer'lar kurulduğunda, `useEffect` dönüşünde mutlaka temizleme fonksiyonu yaz (memory leak önlemek için).
*   **Performans Hooks (useMemo & useCallback)**:
    *   Gereksiz render işlemlerini engellemek için, pahalı hesaplamaları `useMemo` ile sarmala.
    *   Alt bileşenlere props olarak geçirilen fonksiyonları `useCallback` ile memoize et.

---

## 3. Durum Yönetimi ve Veri Akışı
*   **Props Drilling Engelleyici**: Props verisini çok derin katmanlara (3 katmandan fazla) geçirmek yerine React Context API kullan.
*   **State Konumu (Lifting State Up)**: İki veya daha fazla bileşenin ortak veriye ihtiyacı varsa, durumu onların en yakın ortak ata (parent) bileşenine taşı.

---

## 4. Yönlendirme, Kod Bölme ve Lazy Loading
*   **Yönlendirme (Routing)**: Uygulama içi yönlendirmelerde React Router standartlarına uy. Sayfa geçişlerinde tam sayfa yenileme yapan `<a>` etiketi yerine `<Link>` bileşenini kullan.
*   **Kod Bölme (Code Splitting)**: Sayfa seviyesindeki büyük bileşenleri `React.lazy` ve `Suspense` kullanarak dinamik olarak yükle. Bu sayede ilk yükleme (initial bundle size) boyutunu küçült ve sayfa yüklenme hızını artır.
*   **Loading Durumları**: Dinamik yüklenen bileşenler veya API çağrıları sırasında kullanıcıya mutlaka bir loading spinner veya skeleton göster.

# Flutter ve Dart Teknoloji Standartları (Flutter Tech Pack)

Bu belge, Flutter ve Dart dili kullanılan mobil/web projelerinde yapay zeka geliştiricisinin uyması gereken durum yönetimi (state management), widget tasarımı ve temiz mimari kurallarını tanımlar.

---

## 1. Temiz Mimari (Clean Architecture) Standartları
Flutter uygulamalarında kodun test edilebilir ve genişletilebilir olması için katmanlı temiz mimari yapısı uygulanmalıdır:
*   **Sunum Katmanı (Presentation Layer)**:
    *   Sadece UI kodları (Widgets) ve durum yöneticileri (BLoC, Cubit, Provider) bulunur.
    *   Widget'lar doğrudan iş mantığı veya veri çağrısı yapamaz; durum yöneticilerini tetikler.
*   **Alan Katmanı (Domain Layer)**:
    *   Uygulamanın iş kurallarını (Use Cases) ve veri modellerini (Entities) içerir.
    *   Dış katmanlardan tamamen bağımsızdır (Pure Dart). Repository arayüzleri (interfaces) burada tanımlanır.
*   **Veri Katmanı (Data Layer)**:
    *   Veri kaynaklarına (API, Lokal Veritabanı) erişimi yönetir (Data Sources).
    *   Repository arayüzlerinin implementasyonlarını barındırır. Dış servislerden gelen JSON verisini modellerle (`Models`) karşılar.

---

## 2. Durum Yönetimi (State Management)
*   **Standart Seçimi**: Projede kullanılan mevcut durum yönetimi yapısına (BLoC/Cubit, Provider veya Riverpod) kesinlikle sadık kalınmalıdır. Yeni bir yapı getirilmemelidir.
*   **BLoC Standartları**:
    *   Event'ler ve State'ler net ve küçük tanımlanmalıdır (örn: `LoginInitial`, `LoginLoading`, `LoginSuccess`, `LoginFailure`).
    *   Widget içinden BLoC çağrısı yaparken `BlocBuilder`, `BlocListener` veya `BlocConsumer` bileşenleri doğru amaçlarla kullanılmalıdır.

---

## 3. Widget Tasarım Kuralları
*   **Küçük ve Odaklanmış Widget'lar**: `build` metotları yüzlerce satır süren devasa widget'lar yazma. Widget'ı küçük, test edilebilir ve bağımsız sınıflara (stateless/stateful) böl.
*   **Const Constructor (Sabit Yapıcılar)**: Yeniden render (rebuild) işlemlerini önlemek ve performansı artırmak için değişmeyecek widget'ların başına mutlaka `const` anahtar kelimesini ekle.
*   **setState Kısıtlaması**: `setState` kullanımını sadece tek bir widget içindeki geçici yerel durumlar (örn: bir checkbox'ın seçili olma durumu) için sınırlandır. Uygulama genelini etkileyen veriler için merkezi state management kullan.

---

## 4. Dart Kodlama ve Naming Standartları
*   Tüm Dart kodlarında resmi **Dart Style Guide** kurallarına uyulmalıdır:
    *   Sınıf isimleri `UpperCamelCase` (Örn: `ProductDetailScreen`).
    *   Değişken, metot ve parametre isimleri `lowerCamelCase` (Örn: `fetchProductData`).
    *   Dosya isimleri `snake_case` (Örn: `product_detail_screen.dart`).
*   Null Safety kurallarına katı bir şekilde uyun. `!` (force unwrap) operatörünü kullanmaktan kaçının; bunun yerine null-coalescing (`??`) veya conditional access (`?.`) tercih edin.

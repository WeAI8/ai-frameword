# Token Yönetimi Sezgisel Kuralları (Token Management Heuristics)

Bu belge, yapay zeka geliştiricisinin (AI Agent) araç kullanımı ve dosya okuma işlemleri sırasında token tüketimini minimize etmesi ve gereksiz bağlam (context) şişmesini önlemesi için uyması gereken kuralları tanımlar.

---

## 1. Akıllı Dosya Okuma Kuralları (Smart File Reading)
*   **Gereksiz Okumayı Engelle**: 300 satırdan uzun dosyaları doğrudan bütünüyle okumaktan kaçın. İlk olarak dosyanın yapısını anlamak için hedeflenmiş arama yap veya sadece ilgili satır aralığını oku.
*   **Arama Öncelikli Yaklaşım (Grep First)**: Bir kod parçasını ararken tüm dosyayı açıp okumak yerine, `grep_search` aracını kullanarak nokta atışı satırları tespit et, ardından sadece o satırların çevresini `view_file` ile oku.
*   **Büyük Dizin Taramaları**: `list_dir` aracını projenin kök dizininde recursive (derinlemesine) olarak çalıştırmak yerine, hedeflenen alt dizinlerde çalıştırarak gereksiz dizin listesi çıktısıyla bağlamı şişirme.

## 2. Araç Çağrısı Optimizasyonu (Tool Call Reduction)
*   **Tekrarlardan Kaçın**: Aynı dosya içeriğini veya arama sonucunu kısa süre önce okuduysan, bunu tekrar okuma. Kendi sohbet geçmişindeki veriyi önbellek (cache) olarak kullan.
*   **Tekil Edits Tercihi**: Bir dosyada birden fazla değişiklik yapacaksan, her bir değişiklik için ayrı ayrı `replace_file_content` çağrısı yapmak yerine, tüm değişiklikleri tek bir `multi_replace_file_content` çağrısında birleştir.

## 3. Seçici Bağlam Yükleme (Selective Context Loading)
*   Sadece o anki görevin sınıflandırmasıyla eşleşen iş akışını yükle. (Örn: Görev bir bug ise `workflows/feature-analysis.md` dosyasını okuma; sadece `workflows/bug-investigation.md` dosyasını yükle).
*   Görevin teknolojisiyle doğrudan alakalı olmayan dosyaları yükleme. (Örn: Bir Spring backend görevi yapıyorsan `technology/react.md` veya `technology/flutter.md` dosyalarını okuma).

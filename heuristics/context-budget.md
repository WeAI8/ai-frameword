# Bağlam ve Token Bütçesi Kuralları (Context Budget Policy)

Bu politika, ajanın dosya okuma ve arama araçlarını kullanırken harcayacağı token miktarını sınırlandırarak bağlam (context window) şişmesini ve dikkat dağınıklığını önler.

---

## 1. Dosya Okuma ve Arama Limitleri (Context Thresholds)

Ajan, her istek veya çalışma adımında aşağıdaki bütçe sınırlarına uymak zorundadır:

*   **Maksimum Dosya Okuma Limiti**: Bir adımda en fazla **5 dosya** okunabilir.
*   **Maksimum Satır Limiti**: Bir dosya okunurken tek seferde en fazla **800 satır** okunabilir. Büyük dosyalar için sadece hedef satırlar taranmalıdır.
*   **Arama Limiti**: `grep_search` sonuçlarında ilk etapta en fazla **50 eşleşme** listelenmeli, ardından filtreleme yapılmalıdır.

---

## 2. Mimari Dışlama Kuralı (Architecture Exclusion Rule)
*   **Kural**: `memory-bank/techContext.md` altındaki `selected_architecture` (Örn: `springboot-angular`) belirlendikten sonra, ajanın arama ve okuma araçları (file readers, grep searches) seçilmeyen diğer tüm pasif mimari yetenek dosyalarını (`skills/arch-<passive>.md`) okumaktan ve aramaktan **kesinlikle men edilir**.
*   Bu pasif dosyalar, arama ve sıralama listelerine dahil edilmeden önce otomatik olarak filtrelenerek dışlanır. Böylece pasif mimarilere ait detaylar bağlam penceresinde bir daha asla yer işgal etmez.

---

## 3. Sırala ve Oku Akışı (Rank & Read Workflow)

Ajan, dosyaları rastgele açıp okumak yerine şu sıralı bütçe akışını uygular:

1.  **Gözlemle (Search)**: `grep_search` kullanarak anahtar kelimeleri proje genelinde tara.
2.  **Sırala (Rank)**: Arama sonuçlarında dönen dosyaları, talebe olan benzerlik ve önem derecesine göre sırala. Pasif mimari dosyalarını bu aşamada elenerek çıkart.
3.  **Bütçelendir (Budget)**: Sıralamadaki en önemli ilk 3 ila 5 dosyayı seç. Diğerlerini bağlama yükleme.
4.  **Hedefli Oku (Read)**: Seçilen dosyaların tamamını değil, sadece arama sonucunda eşleşen satır aralıklarını (`view_file` ile start/end belirterek) oku.

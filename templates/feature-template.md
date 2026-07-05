# [Yeni Özellik Analiz Raporu Şablonu]

Bu şablon, yapay zeka geliştiricisinin yeni özellik isteklerinde (`workflows/feature-analysis.md` akışına göre) hazırlayacağı analiz raporunun formatını tanımlar.

---

## 1. Talep Analizi ve Niyet Genişletme (Intent Expansion)
*   **Kullanıcı İsteği**: *[Kullanıcının yazdığı kısa istek cümlesi]*
*   **İş Hedefi (Business Goal)**: *[Özelliğin işe katacağı temel katma değer, hedef kullanıcı kitlesi]*
*   **Kullanıcı Hikayesi (User Story)**: *[As a ... I want to ... So that ...]*

## 2. Çevre Keşfi ve Bulgu Listesi (Context & Discovery)
Projede yapılan tarama sonucunda tespit edilen ve bu özellik ile ilişkili olan mevcut kaynaklar:
*   **İlişkili Dosyalar**:
    *   `[Path/To/File1.ext]`: *[Bu dosyanın özellikle olan ilgisi]*
    *   `[Path/To/File2.ext]`: *[Bu dosyanın özellikle olan ilgisi]*
*   **Yeniden Kullanılabilir Yapılar (Reusable Components/Services)**:
    *   *[Kullanılabilecek mevcut sınıflar, fonksiyonlar veya arayüz bileşenleri]*

## 3. Varsayımlar ve Güven Seviyeleri (Assumptions & Confidence)
AI tarafından yapılan teknik varsayımlar ve projeden alınan kanıtlar:
1.  **Varsayım**: *[Varsayım açıklaması]*
    *   *Gerekçe*: *[Neden bu varsayım yapıldı?]*
    *   *Kanıt*: *[Projeden hangi kod/dosya bunu doğruluyor?]*
    *   *Güven Puanı*: `%[0-100]`

## 4. Risk Analizi ve Kısıtlar (Risk Analysis)
*   **Regresyon Riski**: *[Bu değişiklik mevcut çalışan nereleri etkileyebilir?]*
*   **Performans/Veri Riski**: *[Darboğaz veya veri kaybı ihtimali var mı?]*
*   **Güvenlik Riski**: *[Girdi doğrulama, yetki veya SQL injection tehlikesi var mı?]*

## 5. Kabul Kriterleri (Acceptance Criteria)
*   **Senaryo 1**: *[Senaryo Adı]*
    *   *Given (Verilen)*: *[Başlangıç durumu]*
    *   *When (Nezaman)*: *[Tetikleyici olay]*
    *   *Then (Ohalde)*: *[Beklenen sonuç]*

## 6. Açık Sorular (Open Questions)
> [!IMPORTANT]
> *   *[Güven seviyesi %70 altında kalan, kullanıcının karar vermesi gereken sorular]*

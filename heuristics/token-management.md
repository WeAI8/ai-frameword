# Token Yönetimi Sezgisel Kuralları (heuristics/token-management.md)

---

## 1. Amaç (Purpose)
Ajanın araç kullanımı ve dosya okuma işlemleri sırasında token tüketimini minimize etmesi ve gereksiz bağlam (context) şişmesini önlemesi için kurallar tanımlamak.

---

## 2. Sorumluluklar (Responsibilities)
*   Büyük dosyaları bütünüyle okumak yerine grep ve aralık belirterek okuma yönergelerini denetlemek.
*   SonarQube MCP veya SAST araçları kullanılırken token tasarrufu sağlayan **Workspace Mount** kurallarını işletmek.

---

## 3. Girdiler (Inputs)
*   Dosya okuma, arama ve statik analiz istekleri.

---

## 4. Çıktılar (Outputs)
*   Nokta atışı dosya okuma aralıkları.
*   Workspace Mount uyumlu MCP araç parametreleri.

---

## 5. Bağımlılıklar (Dependencies)
*   `heuristics/context-budget.md`

---

## 6. Kurallar (Rules)
*   **Workspace Mount Entegrasyonu**: SonarQube MCP analizleri koşturulurken, dosyanın tüm içeriğini ağ üzerinden MCP sunucusuna göndermek yerine, sadece yerel dosya yolu (`filePath` veya `projectKey`) iletilmelidir (`run_advanced_code_analysis` deseni). MCP sunucusu dosyayı doğrudan yerel diskten okuyarak analiz etmeli ve token israfını engellemelidir.
*   **Seçici Araç Etkinleştirme (Selective Tooling)**: Sadece `analysis`, `issues`, `quality-gates`, `dependency-risks` gibi otonom kalite araçları aktif edilmeli; portfolios gibi yönetimsel araçlar devre dışı bırakılarak bağlam kirletilmemelidir.

---

## 7. Hata Durumları (Failure Cases)
*   *Uzantı Ayrıştırma Hatası*: TSX veya JSX gibi özel frontend dosyaları geçici dosyalara kopyalanırken uzantılarının korunması sağlanmalıdır; aksi halde dil analizcileri (parsers) doğru kuralları uygulayamaz (Silent Failure önleme kuralı).

---

## 8. Örnekler (Examples)
*   *Analiz Çağrısı*: `run_advanced_code_analysis(filePath: "f:/src/UserService.java")` (Dosya içeriği gönderilmedi, disk üzerinden okundu).

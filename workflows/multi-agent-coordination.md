# Çoklu Ajan Koordinasyon İş Akışı (Multi-Agent Coordination Workflow)

Bu belge, karmaşık yazılım görevlerinde birden fazla uzman yapay zeka ajanının (Analist, Mimar, Geliştirici, Denetçi) bir arada nasıl çalışacağını, görev devirlerini ve döngüsel doğrulama süreçlerini tanımlar.

---

## 1. Ajan Rolleri ve Sorumlulukları (RACI Matrix)

Sistemdeki her uzman ajanın görev tanımı ve sorumluluk alanları net olarak ayrılmıştır:

| Görev / Süreç | Analyst (Analist) | Architect (Mimar) | Developer (Geliştirici) | Reviewer (Denetçi) |
| :--- | :---: | :---: | :---: | :---: |
| Gereksinim Analizi & PRD | **Accountable (A)** | Consulted (C) | Informed (I) | Informed (I) |
| Teknik Plan ve Etki Analizi | Informed (I) | **Accountable (A)** | Responsible (R) | Consulted (C) |
| Kod Geliştirme (Coding) | Informed (I) | Informed (I) | **Accountable (A)** | Consulted (C) |
| Kod İnceleme & Test (Review) | Consulted (C) | Consulted (C) | Informed (I) | **Accountable (A)** |

---

## 2. Döngüsel Tetikleme ve Devir Protokolü (Handoff Protocol)

Ajanlar, iş bitti kriterleri (Definition of Done) tam olarak karşılanana kadar birbirlerini döngüsel olarak tetikler. Her tetiklemede [agent-handoff-template.md](file:///f:/ai-freamework/templates/agent-handoff-template.md) şablonu kullanılmalıdır.

### A. İleri Doğru Akış (Forward Flow)
1.  **Analyst -> Architect**: Analist gereksinimleri ve kabul kriterlerini netleştirir, devir belgesi hazırlar ve Mimar'ı tetikler.
2.  **Architect -> Developer**: Mimar, projenin mevcut yapısına (`core/architecture.md`) uygun teknik planı hazırlar, dosya değişiklik listesini çıkarır ve Geliştirici'yi tetikler.
3.  **Developer -> Reviewer**: Geliştirici, plana uygun kod değişikliklerini yapar, birim testleri hazırlar ve doğrulama için Denetçi'yi tetikler.

### B. Geri Bildirim Döngüsü (Feedback Loop / Rollback Flow)
*   **Reviewer -> Developer (Hata/Eksik Durumu)**:
    *   Birim testler başarısız olursa veya kod standartları/mimari kısıtlar ihlal edilirse, Denetçi görevi **Developer**'a geri paslar.
    *   Geri paslama sırasında hata logları, başarısız testler ve ihlal edilen kurallar net olarak belirtilir.
    *   Geliştirici düzeltmeleri yaptıktan sonra Denetçi'yi tekrar tetikler.
*   **Reviewer -> Analyst/Architect (Gereksinim Sapması)**:
    *   Yazılan kod, kabul kriterlerini (Acceptance Criteria) işlevsel olarak karşılamıyorsa, Denetçi süreci **Analist** veya **Mimar**'a geri yönlendirir.
    *   Gereksinimler veya teknik plan revize edilir, akış tekrar Geliştirici üzerinden Denetçi'ye ulaşır.

---

## 3. Nihai Teslimat ve İş Bitti Kriterleri (DoD)
Aşağıdaki kriterler %100 sağlanmadan hiçbir görev kullanıcıya "Tamamlandı" olarak teslim edilemez:
1.  **İşlevsellik**: Tüm kabul kriterleri (Acceptance Criteria) karşılanmış olmalıdır.
2.  **Kalite**: `workflows/code-review.md` altındaki tüm denetim listeleri yeşil (başarılı) olmalıdır.
3.  **Test**: Eklenen tüm birim testler başarıyla geçmelidir. Hata oranı sıfır olmalıdır.
4.  **Mimari**: Katmanlı mimari sınırları korunmuş, fuzuli soyutlama yapılmamış olmalıdır.

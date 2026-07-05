# [Ajanlar Arası Devir ve Geri Bildirim Şablonu]

Bu şablon, çoklu ajan sisteminde (`workflows/multi-agent-coordination.md` akışına göre) ajanların birbirine iş devrederken veya hataları geri paslarken kullanacağı standart formatı tanımlar.

---

## 1. Genel Görev Bilgileri (Handoff Header)
*   **Gönderen Ajan (Sender)**: `[Analyst / Architect / Developer / Reviewer]`
*   **Alıcı Ajan (Receiver)**: `[Analyst / Architect / Developer / Reviewer]`
*   **Görev Tipi**: `[Geliştirme / Hata Düzeltme / Mimari Tasarım / Kod İnceleme]`
*   **Döngü Sayacı (Iteration)**: `[1 / 2 / 3]` *(Maksimum 3 döngü sınırını kontrol etmek için)*

## 2. Görev Detayı ve Hedef (Objective)
*   **Açıklama**: *[Bu aşamada yapılması gereken işin veya düzeltilmesi istenen hatanın kısa özeti]*
*   **Kabul Kriterleri (Acceptance Criteria)**:
    - *[ ] Kriter 1*
    - *[ ] Kriter 2*

## 3. Gerekli Bağlam ve İlişkili Dosyalar (Context & Inputs)
*   **Girdi Belgeleri**: *[Varsa Analyst PRD belgesi veya Architect Uygulama Planı]*
*   **İlgili Kaynak Kod Dosyaları**:
    - `[path/to/file1.ext]`
    - `[path/to/file2.ext]`

## 4. Hata ve Geri Bildirim Detayları (Sadece Geri Paslamalarda Doldurulur)
> [!WARNING]
> Bu bölüm sadece **Reviewer -> Developer** veya **Reviewer -> Architect** geri tetiklemelerinde doldurulur.
*   **Başarısız Testler**: *[Başarısız olan birim test adları ve hata stack trace çıktıları]*
*   **İhlal Edilen Kurallar**: *[Geliştiricinin uymadığı mimari (architecture.md) veya kalite (quality-heuristics.md) kuralları]*
*   **Düzeltilmesi Gereken Hatalı Satırlar**:
    *   `[path/to/file.ext#L123]`: *[Yapılması gereken düzeltme açıklaması]*

## 5. Çıktı Kriterleri (DoD - Definition of Done)
*   **Alıcı Ajanın Sunması Gereken Çıktı**: *[Örn: Geliştirici için: Kod değişiklikleri + yeşil test logları. Mimar için: Onaylanmış teknik plan]*

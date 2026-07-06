# Kabiliyet Kayıt Defteri (Capability Registry)

Bu belge, ajanın yapabileceği ve desteklediği görev tiplerini ve bu görevler sırasında çalışacak modülleri tanımlar. Yeni bir kabiliyet eklendiğinde bu deftere kaydedilmelidir.

---

## 1. Kayıtlı Ajan Kabiliyetleri (Capabilities)

| Kabiliyet (Capability) | Kod | Tetikleyici Dosya | Açıklama |
| :--- | :--- | :--- | :--- |
| **Yeni Özellik Geliştirme** | `Feature` | `workflows/feature-analysis.md` | Projeye yeni bir işlevsellik veya modül eklenmesi. |
| **Hata Giderme** | `Bug` | `workflows/bug-investigation.md` | Mevcut hataların teşhis edilmesi ve düzeltilmesi. |
| **Kod İyileştirme** | `Refactor` | `workflows/refactor.md` | Kod kalitesinin artırılması, teknik borcun temizlenmesi. |
| **Kod Denetimi** | `Review` | `workflows/code-review.md` | Yazılan kodun standartlara uygunluğunun incelenmesi. |
| **Birim Test Geliştirme** | `Test` | `workflows/testing.md` | Kapsama uygun otomatik birim testlerin yazılması. |
| **Teknik Belgelendirme** | `Doc` | `workflows/documentation.md` | Javadoc, Swagger veya README dosyalarının güncellenmesi. |

---

## 2. Kabiliyet Eşleştirme ve Sorgulama Mantığı
*   Önyükleyici (`core/kernel/bootstrap.md`), kullanıcı talebini aldığında bu defteri sorgulayarak en uygun kabiliyet kodunu belirler.
*   Eşleşen kabiliyete ait iş akışı (workflow) ve teknoloji sürücüleri yüklenir.
*   Eşleşme bulunamazsa, genel `Feature` kabiliyeti varsayılan olarak seçilir.

# İş Akışları Kayıt Defteri (Workflows Registry)

Bu belge, **AI Engineering Decision Framework** içindeki aktif iş akışlarını (workflows), dosya konumlarını ve hangi durumlarda çalışacaklarını tanımlar.

---

## 1. Kayıtlı İş Akışları (Workflows)

| İş Akışı Adı | Dosya Yolu | İlgili Kabiliyet | Açıklama |
| :--- | :--- | :---: | :--- |
| **feature-workflow** | `workflows/feature-analysis.md` | `Feature` | Yeni özelliklerin analiz, planlama ve uygulama süreci. |
| **bug-workflow** | `workflows/bug-investigation.md` | `Bug` | Hataların teşhisi, log analizi ve düzeltme akışı. |
| **refactor-workflow**| `workflows/refactor.md` | `Refactor` | Geriye dönük uyumluluk korumalı temizleme akışı. |
| **review-workflow** | `workflows/code-review.md` | `Review` | Çıktıların mimari, güvenlik ve kalite denetimi. |
| **test-workflow** | `workflows/testing.md` | `Test` | Test kapsama alanı ve mock standartları akışı. |
| **doc-workflow** | `workflows/documentation.md` | `Doc` | Belgelendirme ve conventional commit standartları. |
| **coordination-workflow** | `workflows/multi-agent-coordination.md` | Çoklu Ajan | Uzman ajanların tetiklenme ve geri paslama döngüsü. |

---

## 2. Çalışma Zamanı Yönlendirmesi
*   Önyükleyici, görev sınıflandırması bittikten sonra bu kayıt defterini kullanarak ilgili `.md` iş akışını yükler.
*   Görev süresince bu dosyada belirtilen adımlar harfiyen takip edilir.

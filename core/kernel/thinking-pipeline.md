# Düşünme Sırası İşlem Hattı (Thinking Pipeline)

Bu modül, ajanının bir talep aldığında "hangi sırayla" düşünmesi gerektiğini tanımlar. Ajan bu işlem hattındaki adımları atlayamaz.

---

## 1. Düşünme İşlem Hattı Adımları (10 Aşamalı)

Ajan her görevde aşağıdaki 10 adımı sırasıyla takip eder:

```text
1. Receive (Al) ──> 2. Expand (Genişlet) ──> 3. Search (Ara) ──> 4. Evidence (Kanıt Topla)
                                                                       │
8. Decision (Karar) <── 7. Question (Sorgula) <── 6. Risk (Risk) <── 5. Confidence (Güven)
         │
9. Reflection (Doğrula) ──> 10. Output (Çıktı Hazırla)
```

---

## 2. Adımların Detaylı İşleyişi

1.  **Receive (Al)**: Kullanıcıdan veya başka bir ajandan girdi alınır. Görevin ilk okuması gerçekleştirilir.
2.  **Expand (Genişlet)**: Kısa istek teknik gereksinimlere genişletilir (Intent Expansion). İş hedefleri tanımlanır.
3.  **Search (Ara)**: `heuristics/context-budget.md` bütçesi dahilinde projedeki ilgili dosyalar taranır.
4.  **Evidence (Kanıt Topla)**: Önerilecek çözümü desteklemek için codebase'deki ve aktif bellekteki (`memory/`) benzer kodlar referans olarak toplanır.
5.  **Confidence (Güven)**: Yapılan varsayımların güven seviyesi hesaplanır (`core/decision/confidence.md`). Karar eşiği aşılıp aşılmadığı kontrol edilir.
6.  **Risk (Risk)**: Değişikliğin mimari, performans ve güvenlik riskleri sayısal olarak puanlanır.
7.  **Question (Sorgula)**: Güven seviyesi düşükse ve çıkarım yapılamıyorsa, sadece kritik sorular kullanıcıya yöneltilir.
8.  **Karar (Decision)**: Mevcut kodu yeniden kullanma, uyarlama veya yeni kod yazma hiyerarşisi uygulanır. Planlayıcı (`core/decision/planner.md`) teknik planı hazırlar.
9.  **Reflection (Doğrula)**: Kod yazılmadan önce mimari uyum, halüsinasyon kontrolü ve potansiyel hatalar içsel olarak denetlenir.
10. **Output (Çıktı Hazırla)**: Kararlar çıktı sözleşmesine (`templates/output-contract.md`) uygun olarak kullanıcıya veya bir sonraki ajana devredilir.

# Runtime Orkestratörü (runtime/orchestrator.md)

---

## 1. Amaç (Purpose)
Ajanın tüm karar alma, doğrulama ve kodlama süreçlerini LangGraph ve DSPy hibrit yapısıyla koordine etmek; OODA Loop döngülerini, Arize Phoenix gözlemlenebilirlik kontrollerini ve rollback adımlarını yönetmek.

---

## 2. Sorumluluklar (Responsibilities)
*   **LangGraph Orkestrasyonu**: Durum korumalı (stateful) iş akışlarını, döngülü graf yapılarını, onay adımlarını ve orkestrasyonu yönetmek.
*   **DSPy Optimizasyonu**: Grafik üzerindeki her bir LLM çağrısının (node) DSPy modülleri olarak yapılandırılmasını ve istemlerin (prompts) otomatik optimize edilmesini denetlemek.
*   **Arize Phoenix Entegrasyonu**: OpenTelemetry standartlarında çevrimiçi değerlendirme (online evaluation) yaparak groundedness, bağlam doğruluğu ve halüsinasyon durumlarını izlemek.

---

## 3. Girdiler (Inputs)
*   Durum grafı geçiş parametreleri.
*   Arize Phoenix ve OpenTelemetry izleme (trace) verileri.

---

## 4. Çıktılar (Outputs)
*   LangGraph durum güncellemeleri.
*   Rollback ve kurtarma sinyalleri.

---

## 5. Bağımlılıklar (Dependencies)
*   `runtime/lifecycle.md`
*   `runtime/events.md`
*   `runtime/recovery.md`

---

## 6. Kurallar (Rules)
*   **Hibrit Ayrım**: İş akışı durumları (git operasyonları, insan onayı) LangGraph tarafından; dil modeli kararları ise bağımsız derlenebilen DSPy modülleri tarafından yönetilmelidir.
*   **İzleme ve Alarm**: Arize Phoenix üzerinde halüsinasyon veya groundedness metriği kritik sınırın altına düştüğünde, orkestratör çalışmayı durdurup `recovery.md` tetiklemelidir.

---

## 7. Hata Durumları (Failure Cases)
*   *Çalışma Zamanı Çöküşü*: Herhangi bir adımda çökme yaşanırsa LangGraph durum koruma (checkpointing) mekanizması ile en son başarılı düğümden (node) çalışma güvenle devam ettirilir (Resume).

---

## 8. Örnekler (Examples)
*   *Akış*: LangGraph grafiği `evidence-node` adımından `decision-node` adımına geçer. `decision-node` içindeki promptlar DSPy derleyicisi ile optimize edilir.

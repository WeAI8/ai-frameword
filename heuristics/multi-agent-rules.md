# Çoklu Ajan Sezgisel Kuralları (Multi-Agent Heuristics)

Bu belge, yapay zeka geliştiricisinin ne zaman ve nasıl alt ajan (subagent) çağıracağına, bu ajanların iş yükünü nasıl dağıtacağına ve döngüsel kilitlenmeleri (infinite loops) nasıl engelleyeceğine dair sezgisel kuralları tanımlar.

---

## 1. Alt Ajan Çağırma Eşikleri (When to Spawn Subagents)

Ana orkestratör ajan, tüm işleri kendi bağlamında yapmak yerine, aşağıdaki durumlar oluştuğunda Google Antigravity'nin `invoke_subagent` aracını kullanarak uzman alt ajanlar çağırmalıdır:

### A. Araştırma Eşiği (Research Threshold)
*   **Kural**: Eğer bir görevin çözümü için en az 3 ayrı web araması veya projenin 5'ten fazla farklı modülünde derin kod taraması yapılması gerekiyorsa, ana bağlamı kirletmemek için bağımsız bir **Research Agent (Araştırmacı Ajan)** çağır.
*   **İş Akışı**: Araştırma ajanı bulguları raporlar, işi bitince kapanır. Ana ajan bu bulguları alır.

### B. Kod İnceleme ve Test Eşiği (Review & Test Threshold)
*   **Kural**: Geliştirici ajan kodu yazıp bitirdikten sonra, kodun kalitesini, testlerini ve mimari uyumluluğunu test etmek için bağımsız bir **Reviewer Agent (Denetçi Ajan)** çağır.
*   **Gerekçe**: Kodu yazan ajanın kendi hatalarını görme olasılığı (bias) düşüktür. İkinci bir gözün denetlemesi kaliteyi artırır.

### C. Paralel Geliştirme (Parallel Handoff)
*   **Kural**: Eğer bir istek birbirine doğrudan bağımlı olmayan bağımsız alt görevler barındırıyorsa (Örn: frontend arayüzü yazımı ve backend API hazırlanması), bu işleri paralel olarak çalışacak iki ayrı **Developer Agent**'a dağıt.

---

## 2. Geri Tetikleme ve Döngü Koruma Kuralları (Loop Guard)

Ajanlar arası hata düzeltme döngülerinin sonsuz bir kısırdöngüye (infinite execution loop) girmesini engellemek için şu eşikler uygulanmalıdır:

*   **Düzeltme Limiti (Max Iteration Limit)**:
    *   Denetçi ajan, Geliştirici ajanın kodundaki bir hatayı tespit edip geri pasladığında, bu hata düzeltme döngüsü en fazla **3 kez** tekrarlanabilir.
    *   Eğer 3. denemede de hata giderilemediyse (örn: birim testler hâlâ başarısızsa), döngüyü otomatik olarak durdur (Loop Guard) ve durumu hata logları ile birlikte **kullanıcıya raporla**. Asla arka arkaya 4. kez alt ajan çağırıp deneme yapma.
*   **Geri Tetikleme Şartları**:
    *   *Birim test hata sayısı > 0* -> Geliştiriciyi geri tetikle.
    *   *Kritik Güvenlik Açığı (Örn: SQL Injection riski)* -> Geliştiriciyi geri tetikle.
    *   *Kabul Kriteri Uyumsuzluğu* -> Analist/Mimar ajanı geri tetikle.

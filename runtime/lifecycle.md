# Çalışma Zamanı Yaşam Döngüsü (runtime/lifecycle.md)

---

## 1. Amaç (Purpose)
Ajanın çalışma süreçlerini statik bir akış yerine, sürekli gözlemleyen ve kendini düzelten dinamik **OODA Loop** modeli üzerinde koordine etmek.

---

## 2. Sorumluluklar (Responsibilities)
*   OODA (Observe, Orient, Decide, Act, Measure, Repeat) döngüsel aşamalarını yönetmek.
*   Waiting Approval ve Soru sorma durumlarındaki kesintileri (Interrupt) ve duraklatmaları yönetmek.

---

## 3. Girdiler (Inputs)
*   Orkestratör çalışma sinyalleri.
*   Kullanıcı kesme/onay bildirimleri.

---

## 4. Çıktılar (Outputs)
*   Yaşam döngüsü durum güncellemeleri.
*   Askıya alma (Suspend) ve Devam etme (Resume) sinyalleri.

---

## 5. Bağımlılıklar (Dependencies)
*   `runtime/orchestrator.md`

---

## 6. Kurallar (Rules)
*   **OODA Bütünlüğü**: Ajan her zaman OODA döngü sırasına uygun çalışmalıdır (Gözlemlemeden karar verilemez, karar verilmeden uygulanamaz).
*   **Onay Duraklatması**: Plan oluşturulduktan sonra onay gelene kadar runtime beklemede (Suspended) kalmalıdır.

---

## 7. Hata Durumları (Failure Cases)
*   *Çelişen Durum*: Kesinti (Interrupt) sinyali gelirse mevcut işlem güvenli bir noktada durdurulur ve durum dondurulur.

---

## 8. Örnekler (Examples)
*   *Akış*: Ajan planı onay için sunar, durumu `Waiting Approval` yapar ve yürütmeyi duraklatır.

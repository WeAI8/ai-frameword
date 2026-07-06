# Çerçeve Modülleri Defteri (core/registry/modules.md)

---

## 1. Amaç (Purpose)
Decision Runtime altındaki tüm modüllerin listesini, konumlarını ve çalışma zamanındaki bağımlılık önceliklerini merkezi olarak yönetmek.

---

## 2. Sorumluluklar (Responsibilities)
*   Modüllerin bağımlılık haritasını (dependency map) tutmak.
*   Yüklenme sırasındaki hiyerarşik öncelikleri (priority) denetlemek.

---

## 3. Girdiler (Inputs)
*   Modül başlatma sorguları.

---

## 4. Çıktılar (Outputs)
*   Hiyerarşik Yükleme Sıralaması.

---

## 5. Bağımlılıklar (Dependencies)
*   Yok (Merkezi referans defteridir).

---

## 6. Kurallar (Rules)
*   **Bağımlılık Kontrolü**: Bir modül yüklenmeden önce bağımlı olduğu tüm modüllerin başlatıldığından emin olunmalıdır.
*   **Dairesel Bağımlılık Yasağı**: Modüller arasında dairesel döngü (Örn: A -> B -> A) oluşturulması yasaktır.

---

## 7. Hata Durumları (Failure Cases)
*   *Eksik Bağımlılık*: Bir modülün bağımlı olduğu dosya bulunamazsa önyükleme durdurulur ve derleme hatası fırlatılır.

---

## 8. Örnekler (Examples)
*   *Modül*: `confidence` modülü, `evidence` modülü yüklenmeden çalıştırılamaz (Öncelik sırası denetlenir).

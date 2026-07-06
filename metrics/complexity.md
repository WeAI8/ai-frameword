# Karmaşıklık Metrikleri ve Karar Tetikleyicileri (Complexity Metrics)

Karmaşıklık Metrikleri, yazılan kodun bilişsel yükünü (cognitive load) ölçer ve kodun sürdürülebilirliğini korumak için otomatik bölünme/refactor döngülerini başlatır.

---

## 1. Karmaşıklık Metrik Eşikleri

*   **Cyclomatic Complexity (Dallanma Karmaşıklığı)**: Maksimum `8` olmalıdır. Bir metot içindeki `if-else`, `switch`, `for`, `while` gibi kontrol bloklarının toplam dallanma sayısıdır.
*   **Metot Satır Uzunluğu (Method Length)**: Maksimum `40` satır.
*   **İç İçe Dallanma Derinliği (Nesting Level)**: Maksimum `3` seviye.

---

## 2. Aktif Çalışma Zamanı Tetikleyicileri (Runtime Triggers)

Metrik aşım durumlarında çalışma zamanı akışı kesintiye uğrar ve refactor tetiklenir:

*   **Tetikleyici 1: [Dallanma Karmaşıklığı > 8] OR [Metot Satır Sayısı > 40]**:
    *   *Aksiyon*: Kod yazımı durdurulur ve `OnReflectionFailed` olayı benzeri bir karmaşıklık ihlali tetiklenir.
    *   *Runtime Kararı*: Ajan, yazdığı metodu daha küçük yardımcı metodlara bölmek üzere kodu otomatik olarak refactor etmeye (`workflows/refactor.md`) yönlendirilir.
*   **Tetikleyici 2: [Nesting Level > 3]**:
    *   *Aksiyon*: Kodun düz mantığa (flat logic / guard clauses) çevrilmesi için Geliştiriciye uyarı iletilir.

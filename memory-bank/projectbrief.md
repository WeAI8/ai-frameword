# Proje Kapsamı (memory-bank/projectbrief.md)

---

## 1. Proje Tanımı ve Hedef
AI Engineering Framework / Decision Runtime; otonom yazılım geliştirme ajanlarının projenin mimari bütünlüğünü, temiz kod kurallarını koruyarak, kanıt temelli ve ölçülebilir kararlarla kod geliştirmesini sağlayan bir altyapıdır.

---

## 2. Temel Gereksinimler
*   **Katman İzolasyonu**: Ajan tarafından yazılan tüm kodların katmanlı mimari sınırlarına uymasını sağlamak.
*   **Token Optimizasyonu**: Dosya okumalarında, aramalarda ve test loglarında gereksiz veri akışını (noise) keserek token maliyetini minimize etmek.
*   **Döngüsel İyileştirme (OODA Loop)**: Hatalarda otomatik rollback yapmak ve en fazla 3 denemede kendi kendini onarmak (Self-healing).
*   **Kanıt ve Güven Zorunluluğu**: Yapılan her varsayımın projeden bir kod bloğu ile kanıtlanması ve güven seviyesinin %70'in üzerinde olması zorunluluğu.

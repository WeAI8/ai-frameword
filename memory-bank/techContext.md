# Teknoloji Bağlamı (memory-bank/techContext.md)

---

## 1. Aktif Mimari Seçimi (Active Architecture)
*   **selected_architecture**: `"springboot-angular"`  # Seçenekler: "springboot-angular", "aspnet-react", "nestjs-angular", "django-react"

---

## 2. Teknoloji Yığını ve Sürücü Sınırları
Framework, yapay zeka ajanlarının karar almasını yönettiği için doğrudan kodlama dillerine bağımlı değildir; ancak denetlediği projelerde şu teknoloji sürücülerini (`technology/`) kullanır:
*   **Backend**: Java / Spring Boot 3 mimari standartları.
*   **Veritabanı**: Oracle SQL, PL/SQL ve optimizasyon standartları.
*   **Frontend**: React.js (modern functional hooks) veya Angular standartları.
*   **Mobil**: Flutter / Dart (Clean Architecture, BLoC) standartları.

---

## 3. Çalışma Zamanı Araç Entegrasyonları
*   **SonarQube MCP**: `sonarsource/sonarqube-mcp:latest` Docker imajı ve `run_advanced_code_analysis` ile yerel dosya yolu (`filePath`) üzerinden Workspace Mount entegrasyonu.
*   **Arize Phoenix**: OpenTelemetry uyumlu RAG ve LLM izleme/halüsinasyon denetim sunucusu.
*   **ArchUnit / Dependency-Cruiser**: Katmanlı mimari ihlallerini derleme/test zamanında yakalayan deterministik kütüphaneler.

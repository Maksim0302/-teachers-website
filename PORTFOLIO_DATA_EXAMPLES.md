# 📋 Portfolio – Примеры данных для Sanity

> Этот документ содержит примеры структуры данных Portfolio, которые помогут вам быстро начать работу в Sanity CMS.

---

## 📦 Структура документа Portfolio

```javascript
{
  _type: "portfolio",
  title: {
    en: "My Portfolio",
    uk: "Мое портфолио",
    ru: "Мое портфолио"
  },
  subtitle: {
    en: "Browse my professional documents",
    uk: "Переглянути мої професійні документи",
    ru: "Просмотрите мои профессиональные документы"
  },
  documents: [
    {
      title: {
        en: "Project Report 2024",
        uk: "Звіт про проект 2024",
        ru: "Отчет о проекте 2024"
      },
      description: {
        en: "Comprehensive analysis of Q1 performance metrics and project outcomes",
        uk: "Комплексний аналіз показників та результатів проекту за Q1",
        ru: "Комплексный анализ показателей и результатов проекта за Q1"
      },
      file: {
        _type: "file",
        asset: {
          _ref: "file-abc123xyz789-pdf",
          _type: "reference"
        }
      }
    }
  ]
}
```

---

## 👨‍🏫 Пример 1: Портфолио учителя

### Заголовок & Описание

```
Title (EN): My Teaching Portfolio
Title (UK): Мое портфоліо вчителя
Title (RU): Мое портфолио учителя

Subtitle (EN): Collection of lesson plans, assessments, and professional materials
Subtitle (UK): Колекція планів уроків, оцінювання та професійних матеріалів
Subtitle (RU): Коллекция планов уроков, оценивания и профессиональных материалов
```

### Документы

#### Документ 1: Планы уроков

```
Title (EN): Lesson Plans - Grade 5 Mathematics
Title (UK): Плани уроків - Математика 5 клас
Title (RU): Планы уроков - Математика 5 класс

Description (EN): Detailed lesson plans for the entire semester with learning objectives and assessments
Description (UK): Детальні плани уроків на весь семестр з цілями навчання та оцінюванням
Description (RU): Подробные планы уроков на весь семестр с целями обучения и оцениванием

File: lesson-plans-grade5.pdf
```

#### Документ 2: Оценочные материалы

```
Title (EN): Student Assessment Reports
Title (UK): Звіти про оцінювання учнів
Title (RU): Отчеты об оценивании учащихся

Description (EN): Comprehensive assessment reports for all students in the class
Description (UK): Комплексні звіти про оцінювання всіх учнів класу
Description (RU): Комплексные отчеты об оценивании всех учащихся класса

File: assessment-reports.docx
```

#### Документ 3: Сертификат

```
Title (EN): Professional Development Certificate 2024
Title (UK): Сертифікат Професійного Розвитку 2024
Title (RU): Сертификат Профессионального Развития 2024

Description (EN): Certificate from International Teaching Conference
Description (UK): Сертифікат від Міжнародної конференції вчителів
Description (RU): Сертификат от Международной конференции учителей

File: professional-dev-cert.pdf
```

---

## 🎓 Пример 2: Портфолио школьного проекта

### Заголовок & Описание

```
Title (EN): School Projects 2024
Title (UK): Шкільні проекти 2024
Title (RU): Школьные проекты 2024

Subtitle (EN): Outstanding student projects and achievements
Subtitle (UK): Видатні учнівські проекти та досягнення
Subtitle (RU): Выдающиеся ученические проекты и достижения
```

### Документы

#### Документ 1: STEM проект

```
Title (EN): STEM Project - Renewable Energy Solutions
Title (UK): STEM проект - Рішення на основі відновлюваної енергії
Title (RU): STEM проект - Решения на основе возобновляемой энергии

Description (EN): Students' research on solar panel efficiency and implementation strategies
Description (UK): Дослідження учнів щодо ефективності сонячних панелей та стратегій впровадження
Description (RU): Исследование учащихся об эффективности солнечных панелей и стратегий внедрения

File: stem-renewable-energy.pdf
```

#### Документ 2: Каталог выставки искусства

```
Title (EN): Art Exhibition Catalog 2024
Title (UK): Каталог художної виставки 2024
Title (RU): Каталог художественной выставки 2024

Description (EN): Complete catalog with student artworks, artist statements, and exhibition details
Description (UK): Повний каталог з творами учнів, заявами художників та деталями виставки
Description (RU): Полный каталог с работами учащихся, заявлениями художников и деталями выставки

File: art-exhibition-catalog.pdf
```

#### Документ 3: Инициатива общественного служения

```
Title (EN): Community Service Initiative Report
Title (UK): Звіт про ініціативу громадського служіння
Title (RU): Отчет об инициативе общественного служения

Description (EN): Detailed report on student-led community projects and volunteer hours
Description (UK): Детальний звіт про проекти громади під керівництвом учнів та волонтерські години
Description (RU): Подробный отчет о проектах сообщества под руководством учащихся и волонтерских часах

File: community-service-report.docx
```

---

## 🏆 Пример 3: Портфолио спортивных достижений

### Заголовок & Описание

```
Title (EN): Athletic Achievements Portfolio
Title (UK): Портфолю спортивних досягнень
Title (RU): Портфолио спортивных достижений

Subtitle (EN): Collection of athletic records and championship achievements
Subtitle (UK): Колекція спортивних рекордів та чемпіонських досягнень
Subtitle (RU): Коллекция спортивных рекордов и чемпионских достижений
```

### Документы

#### Документ 1: Спортивная статистика

```
Title (EN): 2024 Athletic Statistics & Records
Title (UK): Спортивна статистика та рекорди 2024
Title (RU): Спортивная статистика и рекорды 2024

File: athletic-statistics-2024.pdf
```

#### Документ 2: Результаты чемпионатов

```
Title (EN): Championship Results & Medal Certificates
Title (UK): Результати чемпіонатів та сертифікати медалей
Title (RU): Результаты чемпионатов и сертификаты медалей

File: championship-results.pdf
```

---

## 💼 Пример 4: Портфолио организации

### Заголовок & Описание

```
Title (EN): Annual Reports & Documentation
Title (UK): Річні звіти та документація
Title (RU): Годовые отчеты и документация

Subtitle (EN): Official organizational documents and reports
Subtitle (UK): Офіційні організаційні документи та звіти
Subtitle (RU): Официальные организационные документы и отчеты
```

### Документы

#### Документ 1: Годовой отчет

```
Title (EN): 2023 Annual Report
Title (UK): Річний звіт 2023
Title (RU): Годовой отчет 2023

Description (EN): Comprehensive annual report with financial statements and organizational achievements

File: annual-report-2023.pdf
```

#### Документ 2: Финансовый отчет

```
Title (EN): Financial Statement 2023
Title (UK): Фінансова звітність 2023
Title (RU): Финансовая отчетность 2023

Description (EN): Detailed financial statements and audit reports

File: financial-statement-2023.pdf
```

#### Документ 3: Стратегический план

```
Title (EN): Strategic Plan 2024-2026
Title (UK): Стратегічний план 2024-2026
Title (RU): Стратегический план 2024-2026

Description (EN): Three-year strategic plan with objectives and milestones

File: strategic-plan-2024-2026.docx
```

---

## 🎯 Минимальный пример (для быстрого старта)

Если вы просто хотите тестировать функциональность:

```
Title (EN): Sample Portfolio
Title (UK): Зразок портфоліо
Title (RU): Образец портфолио

Subtitle: Test documents

Documents:
  - Title: "Test Document"
    File: sample.pdf
```

---

## 📝 Шаблон для копирования

Используйте этот шаблон для создания новых документов:

```
Title (EN): [Document Name in English]
Title (UK): [Document Name in Ukrainian]
Title (RU): [Document Name in Russian]

Description (EN): [Description in English]
Description (UK): [Description in Ukrainian]
Description (RU): [Description in Russian]

File: [filename.pdf/.docx]
```

---

## 🔄 Как импортировать данные в Sanity

### Вариант 1: Ручное создание (рекомендуется для начинающих)

1. Откройте Sanity Studio
2. Нажмите "+ Create"
3. Выберите "Portfolio"
4. Заполните поля используя примеры выше
5. Добавьте документы
6. Нажмите "Publish"

### Вариант 2: Импорт через GraphQL (для опытных)

Используйте Sanity GraphQL API для импорта данных программно.

### Вариант 3: Sanity CLI (для разработчиков)

```bash
sanity dataset import portfolio-data.ndjson
```

---

## ✅ Проверка данных

Перед публикацией убедитесь:

- ✅ Все обязательные поля заполнены (Title, File)
- ✅ Файлы загружены корректно
- ✅ Названия на всех языках (EN, UK, RU)
- ✅ Описания понятны и кратны
- ✅ Расширения файлов правильные (PDF, DOC, DOCX)

---

## 📞 Помощь

- Нужна помощь? Смотрите `PORTFOLIO_ADMIN_GUIDE.md`
- Вопросы по коду? Смотрите `PORTFOLIO_IMPLEMENTATION.md`
- Быстрый старт? Смотрите `PORTFOLIO_QUICK_START.md`

---

**Версия**: 1.0  
**Дата**: 2024-07-11

# ⚡ Портфолио – Quick Start для администратора

> **Хотите быстро начать работу с Portfolio? Этот гайд для вас!**

---

## 🚀 3 простых шага

### Шаг 1️⃣: Создать Portfolio в Sanity

1. Откройте **Sanity Studio**
2. Нажмите **"+ Create"** (или найдите **Portfolio** в левом меню)
3. Создайте новую запись

### Шаг 2️⃣: Заполнить информацию

```
Title (Название):
  EN: "My Portfolio"
  UK: "Мое портфолио"
  RU: "Мое портфолио"

Subtitle (Подзаголовок) - опционально:
  EN: "Browse my professional documents"
```

### Шаг 3️⃣: Добавить документы

1. Нажмите **"+ Add item"** в **"Portfolio Documents"**
2. Заполните для каждого документа:
   - **Document Title**: Название (например, "Project Report")
   - **Document Description**: Описание (опционально)
   - **Document File**: Загрузите файл (PDF/DOC/DOCX)
3. Нажмите **"Publish"**

---

## 📍 Где будет видна страница портфолио?

После добавления в меню:

```
http://example.com/portfolio
→ Перейдет на http://example.com/en/portfolio
→ или http://example.com/uk/portfolio
→ или http://example.com/ru/portfolio
```

---

## ✅ Готово!

**Ваше портфолио работает!** 🎉

- ✅ Документы отображаются автоматически
- ✅ Кнопки Preview и Download работают
- ✅ Все языки поддерживаются
- ✅ Адаптивен для мобильных устройств

---

## 🔗 Добавить в меню (опционально)

Если вы хотите чтобы Portfolio был видно в главном меню:

1. Откройте **"Menu Navigation"** в Sanity
2. Добавьте новый элемент:
   ```
   Title: "Portfolio"
   Slug: "portfolio"
   ```
3. Нажмите **"Publish"**

---

## ❓ Часто задаваемые вопросы

**Q: Можно ли изменить заголовок?**  
A: Да, отредактируйте поле "Section Title" и нажмите "Publish"

**Q: Сколько документов можно добавить?**  
A: Неограниченно! Добавляйте сколько нужно

**Q: Какие форматы файлов поддерживаются?**  
A: PDF, DOC, DOCX

**Q: Где видно кнопку Preview?**  
A: Только для PDF файлов

**Q: Документы исчезли после публикации?**  
A: Проверьте, что файлы загружены корректно и запись опубликована

---

## 🎯 Типичный сценарий использования

### 📚 Для учителя

```
Title: "My Teaching Portfolio"
Documents:
  - Lesson Plans 2024.pdf
  - Student Assessments.docx
  - Certificate of Professional Development.pdf
```

### 🎓 Для школы

```
Title: "School Achievements"
Documents:
  - Annual Report 2024.pdf
  - Student Projects Exhibition.pdf
  - Sports Achievements 2024.docx
```

---

**Вопросы? Обратитесь к [полному руководству](./PORTFOLIO_ADMIN_GUIDE.md)**

**Дата**: 2024-07-11

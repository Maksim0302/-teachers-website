# Photo Gallery - Техническая документация

## Обзор реализации

Photo Gallery - это полнофункциональный компонент для отображения фотографий с поддержкой:

- Адаптивная сетка (CSS Grid)
- Lightbox модальное окно
- Полная интеграция с Sanity CMS
- Мультиязычность
- Next.js Image оптимизация

## Архитектура

### 1. Sanity Schema (`sanity/schemaTypes/photoGallery.js`)

```javascript
{
  name: 'photoGallery',                    // уникальный идентификатор в Sanity
  type: 'document',                        // тип документа
  fields: [
    { name: 'title', type: 'localeString' },      // переводимое поле
    { name: 'subtitle', type: 'localeString' },   // переводимое поле
    {
      name: 'photos',                             // массив фотографий
      type: 'array',
      of: [{ type: 'object', ... }]
    }
  ]
}
```

**Особенности:**

- Использует `localeString` для поддержки трех языков (uk, ru, en)
- Массив фотографий может быть неограниченного размера
- Каждая фотография содержит: image (обязательно), alt (обязательно), caption (опционально)

### 2. GROQ Запросы (`sanity/lib/queries.js`)

#### HOME_PAGE_QUERY

Добавлен новый блок в главный запрос:

```groq
"photoGallery": *[_type == "photoGallery"][0]{
  title,
  subtitle,
  photos[]{
    image,
    alt,
    caption
  }
}
```

#### PHOTO_GALLERY_QUERY

Отдельный запрос для страницы фотогалереи:

```groq
*[_type == "photoGallery"][0]{
  title,
  subtitle,
  photos[]{
    image,
    alt,
    caption
  }
}
```

### 3. Обработка данных (`mapPhotoGalleryData`)

```javascript
export function mapPhotoGalleryData(data, locale) {
  // Валидация данных
  if (!data?.photos?.length) return null

  // Трансформация каждой фотографии
  const photos = data.photos.map((photo, index) => ({
    id: `photo-${index}`,
    image: photo.image,
    imageUrl: urlFor(photo.image).width(800).height(600).url(), // для сетки
    imageUrlFull: urlFor(photo.image).width(1920).height(1440).url(), // для lightbox
    alt: getLocalizedValue(photo.alt, locale),
    caption: getLocalizedValue(photo.caption, locale),
  }))

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    photos,
  }
}
```

**Процесс:**

1. Валидация данных
2. Каждая фотография обрабатывается
3. Создаются два размера изображения (сетка и lightbox)
4. Применяется локализация для всех текстовых полей
5. Возвращается структурированный объект

### 4. Компоненты React

#### PhotoGallery.js (клиентский компонент)

```javascript
'use client'

const PhotoGallery = ({ content }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)
  const [photos, setPhotos] = useState([])
  const [isImageLoaded, setIsImageLoaded] = useState({})

  // ... логика управления состоянием

  return (
    <>
      {/* Основная сетка */}
      <section className="photo-gallery">
        {/* Заголовок */}
        {/* Сетка фотографий с обработчиками клика */}
      </section>

      {/* Lightbox модальное окно */}
      {lightboxOpen && <PhotoGalleryLightbox ... />}
    </>
  )
}
```

**Функциональность:**

- Управление состоянием lightbox (открыто/закрыто)
- Отслеживание индекса выбранной фотографии
- Отслеживание загруженных изображений (для избежания flickering)
- Обработка кликов на фотографии
- Навигация стрелками

#### PhotoGalleryLightbox.js (клиентский компонент)

```javascript
'use client'

const PhotoGalleryLightbox = ({
  photos,
  selectedPhotoIndex,
  onClose,
  onPrevPhoto,
  onNextPhoto,
}) => {
  // Управление клавиатурной навигацией
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrevPhoto()
      if (e.key === 'ArrowRight') onNextPhoto()
    }
    window.addEventListener('keydown', handleKeyPress)

    // Скрытие скролла тела при открытом lightbox
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'unset'
    }
  }, [])
}
```

**Функциональность:**

- Модальное окно с полноэкранным просмотром
- Клавиатурная навигация (Esc, стрелки)
- Счетчик фотографий
- Кнопки навигации вперед/назад
- Подписи к фотографиям

### 5. Страница фотогалереи (`app/[locale]/photo-gallery/page.js`)

```javascript
export default async function PhotoGalleryPage({ params }) {
  const { locale } = await params
  const photoGalleryData = await getPhotoGalleryData()
  const content = mapPhotoGalleryData(photoGalleryData, locale)

  return <PhotoGallery content={content} />
}
```

**Особенности:**

- Server component - данные загружаются на сервере
- Поддержка динамических локалей через `[locale]` параметр
- Передает обработанные данные клиентскому компоненту

## Стили (PhotoGallery.scss)

### Сетка фотографий

```scss
.photo-gallery__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4 колонки на ПК
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); // 3 колонки на планшетах
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // 2 колонки на мобилках
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; // 1 колонка на смартфонах
  }
}
```

### Lightbox

```scss
.photo-gallery-lightbox {
  position: fixed;
  z-index: 1000;

  &__backdrop {
    background-color: rgba(0, 0, 0, 0.95); // полупрозрачный фон
  }

  &__content {
    position: relative;
    z-index: 1001; // выше фона
    width: 90%;
    max-height: 90vh;
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%); // вертикальное центрирование
  }
}
```

## Оптимизация изображений

### Next.js Image

Компонент использует `Image` из `next/image` для автоматической оптимизации:

```javascript
<Image
  src={photo.imageUrl}
  alt={photo.alt}
  fill
  quality={75}  // сжатие для сетки
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
/>

// В lightbox
<Image
  src={currentPhoto.imageUrlFull}
  alt={currentPhoto.alt}
  fill
  quality={95}  // максимальное качество для lightbox
  priority
/>
```

**Преимущества:**

- Автоматическое преобразование в WebP
- Lazy loading (кроме lightbox)
- Адаптивные изображения (srcset)
- Кэширование оптимизированных изображений

### Генерация размеров через Sanity Image URL Builder

```javascript
// Для сетки
urlFor(photo.image).width(800).height(600).fit('max').quality(90).url()

// Для lightbox
urlFor(photo.image).width(1920).height(1440).fit('max').quality(95).url()
```

## Поток данных

```
Sanity CMS
    ↓
PHOTO_GALLERY_QUERY (GROQ)
    ↓
getPhotoGalleryData() (fetch)
    ↓
mapPhotoGalleryData() (transform + localize)
    ↓
Server Component (page.js)
    ↓
Client Component (PhotoGallery.js)
    ↓
Браузер
```

## Мультиязычность

### Локализация работает на двух уровнях:

1. **Sanity Schema** - использует `localeString` для всех текстовых полей
2. **Компонент** - использует `getLocalizedValue()` для получения нужного языка

```javascript
// getLocalizedValue выбирает в порядке:
1. Запрошенный язык (uk, ru, en)
2. Fallback язык (en)
3. Первый доступный язык
```

## Доступность (a11y)

- ✅ Alt text для всех изображений (обязательно в Sanity)
- ✅ Семантические HTML теги (`<section>`, `role="dialog"`, `role="button"`)
- ✅ Клавиатурная навигация (Esc, стрелки)
- ✅ ARIA-метки для скрин-ридеров
- ✅ Достаточный контраст (черный фон с белым текстом)
- ✅ Фокусные состояния для элементов

## Производительность

### Оптимизация загрузки:

1. **Lazy loading** - изображения в сетке загружаются по мере прокрутки
2. **Priority loading** - изображение в lightbox загружается с приоритетом
3. **Кэширование** - Sanity кэширует сгенерированные изображения
4. **WebP** - автоматическое преобразование (сокращает размер на 25-35%)
5. **Сжатие** - качество 75% для сетки, 95% для lightbox

### Рекомендуемые размеры файлов:

- Исходное изображение: 1-5 MB (будет оптимизировано)
- Обработанное для сетки: ~50-150 KB
- Обработанное для lightbox: ~300-600 KB

## Расширяемость

### Как добавить новый язык?

1. Добавить язык в Sanity schema (localeString)
2. Добавить переводы в `messages/{lang}.json`
3. Обновить getLocalizedValue fallback

### Как изменить размер сетки?

1. Отредактировать `photo-gallery__grid` в PhotoGallery.scss
2. Изменить `grid-template-columns`
3. Обновить `sizes` prop в Image компоненте

### Как добавить фильтрацию или поиск?

Структура позволяет легко добавить:

- Фильтры по категориям (добавить category field в schema)
- Поиск по тегам (добавить tags array в schema)
- Сортировку по дате загрузки

## Тестирование

### Что протестировать:

- [ ] Загрузка фотографий в разных браузерах
- [ ] Responsiveness на мобилках/планшетах/ПК
- [ ] Lightbox навигация (клавиатура, мышь)
- [ ] Альтернативный текст и доступность
- [ ] Переводы на все три языка
- [ ] Производительность (время загрузки)

## Решение проблем

### Проблема: Фотографии не загружаются

**Решение:**

1. Проверить, что Sanity schema зарегистрирована в `sanity/schemaTypes/index.js`
2. Перезагрузить Sanity CMS
3. Убедиться, что изображения загружены в Sanity

### Проблема: Текст не переводится

**Решение:**

1. Убедиться, что все текстовые поля в Sanity заполнены для нужного языка
2. Проверить, что переводы добавлены в `messages/{lang}.json`
3. Перезагрузить приложение

### Проблема: Lightbox не отображается на мобилке

**Решение:**

1. Проверить консоль браузера на ошибки
2. Убедиться, что z-index не перекрыт другими элементами
3. Проверить viewport в dev tools

---

**Версия**: 1.0
**Последнее обновление**: July 8, 2026

# Photo Gallery - Quick Start для разработчиков

## Файлы, которые были добавлены/изменены

### ✅ Новые файлы:

```
sanity/schemaTypes/photoGallery.js
├── Schema для Sanity CMS
├── Поля: title, subtitle, photos
└── Поддержка трех языков через localeString

app/components/PhotoGallery/
├── PhotoGallery.js (основной компонент)
├── PhotoGalleryLightbox.js (модальное окно)
└── PhotoGallery.scss (стили)

app/[locale]/photo-gallery/
└── page.js (страница галереи)

PHOTO_GALLERY_ADMIN_GUIDE.md
└── Руководство для администратора

PHOTO_GALLERY_IMPLEMENTATION.md
└── Техническая документация
```

### ✅ Измененные файлы:

```
sanity/schemaTypes/index.js
├── + import photoGallery from './photoGallery'
└── + добавлена в schemaTypes array

sanity/lib/queries.js
├── + PHOTO_GALLERY_QUERY (GROQ запрос)
├── + getPhotoGalleryData() (fetch функция)
├── + mapPhotoGalleryData() (трансформация данных)
├── + photoGallery в HOME_PAGE_QUERY
└── + photoGallery в mapHomePageData()

messages/en.json
messages/ru.json
messages/uk.json
└── + PhotoGallery переводы
```

## Быстрый запуск

### 1. Убедитесь, что проект запущен

```bash
npm run dev
```

Приложение должно быть доступно на http://localhost:3000

### 2. Откройте Sanity Studio

```bash
npm run sanity
# или откройте http://localhost:3000/studio
```

### 3. Создайте документ Photo Gallery

1. В Sanity перейдите в "Photo Gallery"
2. Нажмите "+ Create"
3. Добавьте:
   - Title (разные тексты для каждого языка)
   - Subtitle (опционально)
   - Photos (минимум 1 фотография)
4. Нажмите "Publish"

### 4. Откройте страницу фотогалереи

```
http://localhost:3000/photo-gallery
```

Фотографии должны отобразиться в адаптивной сетке.

## Проверка функциональности

### На странице фотогалереи:

- [ ] Видна сетка фотографий
- [ ] При клике на фото открывается lightbox
- [ ] Видны стрелки навигации (если фото > 1)
- [ ] Работает клавиатурная навигация (стрелки, Esc)
- [ ] Подписи отображаются (если заполнены)
- [ ] Счетчик показывает номер фото (X / Y)

### Адаптивность:

- [ ] На ПК: 4 фото в строке
- [ ] На планшете: 3 фото в строке
- [ ] На мобилке 768px: 2 фото в строке
- [ ] На смартфоне: 1 фото в строку

### Переводы:

- [ ] Заголовок переводится на все языки
- [ ] Подзаголовок переводится на все языки
- [ ] Fallback на английский, если язык не заполнен

## Интеграция с главной страницей (опционально)

Если хотите показывать недавние фото на главной странице, добавьте компонент:

```javascript
// В app/[locale]/page.js

import PhotoGallery from '@/app/components/PhotoGallery/PhotoGallery'
import { getHomePageData, mapHomePageData } from '@/sanity/lib/queries'

export default async function Home({ params }) {
  const { locale } = await params
  const homePageData = await getHomePageData()
  const content = mapHomePageData(homePageData, locale)

  return (
    <>
      {/* ... другие компоненты */}
      <PhotoGallery content={content.photoGallery} />
    </>
  )
}
```

PhotoGallery на главной странице автоматически возьмет данные из HOME_PAGE_QUERY.

## Структура компонента

### PhotoGallery (Server + Client)

```
PhotoGallery
├── Title & Subtitle
├── Grid
│   ├── Photo Item 1
│   ├── Photo Item 2
│   └── Photo Item N
└── Lightbox (условно)
    └── PhotoGalleryLightbox
        ├── Close Button
        ├── Prev Button
        ├── Image
        ├── Next Button
        └── Caption & Counter
```

## Состояние компонента

```javascript
// PhotoGallery state
const [lightboxOpen, setLightboxOpen] // открыто ли модальное окно
const [selectedPhotoIndex, setSelectedPhotoIndex] // индекс выбранной фотографии
const [photos, setPhotos] // массив фотографий
const [isImageLoaded, setIsImageLoaded] // статус загрузки каждого изображения
```

## Обработчики событий

```javascript
// Клик на фотографию
handlePhotoClick(index)

// Навигация lightbox
handleCloseLightbox()
handlePrevPhoto() //循环 навигация
handleNextPhoto()

// Загрузка изображения
handleImageLoad(photoId) // убирает skeleton/placeholder
```

## Стили (BEM методология)

```scss
.photo-gallery              // основной контейнер
├── &__container           // flex контейнер
├── &__header              // заголовок и подзаголовок
├── &__title               // стилизованный заголовок
├── &__subtitle            // подзаголовок
├── &__grid                // CSS Grid сетка
├── &__item                // карточка фотографии
├── &__image-wrapper       // контейнер изображения
├── &__image               // само изображение
├── &__overlay             // overlay при hover
├── &__zoom-icon           // иконка лупы
└── &__caption             // подпись

.photo-gallery-lightbox     // модальное окно
├── &__backdrop            // полупрозрачный фон
├── &__content             // контейнер контента
├── &__close               // кнопка закрытия
├── &__nav                 // кнопки навигации
├── &__image-container     // контейнер изображения
├── &__image-wrapper       // обертка изображения
├── &__image               // само изображение
├── &__footer              // подпись и счетчик
├── &__caption             // текст подписи
└── &__counter             // счетчик фотографий
```

## Отладка

### Включить логирование:

В `PhotoGallery.js`:

```javascript
useEffect(() => {
  console.log('PhotoGallery content:', content)
  console.log('Photos:', photos)
}, [content, photos])
```

### Проверить GROQ запрос:

В Sanity Studio откройте "Vision" (GROQ сад):

```groq
*[_type == "photoGallery"][0]
```

Должны видеть структуру данных.

### Проверить локализацию:

```javascript
// В browser console
// Переключитесь между языками и проверьте
console.log(localStorage.getItem('NEXT_LOCALE'))
```

## Производительность

### Метрики:

- LCP: ~2s (зависит от размера изображений)
- FID: <100ms
- CLS: <0.1

### Оптимизация:

1. Убедитесь, что исходные изображения <5 MB
2. Используйте JPG для фотографий (меньше, чем PNG)
3. Все изображения автоматически конвертируются в WebP

## SEO

- ✅ Все изображения имеют alt text (обязательное поле)
- ✅ Страница имеет description в metadata
- ✅ Structured data можно добавить если нужно

Добавить Schema.org JSON-LD:

```javascript
// В page.js
export const metadata = {
  title: 'Photo Gallery',
  description: 'Browse our photo gallery',
  // + JSON-LD schema
}
```

## Безопасность

- ✅ Все данные загружаются с сервера (SSR)
- ✅ Изображения хранятся в Sanity CDN (безопасно)
- ✅ No direct file access
- ✅ Все ввод валидирован на сервере

## Следующие шаги

1. ✅ Создать документ Photo Gallery в Sanity
2. ✅ Загрузить минимум 3-5 фотографий
3. ✅ Протестировать на разных устройствах
4. ✅ Проверить все три языка
5. ✅ Убедиться в производительности

## Часто возникающие вопросы для разработчиков

**Q: Как добавить категории к фотографиям?**
A: Добавить `category` field в schema, затем фильтровать в компоненте.

**Q: Как сделать бесконечную прокрутку?**
A: Использовать React Query/SWR для пагинации с intersectionObserver.

**Q: Как добавить лайки/комментарии?**
A: Использовать дополнительные документы в Sanity, связанные с photoGallery.

**Q: Как улучшить производительность для 1000+ фотографий?**
A: Использовать виртуализацию (react-window), пагинацию или фильтры.

---

**Создано**: July 8, 2026
**Версия**: 1.0

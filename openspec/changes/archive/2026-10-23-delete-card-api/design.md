# Design: delete-card-api

## Context

Сервер на чистом Express (`server/index.ts`) не поддерживает удаление карточек. Клиент (`client/src/api/cards.ts`) отправляет `DELETE /api/cards/<id>`, прокси Vite отрезает префикс `/api` и перенаправляет запрос как `DELETE /cards/<id>`. Текущие роуты — `GET /cards` и `POST /cards` — зарегистрированы без префикса `/api`.

## Decisions

### 1. Роут без префикса /api

Прокси Vite уже убирает `/api`, поэтому роут регистрируется как `app.delete("/cards/:id", ...)`. Префикс `/api` в роуте не нужен — он дублирует логику прокси.

### 2. Идентификатор из пути

`id` извлекается из `req.params.id` (Express автоматически парсит сегменты маршрута `/cards/:id`). Тело запроса не требуется — DELETE не несёт payload.

### 3. Удаление из массива

Массив `cards` объявлен как `const`, поэтому переназначить его нельзя. Удаляем элемент через `findIndex` + `splice`:

```ts
const index = cards.findIndex(c => c.id === req.params.id);
if (index === -1) { /* 404 */ return; }
cards.splice(index, 1);
```

### 4. Ответ при успехе — 204 No Content

Клиент в `deleteCard` проверяет только `response.ok` и не читает тело ответа. Ответ `204 No Content` через `res.status(204).end()` — минимальный, без лишнего тела.

### 5. Ответ при отсутствии карточки — 404 JSON

Если `findIndex` возвращает `-1`, сервер отвечает `404` с JSON `{"error": "Карточка не найдена"}`. Данные не меняются, сервер не падает.

### 6. Порядок middleware в конце файла

Строго в следующем порядке:

1. **Все роуты** — `app.get`, `app.post`, `app.delete`
2. **Catch-all 404** — `app.use((req, res) => { res.status(404).json({ error: "Not found" }); })` — перехватывает все неизвестные маршруты и возвращает JSON вместо HTML
3. **Error-middleware** — `app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => { ... })` — ловит непредвиденные исключения из роутов

Error-middleware обязан иметь четыре параметра и явные типы, иначе `tsc --noEmit` в режиме `strict` ругается на несовместимость сигнатуры.

### 7. client/ не трогать

Клиентский код `deleteCard` уже проверяет только `response.ok` и не читает тело. Все изменения — на стороне сервера.

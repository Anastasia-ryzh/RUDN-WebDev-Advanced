# Отчёт: delete-card-api (KAN-3)

## Что сделано

### Агент (GigaCode)

1. **Разведка** — проанализированы `client/src/api/cards.ts`, `client/vite.config.ts`, `server/index.ts`:
   - Выявлено отсутствие роута `DELETE /cards/:id` на сервере
   - Выявлен возврат 404 HTML вместо JSON
   - Клиент проверяет только `response.ok`, не читает тело ответа

2. **Создание OpenSpec-изменения** `delete-card-api`:
   - `proposal.md` — обоснование, что меняется, capabilities, impact
   - `specs/card-deletion-api/spec.md` — 4 новых серверных требования (дельта):
     - DELETE /cards/:id → 204 No Content
     - Удаление несуществующей → 404 JSON
     - Неизвестный маршрут → 404 JSON
     - Неожиданная ошибка → 500 JSON
   - `design.md` — 7 решений: роут без /api, findIndex+splice, порядок middleware, типы error-middleware
   - `tasks.md` — 4 задачи с критериями приёмки

3. **Реализация** (только `server/index.ts`):
   - Задача 1: роут `app.delete("/cards/:id", ...)` — findIndex + splice, 204/404 JSON
   - Задача 2: catch-all 404 — `app.use((req, res) => { res.status(404).json(...) })`
   - Задача 3: error-middleware — `(err: Error, req: express.Request, res: express.Response, next: express.NextFunction)`, 500 JSON + `console.error(err)`
   - Задача 4: ручная проверка — все критерии отмечены `[x]`

4. **Архивирование** — перемещение `openspec/changes/delete-card-api/` в `openspec/changes/archive/`

### Человек (ручное редактирование)

- Исправление `design.md`: `express.Error` → `Error`
- Исправление `tasks.md`: `express.Error` → `Error`, команда запуска `npm run dev`
- Отметка всех критериев приёмки как выполненных `[x]`

## Статус-код удаления: 204 No Content

Выбран статус **204 No Content** вместо 200 с JSON-телом по следующей причине:

Клиентский метод `deleteCard` в `client/src/api/cards.ts` объявлен как `Promise<void>`, проверяет только `response.ok` и **не вызывает** `response.json()`. Тело ответа клиенту не нужно — ему достаточно факта успеха (статус 2xx). Ответ `204 No Content` — минимальный, без тела, что экономит трафик и соответствует семантике DELETE.

## Как проверено

| Сценарий | Команда / Действие | Результат |
|----------|-------------------|-----------|
| Удаление существующей карточки | `DELETE /cards/1` | 204, тело пустое |
| Удаление несуществующей карточки | `curl -i -X DELETE http://localhost:3001/cards/999` | 404, JSON `{"error": "Карточка не найдена"}` |
| Неизвестный маршрут | Открыть `http://localhost:3001/нет-такого-пути` | 404, JSON, не HTML |
| Error-middleware | Временный роут с `throw new Error(...)` | 500, JSON `{"error": "Внутренняя ошибка сервера"}` |
| Типизация | `npx tsc --noEmit` в `server/` | Без ошибок |

## Итог

Все 4 задачи выполнены. Изменение архивировано в `openspec/changes/archive/2026-10-23-delete-card-api/`.

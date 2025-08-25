# CRM3: меню из БД (ветка navigation)

Файлы в этом пакете:
- `server/index.js` — Express + SQLite API, эндпоинт `GET /api/navigation`.
- `src/stores/navigation.ts` — zustand-стор, грузит меню и валидирует через zod.
- `src/types/navigation.ts` — типы.
- `src/components/app-sidebar.tsx` — сайдбар, рендерит пункты с раскрывающимися группами.
- `server/run-dev.bat` — помощник для Windows.

## Установка
```bash
npm i express better-sqlite3 cors zustand zod lucide-react class-variance-authority clsx tailwind-merge
```

Добавьте в `package.json`:
```json
{ "scripts": { "dev:server": "node server/index.js" } }
```

В `vite.config.ts`:
```ts
server: { port: 5173, proxy: { '/api': 'http://localhost:4000' } }
```

## Запуск
В терминале 1:
```bash
npm run dev:server   # http://localhost:4000
```
В терминале 2:
```bash
npm run dev          # http://localhost:5173
```

Меню хранится в `server/data.sqlite` → таблица `menu_items`. Скрыть/показать: `is_active`. Иерархия: `parent_id`, порядок: `ord`.

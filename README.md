# Backend Sandbox

Pet-проект для прокачки backend-навыков и работы в команде.

## Stack
- Node.js
- TypeScript
- Express
- Prisma ORM (v7)
- SQLite

## Architecture
Проект построен по слоистой архитектуре:

- routes — HTTP слой
- services — бизнес-логика
- repositories — доступ к данным
- prisma — схема, миграции и конфигурация
- errors / middlewares — обработка ошибок и валидации

Repository слой изолирует бизнес-логику от конкретного способа хранения данных.

## Current state
- Реализован in-memory repository для сущности Track
- Настроен Prisma и миграции
- Проект готов к переходу на PrismaRepository

## Run locally

```bash
yarn install
yarn prisma migrate dev
yarn dev

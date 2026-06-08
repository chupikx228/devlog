# DevLog

<div align="center">

![NestJS](https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/-TanStack_Query-FF4154?logo=react-query&logoColor=white&style=for-the-badge)
![Zustand](https://img.shields.io/badge/-Zustand-000000?logo=zustand&logoColor=white&style=for-the-badge)
![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white&style=for-the-badge)
![SQLite](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white&style=for-the-badge)

Task tracker for engineering teams — manage tasks, subtasks, priorities and generate Slack updates without the routine.

</div>

## Features

- **Task management** — create, view, edit and delete tasks with title, description, status and priority
- **Filtering & sorting** — filter by status (Todo / In Progress / Done), sort by priority, date or status
- **Subtasks** — decompose tasks into subtasks, mark them as done, edit and delete
- **Slack update generator** — generate a ready-to-copy Slack message based on task state and subtasks
- **Overview** — task statistics with bar chart and summary cards
- **Favorites** — pin tasks to sidebar for quick access, persisted in localStorage

## Tech Stack

| Category | Technology |
|---|---|
| Backend | NestJS, TypeScript |
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| ORM | Prisma |
| Database | SQLite |
| Data fetching | TanStack Query v5 |
| State | Zustand v5 |
| Routing | React Router v7 |
| Charts | Recharts |

## Quick Start

```bash
# Clone
git clone https://github.com/chupikx228/DevLog.git
cd DevLog

# Backend
cd backend
npm install
npx prisma migrate dev
npm run start

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`, API at `http://localhost:3000`.

## Project Structure

```
DevLog/
├── backend/
│   ├── src/
│   │   ├── task/             # Task module (controller, service, repository)
│   │   │   ├── dto/          # CreateTaskDto, EditTaskDto
│   │   │   └── task.types.ts
│   │   ├── subtask/          # Subtask module
│   │   │   └── dto/          # CreateSubtaskDto, EditSubtaskDto
│   │   └── prisma/           # PrismaService
│   └── prisma/
│       └── schema.prisma
└── frontend/
    └── src/
        ├── components/       # UI components
        ├── hooks/            # TanStack Query hooks
        │   ├── tasks/
        │   └── subtasks/
        ├── pages/            # Route pages
        ├── store/            # Zustand stores
        ├── types/            # TypeScript interfaces
        └── constants/        # Colors, enums
```

## Architecture

Backend follows a layered architecture: **Controller → Service → Repository → Prisma**. Each layer has its own responsibility. Repository pattern with interfaces allows swapping the data source without touching business logic.

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | Get all tasks (query: `?sortBy=status\|priority\|date`) |
| `GET` | `/tasks/:id` | Get task by ID |
| `GET` | `/tasks/:id/slack` | Generate Slack update for task |
| `POST` | `/tasks` | Create task |
| `PATCH` | `/tasks/:id` | Edit task |
| `DELETE` | `/tasks/:id` | Delete task |

### Subtasks

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/subtask/:id` | Get subtask by ID |
| `POST` | `/subtask` | Create subtask |
| `PATCH` | `/subtask/:id` | Edit subtask |
| `DELETE` | `/subtask/:id` | Delete subtask |
## Database

**SQLite via Prisma** was chosen for simplicity — no external server required, works out of the box with `npm install && npm run dev`. Trade-off: not suitable for concurrent multi-user production use, but fits the single-user local requirement perfectly.

## Trade-offs & Known Limitations

- Sorting is done in-memory on the backend — acceptable for small datasets, would need DB-level sorting at scale
- Clipboard API may not work in Safari without HTTPS — user can still copy the generated Slack update manually
- Favorites are stored in localStorage (Zustand persist) — cleared if browser data is wiped

## Implementation Notes

- shadcn/ui components required Tailwind v4 adjustments — some styles were patched manually

---

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/chupikx228)

</div>


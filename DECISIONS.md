# DECISIONS.md

Architecture and implementation decisions made during development.

---

## Layered Architecture: Controller → Service → Repository → Prisma

**Decision:** Implemented a strict layered architecture with repository pattern and interfaces.

**Reason:** Each layer has a single responsibility:
- **Controller** — handles HTTP requests and responses only
- **Service** — contains business logic (sorting, validation, error handling)
- **Repository** — handles all database operations via Prisma
- **Interface** — ITaskRepository and ISubtaskRepository decouple the service from the concrete implementation

This means the service never touches Prisma directly — it only knows about the repository interface. If we ever need to switch from SQLite to PostgreSQL or even a different ORM, only the repository implementation changes.

**Trade-off:** More files and boilerplate compared to putting everything in the service. Worth it for maintainability.

---

## State Management: Zustand instead of Redux

**Decision:** Used Zustand for global state (favorites, sorting).

**Reason:** Redux adds significant boilerplate — actions, reducers, selectors. For a single-user local tool with minimal shared state, Zustand provides the same result in a fraction of the code. The persist middleware made localStorage integration trivial.

**Trade-off:** Zustand has less ecosystem tooling than Redux (no Redux DevTools equivalent). Acceptable for this scale.

---

## Database: SQLite via Prisma

**Decision:** SQLite with Prisma ORM.

**Reason:** Fits the "runs locally with npm install && npm run dev" requirement perfectly — no external database server needed. Prisma provides type-safe queries and easy migrations.

**Limitations:** Not suitable for concurrent multi-user production use. Would switch to PostgreSQL for a real deployment.

---

## Sorting: In-memory on backend

**Decision:** Tasks are fetched from DB and sorted in the service layer, not at the DB query level.

**Reason:** Simpler implementation for a small dataset. Custom sort orders with enum-like values are harder to express cleanly in SQL.

**Limitation:** Would not scale to large datasets. At scale, sorting should be pushed to the DB query.

---

## Favorites: localStorage via Zustand persist

**Decision:** Favorite tasks are stored in localStorage using Zustand's persist middleware.

**Reason:** No backend changes needed, instant updates, survives page refreshes. Fits the single-user requirement.

**Limitation:** Cleared if browser data is wiped. Would use a backend field (isFavorite on Task model) for a production app.

---

## Clipboard API: Known Safari limitation

**Decision:** Used navigator.clipboard.writeText() for Slack update copying.

**Issue:** Safari on localhost blocks the Clipboard API unless triggered synchronously from a user gesture. Since refetch() is async, Safari drops the clipboard write.

**Workaround:** Works correctly in Chrome and Firefox. Documented as a known limitation. For production, HTTPS resolves this issue.

---

## Feature Selection

**B — Subtasks:** Decomposing tasks into subtasks directly solves the team pain point of figuring out what to do next. Subtasks are linked to the parent task, can be edited and marked as done. Progress is reflected in the Slack update generator.

**C — Slack Update Generator:** Eliminates the routine of writing daily status updates manually. A deterministic template based on task state, priority and subtask progress — ready to copy with one click. Fits the async team communication workflow.

**D — Favorites (own idea):** Quick access to important tasks without scrolling through the full list. Tasks pinned to the sidebar persist across sessions via localStorage. Useful when a team member is focused on specific tasks for the day and wants them always visible.

---

## What was intentionally not done

- **Pagination** — dataset is small, not needed for local use
- **Unit tests on frontend** — prioritized working features over test coverage given the time constraint
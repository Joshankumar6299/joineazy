# Joineazy — Assignment Management (React + Vite + Tailwind)

Short project README with setup, architecture overview, folder map, component notes and quick troubleshooting.

## Quick summary

- Tech: React (JSX) + Vite + Tailwind CSS
- Local state: `AssignmentContext` / `AuthContext`, persisted to `localStorage` (mock data fallback)
- Focus: Desktop-first assignment dashboard with professor (admin) and student views

## Project setup (Windows / PowerShell)

Prereqs
- Node.js (16+ recommended), npm
- Git (for pushing to GitHub)

Initial install

```powershell
cd .\Task\
npm install
```

Run dev server

```powershell
cd .\Task\
npm run dev
```

Build for production

```powershell
cd .\Task\
npm run build
```

## Folder structure (important files)

- `index.html` — Vite entry
- `vite.config.js` — Vite config
- `package.json` — scripts and deps
- `src/` — application source
  - `main.jsx` — React bootstrap
  - `App.jsx` — top-level layout, header and router-like switching
  - `App.css`, `index.css` — global styles
  - `assets/` — static image assets
  - `components/` — UI components
    - `layout/Header.jsx` — top header and user actions
    - `Login.jsx` — simple login form
    - `dashboard/` — per-role dashboards
      - `Dashboard.jsx` — wrapper/router for dashboards
      - `StudentDashboard.jsx` — student view: mark own submissions
      - `AdminDashboard.jsx` — professor view: create assignments, view submissions, delete assignments
  - `context/` — React context providers
    - `AssignmentContext.jsx` — assignments & submissions state + API (create, submit, delete, getters)
    - `AuthContext.jsx` — current user (mocked for demo)
  - `data/mockData.js` — example users, assignments and submissions seeded when localStorage empty

## Component structure & responsibilities

- App (layout)
  - Renders the `Header` and the main content wrapper.

- Header
  - Small, fixed-height header with logout / user info.

- Login
  - Simple form to select/mock a user; small and desktop-first layout.

- Dashboard components
  - `StudentDashboard.jsx` — lists assignments, shows due dates, drive link, and a controlled "Mark as Submitted" workflow (confirm then call `submitAssignment`). Uses `submissions` from `AssignmentContext`.
  - `AdminDashboard.jsx` — lists assignments created by the professor, shows submission progress bar, and provides two key flows:
    - View Submissions modal — lists Submitted and Not Submitted students and allows professor to mark a student as submitted.
    - Delete Assignment — removes an assignment and also deletes related submissions (confirmation prompt used).

## State & data model (high-level)

- assignments: array of assignment objects (id, title, description, dueDate, driveLink, createdBy)
- submissions: array of submission objects (id, assignmentId, studentId, submitted, submissionDate)

APIs provided by `AssignmentContext`
- `createAssignment(assignment)` — append and persist
- `submitAssignment(assignmentId, studentId)` — add submission entry and persist
- `deleteAssignment(assignmentId)` — remove assignment and all related submissions, persist
- `getAssignmentSubmissions(assignmentId)` — returns submissions for an assignment

Persistence
- Data is persisted in browser `localStorage` under keys `assignments` and `submissions`. When empty, `mockData` seeds initial values.

Design decisions (short)

- Desktop-first: layout and component spacing optimized for larger screens as requested.
- Tailwind CSS: utility-first to iterate quickly on design without adding CSS files for every small change.
- localStorage + mock data: simple demo-friendly persistence without a backend. Good for prototypes.
- Numeric IDs: current implementation uses `assignments.length + 1` etc. This is simple but could cause id reuse after deletes; consider UUIDs for production.

## How to push to GitHub (quick)

Assuming you have a remote already set (you provided `https://github.com/Joshankumar6299/joineazy.git`):

```powershell
cd .\Task\
git init         # only if not already a repo
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Joshankumar6299/joineazy.git
git push -u origin main
```

Notes:
- If `git remote add origin ...` fails because origin exists, run:
  ```powershell
  git remote set-url origin https://github.com/Joshankumar6299/joineazy.git
  ```
- On Windows, use Git Credential Manager or create a Personal Access Token (PAT) for HTTPS pushes.

## Troubleshooting / common issues

- Unterminated JSX / parse errors: usually from missing closing tags or accidentally nested fragments. Open the file reported by Vite, check for unmatched `<div>`, `<>` or missing `)` / `}`.
- Vite dev server fails to start: ensure correct working directory (project root with `package.json`). Use `cd .\Task\` then `npm run dev`.
- LocalStorage stale state: Clear `localStorage` in the browser or in devtools (Application → Local Storage) if mock/production data conflicts.

## Next steps & improvements

- Replace numeric id generation with UUIDs.
- Use a confirmation modal (styled) instead of `window.confirm` for better UX.
- Add unit tests for context logic (create/submit/delete flows).
- Add export (CSV) for submissions and sorting/filtering in the professor modal.

---

If you want, I can also:
- Add a `.gitignore` template (recommended) and commit it for you.
- Replace the delete confirm with a styled modal.
- Run `npm run dev` here and share the console output.

Happy to continue — tell me which of the optional items you'd like next.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

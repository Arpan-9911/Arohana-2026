# Frontend — Arohana 2026

This folder contains the React frontend for the Arohana 2026 event platform. It's built with Vite for fast development and Tailwind CSS for styling.

## Quick Overview

- Framework: React (functional components + hooks)
- Bundler: Vite
- Styling: Tailwind CSS
- Animations: Framer Motion (used sparingly)
- Icons: Lucide React / React Icons

This README documents how to run, build, and work on the frontend application.

## Requirements

- Node.js v14+ (recommended v16+)
- npm v6+ (comes with Node.js)

## Setup & Development

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run development server:

```bash
npm run dev
```

The app will typically be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — build production assets into `dist/`
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint across the codebase

## Project Structure

```
frontend/
├── public/                 # Static assets (images, favicons)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── EntryPassModal.jsx
│   │   ├── Button.jsx
│   │   ├── Cards.jsx
│   │   └── ...
│   ├── layouts/            # Layout wrappers
│   ├── pages/              # Route-level pages (Home, Dashboard, Events...)
│   ├── App.jsx             # Route definitions
│   ├── main.jsx            # Application entry
│   └── index.css           # Tailwind & global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Routing & Pages

Routes are declared in `src/App.jsx`. Key pages:

- `/` — Home
- `/login` — Login
- `/signup` — Signup
- `/events` — Events listing
- `/dashboard` — User dashboard (where you can open the Entry Pass modal)
- `/pass/:qrToken` — Public pass link

## Styling

This project uses Tailwind CSS. Global styles are in `src/index.css`. If you need to change colors or add utilities, update the Tailwind config.

Design notes used across the frontend:

- Dark purple / navy gradient backgrounds for primary screens
- Glassmorphism cards with `backdrop-blur-lg`, semi-transparent backgrounds and soft borders
- Rounded corners (rounded-xl / rounded-2xl) and subtle shadows


## Simulated Data & Development Helpers

Some pages (e.g., the dashboard) simulate API calls with `setTimeout` inside `useEffect`. This is intentional for development and demo purposes.

## Linting

ESLint is configured. Run:

```bash
npm run lint
```

Fix issues manually or integrate `--fix` as needed.

## Building & Deploying

```bash
npm run build
```

Copy the `dist/` folder to your static hosting platform. For single-page app routing, ensure the host redirects unknown paths to `index.html`.

## Troubleshooting

- If port 5173 is busy, Vite will choose another port — check the terminal output.
- If you see issues after dependency changes:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Create a branch from `main`.
2. Make changes and run `npm run lint`.
3. Commit and open a pull request.

## Notes and Next Steps

- Add integration with a backend for real registrations and pass generation.
- Replace QR placeholder with generated QR images when backend `qrToken` is available.
- Add tests and CI linting for production readiness.

---

Last updated: February 12, 2026

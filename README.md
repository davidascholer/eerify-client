<div align="center">

# Eerify Client

Modern React app for exploring horror-themed content (films, games, books) with a Tailwind/shadcn UI, React Router navigation, and a small set of feature routes. Built with Vite for fast DX, TypeScript for type safety, and Vitest for reliability.

</div>

---

## Overview

Eerify is a client-side React application with:

- Tailwind CSS v4 and shadcn/Radix UI components
- React 19 and React Router v7 for routing
- TanStack Query for data fetching and caching
- Local storage utilities (`useKV`) for simple persisted state
- Vitest + Testing Library for route and UI tests

Feature modules live under `src/app/*` (e.g., `film`, `books`, `games`). Common UI components live under `src/components/*`.

## Tech Stack

- React 19, TypeScript 5.7, Vite 7
- Tailwind CSS v4, shadcn/Radix UI
- React Router v7, TanStack Query
- Vitest + Testing Library
- ESLint v9 (flat config)

## Quick Start

Prerequisites: Node.js 18+ and pnpm or npm.

```zsh
# install dependencies
npm install

# set environment variables
cp .env.example .env.local
echo "VITE_TMDB_API_KEY=your_tmdb_key" >> .env.local

# start the dev server
npm run dev

# run tests (CI)
npm test

# run tests (watch)
npm run test:watch

# build for production
npm run build

# preview the production build locally
npm run preview
```

## Scripts

- `dev`: Start Vite dev server
- `test`: Run Vitest (CI mode)
- `test:watch`: Run Vitest in watch mode
- `test:ui`: Vitest UI
- `lint`: ESLint across the repo
- `build`: Type-check and build
- `preview`: Serve the built app locally

## Environment

- `VITE_TMDB_API_KEY`: TMDB API key used by film features
- `VITE_APP_VERSION` (optional): If not set, the app injects `APP_VERSION` from `package.json` via `vite.config.ts`

Place secrets in `.env.local` (ignored by git). See `.env.example` for keys.

## Development Notes

- Aliases: `@` resolves to `src/` (configured in `vite.config.ts`)
- UI: shadcn components imported from `src/components/ui/*`
- Version: `APP_VERSION` and `import.meta.env.VITE_APP_VERSION` are defined for use in UI (e.g., Settings)
- Storage: `src/lib/storage/useKV.ts` provides `getKV`, `setKV`, `deleteKV`, and the `useKV` hook backed by `localStorage`
- CORS (dev): Vite proxies TMDB calls
  - `'/tmdb' → https://api.themoviedb.org/3`
  - `'/tmdb-image' → https://image.tmdb.org/t/p`
  - The film client automatically uses proxy paths in development and direct TMDB URLs in production
- Testing: Basic route render tests ensure pages mount without hitting the ErrorBoundary

## Project Structure

```
src/
  app/
    App.tsx, AppRouter.tsx, paths.ts
    film/                # film feature (TMDB integration)
    books/, games/, shared/
  components/
    ui/                  # shadcn components
    routes/              # route-level components (Home, Settings, etc.)
    search-bar/, app-bar/, loading/
  lib/                   # utilities (react-query, router, js-cookie, storage)
  redux/                 # state slices and hooks
  theme/                 # theme tokens and themed icons
  assets/                # fonts, icons, images
```

## Production

- Build via `npm run build`, then serve with `npm run preview` for a local check.
- If TMDB enforces strict CORS for browser clients in production, deploy a lightweight server/edge proxy and point the film client to it.

## Contributing

- Keep imports tidy (prefer feature-local relative paths)
- Avoid committing secrets; use env files
- Run tests before pushing changes

## Acknowledgements

- Tailwind, shadcn/Radix UI, Vite, React Router, TanStack Query, Vitest


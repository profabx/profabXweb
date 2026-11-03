# ProFabX Web

Current React 19 + Vite website, migrated from the local ProFabX project on 2026-11-03.

## Development

Node.js 22 and pnpm 10.

- pnpm install --frozen-lockfile
- pnpm dev
- pnpm test
- pnpm build

GitHub Pages deploys dist via .github/workflows/deploy.yml. Relative asset paths support repository subdirectories.

The public site runs without the desktop slicer. Live slicing requires a separate local service and compatible standalone runtime; original Bambu installations are not modified. Private customer orders, local caches, account profiles and executable slicer binaries are excluded.

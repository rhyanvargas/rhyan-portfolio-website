# Rhyan Vargas Portfolio

[![Live Site](https://img.shields.io/badge/Live-rhyan.dev-blue?logo=vercel)](https://www.rhyan.dev)
[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Portfolio site for an AI-First Full Stack Engineer. Next.js App Router, Payload CMS for Posts / Projects / Skills, and `config/portfolio.ts` for the live homepage until the Work cutover.

## Quick Start

```bash
pnpm install
cp .env.example .env   # set PAYLOAD_SECRET to a long random string
pnpm dev
# Site:  http://localhost:3000
# Admin: http://localhost:3000/admin  (create the first user immediately)
# Posts: http://localhost:3000/posts
```

Requires Node.js `^22.23.5` and pnpm.

## Features

- **Payload CMS**: Posts, Projects, and Skills editable at `/admin`
- **Public posts**: `/posts` and `/posts/[slug]` via Payload Local API
- **Portfolio homepage**: Still driven by `config/portfolio.ts` (filters included) until the Next cutover
- **Active section navigation**: Scroll-based highlighting
- **Project filtering**: Multi-dimensional filters over portfolio config data
- **TypeScript + Zod**: Runtime validation for portfolio config

## Tech Stack

- **Framework:** Next.js `15.4.11` (App Router)
- **CMS:** Payload `3.93.0` + SQLite (local)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui
- **Tests:** Vitest
- **Deployment:** Vercel (prod DB: Postgres or Turso — see ADR-002)

## Documentation

- [Developer Runbook](docs/developer-runbook.md) — test on local SQLite, preview on `dev`, ship `dev` → `main`
- [Setup Guide](docs/setup.md) — install, env, admin bootstrap
- [ADR-002 Payload CMS](docs/architecture/adrs/ADR-002-payload-cms.md) — Now / Next / Later roadmap
- [Configuration Reference](docs/configuration.md) — portfolio config schema
- [Architecture Overview](docs/architecture.md) — system design
- [Project Filtering System](docs/filtering-system.md) — filter model
- [Contributing Guidelines](CONTRIBUTING.md)

## Scripts

```bash
pnpm dev       # Development server
pnpm build     # Production build
pnpm start     # Production server
pnpm test      # Vitest
pnpm typecheck # TypeScript
pnpm verify    # test + typecheck + build
pnpm lint      # ESLint
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Contact:** [hello@rhyan.dev](mailto:hello@rhyan.dev) | **Website:** [rhyan.dev](https://rhyan.dev)

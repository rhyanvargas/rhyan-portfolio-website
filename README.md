# Rhyan Vargas Portfolio

[![Live Site](https://img.shields.io/badge/Live-rhyan.dev-blue?logo=vercel)](https://www.rhyan.dev)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Modern portfolio website for an AI-First Full Stack Engineer. Configuration-driven architecture with Next.js 15, TypeScript, and shadcn/ui components.

## Quick Start

```bash
pnpm install
pnpm dev
# Open http://localhost:3000
```

## Features

- **Configuration-driven content**: Single source of truth in `config/portfolio.ts`
- **Active section navigation**: Real-time scroll-based navigation highlighting
- **Responsive project showcase**: Featured and grid layouts for different project types
- **Enhanced accessibility**: Improved scroll behavior and section identification
- **TypeScript + Zod validation**: Runtime schema validation for portfolio data
- **Project filtering foundation**: Multi-dimensional categorization system (in development)
- **Dark theme optimized**: Professional design with gradient accents

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Animation:** Framer Motion
- **Deployment:** Vercel

## Current Status

Full portfolio sections are now active with enhanced navigation:
- **Hero Section**: Added section ID and improved scroll navigation
- **About Section**: Personal info and technology showcase
- **Projects Section**: Renamed to "My Work" with featured/other project layouts
- **Navigation**: Active section highlighting with improved intersection observer

## Documentation

- [Setup Guide](docs/setup.md) - Installation and configuration
- [Configuration Reference](docs/configuration.md) - Portfolio config schema
- [Architecture Overview](docs/architecture.md) - System design
- [Project Filtering System](docs/filtering-system.md) - Multi-dimensional project categorization
- [Contributing Guidelines](CONTRIBUTING.md) - Contribution workflow

## Scripts

```bash
pnpm dev     # Development server
pnpm build   # Production build
pnpm start   # Production server
pnpm lint    # ESLint
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Contact:** [hello@rhyan.dev](mailto:hello@rhyan.dev) | **Website:** [rhyan.dev](https://rhyan.dev)

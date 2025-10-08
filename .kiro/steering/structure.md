---
inclusion: always
---

# Project Structure & Architecture

## Key Directories
- `app/` - Next.js App Router (layout.tsx, page.tsx, globals.css)
- `components/` - React components with `ui/` subfolder for shadcn/ui components
- `config/portfolio.ts` - **Single source of truth** for all portfolio data
- `lib/utils.ts` - Common utilities including `cn()` function
- `public/` - Static assets (images, icons)

## Architecture Rules

### Configuration-Driven Content
- **Always update `config/portfolio.ts` for content changes** - never hardcode data in components
- Use TypeScript interfaces for all data structures
- Portfolio sections are driven by config arrays (projects, experience, etc.)

### Component Patterns
- **Page sections**: Named `*-section.tsx` for main page areas
- **UI components**: Use shadcn/ui patterns in `components/ui/`
- **Client components**: Only add `"use client"` when necessary (animations, interactions)

### File & Code Conventions
- **Files**: kebab-case (`hero-section.tsx`)
- **Components**: PascalCase (`HeroSection`)
- **Imports**: Always use `@/` path alias, group React/Next first, then external, then internal
- **Exports**: Use named exports for components

### Styling Rules
- **Tailwind CSS**: Mobile-first responsive design (`sm:`, `md:`, `lg:`)
- **Dark theme**: Default with CSS variables for theming
- **Component variants**: Use CVA (Class Variance Authority) for styling variants
- **Responsive**: Always implement mobile-first approach

### State Management
- **Local state**: React hooks only
- **Theme**: Use existing `ThemeProvider` context
- **Data**: Static configuration from `config/portfolio.ts`

## Critical Guidelines
- Never hardcode portfolio content - always use config
- Follow shadcn/ui component API patterns
- Maintain TypeScript strict mode compliance
- Implement responsive design for all components
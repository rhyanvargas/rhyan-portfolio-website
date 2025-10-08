# Project Structure & Architecture

## Folder Organization

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata & theme provider
│   ├── page.tsx           # Main page (currently shows ComingSoon)
│   └── globals.css        # Global Tailwind styles
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   │   ├── animated-beam/ # Custom animation components
│   │   ├── status/       # Status indicator components
│   │   └── *.tsx         # Base UI components (button, card, etc.)
│   ├── *-section.tsx     # Page section components
│   ├── coming-soon.tsx   # Current landing page
│   ├── navigation.tsx    # Site navigation
│   └── theme-provider.tsx # Theme context provider
├── config/               # Configuration files
│   └── portfolio.ts      # Main portfolio data & types
├── lib/                  # Utility functions
│   ├── utils.ts         # Common utilities (cn function)
│   └── config.ts        # Additional config utilities
├── public/              # Static assets
│   ├── *.svg           # Icons and logos
│   └── *.jpg/*.png     # Project images
└── styles/             # Additional stylesheets
    └── globals.css     # Legacy global styles
```

## Architecture Patterns

### Configuration-Driven Content
- All portfolio data centralized in `config/portfolio.ts`
- Type-safe configuration with TypeScript interfaces
- Single source of truth for all content updates

### Component Structure
- **Page sections**: Large components for main page areas (`*-section.tsx`)
- **UI components**: Reusable components in `components/ui/`
- **Custom components**: Project-specific components like `AnimatedBeam`

### Styling Conventions
- **Tailwind CSS**: Utility-first approach with custom design system
- **Component variants**: Use CVA for component styling variants
- **Responsive design**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- **Dark theme**: Default dark mode with CSS variables for theming

### File Naming
- **kebab-case**: For component files (`coming-soon.tsx`)
- **PascalCase**: For component names (`ComingSoon`)
- **camelCase**: For variables and functions

### Import Conventions
- Use `@/` path alias for all internal imports
- Group imports: React/Next.js first, then external libraries, then internal modules
- Use named exports for components

### State Management
- **React hooks**: For local component state
- **Context**: For theme management via `ThemeProvider`
- **Configuration**: Static data through portfolio config

## Development Guidelines
- Components should be client-side (`"use client"`) only when necessary
- Use TypeScript interfaces for all data structures
- Implement responsive design with mobile-first approach
- Follow shadcn/ui patterns for consistent component APIs
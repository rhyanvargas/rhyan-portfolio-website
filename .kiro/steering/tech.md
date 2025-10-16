# Technology Stack

## Core Framework
- **Next.js 15** with App Router
- **React 18** with TypeScript
- **Node.js** runtime environment

## Styling & UI
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library (New York style)
- **Radix UI** primitives for accessible components
- **Geist** font family (Sans & Mono variants)
- **Lucide React** for icons
- **Framer Motion** for animations
- **Class Variance Authority (CVA)** for component variants

## Development Tools
- **TypeScript 5** with strict mode enabled
- **ESLint** for code linting
- **PostCSS** for CSS processing
- **pnpm** as package manager

## Deployment & Analytics
- **Vercel** for hosting and deployment
- **Vercel Analytics** for performance monitoring

## Common Commands

```bash
# Development
pnpm dev          # Start development server on localhost:3000
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Package management
pnpm install      # Install dependencies
pnpm add <pkg>    # Add new dependency
```

## Implementation Validation
- **Always validate implementations** before marking tasks complete
- Run linting, type checking, and build verification for every task
- Use these commands to validate:
  ```bash
  pnpm lint         # Check for linting errors
  pnpm build        # Verify TypeScript compilation and build
  ```
- Fix any errors before considering a task complete
- Ensure all new code follows TypeScript strict mode requirements

## Configuration Notes
- TypeScript path aliases configured with `@/*` pointing to root
- ESLint and TypeScript errors ignored during builds (configured in next.config.mjs)
- Images are unoptimized for static export compatibility
- Dark theme is the default with system theme detection enabled
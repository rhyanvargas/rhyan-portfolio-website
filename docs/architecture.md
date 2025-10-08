# Architecture Overview

System design and component structure for the Rhyan Vargas Portfolio Website.

## High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Browser  │───▶│   Next.js App    │───▶│   Static Files  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  Portfolio Config │
                       └──────────────────┘
```

## Technology Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and concurrent features
- **TypeScript 5** - Type safety and developer experience

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **Radix UI** - Primitive components for accessibility
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Development & Build
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization

## Project Structure

```
rhyan-portfolio-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles and CSS variables
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   │   ├── button.tsx    # Button component
│   │   ├── card.tsx      # Card component
│   │   └── ...           # Other UI primitives
│   ├── sections/         # Page section components
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── projects-section.tsx
│   │   └── contact-section.tsx
│   ├── coming-soon.tsx   # Current landing page
│   ├── navigation.tsx    # Site navigation
│   └── theme-provider.tsx # Theme context provider
├── config/               # Configuration files
│   └── portfolio.ts      # Main portfolio data and types
├── lib/                  # Utility functions
│   ├── utils.ts         # Common utilities (cn function)
│   └── config.ts        # Configuration utilities
├── docs/                 # Documentation
├── public/              # Static assets
└── styles/              # Additional stylesheets
```

## Component Architecture

### Configuration-Driven Design

All content is managed through a single configuration file:

```typescript
// config/portfolio.ts
export interface PortfolioConfig {
  personal: PersonalInfo;
  social: SocialLinks;
  navigation: NavigationItem[];
  about: AboutSection;
  experience: ExperienceItem[];
  projects: ProjectsSection;
  contact: ContactSection;
  footer: FooterConfig;
}
```

### Component Hierarchy

```
App Layout
├── Theme Provider
├── Navigation
└── Page Content
    ├── Coming Soon (current)
    └── Portfolio Sections (ready)
        ├── Hero Section
        ├── About Section
        ├── Experience Section
        ├── Projects Section
        ├── Contact Section
        └── Footer
```

### State Management

- **Configuration State**: Static data from `portfolio.ts`
- **Theme State**: Managed by `ThemeProvider` context
- **Component State**: Local state using React hooks
- **No Global State**: Simple architecture without Redux/Zustand

## Data Flow

```
Portfolio Config ──▶ TypeScript Interfaces ──▶ React Components ──▶ Rendered UI
      │                       │                       │
      │                       │                       ▼
      │                       │              ┌─────────────────┐
      │                       │              │  User Interface │
      │                       │              └─────────────────┘
      │                       │
      │                       ▼
      │              ┌─────────────────┐
      │              │  Type Safety    │
      │              └─────────────────┘
      │
      ▼
┌─────────────────┐
│  Single Source  │
│  of Truth       │
└─────────────────┘
```

## Styling Architecture

### CSS Architecture

```
Global Styles (globals.css)
├── CSS Variables (theme colors)
├── Base Styles (typography, layout)
└── Utility Classes (custom utilities)

Component Styles
├── Tailwind Classes (utility-first)
├── Component Variants (CVA)
└── Responsive Design (mobile-first)
```

### Theme System

```typescript
// CSS Variables for theming
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  // ... more variables
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  // ... dark theme overrides
}
```

## Performance Considerations

### Build Optimization
- **Static Export**: Pre-rendered at build time
- **Code Splitting**: Automatic component-level splitting
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: Disabled for static export compatibility

### Runtime Performance
- **React 18**: Concurrent features and automatic batching
- **CSS-in-JS**: Minimal runtime overhead with Tailwind
- **Font Loading**: Optimized with Next.js font system
- **Bundle Size**: Monitored and optimized

## Deployment Architecture

### Static Site Generation

```
Source Code ──▶ Next.js Build ──▶ Static Files ──▶ CDN/Hosting
     │               │                │              │
     │               │                │              ▼
     │               │                │         ┌──────────┐
     │               │                │         │  Vercel  │
     │               │                │         └──────────┘
     │               │                │
     │               │                ▼
     │               │         ┌──────────────┐
     │               │         │  Static HTML │
     │               │         │  CSS & JS    │
     │               │         │  Assets      │
     │               │         └──────────────┘
     │               │
     │               ▼
     │        ┌──────────────┐
     │        │  Build Time  │
     │        │  Rendering   │
     │        └──────────────┘
     │
     ▼
┌──────────────┐
│  TypeScript  │
│  Compilation │
└──────────────┘
```

### Hosting Strategy
- **Vercel**: Optimized for Next.js applications
- **CDN**: Global content delivery
- **Automatic Deployments**: Git-based deployment workflow
- **Preview Deployments**: Branch-based previews

## Security Considerations

### Client-Side Security
- **No Sensitive Data**: All data is public portfolio information
- **Static Generation**: No server-side vulnerabilities
- **Content Security**: No user-generated content
- **HTTPS**: Enforced by hosting platform

### Development Security
- **Dependency Scanning**: Regular security updates
- **Type Safety**: Prevents runtime errors
- **Linting**: Code quality and security checks
- **Build Validation**: Pre-deployment checks

## Scalability & Maintenance

### Code Maintainability
- **TypeScript**: Type safety and refactoring support
- **Component Isolation**: Modular architecture
- **Configuration Driven**: Easy content updates
- **Documentation**: Comprehensive docs and comments

### Future Extensibility
- **Plugin Architecture**: Easy to add new sections
- **Theme System**: Customizable appearance
- **Component Library**: Reusable UI components
- **API Ready**: Can integrate with headless CMS if needed

## Development Workflow

```
Local Development ──▶ Git Commit ──▶ GitHub ──▶ Vercel Deploy
       │                   │           │           │
       │                   │           │           ▼
       │                   │           │    ┌──────────────┐
       │                   │           │    │  Production  │
       │                   │           │    └──────────────┘
       │                   │           │
       │                   │           ▼
       │                   │    ┌──────────────┐
       │                   │    │   Preview    │
       │                   │    │  Deployment  │
       │                   │    └──────────────┘
       │                   │
       │                   ▼
       │            ┌──────────────┐
       │            │   CI/CD      │
       │            │   Pipeline   │
       │            └──────────────┘
       │
       ▼
┌──────────────┐
│  Hot Reload  │
│  Development │
└──────────────┘
```

This architecture provides a solid foundation for a modern, performant, and maintainable portfolio website while keeping complexity minimal and development velocity high.
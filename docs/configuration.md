# Configuration Reference

Complete reference for configuring the portfolio website.

## Portfolio Configuration

All portfolio content is managed through `config/portfolio.ts` using the `PortfolioConfig` interface.

### Personal Information

```typescript
personal: {
  firstName: string;        // Your first name
  lastName: string;         // Your last name  
  email: string;           // Contact email
  phone: string;           // Phone or contact message
  location: string;        // Current location
  tagline: string;         // Professional tagline/headline
  description: string;     // Brief professional description
}
```

### Social Links

```typescript
social: {
  github: string;          // GitHub profile URL
  linkedin: string;        // LinkedIn profile URL
  twitter: string;         // Twitter/X profile URL
  website: string;         // Personal website URL
  resume: string;          // Resume URL or contact message
}
```

### Navigation

```typescript
navigation: Array<{
  name: string;            // Display name
  href: string;            // Anchor link (e.g., "#about")
}>
```

### About Section

```typescript
about: {
  title: string;           // Section title
  content: string;         // Main about text (supports markdown)
  technologies: string[];  // Array of tech skills
}
```

### Experience

```typescript
experience: Array<{
  company: string;         // Company name
  position: string;        // Job title
  duration: string;        // Time period (e.g., "May 2022 - Present")
  location: string;        // Work location
  description: string[];   // Array of bullet points
}>
```

### Projects

The projects section supports both enhanced and legacy formats:

#### Enhanced Format (Recommended)

```typescript
projects: {
  items: Array<{
    slug: string;          // Unique project identifier
    title: string;         // Project name
    role: string;          // Your role in the project
    summary: string;       // Brief project summary
    highlights: string[];  // Key achievements/features
    tech: string[];        // Technologies used
    links: {
      demo?: string;       // Live demo URL
      repo?: string;       // Repository URL
      evidence?: string;   // Evidence/case study path
    };
    metrics?: Array<{
      label: string;       // Metric name (e.g., "Performance")
      value: string;       // Metric value (e.g., "40% faster")
    }>;
    thumbnail: string;     // Image path (in /public)
  }>;
}
```

#### Legacy Format (Backward Compatible)

```typescript
projects: {
  featured: Array<{
    title: string;         // Project name
    description: string;   // Project description
    image: string;         // Image path (in /public)
    technologies: string[]; // Tech stack used
    github: string;        // GitHub repo URL
    external: string;      // Live demo URL
  }>;
  other: Array<{
    title: string;         // Project name
    description: string;   // Project description
    technologies: string[]; // Tech stack used
    github?: string;       // Optional GitHub URL
    external?: string;     // Optional demo URL
  }>;
}
```

### Contact Section

```typescript
contact: {
  title: string;           // Main title
  subtitle: string;        // Subtitle
  description: string;     // Contact description
  cta: string;            // Call-to-action button text
}
```

### Footer

```typescript
footer: {
  text: string;            // Footer text
  year: number;            // Copyright year
}
```

## Theme Configuration

### CSS Variables

Customize the theme by modifying CSS variables in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark theme variables */
}
```

### Component Styling

Components use Tailwind CSS with the following conventions:

- **Spacing**: Use consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64)
- **Colors**: Use CSS variables for theme consistency
- **Typography**: Follow established font sizes and weights
- **Responsive**: Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints

## Build Configuration

### Next.js Configuration

Key settings in `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export',           // Static export for Vercel
  trailingSlash: true,        // Add trailing slashes
  images: {
    unoptimized: true         // Disable image optimization for static export
  },
  typescript: {
    ignoreBuildErrors: true   // Continue build with TS errors
  },
  eslint: {
    ignoreDuringBuilds: true  // Continue build with ESLint errors
  }
};
```

### TypeScript Configuration

Key settings in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]          // Path alias for imports
    }
  }
}
```

## Deployment Configuration

### Vercel

The site is optimized for Vercel deployment:

- Static export enabled
- Automatic deployments from main branch
- Environment variables not required for basic functionality

### Custom Deployment

For other platforms:

1. Build the site: `pnpm build`
2. Serve the `out/` directory
3. Configure your server for SPA routing

## Schema Validation

The portfolio configuration uses Zod schemas for runtime validation and type safety:

### Validation Features

- **Type Safety**: Full TypeScript support with inferred types
- **Runtime Validation**: Validates data structure at build time
- **Error Messages**: Descriptive validation error messages
- **Backward Compatibility**: Supports both new and legacy project formats

### Schema Location

All schemas are defined in `schemas/portfolio.ts` and exported as:

```typescript
import { portfolioSchema, type PortfolioConfig } from '@/schemas/portfolio';

// Validate configuration
const result = portfolioSchema.parse(portfolioConfig);
```

### Adding Custom Validation

To add new fields with validation:

1. Update the schema in `schemas/portfolio.ts`
2. Add the field to your configuration in `config/portfolio.ts`
3. TypeScript will enforce the new structure

## Advanced Configuration

### Adding New Sections

1. Create component in `components/`
2. Add section data to `PortfolioConfig` interface
3. Update `config/portfolio.ts` with content
4. Import and use in `app/page.tsx`

### Custom Animations

The site uses Framer Motion for animations. Common patterns:

```typescript
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
```

### Performance Optimization

- Images: Use Next.js Image component when possible
- Fonts: Preload critical fonts in `app/layout.tsx`
- Code splitting: Components are automatically split by Next.js
- Bundle analysis: Use `@next/bundle-analyzer` for optimization
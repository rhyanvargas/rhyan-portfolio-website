# Design Document

## Overview

This design outlines the restructuring of the Next.js 15 portfolio application to follow modern App Router best practices. The restructuring will transform the current basic structure into a scalable, maintainable architecture that supports both current portfolio functionality and future full-stack features. The design maintains the existing configuration-driven approach while introducing proper type safety, data validation, and organized code separation.

## Architecture

### Directory Structure

The new structure will follow Next.js 15 App Router patterns:

```
├── app/                    # Next.js App Router
│   ├── api/               # Route Handlers (future)
│   ├── (auth)/            # Route groups (future)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── sections/         # Page section components
│   └── layout/           # Layout components
├── lib/                  # Shared utilities and logic
│   ├── utils/           # Utility functions
│   ├── actions/         # Server Actions (future)
│   ├── config.ts        # Configuration utilities
│   └── constants.ts     # Shared constants
├── types/               # TypeScript type definitions
│   ├── index.ts         # Global types
│   └── portfolio.ts     # Portfolio-specific types
├── schemas/             # Data validation schemas
│   └── portfolio.ts     # Portfolio data validation
├── data/                # Mock/seed data
│   └── portfolio.ts     # Portfolio configuration
├── public/              # Static assets
└── styles/              # Additional styles (if needed)
```

### Migration Strategy

The restructuring will be performed incrementally to minimize disruption:

1. **Phase 1**: Create new directory structure and type definitions
2. **Phase 2**: Move and reorganize existing components
3. **Phase 3**: Update imports and validate functionality
4. **Phase 4**: Clean up old structure and optimize

## Components and Interfaces

### Type System

**Portfolio Types (`types/portfolio.ts`)**
- Extract existing `PortfolioConfig` interface from config file
- Add additional utility types for component props
- Define common UI component interfaces

**Global Types (`types/index.ts`)**
- Common React component types
- Utility types for the application
- Re-exports of frequently used types

### Data Validation

**Portfolio Schema (`schemas/portfolio.ts`)**
- Zod schema matching the `PortfolioConfig` interface
- Runtime validation for configuration data
- Type inference for compile-time safety

### Component Organization

**Section Components (`components/sections/`)**
- `hero-section.tsx` - Hero/landing section
- `about-section.tsx` - About information
- `experience-section.tsx` - Work experience
- `projects-section.tsx` - Portfolio projects
- `contact-section.tsx` - Contact information

**Layout Components (`components/layout/`)**
- `navigation.tsx` - Site navigation
- `footer.tsx` - Site footer
- `coming-soon.tsx` - Temporary coming soon page

**UI Components (`components/ui/`)**
- Maintain existing shadcn/ui components
- Organize custom UI components consistently

### Utility Functions

**Configuration Utils (`lib/config.ts`)**
- Portfolio configuration loading and validation
- Environment-specific configuration handling
- Type-safe configuration access

**General Utils (`lib/utils/`)**
- `formatters.ts` - Date, text, and data formatting
- `validators.ts` - Custom validation functions
- `constants.ts` - Application constants

## Data Models

### Portfolio Configuration

The existing portfolio configuration will be moved to `data/portfolio.ts` and enhanced with proper validation:

```typescript
// data/portfolio.ts
import { portfolioSchema } from '@/schemas/portfolio'
import type { PortfolioConfig } from '@/types/portfolio'

export const portfolioConfig: PortfolioConfig = {
  // ... existing configuration
}

// Runtime validation
export const validatedPortfolioConfig = portfolioSchema.parse(portfolioConfig)
```

### Type Definitions

Types will be extracted and organized for better maintainability:

```typescript
// types/portfolio.ts
export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  // ... other fields
}

export interface PortfolioConfig {
  personal: PersonalInfo
  social: SocialLinks
  // ... other sections
}
```

### Schema Validation

Zod schemas will ensure data integrity:

```typescript
// schemas/portfolio.ts
import { z } from 'zod'

export const personalInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  // ... other validations
})

export const portfolioSchema = z.object({
  personal: personalInfoSchema,
  // ... other schema definitions
})
```

## Error Handling

### Configuration Validation
- Runtime validation of portfolio configuration using Zod
- Graceful fallbacks for missing or invalid data
- Development-time warnings for configuration issues

### Import Path Resolution
- Proper TypeScript path mapping with `@/*` aliases
- Clear error messages for missing imports during migration
- Validation that all imports resolve correctly

### Build-time Checks
- TypeScript strict mode compliance
- ESLint validation for new structure
- Build process verification after restructuring

## Testing Strategy

### Structure Validation
- Verify all files are moved to correct locations
- Confirm all import paths are updated correctly
- Validate that no functionality is broken

### Type Safety Testing
- Ensure all TypeScript interfaces compile correctly
- Verify Zod schema validation works as expected
- Test configuration loading and validation

### Functionality Testing
- Manual testing of all portfolio sections
- Verify responsive design still works
- Confirm theme switching functionality
- Test navigation and component interactions

### Build Process Testing
- Successful development server startup
- Production build completion without errors
- Static export functionality (if used)
- Deployment readiness verification

## Implementation Considerations

### Backward Compatibility
- Maintain existing component APIs during transition
- Preserve all current functionality
- Keep configuration-driven approach intact

### Performance Impact
- Minimal impact on bundle size
- No changes to runtime performance
- Improved development experience through better organization

### Future Extensibility
- Structure supports adding API routes
- Ready for authentication implementation
- Prepared for database integration
- Supports server-side rendering patterns

### Development Experience
- Improved file discoverability
- Better IDE support through proper typing
- Clearer separation of concerns
- Easier onboarding for new developers
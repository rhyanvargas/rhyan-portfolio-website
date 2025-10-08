# Implementation Plan

- [x] 1. Create new directory structure and type definitions
  - Create the new directory structure (`types/`, `schemas/`, `data/`, `lib/utils/`, `components/sections/`, `components/layout/`)
  - Extract and define TypeScript interfaces in `types/portfolio.ts` from existing config
  - Create global type definitions in `types/index.ts`
  - _Requirements: 1.1, 1.2, 2.1_

- [x] 2. Implement data validation with Zod schemas
  - Create Zod schemas in `schemas/portfolio.ts` that match the TypeScript interfaces
  - Implement runtime validation for portfolio configuration
  - Add schema validation to configuration loading process
  - _Requirements: 2.2, 2.3_

- [ ] 3. Move and reorganize portfolio configuration
  - Move portfolio configuration from `config/portfolio.ts` to `data/portfolio.ts`
  - Integrate schema validation with configuration loading
  - Create configuration utilities in `lib/config.ts`
  - _Requirements: 2.4, 4.1, 4.3_

- [ ] 4. Reorganize and move existing components
  - Move section components to `components/sections/` directory
  - Move layout components to `components/layout/` directory
  - Maintain existing shadcn/ui components in `components/ui/`
  - _Requirements: 1.2, 5.1_

- [ ] 5. Create utility functions and constants
  - Create utility functions in `lib/utils/` (formatters, validators)
  - Move shared utilities from existing `lib/utils.ts` to new structure
  - Create `lib/constants.ts` for application constants
  - _Requirements: 3.1, 3.4_

- [ ] 6. Update all import paths and references
  - Update all component imports to use new directory structure
  - Update configuration imports to use new data location
  - Ensure all imports use proper `@/*` path aliases
  - _Requirements: 5.2, 5.3_

- [ ] 7. Prepare structure for future full-stack features
  - Create `app/api/` directory structure for future Route Handlers
  - Set up `lib/actions/` directory for future Server Actions
  - Ensure `middleware.ts` is properly positioned at root level
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 8. Validate functionality and clean up
  - Test all portfolio sections render correctly
  - Verify responsive design and theme switching work
  - Remove old unused files and directories
  - Run build process to ensure no errors
  - _Requirements: 5.3, 5.4, 5.5_

- [ ]* 8.1 Write validation tests for schemas
  - Create unit tests for Zod schema validation
  - Test configuration loading with valid and invalid data
  - _Requirements: 2.2, 2.3_

- [ ]* 8.2 Create development utilities
  - Add development-time configuration validation warnings
  - Create mock data generators for testing
  - _Requirements: 4.2, 4.4_
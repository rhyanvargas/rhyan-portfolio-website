# Setup Guide

Detailed setup instructions for the Rhyan Vargas Portfolio Website.

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/rhyanvargas/rhyan-portfolio-website.git
cd rhyan-portfolio-website
```

### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Environment Setup
No environment variables required for basic setup. The site works out of the box.

### 4. Start Development Server
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

## Configuration

### Portfolio Content
All content is managed in `config/portfolio.ts`. Update this file to customize:

- Personal information
- Social links  
- About section content
- Experience history
- Project showcases
- Contact information

### Switching from Coming Soon to Full Portfolio

1. Edit `app/page.tsx`
2. Uncomment the portfolio sections:
   ```typescript
   // <HeroSection />
   // <AboutSection />
   // <ExperienceSection />
   // <ProjectsSection />
   // <ContactSection />
   // <Footer />
   ```
3. Comment out `<ComingSoon />` if desired

### Styling Customization
- Global styles: `app/globals.css`
- Component styles: Use Tailwind CSS classes
- Theme customization: Modify CSS variables in globals.css

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript compiler |

## Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev -- -p 3001
```

**Build errors:**
```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

**TypeScript errors:**
```bash
# Check types
pnpm type-check

# Fix auto-fixable issues
pnpm lint --fix
```

### Getting Help

- Check [main README](../README.md) for quick solutions
- Review [architecture docs](architecture.md) for system understanding
- Open an issue on GitHub
- Contact [hello@rhyan.dev](mailto:hello@rhyan.dev)
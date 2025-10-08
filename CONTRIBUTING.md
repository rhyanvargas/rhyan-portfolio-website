# Contributing to Rhyan Vargas Portfolio

Thanks for your interest in contributing! This document provides guidelines for contributing to this portfolio website.

## Quick Start for Contributors

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/rhyan-portfolio-website.git`
3. Install dependencies: `pnpm install`
4. Start development: `pnpm dev`
5. Make your changes
6. Test your changes: `pnpm build && pnpm lint`
7. Submit a pull request

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code formatting (Prettier/ESLint)
- Use meaningful variable and function names
- Add comments for complex logic

### Component Guidelines
- Use functional components with hooks
- Follow the existing component structure in `/components`
- Ensure components are responsive (mobile-first)
- Use Tailwind CSS for styling

### Configuration Changes
- All portfolio content should be updated in `config/portfolio.ts`
- Maintain TypeScript type safety
- Test configuration changes thoroughly

### Commit Messages
Use conventional commit format:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `style: formatting changes`
- `refactor: code restructuring`

## Pull Request Process

1. Ensure your code builds without errors
2. Update documentation if needed
3. Add a clear description of your changes
4. Link any related issues
5. Request review from maintainers

## Questions?

Feel free to open an issue for questions or reach out to [hello@rhyan.dev](mailto:hello@rhyan.dev).
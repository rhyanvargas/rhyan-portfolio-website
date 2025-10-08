# Rhyan Vargas - Portfolio Website

<div align="center">

[![Live Site](https://img.shields.io/badge/Live%20Site-rhyan.dev-blue?style=for-the-badge&logo=vercel)](https://www.rhyan.dev)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

> A modern, responsive portfolio website showcasing work as a Full Stack Software Engineer. Built with Next.js, TypeScript, and Tailwind CSS — from idea to MVP with modern development practices.

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/rhyanvargas/rhyan-portfolio-website.git
cd rhyan-portfolio-website
pnpm install

# Start development
pnpm dev
# Open http://localhost:3000
```

## ✨ Features

- **🎨 Modern Design** — Clean, professional interface with dark theme
- **📱 Fully Responsive** — Mobile-first design for all devices  
- **🎯 Type-Safe** — Full TypeScript with runtime validation
- **⚡ Performance** — Optimized with Next.js 15 and Vercel
- **🚧 Coming Soon Page** — Animated development progress visualization
- **🔧 Configuration-Driven** — Single-file content management system

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Validation:** Zod schemas
- **Deployment:** Vercel

## 📁 Project Structure

```
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── *-section.tsx   # Page sections
├── config/             # Portfolio configuration
├── schemas/            # Zod validation schemas
└── types/              # TypeScript definitions
```

## ⚙️ Configuration

Portfolio content is managed through `config/portfolio.ts` with type-safe validation:

```typescript
export const portfolioConfig: PortfolioConfig = {
  personal: {
    firstName: "Rhyan",
    lastName: "Vargas",
    email: "hello@rhyan.dev",
    // ...
  },
  // ... more configuration
}
```

## 🚧 Development Status

**Current:** Coming soon page with animated progress  
**Ready:** All portfolio sections implemented and ready to activate

To activate full portfolio, edit `app/page.tsx` and uncomment the portfolio sections.

## 🔧 Development

### Activating Full Portfolio

To switch from the coming soon page to the full portfolio:

1. Edit `app/page.tsx`
2. Uncomment the portfolio sections:
   ```typescript
   // <AboutSection />
   // <ExperienceSection />
   // <ProjectsSection />
   // <ContactSection />
   // <Footer />
   ```
3. Optionally comment out `<ComingSoon />`

### Key Files

- `config/portfolio.ts` - All portfolio content and configuration
- `schemas/portfolio.ts` - Zod validation schemas
- `components/` - All React components (ready to use)
- `app/page.tsx` - Main page layout

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Rhyan Vargas** - Sacramento, CA

<div align="center">

[![Website](https://img.shields.io/badge/Website-rhyan.dev-blue?style=flat-square&logo=google-chrome)](https://rhyan.dev)
[![Email](https://img.shields.io/badge/Email-hello@rhyan.dev-red?style=flat-square&logo=gmail)](mailto:hello@rhyan.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-rhyanvargas-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/rhyanvargas)
[![GitHub](https://img.shields.io/badge/GitHub-rhyanvargas-black?style=flat-square&logo=github)](https://github.com/rhyanvargas)
[![Twitter](https://img.shields.io/badge/Twitter-@rhyguydigital-blue?style=flat-square&logo=twitter)](https://x.com/rhyguydigital)

</div>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Vercel](https://vercel.com/) - Platform for frontend frameworks and static sites

---

<div align="center">

**Built with ❤️ by Rhyan Vargas** | **Powered by Next.js & Vercel**

⭐ Star this repo if you find it helpful!

</div>

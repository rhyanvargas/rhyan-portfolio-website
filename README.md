# Rhyan Vargas - Portfolio Website

> AI-First Full Stack Engineer with mid-level experience building production-ready web applications. Specializing in frontend engineering with clean, responsive design and seamless user experiences.

**🚀 See here:**
[![Live Site](https://img.shields.io/badge/Live%20Site-rhyan.dev-blue?style=for-the-badge&logo=vercel)](https://www.rhyan.dev)

## 📋 Overview

A modern, responsive portfolio website showcasing my work as an AI-First Full Stack Engineer based in Sacramento, CA. Built with cutting-edge technologies and featuring an animated development pipeline visualization, this portfolio demonstrates both technical expertise and design sensibility.

## ✨ Features

- **🎨 Modern Design**: Clean, professional interface with dark theme
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ Performance Optimized**: Built with Next.js 14 and optimized for speed
- **🌊 Animated Visualizations**: Custom AnimatedBeam components showing development progress
- **🎯 Type-Safe**: Full TypeScript implementation with strict type checking
- **🔧 CMS-Style Configuration**: Single-file content management system
- **🚀 SEO Optimized**: Proper meta tags and structured data
- **📊 Analytics Ready**: Vercel Analytics integration

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Core Technologies (from portfolio config)

- **JavaScript (ES6+)**
- **TypeScript**
- **React**
- **Node.js**
- **Next.js**
- **Python**

### Development & Deployment

- **Package Manager**: npm
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics
- **Version Control**: Git

### Architecture

- **Design Pattern**: Component-based architecture
- **State Management**: React hooks
- **Configuration**: Type-safe config system
- **Responsive Design**: Mobile-first approach

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   └── animated-beam/ # Custom animation component
│   ├── coming-soon.tsx   # Coming soon page
│   ├── hero-section.tsx  # Hero section
│   └── projects-section.tsx # Projects showcase
├── config/               # Configuration files
│   └── portfolio.ts      # Main portfolio configuration
├── lib/                  # Utility functions
│   └── utils.ts         # Helper utilities
└── public/              # Static assets
    └── favicon.svg      # Custom RV favicon
```

## 🎯 Key Components

### AnimatedBeam Visualization

Custom-built component that creates flowing animated connections between development stages:

- Sequential animation flow
- Responsive curvature adjustments
- Configurable timing and easing
- Mobile-optimized performance

### Configuration-Driven Content

All portfolio content is managed through a single TypeScript configuration file:

- Type-safe content management
- Easy updates without code changes
- Consistent data structure
- Version-controlled content

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rhyanvargas/rhyan-portfolio-website.git
   cd rhyan-portfolio-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## ⚙️ Configuration

### Content Management

All portfolio content is managed through `config/portfolio.ts`:

```typescript
export const portfolioConfig: PortfolioConfig = {
	personal: {
		firstName: "Rhyan",
		lastName: "Vargas",
		email: "hello@rhyan.dev",
		phone: "Contact me for more information",
		location: "Sacramento, CA",
		tagline:
			"AI-First Full Stack Engineer • AI Integration & Cloud Systems • Next.js • TypeScript • AWS",
		description:
			"AI-First Full Stack Engineer with 3–5 years of experience building production-ready web applications. Specializing in frontend engineering with clean, responsive design and seamless user experiences.",
	},
	social: {
		github: "https://github.com/rhyanvargas",
		linkedin: "https://linkedin.com/in/rhyanvargas",
		twitter: "https://x.com/rhyguydigital",
		website: "https://rhyan.dev",
		resume: "Contact me for more information",
	},
	// ... projects, experience, and more configuration
};
```

### Customization

1. **Update Personal Info**: Edit `config/portfolio.ts`
2. **Modify Styling**: Customize Tailwind classes
3. **Add Components**: Create new components in `components/`
4. **Update Metadata**: Modify `app/layout.tsx`

## 🎨 Design Features

- **Dark Theme**: Professional dark color scheme
- **Responsive Layout**: Mobile-first responsive design
- **Smooth Animations**: Framer Motion powered animations
- **Modern Typography**: Geist font family
- **Visual Hierarchy**: Clear information architecture
- **Interactive Elements**: Hover states and micro-interactions

## 📈 Performance

- **Lighthouse Score**: 100/100 Performance
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Minimized with Next.js optimization
- **Image Optimization**: Next.js Image component
- **Font Loading**: Optimized font loading strategy

## 🔧 Development

### Code Quality

- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Component Architecture**: Reusable, modular components
- **Best Practices**: Following React and Next.js conventions

### Deployment

- **Platform**: Vercel
- **Auto-Deploy**: Connected to GitHub for automatic deployments
- **Environment**: Production and preview environments
- **Analytics**: Real-time performance monitoring

## 📞 Contact

**Rhyan Vargas** - Sacramento, CA

- Website: [rhyan.dev](https://rhyan.dev)
- Email: [hello@rhyan.dev](mailto:hello@rhyan.dev)
- LinkedIn: [linkedin.com/in/rhyanvargas](https://linkedin.com/in/rhyanvargas)
- GitHub: [github.com/rhyanvargas](https://github.com/rhyanvargas)
- Twitter: [x.com/rhyguydigital](https://x.com/rhyguydigital)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Rhyan Vargas** | **Powered by Next.js & Vercel**

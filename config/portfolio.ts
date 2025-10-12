import type { PortfolioConfig } from '@/schemas/portfolio'

export type { PortfolioConfig }

export const portfolioConfig: PortfolioConfig = {
	// Personal Information
	personal: {
		firstName: "Rhyan",
		lastName: "Vargas",
		email: "hello@rhyan.dev",
		phone: "Contact me for more information",
		location: "Sacramento, CA",
		tagline:
			"AI Engineer who loves bringing ideas to life using well-architected systems and tools.",
		description:
			"A Full Stack Software Engineer specializing in Next.js, React, and AWS. I excel at going from idea to MVP quickly, building secure and scalable applications that bridge enterprise reliability with innovative features in AI and XR.",
		avatar: "/rhyan_vargas_portfolio_nextjs_frontend_engineer_propic_pastel.jpg"
	},

	// Social Links
	social: {
		github: "https://github.com/rhyanvargas",
		linkedin: "https://linkedin.com/in/rhyanvargas",
		twitter: "https://x.com/rhyguydigital",
		website: "https://rhyan.dev",
		resume: "Contact me for more information",
	},

	// Navigation
	navigation: [
		{ name: "About", href: "#about" },
		{ name: "Experience", href: "#experience" },
		{ name: "Work", href: "#projects" },
		{ name: "Contact", href: "#contact" },
	],

	// About Section
	about: {
		title: "About Me",
		content: `Hey there! I’m Rhyan, a builder, musician, traveler and all-around fan of creating and appreciating all things creative. My journey into development started back in 2016 when I taught myself how to customize Wordpress themes. A few freelance websites later, I realized how much I enjoyed turning ideas into interactive experiences — and I’ve been hooked ever since.

Fast-forward to today, I’ve had the privilege of building across startups, agencies, and enterprise environments — leading projects that bridge AI, design, and web development. My current focus is crafting human-centered, AI-driven applications that blend frontend precision with intelligent systems — from GenAI-powered dashboards to immersive XR learning tools.

I’m passionate about using technology to empower creativity and learning, especially through ethical, accessible, and impactful digital products.
`,
		technologies: [
			"TypeScript",
			"AI SDK (Vercel)",
			"Drizzle ORM",
			"JavaScript (ES6+)",
			"HTML/CSS",
			"Next.js",
			"Tailwind CSS",
			"PostgreSQL",
			"AWS Amplify",
			"AWS Bedrock",
			"Git",
			"GitHub",
			"CI/CD",
			"Agile/Scrum",
			"Motion (Animation lib)"

		],
	},

	// Experience
	experience: [
		{
			company: "Upstatement",
			position: "Senior Frontend Developer",
			duration: "May 2022 - Present",
			location: "Boston, MA",
			description: [
				"Write modern, performant, maintainable code for a diverse array of client and internal projects",
				"Work with a variety of different languages, platforms, frameworks, and content management systems such as JavaScript, TypeScript, Gatsby, React, Craft, WordPress, Prismic, and Netlify",
				"Communicate with multi-disciplinary teams of engineers, designers, producers, and clients on a daily basis",
			],
		},
		{
			company: "Apple",
			position: "UI Engineer Co-op",
			duration: "July 2021 - December 2021",
			location: "Cupertino, CA",
			description: [
				"Developed and shipped highly interactive web applications for Apple Music using Ember.js",
				"Built and shipped the Apple Music Extension within Facebook Messenger leveraging third-party and internal APIs",
				"Architected and implemented the front-end of Apple Music's embeddable web player widget, which lets users log in and listen to full songs in the browser",
			],
		},
		{
			company: "Mullen Lowe",
			position: "Creative Technologist Co-op",
			duration: "July 2020 - December 2020",
			location: "Boston, MA",
			description: [
				"Developed, maintained, and shipped production code for client websites primarily using HTML, CSS, Sass, JavaScript, and jQuery",
				"Performed quality assurance tests on various sites to ensure cross-browser compatibility and mobile responsiveness",
				"Clients included JetBlue, Lovesac, U.S. Cellular, U.S. Department of Defense, and more",
			],
		},
	],

	// Projects
	projects: {
		items: [
			{
				id: 1,
				slug: "shadcn-interactive-transcript",
				title: "Interactive Video Transcript",
				role: "AI",
				summary: "Interactive video player that provides bidirectional video-transcript synchronization. Navigate video content by clicking transcript segments and see real-time highlighting as the video plays.",
				highlights: [
					"OpenAI embeddings for semantic transcript search",
					"shadcn/ui and Tailwind for accessible UI",
					"Supabase vector store for fast retrieval"
				],
				tech: ["React", "TypeScript", "shadcn/ui", "TailwindCSS", "MUX API", "WCAG 2.1 AAA "],
				links: {
					demo: "https://drive.google.com/file/d/1cNlgZtOMk6t_bK0dMjB6c2NJKi-GEQk4/view?usp=sharing",

					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Latency (p95)", value: "180ms" },
					{ label: "First-response accuracy", value: "94%" },
					{ label: "CSAT", value: "4.8/5" }
				],
				thumbnail: "/rhyan_vargas_portfolio_nextjs_react_ui_interactive_transcript.png",
				isFeatured: true,
			},

			{
				id: 2,
				slug: "8p3p-lms-nextjs",
				title: "Full Stack LMS Platform",
				role: "Frontend",
				summary: "A modern, full-stack Learning Management System (LMS) built with Next.js 15, TypeScript, and AWS Amplify. Features include an App Router architecture, typed schema validation, course management, video content, and a11y-first UI components. Designed for scale, rapid iteration, and evidence-backed frontend engineering",
				highlights: [
					"Next.js 15 App Router architecture with nested layouts and server components",
					"AWS Amplify integration for authentication, storage, and backend logic",
					"MUX Player for scalable, secure video streaming in lessons",
					"Radix UI and shadcn/ui for accessible, composable UI primitives",
					"TypeScript + Zod for type safety and runtime validation",
					"Responsive, themeable design with Tailwind CSS and dark mode support"
				],
				tech: ["Next.js 15",
					"TypeScript",
					"AWS Amplify",
					"MUX Player",
					"Radix UI",
					"shadcn/ui",
					"TailwindCSS",
					"Zod",
					"React Hook Form",
					"Lucide React",
					"Sonner",
					"Vaul"],
				links: {
					demo: "https://drive.google.com/file/d/1K9q8Gg7ztcc7yxPBy4wI9ApmKj7Kvx0J/view?usp=drive_link",
					// repo: "https://github.com/rhyanvargas/8p3p-lms-nextjs",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Users", value: "100+" },
					{ label: "Courses Created", value: "20+" },
					{ label: "Uptime", value: "99.9%" }
				],
				thumbnail: "/rhyan_vargas_portfolio_nextjs_fullstack_lms_app.png",
				isFeatured: true,
			},
			{
				id: 3,
				slug: "ai-utility-bill-analyzer",
				title: "AI Utility Bill Analyzer",
				role: "AI",
				summary: "M.I.A. - Your utility bill AI assistant that analyzes electric bills to identify savings opportunities and provides personalized recommendations.",
				highlights: [
					"AI-powered utility bill analysis and cost optimization",
					"Interactive chat assistant with PickAxe.co integration",
					"Personalized savings recommendations and program enrollment",
					"Mobile-responsive design with shadcn/ui components"
				],
				tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "PickAxe.co", "Vercel"],
				links: {
					demo: "https://drive.google.com/file/d/1ta17rv68xulyc0m_YVqe5QqAOwqSzQ6Q/view?usp=drive_link",
					repo: "https://github.com/rhyanvargas/ai-utility-bill-analyzer",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Bill Analysis", value: "AI-Powered" },
					{ label: "Savings Tracking", value: "Real-time" },
					{ label: "User Experience", value: "Mobile-first" }
				],
				thumbnail: "/rhyan_vargas_portfolio_ai_integration_chatbot_website_app.png",
				isFeatured: true,
			},
			{
				id: 4,
				slug: "upload-git-issues",
				title: "Upload Git Issues",
				role: "DevTools",
				summary: "Zero-config CLI tool to bulk upload CSV data to GitHub Issues. Perfect for platform migrations and creating GitHub Issues from CSV exports.",
				highlights: [
					"One-command CSV to GitHub Issues conversion with intelligent parsing",
					"Interactive prompts for GitHub authentication and repo selection",
					"Beautiful progress indicators with real-time status updates",
					"Built-in security audits and compliance for enterprise use"
				],
				tech: ["TypeScript", "Node.js", "GitHub API", "CLI", "CSV Parser", "npm"],
				links: {
					demo: "https://www.npmjs.com/package/upload-git-issues",
					repo: "https://github.com/rhyanvargas/upload-git-issues",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "npm Package", value: "Published" },
					{ label: "CSV Support", value: "Universal" },
					{ label: "Setup Time", value: "2 minutes" }
				],
				thumbnail: "/rhyan_vargas_portfolio_tool_cli_github_bulk_issues_uploader.png",
				isFeatured: true,
			},
			{
				id: 5,
				slug: "rhyglot-ai-translator",
				title: "RhyGlot AI Translator",
				role: "AI",
				summary: "LLM-powered translation app with prompt controls, semantic reranking, and evaluation dashboard for multilingual content.",
				highlights: [
					"Prompt orchestration with retries and semantic reranking",
					"Streaming translation UI with real-time feedback",
					"4.8/5 user CSAT and 25% faster translation latency"
				],
				tech: ["Next.js", "TypeScript", "OpenAI", "Supabase", "Vercel"],
				links: {
					demo: "https://rhyglot-demo-url",
					repo: "https://github.com/rhyanvargas/rhyglot-ai-translator",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Requests", value: "5k+" },
					{ label: "User CSAT", value: "4.8/5" },
					{ label: "Latency (p95)", value: "320ms" }
				],
				thumbnail: "/rhyan_vargas_portfolio_ai_integration_text-translator_website_app.png",
				isFeatured: false,
			},
			{
				id: 6,
				slug: "ai-portfolio-generator",
				title: "AI Portfolio Generator",
				role: "AI",
				summary: "Automated portfolio builder that syncs and generates project case studies from GitHub metadata and evidence packs.",
				highlights: [
					"GitHub Action for auto-sync and PR creation",
					"Kiro-style specs and evidence packs auto-generation",
					"Configurable data model and full Next.js integration"
				],
				tech: ["Next.js", "TypeScript", "Supabase", "GitHub Actions", "Vercel"],
				links: {
					demo: "https://google.com",
					repo: "https://github.com/rhyanvargas/ai-portfolio-generator",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Projects Synced", value: "10+" },
					{ label: "PRs Opened", value: "5+" }
				],
				thumbnail: "/rhyan_vargas_portfolio_nextjs_ai_portfolio_generator.png",
				isFeatured: false,
			},

			{
				id: 7,
				slug: "pomoburn-app",
				title: "Pomoburn Productivity App",
				role: "Frontend",
				summary: "Focus timer app combining Pomodoro technique with analytics and habit tracking, built with Next.js and modern state management.",
				highlights: [
					"Zustand and TanStack Query for state and data management",
					"Detailed session analytics and progress tracking",
					"Accessible, mobile-friendly UI"
				],
				tech: ["Next.js", "TypeScript", "Zustand", "TanStack Query", "TailwindCSS"],
				links: {
					demo: "https://pomoburn.com",
					repo: "https://github.com/rhyanvargas/pomoburn-app",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Sessions Tracked", value: "2k+" },
					{ label: "Retention", value: "68%" }
				],
				thumbnail: "/rhyan_vargas_portfolio_nextjs_pomoburn.png",
				isFeatured: false,
			},
			{
				id: 8,
				slug: "ai-generated-captions",
				title: "AI Generated Captions",
				role: "AI",
				summary: "Next.js application that automatically generates video captions in TXT and WebVTT formats using AI transcription with multi-language support.",
				highlights: [
					"Drag & drop video upload with smooth progress UI",
					"OpenAI GPT-4 powered transcription and caption cleanup",
					"Dual format output: plain text (.txt) and WebVTT (.vtt)",
					"Planned multi-language translation to 50+ languages"
				],
				tech: ["Next.js", "TypeScript", "OpenAI", "AI SDK", "shadcn/ui", "TailwindCSS", "Vitest", "Zod"],
				links: {
					demo: "https://drive.google.com/file/d/1nvJuqUYjQOLyJmydkipH_x5sb_ckMgrS/view?usp=drive_link",
					repo: "https://github.com/rhyanvargas/ai-generated-captions",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Format Support", value: "2" },
					{ label: "Planned Languages", value: "50+" },
					{ label: "Processing Speed", value: "Fast" }
				],
				thumbnail: "/rhyan_vargas_portfolio_ai_captions_generator.png",
				isFeatured: false,
			},

			{
				id: 9,
				slug: "fluix-ui",
				title: "Fluix UI",
				role: "Frontend",
				summary: "Advanced AI-first component registry built on shadcn/ui, providing unique AI interaction patterns, transparency features, and enterprise governance components.",
				highlights: [
					"10+ unique AI-specific components (ConfidenceScore, ReasoningSteps, SourceAttribution)",
					"Enterprise-ready with audit trails, cost tracking, and compliance features",
					"Copy-paste friendly components with full TypeScript support",
					"Fills ecosystem gaps missing from AI SDK UI and other libraries"
				],
				tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React", "WCAG 2.1"],
				links: {
					demo: "https://fluix-ui-demo-url",
					repo: "https://github.com/rhyanvargas/fluix-ui",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Components", value: "10+" },
					{ label: "Accessibility", value: "WCAG 2.1 AA" },
					{ label: "Type Safety", value: "100%" }
				],
				thumbnail: "/rhyan_vargas_portfolio_ui_components_fluix.png",
				isFeatured: false,
			},
			{
				id: 10,
				slug: "techsaints-website",
				title: "TechSaints Website",
				role: "Frontend",
				summary: "Awareness page with Brevo integration built using v0.app. Automatically synced deployment pipeline with Vercel integration.",
				highlights: [
					"Built with v0.app for rapid prototyping and deployment",
					"Automatic sync between v0.app and GitHub repository",
					"Brevo email marketing integration for lead capture",
					"Seamless Vercel deployment with continuous integration"
				],
				tech: ["Next.js", "TypeScript", "v0.app", "Brevo", "Vercel", "shadcn/ui"],
				links: {
					demo: "https://vercel.com/rhyanvargas1s-projects/v0-awareness-page-with-brevo",
					repo: "https://github.com/rhyanvargas/techsaints-website",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Build Tool", value: "v0.app" },
					{ label: "Deployment", value: "Auto-sync" },
					{ label: "Integration", value: "Brevo" }
				],
				thumbnail: "/rhyan_vargas_portfolio_nextjs_marketing_website_tech_saints_nextjs.png",
				isFeatured: false,
			}
		],

	},

	// Contact
	contact: {
		title: "What's Next?",
		subtitle: "Get In Touch",
		description:
			"Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
		cta: "Say Hello",
	},

	// Footer
	footer: {
		text: "Built by Rhyan Vargas",
		year: 2025,
	},
};

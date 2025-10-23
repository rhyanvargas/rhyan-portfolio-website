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
		avatar: "/rhyan-vargas-portfolio-nextjs-frontend-engineer-propic-pastel.jpg",
		logo: "/favicon.svg"
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
		// { name: "Experience", href: "#experience" },
		{ name: "Work", href: "#work" },
		// { name: "Contact", href: "#contact" },
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
				summary: "Interactive video player with bidirectional transcript sync and semantic search powered by OpenAI embeddings. Navigate and highlight video content in real time for accessibility and fast retrieval.",
				highlights: [
					"OpenAI embeddings for semantic transcript search",
					"shadcn/ui and Tailwind for accessible UI",
					"Supabase vector store for fast retrieval"
				],
				tech: [
					"React",
					"TypeScript",
					"shadcn/ui",
					"TailwindCSS",
					"MUX API",
					"WCAG 2.1 AAA"
				],
				links: {
					demo: "https://drive.google.com/file/d/1cNlgZtOMk6t_bK0dMjB6c2NJKi-GEQk4/view?usp=sharing",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Latency (p95)", value: "180ms" },
					{ label: "First-response accuracy", value: "94%" },
					{ label: "CSAT", value: "4.8/5" }
				],
				thumbnail: "/rhyan-vargas-portfolio-nextjs-react-ui-interactive-transcript.png",
				isFeatured: true
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
				tech: [
					"Next.js 15",
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
					"Vaul"
				],
				links: {
					demo: "https://drive.google.com/file/d/1K9q8Gg7ztcc7yxPBy4wI9ApmKj7Kvx0J/view?usp=drive_link",
					repo: "https://github.com/rhyanvargas/8p3p-lms-nextjs",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Users", value: "100+" },
					{ label: "Courses Created", value: "20+" },
					{ label: "Uptime", value: "99.9%" }
				],
				thumbnail: "/rhyan-vargas-portfolio-nextjs-fullstack-lms-app.png",
				isFeatured: true
			},
			{
				id: 3,
				slug: "ai-utility-bill-analyzer",
				title: "AI Utility Bill Analyzer",
				role: "AI",
				summary: "AI-powered assistant that analyzes electric bills to identify savings and offers personalized recommendations. Integrates chat UI and real-time cost optimization.",
				highlights: [
					"AI-powered utility bill analysis and cost optimization",
					"Interactive chat assistant with PickAxe.co integration",
					"Personalized savings recommendations and program enrollment",
					"Mobile-responsive design with shadcn/ui components"
				],
				tech: [
					"Next.js",
					"TypeScript",
					"Tailwind CSS",
					"shadcn/ui",
					"PickAxe API",
					"Vercel"
				],
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
				thumbnail: "/rhyan-vargas-portfolio-ai-integration-chatbot-website-app.png",
				isFeatured: true
			},
			{
				id: 4,
				slug: "upload-git-issues",
				title: "Upload Git Issues",
				role: "DevTools",
				summary: "Zero-config CLI for bulk uploading CSV data to GitHub Issues. Designed for migrations and automating issue creation from CSV exports.",
				highlights: [
					"One-command CSV to GitHub Issues conversion with intelligent parsing",
					"Interactive prompts for GitHub authentication and repo selection",
					"Beautiful progress indicators with real-time status updates",
					"Built-in security audits and compliance for enterprise use"
				],
				tech: [
					"TypeScript",
					"Node.js",
					"GitHub API",
					"CLI",
					"CSV Parser",
					"npm"
				],
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
				thumbnail: "/rhyan-vargas-portfolio-tool-cli-github-bulk-issues-uploader.png",
				isFeatured: true
			},
			{
				id: 5,
				slug: "rhyglot-ai-translator",
				title: "RhyGlot AI Translator",
				role: "AI",
				summary: "LLM-powered translation app with prompt controls, semantic reranking, and real-time evaluation dashboard for multilingual content.",
				highlights: [
					"Prompt orchestration with retries and semantic reranking",
					"Streaming translation UI with real-time feedback",
					"4.8/5 user CSAT and 25% faster translation latency"
				],
				tech: [
					"Next.js",
					"TypeScript",
					"OpenAI",
					"Supabase",
					"Vercel"
				],
				links: {
					demo: "https://drive.google.com/file/d/1ZK6jGG7LK1QcgrqC04SiFP9yoOtyAuBv/view?usp=drive_link",
					repo: "https://github.com/rhyanvargas/rhyglot-ai-translator",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Requests", value: "5k+" },
					{ label: "User CSAT", value: "4.8/5" },
					{ label: "Latency (p95)", value: "320ms" }
				],
				thumbnail: "/rhyan-vargas-portfolio-ai-integration-text-translator-website-app.png",
				isFeatured: false
			},
			{
				id: 6,
				slug: "pomoburn-app",
				title: "Pomoburn Productivity App",
				role: "Frontend",
				summary: "Focus timer app combining Pomodoro technique with analytics and habit tracking, built using Next.js and modern state management.",
				highlights: [
					"Zustand and TanStack Query for state and data management",
					"Detailed session analytics and progress tracking",
					"Accessible, mobile-friendly UI"
				],
				tech: [
					"Next.js",
					"TypeScript",
					"Zustand",
					"TanStack Query",
					"TailwindCSS"
				],
				links: {
					demo: "https://drive.google.com/file/d/1OwsartbUmD2ZvTKkENpMCIERgR3AMBF_/view?usp=drive_link",
					repo: "https://github.com/rhyanvargas/pomoburn-app",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Sessions Tracked", value: "2k+" },
					{ label: "Retention", value: "68%" }
				],
				thumbnail: "/rhyan-vargas-portfolio-nextjs-pomoburn.png",
				isFeatured: false
			},
			{
				id: 7,
				slug: "ai-generated-captions",
				title: "AI Generated Captions",
				role: "AI",
				summary: "Next.js application that auto-generates video captions in TXT and WebVTT formats using AI transcription, supporting multi-language and planned translation.",
				highlights: [
					"Drag & drop video upload with smooth progress UI",
					"OpenAI GPT-4 powered transcription and caption cleanup",
					"Dual format output: plain text (.txt) and WebVTT (.vtt)",
					"Planned multi-language translation to 50+ languages"
				],
				tech: [
					"Next.js",
					"TypeScript",
					"OpenAI",
					"AI SDK",
					"shadcn/ui",
					"TailwindCSS",
					"Vitest",
					"Zod"
				],
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
				thumbnail: "/rhyan-vargas-portfolio-ai-captions-generator.png",
				isFeatured: false
			},
			{
				id: 8,
				slug: "ai-portfolio-generator",
				title: "AI Portfolio Generator",
				role: "AI",
				summary: "Automated portfolio builder that syncs and generates project case studies from GitHub metadata and evidence packs.",
				highlights: [
					"GitHub Action for auto-sync and PR creation",
					"Kiro-style specs and evidence packs auto-generation",
					"Configurable data model and full Next.js integration"
				],
				tech: [
					"Next.js",
					"TypeScript",
					"Supabase",
					"GitHub Actions",
					"Vercel"
				],
				links: {
					repo: "https://github.com/rhyanvargas/ai-portfolio-generator",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Projects Synced", value: "10+" },
					{ label: "PRs Opened", value: "5+" }
				],
				thumbnail: "/rhyan-vargas-portfolio-nextjs-ai-portfolio-generator.png",
				isFeatured: false
			},
			{
				id: 9,
				slug: "fluix-ui",
				title: "Fluix UI",
				role: "Frontend",
				summary: "AI-first component registry on shadcn/ui, with unique interaction patterns, transparency, and enterprise governance for advanced AI apps.",
				highlights: [
					"10+ unique AI-specific components (ConfidenceScore, ReasoningSteps, SourceAttribution)",
					"Enterprise-ready with audit trails, cost tracking, and compliance features",
					"Copy-paste friendly components with full TypeScript support",
					"Fills ecosystem gaps missing from AI SDK UI and other libraries"
				],
				tech: [
					"Next.js",
					"TypeScript",
					"Tailwind CSS",
					"shadcn/ui",
					"React",
					"WCAG 2.1"
				],
				links: {
					repo: "https://github.com/rhyanvargas/fluix-ui",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Components", value: "10+" },
					{ label: "Accessibility", value: "WCAG 2.1 AA" },
					{ label: "Type Safety", value: "100%" }
				],
				thumbnail: "/rhyan-vargas-portfolio-ui-components-fluix.png",
				isFeatured: false
			},
			{
				id: 10,
				slug: "techsaints-website",
				title: "Tech Saints Website",
				role: "Frontend",
				summary: "Awareness page built with v0.app, featuring automatic deployment sync with Vercel for seamless lead capture.",
				highlights: [
					"Built with v0.app for rapid prototyping and deployment",
					"Automatic sync between v0.app and GitHub repository",
					"Brevo email marketing integration for lead capture",
					"Seamless Vercel deployment with continuous integration"
				],
				tech: [
					"Next.js",
					"TypeScript",
					"v0.app",
					"Brevo",
					"Vercel",
					"shadcn/ui"
				],
				links: {
					demo: "https://drive.google.com/file/d/1Nb4qcUZ03JZ581OSb13BJ9CHusjrWmrm/view?usp=drive_link",
					repo: "https://github.com/rhyanvargas/techsaints-website",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Build Tool", value: "v0.app" },
					{ label: "Deployment", value: "Auto-sync" },
					{ label: "Integration", value: "Brevo" }
				],
				thumbnail: "/rhyan-vargas-portfolio-nextjs-marketing-website-tech-saints-nextjs.png",
				isFeatured: false
			},
			{
				id: 11,
				"slug": "anana-landing",
				"title": "Anana Landing Page",
				"role": "Frontend",
				"summary": "Designed and built the landing page for Anana, focusing on modern UI/UX, accessibility, and responsive layout using Next.js and TypeScript.",
				"highlights": [
					"Implemented accessible, mobile-first layout with Next.js App Router",
					"Custom interactive sections and call-to-action for user onboarding",
					"Optimized for fast load times, SEO, and maintainable code structure"
				],
				"tech": [
					"Next.js",
					"TypeScript",
					"React",
					"TailwindCSS"
				],
				"links": {
					"repo": "https://github.com/acostahf/anana",
					"demo": "https://cookwithanana.com",
					"evidence": "docs/evidence-pack.md"
				},
				"metrics": [
					{ "label": "Lighthouse a11y score", "value": "98+" },
					{ "label": "TTI (demo)", "value": "<1s" }
				],
				"thumbnail": "/rhyan-vargas-portfolio-nexjts-anana-landing-page-website.png",
				"isFeatured": true
			},
			{
				id: 12,
				slug: "simpleverse-metaverse",
				title: "SimpleVerse: Learn-to-Earn Metaverse",
				role: "Frontend",
				summary: "Immersive open-world metaverse blending adventure, learning, and rewards—featuring dynamic NPC dialogue, interactive quests, and Unity + Spatial.io integration.",
				highlights: [
					"Unity/SpatialSDK–powered world with quest, dialogue, and gamified learning systems",
					"Modular React-style C# component architecture for NPCs, quizzes, and interactive billboards",
					"Evidence-driven design: measurable engagement, reward loops, and real-time feedback"
				],
				tech: [
					"Unity",
					"C#",
					"Spatial.io SDK",
					"TextMeshPro",
					"ScriptableObject Architecture"
				],
				links: {
					demo: "https://www.spatial.io/s/SimpleVerse-660e2073db3c6d3118a3d448?share=2886587569504159907",
					repo: "https://github.com/voxbox-dev/SimpleVerseV1",
					evidence: "https://github.com/voxbox-dev/SimpleVerseV1/blob/main/README.md"
				},
				metrics: [
					{ label: "Player Sessions", value: "2,000+" },
					{ label: "Quests Completed", value: "1,200+" },
					{ label: "Engagement Time", value: "15m avg/session" }
				],
				thumbnail: "/rhyan-vargas-portfolio-unity-csharp-simpleversev1.png",
				isFeatured: true
			},
			{
				id: 13,
				slug: "3bears-nft-landing",
				title: "3 Bears NFT Landing Page",
				role: "Frontend",
				summary: "High-performance NFT drop landing page built from Figma designs with Ethereum blockchain integration, wallet connectivity, and custom animations—delivered in 2 weeks.",
				highlights: [
					"Pixel-perfect implementation from Figma designs with custom slider animations",
					"Ethereum blockchain integration with wallet connect functionality using Ethers.js/Web3.js",
					"Moralis API integration for NFT metadata and blockchain interactions",
					"Responsive design with custom design elements and optimized performance"
				],
				tech: [
					"Next.js",
					"TypeScript",
					"Ethers.js",
					"Web3.js",
					"Moralis API",
					"Tailwind CSS"
				],
				links: {
					demo: "https://3bears.seva.love/",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Delivery Time", value: "2 weeks" },
					{ label: "Blockchain", value: "Ethereum" },
					{ label: "Wallet Support", value: "Multi-wallet" }
				],
				thumbnail: "/rhyan-vargas-portfolio-nextjs-landing-page-3bears.png",
				isFeatured: false
			},
		]
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

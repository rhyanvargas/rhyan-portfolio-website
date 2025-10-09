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
			"🚀 From idea to MVP — I build high-impact web and AI applications with Next.js, React, AWS, and modern cloud stacks.",
		description:
			"A Full Stack Software Engineer specializing in Next.js, React, and AWS. I excel at going from idea to MVP quickly, building secure and scalable applications that bridge enterprise reliability with innovative features in AI and XR.",
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
		content: `Hello! My name is Rhyan and I enjoy creating things that live on the internet. My interest in web development started back in 2018 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!

Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients.

Here are a few technologies I've been working with recently:`,
		technologies: [
			"JavaScript (ES6+)",
			"TypeScript",
			"React",
			"Node.js",
			"Next.js",
			"Python",
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
				thumbnail: "/projects/rhyglot-ai-translator/cover.png"
			},
			{
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
					demo: "https://ai-portfolio-demo-url",
					repo: "https://github.com/rhyanvargas/ai-portfolio-generator",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Projects Synced", value: "10+" },
					{ label: "PRs Opened", value: "5+" }
				],
				thumbnail: "/projects/ai-portfolio-generator/cover.png"
			},
			{
				slug: "8p3p-lms-nextjs",
				title: "8p3p LMS Next.js",
				role: "Frontend",
				summary: "Modern Learning Management System with real-time progress tracking, course authoring, and Stripe-powered payments.",
				highlights: [
					"App Router architecture with nested layouts",
					"Supabase integration for auth, storage, and data",
					"Stripe payments and Mapbox-powered location features"
				],
				tech: ["Next.js", "TypeScript", "Supabase", "Stripe", "Mapbox GL", "TailwindCSS"],
				links: {
					demo: "https://8p3p-lms-demo-url",
					repo: "https://github.com/rhyanvargas/8p3p-lms-nextjs",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Users", value: "100+" },
					{ label: "Courses Created", value: "20+" },
					{ label: "Uptime", value: "99.9%" }
				],
				thumbnail: "/projects/8p3p-lms-nextjs/cover.png"
			},
			{
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
					demo: "https://pomoburn-demo-url",
					repo: "https://github.com/rhyanvargas/pomoburn-app",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Sessions Tracked", value: "2k+" },
					{ label: "Retention", value: "68%" }
				],
				thumbnail: "/projects/pomoburn-app/cover.png"
			},
			{
				slug: "shadcn-interactive-transcript",
				title: "shadcn Interactive Transcript",
				role: "AI",
				summary: "AI-powered transcript search and playback UI with accessibility-first design and real-time highlighting.",
				highlights: [
					"OpenAI embeddings for semantic transcript search",
					"shadcn/ui and Tailwind for accessible UI",
					"Supabase vector store for fast retrieval"
				],
				tech: ["Next.js", "TypeScript", "OpenAI", "Supabase", "shadcn/ui", "TailwindCSS"],
				links: {
					demo: "https://interactive-transcript-demo-url",
					repo: "https://github.com/rhyanvargas/shadcn-interactive-transcript",
					evidence: "docs/evidence-pack.md"
				},
				metrics: [
					{ label: "Latency (p95)", value: "180ms" },
					{ label: "First-response accuracy", value: "94%" },
					{ label: "CSAT", value: "4.8/5" }
				],
				thumbnail: "/projects/shadcn-interactive-transcript/cover.png"
			}
		],

		// Legacy format - keeping for backward compatibility
		featured: [
			{
				title: "Spotify Profile",
				description:
					"A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
				image: "/spotify-music-app-dashboard.jpg",
				technologies: ["React", "Express", "Spotify API", "Styled Components"],
				github: "https://github.com/rhyanvargas/spotify-profile",
				external: "https://spotify-profile.rhyanvargas.dev",
			},
			{
				title: "Halcyon Theme",
				description:
					"A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.",
				image: "/dark-code-editor.png",
				technologies: ["VS Code", "Sublime Text", "Atom", "iTerm2"],
				github: "https://github.com/rhyanvargas/halcyon-theme",
				external:
					"https://marketplace.visualstudio.com/items?itemName=rhyanvargas.halcyon-vscode",
			},
			{
				title: "Build a Spotify Connected App",
				description:
					"Having struggled with understanding how the Spotify Web API works, I decided to create a comprehensive course that covers everything you need to know to get started with the Spotify Web API and build your own connected app.",
				image: "/online-course-platform.jpg",
				technologies: ["Node.js", "Express", "React", "Spotify API"],
				github: "https://github.com/rhyanvargas/spotify-course",
				external: "https://course.rhyanvargas.dev",
			},
		],

		// Other Notable Projects
		other: [
			{
				title: "Integrating Algolia Search with WordPress Multisite",
				description:
					"Building a custom multisite compatible WordPress plugin to build global search with Algolia",
				technologies: ["Algolia", "WordPress", "PHP"],
				github: "https://github.com/rhyanvargas/wp-algolia",
			},
			{
				title: "Google Keep Clone",
				description:
					"A simple Google Keep clone built with React and Firebase for learning purposes",
				technologies: ["React", "Firebase", "CSS Grid"],
				github: "https://github.com/rhyanvargas/google-keep-clone",
			},
			{
				title: "Airbnb Clone",
				description:
					"A full-stack Airbnb clone with user authentication, property listings, and booking functionality",
				technologies: ["React", "Node.js", "MongoDB", "Express"],
				github: "https://github.com/rhyanvargas/airbnb-clone",
			},
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

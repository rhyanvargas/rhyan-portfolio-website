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
		// Work cutover (T8): projects live in Payload. Seed with: pnpm exec tsx scripts/seed-projects-from-portfolio.ts
		items: [],
	},
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

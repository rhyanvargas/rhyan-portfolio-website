export interface PortfolioConfig {
	personal: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		location: string;
		tagline: string;
		description: string;
	};
	social: {
		github: string;
		linkedin: string;
		twitter: string;
		website: string;
		resume: string;
	};
	navigation: Array<{
		name: string;
		href: string;
	}>;
	about: {
		title: string;
		content: string;
		technologies: string[];
	};
	experience: Array<{
		company: string;
		position: string;
		duration: string;
		location: string;
		description: string[];
	}>;
	projects: {
		featured: Array<{
			title: string;
			description: string;
			image: string;
			technologies: string[];
			github: string;
			external: string;
		}>;
		other: Array<{
			title: string;
			description: string;
			technologies: string[];
			github?: string;
			external?: string;
		}>;
	};
	contact: {
		title: string;
		subtitle: string;
		description: string;
		cta: string;
	};
	footer: {
		text: string;
		year: number;
	};
}

export const portfolioConfig: PortfolioConfig = {
	// Personal Information
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

	// Featured Projects
	projects: {
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

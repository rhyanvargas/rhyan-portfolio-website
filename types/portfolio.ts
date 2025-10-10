// Portfolio-specific TypeScript interfaces

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    tagline: string;
    description: string;
    avatar: string;
}

export interface SocialLinks {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
    resume: string;
}

export interface NavigationItem {
    name: string;
    href: string;
}

export interface AboutSection {
    title: string;
    content: string;
    technologies: string[];
}

export interface ExperienceItem {
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string[];
}

export interface FeaturedProject {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    external: string;
}

export interface OtherProject {
    title: string;
    description: string;
    technologies: string[];
    github?: string;
    external?: string;
}

export interface ProjectsSection {
    featured: FeaturedProject[];
    other: OtherProject[];
}

export interface ContactSection {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
}

export interface FooterSection {
    text: string;
    year: number;
}

export interface PortfolioConfig {
    personal: PersonalInfo;
    social: SocialLinks;
    navigation: NavigationItem[];
    about: AboutSection;
    experience: ExperienceItem[];
    projects: ProjectsSection;
    contact: ContactSection;
    footer: FooterSection;
}
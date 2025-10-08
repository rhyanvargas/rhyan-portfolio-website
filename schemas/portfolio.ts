import { z } from 'zod'

// Personal information schema
export const personalInfoSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone is required'),
    location: z.string().min(1, 'Location is required'),
    tagline: z.string().min(1, 'Tagline is required'),
    description: z.string().min(1, 'Description is required'),
})

// Social links schema
export const socialLinksSchema = z.object({
    github: z.string().url('Invalid GitHub URL'),
    linkedin: z.string().url('Invalid LinkedIn URL'),
    twitter: z.string().url('Invalid Twitter URL'),
    website: z.string().url('Invalid website URL'),
    resume: z.string().min(1, 'Resume information is required'),
})

// Navigation item schema
export const navigationItemSchema = z.object({
    name: z.string().min(1, 'Navigation name is required'),
    href: z.string().min(1, 'Navigation href is required'),
})

// About section schema
export const aboutSchema = z.object({
    title: z.string().min(1, 'About title is required'),
    content: z.string().min(1, 'About content is required'),
    technologies: z.array(z.string().min(1, 'Technology name cannot be empty')).min(1, 'At least one technology is required'),
})

// Experience item schema
export const experienceItemSchema = z.object({
    company: z.string().min(1, 'Company name is required'),
    position: z.string().min(1, 'Position is required'),
    duration: z.string().min(1, 'Duration is required'),
    location: z.string().min(1, 'Location is required'),
    description: z.array(z.string().min(1, 'Description item cannot be empty')).min(1, 'At least one description item is required'),
})

// Featured project schema
export const featuredProjectSchema = z.object({
    title: z.string().min(1, 'Project title is required'),
    description: z.string().min(1, 'Project description is required'),
    image: z.string().min(1, 'Project image is required'),
    technologies: z.array(z.string().min(1, 'Technology name cannot be empty')).min(1, 'At least one technology is required'),
    github: z.string().url('Invalid GitHub URL'),
    external: z.string().url('Invalid external URL'),
})

// Other project schema (with optional links)
export const otherProjectSchema = z.object({
    title: z.string().min(1, 'Project title is required'),
    description: z.string().min(1, 'Project description is required'),
    technologies: z.array(z.string().min(1, 'Technology name cannot be empty')).min(1, 'At least one technology is required'),
    github: z.string().url('Invalid GitHub URL').optional(),
    external: z.string().url('Invalid external URL').optional(),
})

// Projects schema
export const projectsSchema = z.object({
    featured: z.array(featuredProjectSchema).min(1, 'At least one featured project is required'),
    other: z.array(otherProjectSchema),
})

// Contact section schema
export const contactSchema = z.object({
    title: z.string().min(1, 'Contact title is required'),
    subtitle: z.string().min(1, 'Contact subtitle is required'),
    description: z.string().min(1, 'Contact description is required'),
    cta: z.string().min(1, 'Contact CTA is required'),
})

// Footer schema
export const footerSchema = z.object({
    text: z.string().min(1, 'Footer text is required'),
    year: z.number().int().min(2000, 'Year must be 2000 or later').max(3000, 'Year must be before 3000'),
})

// Main portfolio configuration schema
export const portfolioSchema = z.object({
    personal: personalInfoSchema,
    social: socialLinksSchema,
    navigation: z.array(navigationItemSchema).min(1, 'At least one navigation item is required'),
    about: aboutSchema,
    experience: z.array(experienceItemSchema).min(1, 'At least one experience item is required'),
    projects: projectsSchema,
    contact: contactSchema,
    footer: footerSchema,
})

// Type inference from schema
export type PortfolioConfig = z.infer<typeof portfolioSchema>
export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type SocialLinks = z.infer<typeof socialLinksSchema>
export type NavigationItem = z.infer<typeof navigationItemSchema>
export type About = z.infer<typeof aboutSchema>
export type ExperienceItem = z.infer<typeof experienceItemSchema>
export type FeaturedProject = z.infer<typeof featuredProjectSchema>
export type OtherProject = z.infer<typeof otherProjectSchema>
export type Projects = z.infer<typeof projectsSchema>
export type Contact = z.infer<typeof contactSchema>
export type Footer = z.infer<typeof footerSchema>
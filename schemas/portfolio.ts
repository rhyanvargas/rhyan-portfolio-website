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
    avatar: z.string().min(1, 'Avatar is required'),
    logo: z.string().min(1, 'Logo path is required').optional(),
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

// Project metric schema
export const projectMetricSchema = z.object({
    label: z.string().min(1, 'Metric label is required'),
    value: z.string().min(1, 'Metric value is required'),
})

// Project links schema
export const projectLinksSchema = z.object({
    demo: z.string().url('Invalid demo URL').optional(),
    repo: z.string().url('Invalid repository URL').optional(),
    evidence: z.string().min(1, 'Evidence path is required').optional(),
})

// Main project schema
export const projectSchema = z.object({
    id: z.number().int().min(1, 'Project ID must be a positive integer'),
    slug: z.string().min(1, 'Project slug is required'),
    title: z.string().min(1, 'Project title is required'),
    role: z.string().min(1, 'Project role is required'),
    summary: z.string().min(1, 'Project summary is required'),
    highlights: z.array(z.string().min(1, 'Highlight cannot be empty')).min(1, 'At least one highlight is required'),
    tech: z.array(z.string().min(1, 'Technology name cannot be empty')).min(1, 'At least one technology is required'),
    links: projectLinksSchema,
    metrics: z.array(projectMetricSchema).optional(),
    thumbnail: z.string().min(1, 'Thumbnail path is required'),
    isFeatured: z.boolean().optional(),
})


// Projects schema 
export const projectsSchema = z.object({
    items: z.array(projectSchema).optional(),
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
export type Project = z.infer<typeof projectSchema>
export type ProjectMetric = z.infer<typeof projectMetricSchema>
export type ProjectLinks = z.infer<typeof projectLinksSchema>
export type Projects = z.infer<typeof projectsSchema>
export type Contact = z.infer<typeof contactSchema>
export type Footer = z.infer<typeof footerSchema>
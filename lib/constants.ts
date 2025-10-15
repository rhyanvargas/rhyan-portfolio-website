// Predefined categories for project filtering system
// These constants ensure consistency across the application and enable effective filtering

// Technologies - Predefined list for consistency and SEO
export const TECHNOLOGIES = [
    // Frontend Frameworks & Libraries
    'React',
    'Next.js',
    'Vue.js',
    'Angular',
    'Svelte',
    'TypeScript',
    'JavaScript',
    'HTML/CSS',

    // Styling & UI
    'Tailwind CSS',
    'shadcn/ui',
    'Radix UI',
    'Framer Motion',
    'CSS Modules',
    'Styled Components',

    // Backend & APIs
    'Node.js',
    'Express.js',
    'FastAPI',
    'Django',
    'Flask',
    'GraphQL',
    'REST API',
    'tRPC',

    // Databases
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'Supabase',
    'Firebase',
    'Prisma',
    'Drizzle ORM',

    // Cloud & Infrastructure
    'AWS',
    'Vercel',
    'Netlify',
    'Docker',
    'Kubernetes',
    'AWS Amplify',
    'AWS Bedrock',
    'AWS Lambda',

    // AI & Machine Learning
    'OpenAI',
    'AI SDK',
    'LangChain',
    'Hugging Face',
    'TensorFlow',
    'PyTorch',

    // Mobile Development
    'React Native',
    'Flutter',
    'Swift',
    'Kotlin',

    // Game Development
    'Unity',
    'C#',
    'Unreal Engine',
    'Godot',

    // DevTools & Testing
    'Git',
    'GitHub',
    'GitHub Actions',
    'Jest',
    'Vitest',
    'Cypress',
    'Playwright',
    'ESLint',
    'Prettier',

    // Other Tools
    'Figma',
    'Adobe Creative Suite',
    'Blender',
    'Postman'
] as const

// Skill Categories
export const SKILL_CATEGORIES = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'AI/Machine Learning',
    'DevOps/Infrastructure',
    'Mobile Development',
    'Game Development',
    'UI/UX Design',
    'Data Engineering',
    'API Development'
] as const

// Role Types  
export const ROLE_TYPES = [
    'Frontend',
    'Backend',
    'Full Stack',
    'AI Engineer',
    'DevOps',
    'Mobile',
    'Game Developer',
    'Designer',
    'Data Engineer',
    'DevTools'
] as const

// Domain Categories
export const DOMAIN_CATEGORIES = [
    'E-commerce',
    'Education',
    'Healthcare',
    'Finance',
    'Entertainment',
    'Productivity',
    'Social',
    'Enterprise',
    'Open Source',
    'Personal'
] as const

// Type definitions for the constants
export type Technology = typeof TECHNOLOGIES[number]
export type SkillCategory = typeof SKILL_CATEGORIES[number]
export type RoleType = typeof ROLE_TYPES[number]
export type DomainCategory = typeof DOMAIN_CATEGORIES[number]
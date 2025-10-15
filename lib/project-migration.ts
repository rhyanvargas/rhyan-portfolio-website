import { Project, EnhancedProject } from '@/schemas/portfolio'
import { TECHNOLOGIES, SKILL_CATEGORIES, ROLE_TYPES, DOMAIN_CATEGORIES, Technology, SkillCategory, RoleType, DomainCategory } from '@/lib/constants'

/**
 * Migration utility for converting existing projects to enhanced schema
 * Provides backward compatibility while adding new categorization fields
 */
export function migrateProject(oldProject: Project): EnhancedProject {
    return {
        ...oldProject,
        roles: [mapRoleToRoleType(oldProject.role)], // Convert single role to array
        skillCategories: inferSkillCategories(oldProject.role, oldProject.tech),
        domains: inferDomains(oldProject.summary, oldProject.highlights),
        tech: normalizeTechnologies(oldProject.tech) // Normalize to predefined list
    }
}

/**
 * Maps legacy role strings to predefined role types
 */
function mapRoleToRoleType(role: string): RoleType {
    const roleMap: Record<string, RoleType> = {
        'Frontend Developer': 'Frontend',
        'Backend Developer': 'Backend',
        'Full Stack Developer': 'Full Stack',
        'Full-Stack Developer': 'Full Stack',
        'Fullstack Developer': 'Full Stack',
        'AI Engineer': 'AI Engineer',
        'DevOps Engineer': 'DevOps',
        'Mobile Developer': 'Mobile',
        'Game Developer': 'Game Developer',
        'UI/UX Designer': 'Designer',
        'Designer': 'Designer',
        'Data Engineer': 'Data Engineer',
        'DevTools Engineer': 'DevTools',
        // Add common variations
        'Frontend': 'Frontend',
        'Backend': 'Backend',
        'Full Stack': 'Full Stack',
        'Mobile': 'Mobile',
        'DevOps': 'DevOps'
    }

    return roleMap[role] || 'Full Stack' // Default to Full Stack if no match
}

/**
 * Infers skill categories based on role and technologies used
 */
function inferSkillCategories(role: string, technologies: string[]): SkillCategory[] {
    const categories = new Set<SkillCategory>()

    // Infer from role
    const roleToSkillMap: Record<string, SkillCategory[]> = {
        'Frontend Developer': ['Frontend Development'],
        'Backend Developer': ['Backend Development'],
        'Full Stack Developer': ['Full Stack Development', 'Frontend Development', 'Backend Development'],
        'Full-Stack Developer': ['Full Stack Development', 'Frontend Development', 'Backend Development'],
        'Fullstack Developer': ['Full Stack Development', 'Frontend Development', 'Backend Development'],
        'AI Engineer': ['AI/Machine Learning', 'Backend Development'],
        'DevOps Engineer': ['DevOps/Infrastructure'],
        'Mobile Developer': ['Mobile Development'],
        'Game Developer': ['Game Development'],
        'UI/UX Designer': ['UI/UX Design'],
        'Designer': ['UI/UX Design'],
        'Data Engineer': ['Data Engineering', 'Backend Development'],
        'DevTools Engineer': ['Frontend Development', 'Backend Development']
    }

    const roleSkills = roleToSkillMap[role] || ['Full Stack Development']
    roleSkills.forEach(skill => categories.add(skill))

    // Infer from technologies
    const techToSkillMap: Record<string, SkillCategory[]> = {
        'React': ['Frontend Development'],
        'Next.js': ['Full Stack Development', 'Frontend Development'],
        'Vue.js': ['Frontend Development'],
        'Angular': ['Frontend Development'],
        'React Native': ['Mobile Development'],
        'Flutter': ['Mobile Development'],
        'Unity': ['Game Development'],
        'Node.js': ['Backend Development'],
        'Express.js': ['Backend Development'],
        'FastAPI': ['Backend Development'],
        'Django': ['Backend Development'],
        'Flask': ['Backend Development'],
        'PostgreSQL': ['Backend Development', 'Data Engineering'],
        'MongoDB': ['Backend Development', 'Data Engineering'],
        'AWS': ['DevOps/Infrastructure', 'Backend Development'],
        'Docker': ['DevOps/Infrastructure'],
        'Kubernetes': ['DevOps/Infrastructure'],
        'OpenAI': ['AI/Machine Learning'],
        'TensorFlow': ['AI/Machine Learning'],
        'PyTorch': ['AI/Machine Learning'],
        'GraphQL': ['API Development', 'Backend Development'],
        'REST API': ['API Development', 'Backend Development'],
        'Figma': ['UI/UX Design']
    }

    technologies.forEach(tech => {
        const skills = techToSkillMap[tech] || []
        skills.forEach(skill => categories.add(skill))
    })

    // Ensure at least one category
    if (categories.size === 0) {
        categories.add('Full Stack Development')
    }

    return Array.from(categories)
}

/**
 * Infers domain categories from project summary and highlights
 */
function inferDomains(summary: string, highlights: string[]): DomainCategory[] {
    const domains = new Set<DomainCategory>()
    const text = (summary + ' ' + highlights.join(' ')).toLowerCase()

    const domainKeywords: Record<DomainCategory, string[]> = {
        'E-commerce': ['ecommerce', 'e-commerce', 'shop', 'store', 'payment', 'stripe', 'checkout', 'cart'],
        'Education': ['education', 'learning', 'course', 'tutorial', 'student', 'teacher', 'lms'],
        'Healthcare': ['health', 'medical', 'patient', 'doctor', 'clinic', 'hospital'],
        'Finance': ['finance', 'financial', 'banking', 'investment', 'trading', 'crypto'],
        'Entertainment': ['game', 'gaming', 'entertainment', 'media', 'video', 'music', 'streaming'],
        'Productivity': ['productivity', 'task', 'todo', 'project management', 'workflow', 'automation'],
        'Social': ['social', 'chat', 'messaging', 'community', 'network', 'collaboration'],
        'Enterprise': ['enterprise', 'business', 'corporate', 'saas', 'b2b', 'crm', 'erp'],
        'Open Source': ['open source', 'opensource', 'github', 'library', 'framework', 'tool'],
        'Personal': ['personal', 'portfolio', 'blog', 'resume', 'profile']
    }

    Object.entries(domainKeywords).forEach(([domain, keywords]) => {
        if (keywords.some(keyword => text.includes(keyword))) {
            domains.add(domain as DomainCategory)
        }
    })

    return Array.from(domains)
}

/**
 * Normalizes technology names to match predefined list
 */
function normalizeTechnologies(techArray: string[]): string[] {
    const techMap: Record<string, Technology> = {
        'NextJS': 'Next.js',
        'ReactJS': 'React',
        'TailwindCSS': 'Tailwind CSS',
        'shadcn': 'shadcn/ui',
        'OpenAI API': 'OpenAI',
        'AWS Amplify Gen 2': 'AWS Amplify',
        'NodeJS': 'Node.js',
        'ExpressJS': 'Express.js',
        'MongoDB Atlas': 'MongoDB',
        'PostgresQL': 'PostgreSQL',
        'Github': 'GitHub',
        'Github Actions': 'GitHub Actions',
        'CSS3': 'HTML/CSS',
        'HTML5': 'HTML/CSS',
        'Javascript': 'JavaScript',
        'Typescript': 'TypeScript'
    }

    return techArray
        .map(tech => techMap[tech] || tech)
        .filter(tech => TECHNOLOGIES.includes(tech as Technology))
        .filter((tech, index, array) => array.indexOf(tech) === index) // Remove duplicates
}

/**
 * Validates that a project conforms to the enhanced schema
 */
export function validateEnhancedProject(project: any): project is EnhancedProject {
    try {
        const { enhancedProjectSchema } = require('@/schemas/portfolio')
        enhancedProjectSchema.parse(project)
        return true
    } catch {
        return false
    }
}

/**
 * Batch migration utility for multiple projects
 */
export function migrateProjects(projects: Project[]): EnhancedProject[] {
    return projects.map(migrateProject)
}
/**
 * Demo utility to test project migration functionality
 * This file demonstrates how the migration utilities work with sample data
 */

import { migrateProject } from './project-migration'
import { Project } from '@/schemas/portfolio'

// Sample project data based on the existing portfolio structure
const sampleProject: Project = {
    id: 1,
    slug: "demo-project",
    title: "Demo E-commerce Platform",
    role: "Full Stack Developer",
    summary: "A modern e-commerce platform with payment integration and real-time inventory management",
    highlights: [
        "Built with React and Node.js for scalable architecture",
        "Integrated Stripe for secure payment processing",
        "Deployed on AWS with auto-scaling capabilities",
        "Implemented real-time inventory tracking"
    ],
    tech: [
        "React",
        "NextJS", // Will be normalized to "Next.js"
        "NodeJS", // Will be normalized to "Node.js"
        "TailwindCSS", // Will be normalized to "Tailwind CSS"
        "AWS",
        "MongoDB",
        "Stripe"
    ],
    links: {
        demo: "https://demo-ecommerce.example.com",
        repo: "https://github.com/example/ecommerce-platform"
    },
    thumbnail: "/demo-ecommerce-thumbnail.png",
    isFeatured: true
}

/**
 * Demonstrates the migration process
 */
export function demonstrateMigration() {
    console.log('=== Project Migration Demo ===')
    console.log('\nOriginal Project:')
    console.log('- Role:', sampleProject.role)
    console.log('- Tech:', sampleProject.tech)
    console.log('- Summary:', sampleProject.summary.substring(0, 50) + '...')

    const enhanced = migrateProject(sampleProject)

    console.log('\nEnhanced Project:')
    console.log('- Roles:', enhanced.roles)
    console.log('- Skill Categories:', enhanced.skillCategories)
    console.log('- Domains:', enhanced.domains)
    console.log('- Normalized Tech:', enhanced.tech)
    console.log('- Backward Compatible Role:', enhanced.role)

    return enhanced
}

// Export for use in other files
export { sampleProject }
# Portfolio CMS Configuration

This portfolio uses a TypeScript-based content management system that allows you to easily update all content from a single configuration file.

## How to Update Content

All portfolio content is managed through the `config/portfolio.ts` file. Simply edit this file to update:

- **Personal Information**: Name, email, tagline, description
- **Social Links**: GitHub, LinkedIn, Twitter, website, resume
- **Navigation**: Menu items and their links
- **About Section**: Bio content and technologies list
- **Experience**: Job history with descriptions
- **Projects**: Featured and other projects with details
- **Contact**: Contact section content and CTA
- **Footer**: Footer text and copyright year

## Configuration Structure

\`\`\`typescript
export const portfolioConfig: PortfolioConfig = {
  // Personal Information
  personal: {
    firstName: "Your First Name",
    lastName: "Your Last Name", 
    email: "your.email@example.com",
    // ... more fields
  },

  // Social Links
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    // ... more links
  },

  // Projects
  projects: {
    featured: [
      {
        title: "Project Name",
        description: "Project description",
        technologies: ["React", "Node.js"],
        github: "https://github.com/...",
        external: "https://project-url.com"
      }
    ],
    // ... more sections
  }
}
\`\`\`

## Benefits

- **Single Source of Truth**: All content in one file
- **Type Safety**: TypeScript interfaces ensure data consistency
- **Client/Server Compatible**: Works in both browser and server environments
- **Easy Updates**: No need to edit multiple component files
- **Version Control**: Track content changes through Git
- **Separation of Concerns**: Content separated from code

## Making Changes

1. Edit `config/portfolio.ts`
2. Save the file
3. The portfolio will automatically reflect your changes
4. TypeScript will catch any configuration errors
5. No code changes required!

## Best Practices

- Keep descriptions concise and engaging
- Use consistent formatting for dates and URLs
- Test all external links before publishing
- Maintain consistent technology naming (e.g., "JavaScript" not "JS")
- Follow the TypeScript interface structure for type safety

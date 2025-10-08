---
inclusion: always
---

# Documentation Best Practices

## README Guidelines

Follow GitHub's best practices for project documentation to keep READMEs concise and maintainable.

### Core Principles
- **Keep it slim**: README should be scannable and focused on essentials
- **Essential only**: Include what users need to get started quickly
- **Link to details**: Use wikis, docs folders, or separate files for extensive documentation
- **User-focused**: Prioritize what newcomers need most

### README Structure (Required Sections)

1. **Project Title & Badges**
   - Essential badges only (live site, main tech, license)
   - Avoid badge clutter - max 6-8 badges total

2. **Brief Description**
   - One-line project summary
   - Key value proposition

3. **Quick Start**
   - Installation commands
   - Basic usage
   - Prerequisites

4. **Key Features**
   - 4-6 bullet points maximum
   - Focus on unique selling points

5. **Tech Stack**
   - Core technologies only
   - Avoid detailed version tables

6. **Basic Configuration**
   - Essential setup information
   - Link to detailed docs for complex config

7. **Contributing**
   - Standard GitHub contributing guidelines

8. **Contact & License**
   - Author contact information
   - License reference

### What NOT to Include in README

❌ **Avoid These in Main README:**
- Extensive API documentation
- Detailed architecture explanations
- Complete configuration schemas
- Long code examples
- Comprehensive troubleshooting guides
- Detailed deployment instructions
- Performance benchmarks
- Complete feature lists

### Where to Put Detailed Documentation

✅ **Use These Alternatives:**
- **Wiki pages** - For extensive guides and documentation
- **`docs/` folder** - For structured documentation
- **Inline code comments** - For implementation details
- **Separate markdown files** - For specific topics
- **GitHub Issues** - For known issues and troubleshooting

### GitHub Wiki Management

For detailed documentation, use GitHub wikis following the official guidelines:
**Reference:** [Adding or editing wiki pages locally](https://docs.github.com/en/communities/documenting-your-project-with-wikis/adding-or-editing-wiki-pages#adding-or-editing-wiki-pages-locally)

#### Setting Up Local Wiki Editing
```bash
# Clone the wiki repository (separate from main repo)
git clone https://github.com/username/repository.wiki.git

# Create and edit wiki pages locally
cd repository.wiki
echo "# Architecture Guide" > Architecture.md
git add Architecture.md
git commit -m "Add architecture documentation"
git push origin master
```

#### Wiki Best Practices
- **File naming**: Use PascalCase for wiki page names (e.g., `Architecture.md`, `Configuration.md`)
- **Home page**: Create a comprehensive `Home.md` as the wiki landing page
- **Navigation**: Link between wiki pages using `[[Page Name]]` syntax
- **Structure**: Organize with clear hierarchy and cross-references
- **Maintenance**: Keep wiki content current and remove outdated pages

### Documentation Hierarchy

```
README.md              # Essential info only (< 200 lines)
├── docs/
│   ├── architecture.md    # Detailed system design
│   ├── configuration.md   # Complete config guide
│   ├── deployment.md      # Production setup
│   └── development.md     # Dev workflow
└── wiki/              # GitHub wiki for extensive docs
```

## Content Guidelines

### Writing Style
- **Concise**: Use bullet points and short paragraphs
- **Scannable**: Use headers, tables, and visual breaks
- **Actionable**: Focus on what users can do
- **Current**: Keep information up-to-date

### Code Examples
- **Minimal**: Show only essential code
- **Working**: Ensure all examples actually work
- **Commented**: Explain non-obvious parts
- **Complete**: Include necessary imports/setup

### Visual Elements
- **Screenshots**: Use sparingly, keep current
- **Diagrams**: Simple architecture overviews only
- **Tables**: For comparing options or listing commands
- **Badges**: Essential status indicators only

## Maintenance Rules

### Regular Updates
- Remove outdated information immediately
- Update badges and links when they change
- Keep installation instructions current
- Verify all code examples work

### Link Management
- Avoid linking to non-existent pages
- Use relative links for internal documentation
- Check external links periodically
- Provide fallbacks for broken links

### Version Control
- Update README with major feature changes
- Document breaking changes prominently
- Keep changelog separate from README
- Use semantic versioning for releases

## Doc Sync Hook Guidelines

When the Doc Sync hook runs, follow these practices:

### Automated Checks
- Verify all links are working
- Ensure code examples are current
- Check badge accuracy
- Validate markdown formatting

### Content Review
- Remove redundant information
- Consolidate duplicate sections
- Move detailed content to appropriate locations
- Update outdated screenshots or examples

### Quality Assurance
- Ensure README is under 200 lines
- Verify quick start instructions work
- Check that essential information is present
- Confirm links point to existing resources

## Examples of Good vs Bad README Sections

### ❌ Bad: Overly Detailed Tech Stack
```markdown
## Tech Stack
| Category | Technology | Version | Purpose | Documentation |
|----------|------------|---------|---------|---------------|
| Framework | Next.js | 15.0.1 | Full-stack React framework | https://nextjs.org/docs |
| Language | TypeScript | 5.2.2 | Type-safe development | https://typescriptlang.org |
[... 20 more rows]
```

### ✅ Good: Concise Tech Stack
```markdown
## Tech Stack
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel
```

### ❌ Bad: Extensive Configuration
```markdown
## Configuration
[500 lines of detailed configuration examples and schemas]
```

### ✅ Good: Basic Configuration
```markdown
## Configuration
Edit `config/portfolio.ts` to customize content:
```typescript
export const portfolioConfig = {
  personal: { name: "Your Name", email: "you@example.com" }
}
```
See [Configuration Guide](docs/configuration.md) for complete options.
```

## Wiki Integration Workflow

### When to Create Wiki Pages
- Documentation exceeds 50 lines
- Complex configuration requires examples
- Architecture needs detailed explanation
- Troubleshooting guides become extensive
- API documentation is needed

### Wiki Page Templates

#### Architecture.md Template
```markdown
# Architecture Guide

## Overview
Brief system overview

## Components
Detailed component breakdown

## Data Flow
How data moves through the system

## Configuration
Advanced configuration options

## Troubleshooting
Common issues and solutions
```

#### Configuration.md Template
```markdown
# Configuration Guide

## Quick Start
Basic configuration for getting started

## Advanced Options
Detailed configuration parameters

## Environment Variables
All available environment settings

## Examples
Real-world configuration examples

## Validation
Schema validation and error handling
```

### Linking Strategy
- **README to Wiki**: Use `[Architecture Guide](../../wiki/Architecture)` format
- **Wiki to Wiki**: Use `[[Configuration]]` internal linking
- **Wiki to Code**: Link to specific files with line numbers when helpful

## Implementation Notes

- Apply these guidelines to all project documentation
- Use this as a checklist when reviewing README changes
- Prioritize user experience over comprehensive documentation
- Remember: README is marketing, docs are reference
- Create wiki pages locally using the GitHub CLI or git commands
- Maintain wiki content alongside code changes
</text>
</invoke>
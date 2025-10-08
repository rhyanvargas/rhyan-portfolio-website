---
inclusion: always
---

# Documentation Best Practices

## README Guidelines

Follow GitHub's official best practices for project documentation to keep READMEs concise and maintainable.

**References:**
- [About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
- [About Wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis)
- [Adding or editing wiki pages locally](https://docs.github.com/en/communities/documenting-your-project-with-wikis/adding-or-editing-wiki-pages#adding-or-editing-wiki-pages-locally)

## Core Principles

### README Purpose (GitHub Official Guidelines)
- **First impression**: Often the first thing visitors see
- **Project overview**: What the project does and why it's useful
- **Getting started**: How to install, configure, and use
- **Contribution guide**: How others can help
- **Contact info**: How to reach maintainers

### Keep It Slim Strategy
- **Essential only**: Include what users need to get started quickly
- **Link to details**: Use wikis, docs folders, or separate files for extensive documentation
- **User-focused**: Prioritize what newcomers need most
- **Scannable**: Use headers, bullets, and visual breaks

## Required README Structure

### 1. Project Title & Description
```markdown
# Project Name
Brief, clear description of what the project does and its value proposition.
```

### 2. Badges (Maximum 6-8)
- Build status
- Version
- License
- Main technology
- Live demo link
- Coverage (if applicable)

### 3. Quick Start Section
```markdown
## Quick Start
# Essential installation and basic usage only
# Link to detailed setup guides
```

### 4. Key Features (4-6 bullets max)
- Focus on unique selling points
- What makes this project special
- Core functionality overview

### 5. Basic Usage
- Minimal working example
- Most common use case
- Link to comprehensive documentation

### 6. Contributing
- Link to CONTRIBUTING.md or wiki
- Basic contribution workflow
- Code of conduct reference

### 7. License & Contact
- License type and link
- Author/maintainer contact
- Support channels

## What NOT to Include in README

❌ **Move These to Wiki/Docs:**
- Extensive API documentation
- Detailed architecture explanations
- Complete configuration schemas
- Long troubleshooting guides
- Comprehensive feature lists
- Performance benchmarks
- Detailed deployment instructions
- Change logs (use CHANGELOG.md)
- Extensive code examples

## GitHub Wiki Integration

### When to Use Wikis vs Docs Folder

**Use Wiki for:**
- Community-editable documentation
- Extensive guides and tutorials
- Architecture deep-dives
- Troubleshooting knowledge base
- FAQ sections
- User-contributed content

**Use Docs Folder for:**
- API reference documentation
- Technical specifications
- Contributor guidelines
- Code-adjacent documentation
- Version-controlled docs

### Wiki Setup and Management

#### Local Wiki Editing
```bash
# Clone wiki repository (separate from main repo)
git clone https://github.com/username/repository.wiki.git

# Create wiki pages locally
cd repository.wiki
echo "# Architecture Guide" > Architecture.md
git add Architecture.md
git commit -m "Add architecture documentation"
git push origin master
```

#### Wiki Page Organization
```
Home.md                    # Wiki landing page with navigation
├── Architecture.md        # System design and structure
├── Configuration.md       # Detailed setup and config
├── Deployment.md         # Production deployment guide
├── Development.md        # Developer workflow and setup
├── API-Reference.md      # Complete API documentation
├── Troubleshooting.md    # Common issues and solutions
└── FAQ.md               # Frequently asked questions
```

### Wiki Best Practices

#### File Naming
- Use PascalCase: `Architecture.md`, `Configuration.md`
- Descriptive names: `API-Reference.md` not `API.md`
- Consistent naming pattern across all pages

#### Content Structure
- Start with overview/table of contents
- Use clear headings and subheadings
- Include cross-references with `[[Page Name]]`
- Add "Last updated" dates for maintenance

#### Navigation
- Create comprehensive Home.md with links to all pages
- Use sidebar navigation in wiki settings
- Cross-link related pages
- Include "Back to README" links

## Documentation Hierarchy

```
README.md                  # Essential info only (< 150 lines)
├── CONTRIBUTING.md        # Contribution guidelines
├── CHANGELOG.md          # Version history
├── LICENSE               # License file
├── docs/                 # Technical documentation
│   ├── api.md           # API reference
│   ├── setup.md         # Detailed setup
│   └── examples/        # Code examples
└── wiki/                 # GitHub wiki (cloned separately)
    ├── Home.md          # Wiki navigation
    ├── Architecture.md   # System design
    ├── Configuration.md  # Advanced config
    └── Deployment.md    # Production guide
```

## Content Guidelines

### Writing Style
- **Concise**: Use bullet points and short paragraphs
- **Scannable**: Headers, tables, and visual breaks
- **Actionable**: Focus on what users can do
- **Current**: Keep information up-to-date
- **Accessible**: Clear language, avoid jargon

### Code Examples in README
- **Minimal**: Show only essential code
- **Working**: Ensure all examples actually work
- **Complete**: Include necessary imports/setup
- **Commented**: Explain non-obvious parts

### Visual Elements
- **Screenshots**: Use sparingly, keep current
- **Diagrams**: Simple overviews only
- **Tables**: For commands or quick comparisons
- **Badges**: Essential status indicators only

## Doc Sync Hook Guidelines

### Automated Quality Checks
- **Length check**: Ensure README stays under 150 lines
- **Link validation**: Verify all links work
- **Code validation**: Test code examples
- **Badge accuracy**: Check status badges are current
- **Markdown formatting**: Validate syntax

### Content Review Process
1. **Identify bloat**: Find sections exceeding guidelines
2. **Extract details**: Move extensive content to wiki/docs
3. **Create links**: Replace detailed sections with links
4. **Update navigation**: Ensure wiki/docs are discoverable
5. **Verify flow**: Test user journey from README to details

### Migration Strategy
```markdown
# Before (Bloated README)
## Configuration
[200 lines of detailed config examples]

# After (Slim README)
## Configuration
Basic setup in `config/portfolio.ts`:
```typescript
export const config = { name: "Your Name" }
```
See [Configuration Guide](../../wiki/Configuration) for all options.
```

## Quality Assurance Checklist

### README Review
- [ ] Under 150 lines total
- [ ] Quick start works in < 5 minutes
- [ ] Essential information only
- [ ] All links point to existing resources
- [ ] Code examples are tested and work
- [ ] Badges are current and relevant
- [ ] Contact information is up-to-date

### Wiki/Docs Review
- [ ] Detailed information has proper home
- [ ] Navigation between pages works
- [ ] Content is organized logically
- [ ] Cross-references are accurate
- [ ] Last updated dates are current

## Examples

### ✅ Good README Structure
```markdown
# Project Name
Brief description and value proposition.

## Quick Start
```bash
npm install && npm start
```

## Features
- Key feature 1
- Key feature 2
- Key feature 3

## Documentation
- [Architecture Guide](../../wiki/Architecture)
- [API Reference](docs/api.md)
- [Contributing](CONTRIBUTING.md)

## License
MIT - see [LICENSE](LICENSE)
```

### ❌ Bad README (Too Detailed)
```markdown
# Project Name
[Long project history and background]

## Complete API Documentation
[500 lines of API details]

## Every Configuration Option
[300 lines of config examples]

## Troubleshooting Everything
[200 lines of troubleshooting]
```

## Implementation Notes

- Apply these guidelines to all project documentation
- Use as checklist when reviewing README changes
- Prioritize user experience over comprehensive documentation
- Remember: README is marketing, wiki/docs are reference
- Maintain wiki content alongside code changes
- Regular audits to prevent README bloat

# Prisma

Read only when the detected stack is Prisma.

Implicit many-to-many. Unique `slug` and `name`. Map logical camelCase names to the repo's existing Prisma style if it already uses snake_case via `@map`.

```prisma
enum TechCategory {
  frontend
  backend
  database
  devops
  design
  other
}

enum SkillDomain {
  architecture
  performance
  security
  methodology
  product
  other
}

model Project {
  id           String       @id @default(cuid())
  title        String
  slug         String       @unique
  summary      String
  content      String?
  liveUrl      String?
  repoUrl      String?
  technologies Technology[]
  skills       Skill[]
}

model Technology {
  id         String       @id @default(cuid())
  name       String       @unique
  slug       String       @unique
  category   TechCategory
  icon       String?
  isFeatured Boolean      @default(false)
  projects   Project[]
}

model Skill {
  id          String      @id @default(cuid())
  name        String      @unique
  slug        String      @unique
  domain      SkillDomain
  description String?
  projects    Project[]
}
```

Add a join model between `Skill` and `Technology` only when the UI groups tools under one competency. Keep unrelated columns already on `Project`.

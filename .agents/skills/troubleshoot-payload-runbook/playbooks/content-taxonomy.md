# Playbook: content-taxonomy

## Symptoms

- `/admin` Skills shows only 1–2 rows (e.g. Accessibility, ScriptableObject Architecture)
- Skills look like role buckets (“Frontend Development”)
- Projects missing Skills / Technologies relations
- Tech badges and skills mixed in one list

## Contract (do not violate)

From `portfolio-cms-schema`:

- **Technologies** = installable tools (React, Postgres, Docker)
- **Skills** = methods/capabilities (Accessibility, CI/CD Automation, AI Application Engineering)
- Projects relate to both; never store both in one free-text `tech` array

## Fix

1. Ensure catalog exists: `lib/portfolio-skills-catalog.ts` + `PROJECT_SKILL_SLUGS`.
2. Local (SQLite only):
   ```bash
   # POSTGRES_URL must be unset
   pnpm exec tsx scripts/seed-projects-from-portfolio.ts
   ```
3. Hosted Neon: ship/register migration that upserts catalog skills and project_rels (see `migrations/20261119_050000_portfolio_skills_catalog.ts` pattern — SQL-only, idempotent).
4. Confirm classifier (`lib/portfolio-cms-classification.ts`) does not put tools into skills.

## Verify

- Skills count matches catalog (~16+)
- Sample project in admin shows Technologies + Skills populated
- No skill named like a role bucket

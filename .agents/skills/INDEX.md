# Skills index (flat packages, categorized for humans)

Folders stay **flat** under `.agents/skills/<name>/` so `skills-lock.json` and `.kiro/skills` symlinks stay stable. Categories below are for discovery only.

## Workflow / delivery (ADSK + engineering)

| Skill | Use when |
|-------|----------|
| `cicd-deployment` | This repo’s feat→dev→main PRs, Vercel deploy, promote to prod |
| `troubleshoot-payload-runbook` | Recover from runbook mis-steps: wrong branch, Neon migrate fail, live-db leak, skills taxonomy |
| `developer-runbook` | Author/regenerate `docs/developer-runbook.md` (ask before writing) |
| `spec-driven-workflow` | Specs, `/draft-spec`, `/plan-impl`, `/implement-spec`, `/review` |
| `solution-architecture` | C4 / architecture packets, ADRs |
| `writing-plans` | Multi-step implementation plans before coding |
| `systematic-debugging` | Bugs / unexpected failures — root cause first |
| `test-driven-development` | Feature/bugfix before implementation |
| `release-automation` | Conventional Commits, changelogs, release please |
| `devops-strategy-facilitator` | Redesign branching / CI-CD strategy (not day-to-day operate) |

## Product / discovery (optional packs)

| Skill | Use when |
|-------|----------|
| `inspired-product` | Empowered teams, dual-track discovery |
| `continuous-discovery` | Weekly customer cadence, opportunity trees |
| `mom-test` | Non-leading customer interviews |
| `jobs-to-be-done` | Jobs / switching / churn framing |
| `competitive-intelligence` | Competitor battlecards / win-loss |
| `prioritization-advisor` | RICE / ICE / value-effort choice |
| `product-strategy-session` | End-to-end strategy workshop |
| `roadmap-planning` | Sequencing epics into a roadmap |

## Gaps / sync notes

| Gap | Action |
|-----|--------|
| `skill-optimizer` referenced by `/optimize-skill` | Missing in adopter tree — `/sync-adsk` from kit or remove command until present |
| Nested category folders | Optional later; not required for Cursor discovery |

## Refresh

```bash
# Prefer ADSK adopter update when kit moves
npx create-adsk update
# or
<path-to-adsk>/scripts/sync-adsk.sh adopter --from <kit>
```

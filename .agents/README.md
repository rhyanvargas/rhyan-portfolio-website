# Agent configuration (canonical)

Project Agent Skills live here per the [Agent Skills](https://cursor.com/docs/skills) / [agentskills.io](https://agentskills.io) standard.

## Layout

```text
.agents/
├── README.md                 # this file
├── backlog/                  # product backlog captured from reviews / planning
└── skills/                   # canonical skill packages (SKILL.md each)
    └── INDEX.md              # category map (folders stay flat for skills-lock)
```

## Discovery wiring (do not duplicate skill trees)

| Path | Role |
|------|------|
| `.agents/skills/<name>/` | **Source of truth** — edit skills here |
| `.cursor/skills` → `.agents/skills` | Cursor project discovery (symlink) |
| `.kiro/skills/<name>` → `.agents/skills/<name>` | Kiro / ADSK compatibility (per-skill symlinks) |
| `skills-lock.json` (repo root) | Locked install hashes from `npx skills` / ADSK sync |

Commands and always-on rules stay under `.cursor/` (Cursor-native):

- `.cursor/commands/` — `/` slash commands (thin wrappers → `.agents/skills/...`)
- `.cursor/rules/` — verify/testing and other always-apply rules

Cursor does **not** yet load `.agents/rules` (skills-only under `.agents` today). Keep rules in `.cursor/rules`.

## Skills vs plugins

| Kind | Where | Purpose |
|------|-------|---------|
| **Project skills** | `.agents/skills/` | Portable playbooks versioned with this repo |
| **Cursor / Agent Plugins** | Marketplace / `~/.cursor/plugins` | Bundle skills + MCP + rules + commands; install via Customize |
| **Personal skills** | `~/.cursor/skills/` or `~/.agents/skills/` | Machine-local; sync separately for Cloud Agents |

Do **not** copy marketplace plugin skills into this repo. Prefer installing the plugin (Vercel, AWS, Asana, etc.) and keep only **product/workflow** skills that are specific to this portfolio codebase.

## Standards checklist

- Each skill: folder name = frontmatter `name`; non-empty `description` (what + when).
- Progressive disclosure: lean `SKILL.md`; put depth in `references/`.
- After adding/removing first-party ADSK skills: `/sync-adsk` (or `npx create-adsk update`), not hand-copied trees.
- Broken command refs (e.g. `/optimize-skill` → missing `skill-optimizer`): sync from ADSK or drop the command until the skill exists.

## Specs & plans (not under `.agents`)

| Artifact | Home |
|----------|------|
| Living Payload spec | `.cursor/docs/specs/payload-cms.md` |
| Implementation plan | `.cursor/plans/payload-cms.plan.md` |
| Legacy / feature specs | `.kiro/specs/` (status notes in `backlog/`) |
| Architecture ADRs | `docs/architecture/adrs/` |

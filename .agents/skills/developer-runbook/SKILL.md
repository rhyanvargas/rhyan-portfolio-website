---
name: developer-runbook
description: >-
  Create a project-specific developer runbook for local testing, preview, and
  production. Use when the user asks for a developer runbook, delivery workflow,
  local vs preview vs production docs, or how to test without touching live
  data. Inspect the repo, then ask confirming questions and wait for answers
  before writing the runbook.
---

# Developer runbook

Write a runbook for the current project. Do not reuse another project's branch names, databases, or deploy targets.

## Stop before the final file

1. Inspect the repo. Read the README, existing docs, env examples, package scripts, CI config, and deploy config (`vercel.json`, `netlify.toml`, Dockerfile, or the host the repo actually uses).
2. Record only what those files show: integration branch, production branch, local datastore, preview datastore, production datastore, whether preview and production share data, quality gate command, and the README path.
3. Ask the user to confirm or correct that model. Use the AskQuestion tool when it is available. Include one free-text question for anything else this project's runbook must cover.
4. Do not create or edit the runbook in the same turn as those questions. Wait for the answers.
5. Write the runbook only from confirmed facts. If two sources disagree, ask which one is true. Do not invent a branching model or a database.

## Questions to ask

Ask these after inspection. Pre-fill each option with the value you found, and always include a correction option.

- Which branch is integration, and which branch deploys production?
- What does local development use for data, and is that data disposable?
- What do preview and production use for data? Do they share one database and the same rows?
- Which commands or env vars would make a laptop or a preview write to live data?
- Where should the file live? Default: `docs/developer-runbook.md`, linked from the project README and from `docs/README.md` when that index exists.
- What else must this runbook cover? Free text. Skip nothing the user names here.

## Write the runbook

Follow [template.md](template.md). Title it for this project, not with a generic label.

Required sections, in this order:

1. Environment table: where it runs, which branch, which database, whether throwaway data is safe.
2. Scenario flowchart: kind of change, local check, preview, and production promotion.
3. One section per confirmed scenario, with the commands that repo actually uses.
4. Decision diagram for actions that would hit live data, plus a "do this instead" table.
5. Branch and deploy map.
6. Links to the setup or deploy docs that already exist. Do not duplicate them.

Then add a link from the project README. If `docs/README.md` exists, add a link there too.

Keep the prose specific. Name the real branches, env vars, and datastores. State explicitly when preview and production share data.

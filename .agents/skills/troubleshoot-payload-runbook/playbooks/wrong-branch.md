# Playbook: wrong-branch

## Symptoms

- `git status` shows `dev` ahead of `origin/dev` with feature commits
- Feature PR opened with `--base main`
- Schema work committed directly on `dev`

## Fix (agent)

1. Confirm commits to keep: `git log origin/dev..HEAD --oneline`
2. Create feature branch at current HEAD if missing:
   ```bash
   git branch feat/<short-name>
   ```
3. Move `dev` back to remote (only local `dev`, and only after the feature branch has the commits):
   ```bash
   git checkout dev
   git reset --hard origin/dev
   git checkout feat/<short-name>
   ```
4. Push feature branch: `git push -u origin HEAD`
5. Ensure PR uses `--base dev` (`gh pr create` or `gh pr edit --base dev`)

## Verify

- `git branch --show-current` is `feat/...`
- `dev` matches `origin/dev`
- PR base is `dev`

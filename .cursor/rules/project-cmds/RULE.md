# Project verify commands

Use these before claiming implementation done (fail-closed).

## Package manager

`pnpm` (lockfile: `pnpm-lock.yaml`)

## Verify

```bash
pnpm verify
```

Equivalent steps:

```bash
pnpm test
pnpm typecheck
pnpm build
```

Note: `pnpm lint` currently reports pre-existing errors outside the filtering feature; do not treat those as a filter-system regression unless newly introduced.

## Test only

```bash
pnpm test
```

## Dev

```bash
pnpm dev
```

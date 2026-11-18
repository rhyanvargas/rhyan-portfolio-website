# Developer Runbook: <project-specific subtitle>

One sentence: how to test on a machine, preview, and ship without using the live database as a sandbox.

## Where each environment writes

| Environment | Git branch | App | Database | Safe for throwaway data? |
|---|---|---|---|---|
| Local | <branches> | <command and URL> | <datastore> | Yes or No |
| Preview | <branches> | <host> | <datastore> | Yes or No |
| Production | <branch> | <URL> | <datastore> | No |

State in one sentence after the table whether preview and production share a database.

## Scenario paths

```mermaid
flowchart TD
  start["Start a change"] --> kind{"What are you changing?"}
  kind -->|"<scenario>"| local["<local action>"]
  local --> verify["<quality gate>"]
  verify --> integrate["<PR into integration branch>"]
  integrate --> preview["<open preview>"]
  preview --> writes{"Does this write live data?"}
  writes -->|"No"| check["Confirm the change"]
  writes -->|"Yes"| caution["<what live system it touches>"]
  check --> release{"Release ready?"}
  caution --> release
  release -->|"Not yet"| stay["Leave it on <integration branch>"]
  release -->|"Yes"| promote["<PR into production branch>"]
  promote --> prod["Production deploy"]
```

Replace every placeholder with a confirmed path. Add a branch for each scenario the user confirmed. Delete any path that does not exist in this project.

### <Scenario name>

Numbered steps using this repo's commands. Include the local data reset and the pull-request base branch.

## Accidental live-data paths

```mermaid
flowchart TD
  risk["<action that can reach the live database>"] --> check{"<condition>"}
  check -->|"Safe"| safe["<where writes go>"]
  check -->|"Live"| stop["Stop"]
  stop --> instead["<safe alternative>"]
```

| You were about to… | Do this instead |
|---|---|
| <risky action> | <safe action> |

## Branch and deploy map

```mermaid
flowchart LR
  work["<feature branch>"] -->|"PR"| integration["<integration branch>"]
  integration -->|"preview"| data["<preview datastore>"]
  integration -->|"PR when release-ready"| production["<production branch>"]
  production -->|"production deploy"| proddata["<production datastore>"]
  laptop["localhost"] --> localdata["<local datastore>"]
```

Use one node when preview and production are the same database. Label that node with both environments.

## Related

- Link existing setup and deploy docs. Do not copy them.

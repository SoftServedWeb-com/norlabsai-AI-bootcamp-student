# Conventions

**Scope**: this file governs the Evening Bootcamp Series (Bootcamps 1–6) only — the new
six-bootcamp evening series for working professionals. It does not govern the
pre-existing 24-week Agentic AI Developer Program (`Instructor Guide/`, the root course
outline files, `Certifications/`), which predates this series, is a different product,
and is out of scope for this file.

Every volatile fact in the Evening Bootcamp Series lives here. No other file this series
owns inlines a model ID, SDK version, price, or exam ID. If it moves, it moves once —
here. **Exception**: runnable lab source (a `.ts` file a student actually executes) must
name a real value to run at all — that's not a leak, it's the thing this file's own
`Verify Before Each Cohort` checklist exists to keep current. The "no other file" rule
above is about prose and documents quoting or describing a value, not about the lab code
itself.

## Runtime & Tooling
| Thing | Value |
|---|---|
| Node | 22+ |
| Package manager | pnpm |
| TS runner | tsx |
| Module system | `"type": "module"` in package.json |
| Editor | VS Code |

## Models
| Tier | Model ID | Used for |
|---|---|---|
| Fast | gpt-5-nano | High-volume, low-stakes calls |
| Default | gpt-5-mini | Every lab unless stated otherwise |
| Frontier | gpt-5 | Quality comparisons in Week 3 |

## SDKs & Libraries
| Purpose | Package | Pinned version |
|---|---|---|
| LLM calls | openai | 7.9.0 |
| Schema validation | zod | 4.5.4 |
| Test runner (qualifier) | vitest | 4.1.11 |
| Language | typescript | 7.0.2 |
| Node types | @types/node | 26.4.1 |
| TS runner | tsx | 4.23.13 |

The LLM SDK (`openai`) reads its key from the `OPENAI_API_KEY` environment variable, set
in `.env` — see [Secrets](#secrets).

All six pins above were resolved live against the npm registry (run `npm view` against
each package in the table above, e.g. `npm view openai version`) on the day this file
was written — none are guesses. Re-run the same check before each cohort; see
[Verify Before Each Cohort](#verify-before-each-cohort).

## Project Skeleton
Every lab starts from this `package.json`, `tsconfig.json` and `.gitignore`. Copy these
three files into a lab's working directory before writing any lab code.

`package.json`:
```json
{
  "name": "bootcamp-lab",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "tsx --env-file=.env src/index.ts",
    "dev": "tsx watch --env-file=.env src/index.ts",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "engines": {
    "node": ">=22"
  },
  "dependencies": {
    "openai": "7.9.0",
    "zod": "4.5.4"
  },
  "devDependencies": {
    "@types/node": "26.4.1",
    "tsx": "4.23.13",
    "typescript": "7.0.2",
    "vitest": "4.1.11"
  }
}
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "types": ["node"],
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["src/**/*.ts"]
}
```
`"types": ["node"]` is load-bearing, not redundant — do not remove it. Under the pinned
TypeScript version, automatic `@types` discovery does not resolve through pnpm's
symlinked `node_modules` layout, so without this line `tsc` fails on any file that
references a Node global (`console`, `process`, ...) with `TS2584: Cannot find name`.
Declaring `"node"` here makes the types available explicitly instead of relying on
discovery that doesn't work under this toolchain.

`.gitignore`:
```gitignore
node_modules/
.env
dist/
*.log
.DS_Store
```

## Secrets
`.env` for keys, `.gitignore` before the first commit, `--env-file=.env` on every run script.
Never a key in source. Never a key in a screenshot.

## Verify Before Each Cohort
- [ ] Every model ID above still resolves against the provider
- [ ] **If a model ID changed, propagate it into the lab source.** The Models table is
      not the only place a model ID lives — runnable lab source is the documented
      exception above, and Bootcamp 1's labs name one in nine places. Find them all with
      `grep -rn "gpt-5" --include=*.ts "Bootcamp 1 - Foundations/labs"` (adjust the
      pattern to whatever the current IDs are) and change the table and every hit
      together, in one commit. Note `labs/w3-shippable/src/run.ts`'s `MODEL` constant,
      which mirrors the value inside `classify.ts` for its log line rather than
      importing it — it is the one easiest to miss.
- [ ] **Node's LTS status re-checked.** The Runtime & Tooling table pins a minimum major
      version; confirm it is still supported and still the version a student following
      B0 would actually install, and raise it if the pinned major has left LTS
- [ ] Pinned SDK versions still install (`npm view openai version`, `npm view zod version`, `npm view vitest version`, `npm view typescript version`, `npm view @types/node version`, `npm view tsx version` — update the table and the Project Skeleton `package.json` together)
- [ ] Every lab runs on a clean machine (fresh `pnpm install` from the skeleton above, no cached global state)
- [ ] Pricing figures used in Week 3 still current
- [ ] **The student repository republished.** Any change above touches student-facing
      material, and the student repo is generated — it does not update itself. Run
      `bash "Evening Bootcamp Series/scripts/publish-student-repo.sh"` and confirm the
      commit it creates names the current curriculum commit. A cohort working from a
      stale mirror is the failure this checklist item exists to prevent.
- [ ] **Every enrolled student's GitHub invitation accepted**, not merely sent. The
      student repository is private and B0's first step is cloning it, so an unaccepted
      invite blocks a student at the very start of their pre-work.

# B0 — Environment & Git

**About an hour.** This is the only bridge module Bootcamp 1 requires — if you're
entering there, this is your whole pre-work. If you're entering at a later bootcamp,
you still start here; the later modules build directly on what you set up in this one.

## What this establishes

By the end of this module you'll have Node and pnpm installed and verified, the project
skeleton you'll reuse for every lab in this series sitting in a folder on your machine,
a GitHub account with your first repository pushed to it, and — in place *before* any of
that gets committed — the `.env` / `.gitignore` habit that keeps API keys out of your
public history for good.

## Before you start

You'll need:

- **A GitHub account.** Free, two minutes, create it now if you don't have one.
- **An LLM provider account, with billing enabled.**
  [CONVENTIONS.md's SDKs & Libraries section](<../../CONVENTIONS.md#sdks--libraries>)
  names the SDK this series is built on — create your account with that same provider,
  then add a payment method and confirm the account is funded. An account created but
  never funded fails at the first real call in exactly the same way a missing account
  does, so do both halves now rather than only the sign-up half.
- **A terminal, and about an hour without interruption.**

**On the timing of that provider account.** Nothing in B0 itself calls the API. If
you're entering the series at a later bootcamp, the first module that spends anything is
B2, so you have room to set the account up whenever suits you before then. **If you're
entering at Bootcamp 1, you don't have that room**: B0 is your entire pre-work, and
Week 1's **Evening 2** — roughly twenty-four hours after Evening 1 — is where you make
your first live call from your own machine and need a working, funded key in hand. Card
declines, verification emails and provider-side review can all take longer than a day.
Set it up while you're working through B0, not the evening you need it.

## 1. Install the runtime

If you don't have Node yet, get it from the official source — the Node.js project's own
site at <https://nodejs.org>, choosing the LTS (long-term support) download for your
operating system. Take it from there rather than from a blog post or a bundled installer;
the official site is the one place that is always current. If you'd rather manage several
Node versions side by side, install a version manager instead — `nvm` on macOS and Linux,
`nvm-windows` or `fnm` on Windows — and let it install Node for you.

Then confirm it:

```bash
node --version
```

Check [CONVENTIONS.md](<../../CONVENTIONS.md#runtime--tooling>) for the minimum version
this series requires. If your version is older, install a newer one — a version manager
such as nvm or fnm is the easiest way, without disturbing other projects on an older Node.

Then install the package manager this series standardises on (check
[CONVENTIONS.md](<../../CONVENTIONS.md#runtime--tooling>) — it is not npm or yarn):

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm --version
```

Finally, install VS Code if you don't already have it, and open it once so you know
where things are. B0 doesn't need any extensions beyond what VS Code ships with —
TypeScript support is built in.

## 2. Your first project

Create a folder for this series' work and initialise it:

```bash
mkdir bridge-b0 && cd bridge-b0
pnpm init
```

Now open [CONVENTIONS.md's Project Skeleton section](<../../CONVENTIONS.md#project-skeleton>)
and replace what `pnpm init` generated with the `package.json` and `tsconfig.json` shown
there. Every lab in this series starts from that same skeleton. Then install:

```bash
pnpm install
```

Leave `.gitignore` out for now — that's step 4, deliberately, not this one.

## 3. Git and GitHub

On GitHub's website, create a new, empty repository — no README, no license, nothing
auto-generated; you'll push your own. Then, back in your terminal:

```bash
git init
git remote add origin <the URL GitHub just gave you>
```

**Stop here.** Do not run `git add` or `git commit` yet. Go to step 4 first — this
ordering is deliberate, not a formality.

## 4. Secrets, before anything else

Worth saying out loud once: your API key is a password. If it ends up on GitHub, it is
public forever — deleting it in a later commit doesn't remove it from your repository's
history, and bots scan public repos for exactly this pattern within minutes of a push.
A leaked key means someone else spends money on your account until you revoke it.

So, before your first commit exists, not after:

**Create `.env`** in your project root:

```
OPENAI_API_KEY=your-key-here
```

(This is the exact variable name this series' SDK expects — see
[CONVENTIONS.md's SDKs & Libraries section](<../../CONVENTIONS.md#sdks--libraries>).)

**Create `.gitignore`** — copy it from
[CONVENTIONS.md's Project Skeleton section](<../../CONVENTIONS.md#project-skeleton>),
which already excludes `.env`. Don't just trust it — confirm it's actually working:

```bash
git check-ignore -v .env
```

If that prints a line naming `.env` and your `.gitignore`, you're covered. If it prints
nothing, `.env` is not ignored — stop and fix that before continuing.

**Now, and only now**, make your first commit and push:

```bash
git add .
git commit -m "Initial commit: project skeleton"
git push -u origin main
```

Go check the repository on GitHub's website afterward. Confirm `.env` genuinely isn't
there. If it is, revoke that key immediately and treat it as a fire drill, not a
formality — this is the one habit in B0 that costs real money if you skip it.

## 5. Get the course materials

Everything this series hands you — the qualifier you're about to do, all six of
Bootcamp 1's labs, the reading — lives in one curriculum repository. **Your enrolment
email has its clone URL.** Clone it now, somewhere sensible and permanent: run
`git clone` followed by that URL, exactly as it was sent to you.

If you can't find the email, ask your facilitator for the link before you go any
further — nothing after this point works without it. This is the only copy of the
materials; there is no zip, and there is no per-lab download. Keep the clone: every
week's labs come out of the same folder.

Windows students, one practical note: clone somewhere short, like `C:\dev\`. A corporate
OneDrive path several folders deep can push the full path past what some tooling handles,
and the failures that produces look nothing like path-length errors.

## 6. The qualifier

Inside the repository you just cloned, open
[`Bridge Library/B0 - Environment & Git/qualifier/`](<qualifier/>). It's a small,
currently-failing test suite. Get it running, read what the tests expect, and make them
pass — that's the whole exercise, and it doesn't require anything beyond what you just
set up in steps 1–5. Its own [README](<qualifier/README.md>) has the exact commands.

When the tests pass, push that work to your own GitHub repository — your own, not the
curriculum repository, which you only ever read from — and submit the link. This is due
**before Evening 1** of Bootcamp 1 — a hard deadline, the same one every entrant works to
regardless of where they're entering the series.

## If you get stuck

- **`git check-ignore -v .env` prints nothing.** Your `.gitignore` isn't in the project
  root, or it doesn't actually list `.env`. Re-copy it from CONVENTIONS.md's skeleton and
  re-run the check before doing anything else — don't proceed on faith here.
- **`node --version` reports an older version than CONVENTIONS.md requires, or a
  newly-installed Node doesn't seem to take effect.** You likely have more than one Node
  install competing on your `PATH`. Install a version manager (nvm or fnm) and use it to
  select the right version explicitly, rather than relying on whichever one your shell
  finds first.
- **`Cannot use import statement outside a module` or a similar error when you try to
  run anything.** Your `package.json` is missing `"type": "module"`. Compare it against
  the skeleton in CONVENTIONS.md exactly — a manual retype of that file is the easiest
  place to drop a line by accident.

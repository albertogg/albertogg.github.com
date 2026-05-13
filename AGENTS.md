# AGENTS.md

## Scope
- Applies to this repository.

## Stack
- Hugo static site.
- Default language: English (`/`)
- Spanish translations under `/es/`

## Commands
- Build: `hugo --gc --minify`
- Dev server: `hugo server --buildDrafts`
- CI should run the same build command.

## Workflow
- Make small, focused commits using Conventional Commits.
- Do not commit unrelated local files (e.g. `settings.json`, temp/test files).
- Validate build before committing.
- Deployment: Cloudflare Pages via GitHub connection.
- CI: GitHub Actions for checks only (do not deploy from Actions).

## i18n rules
- Keep English URLs stable.
- Spanish content uses `.es.md` sibling files.
- Use shared `translationKey` between translated posts.
- Keep UI strings in `i18n/en.yaml` and `i18n/es.yaml`.
- Include `hreflang` links for translated pages.

## UI testing
- Use `agent-browser` for visual checks before PR:
  - home (`/`), spanish home (`/es/`)
  - translated + untranslated posts
  - header/nav, language switcher, RSS links

## Generated output
- `public/` is build output; do not hand-edit generated files.

# Deployment and QA

This document tracks Phase 5 deployment readiness for GitHub Pages.

## GitHub Pages Workflow

The repository includes `.github/workflows/deploy.yml`.

The workflow:

- runs on pushes to `main` and manual dispatches
- installs dependencies with `npm ci`
- runs `npm run build`
- runs `npm run audit:deployment`
- uploads `dist/` to GitHub Pages
- deploys through the official GitHub Pages action

For a default project GitHub Pages URL, the workflow automatically builds with:

- `SITE_URL`: `https://OWNER.github.io`
- `BASE_PATH`: `/REPOSITORY_NAME`

Before production or custom-domain deployment, configure repository variables:

- `SITE_URL`: production site origin, for example `https://example.org`
- `BASE_PATH`: `/` for a custom domain or user/organization Pages site; `/repository-name` for a project Pages site without a custom domain

## GitHub Settings

In GitHub, set Pages source to `GitHub Actions`.

If using a custom domain, configure it in GitHub Pages settings after DNS is ready. GitHub will handle HTTPS once DNS resolves correctly.

## DNS Checklist

Custom domain details are still pending.

For an apex domain, GitHub Pages typically requires `A` records pointing to GitHub Pages IPs.

For a `www` subdomain, GitHub Pages typically uses a `CNAME` record pointing to the GitHub Pages hostname.

Confirm the current GitHub Pages DNS documentation before making production DNS changes.

## Preflight Checks

Run:

```sh
PATH=node_modules/node/bin:$PATH npm run build
PATH=node_modules/node/bin:$PATH npm run audit:deployment
```

The deployment audit checks:

- required static routes exist
- common internal links and assets resolve inside `dist/`
- placeholder SEO/domain values are flagged
- mailing-list endpoint appears in the generated homepage

Warnings are allowed during development. Failures should be fixed before deployment.

## Manual QA Checklist

- Homepage loads on desktop and mobile.
- Header navigation works on all pages.
- Mobile navigation opens, closes, and follows links.
- About and Join Mailing List anchors work from non-home pages.
- Guidelines, Events, University Resources, and Articles pages render.
- Article detail page renders and the back link returns to `/articles/`.
- Mailing-list form rejects invalid email.
- Mailing-list form requires consent.
- Mailing-list form successfully writes a real row from the production domain.
- No placeholder copy remains before launch.
- No broken images are visible.
- SEO title, description, canonical URL, and social image are final.
- GitHub Pages build succeeds.
- Pages CMS edits trigger the expected repository update and deployment workflow.

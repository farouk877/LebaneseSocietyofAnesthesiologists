# Lebanese Society of Anesthesiologists Website

Static-first Astro website for the Lebanese Society of Anesthesiologists.

## Phase

Current status: Phase 0 foundation.

This repository contains the Astro/Tailwind site, build-time content schemas, Pages CMS configuration, and a Google Apps Script template for the temporary mailing-list backend. It does not yet contain the production visual design, final LSA copy, or final email-provider integration.

## Requirements

- Node `>=20.19.0`
- npm `>=10.0.0`

The current local shell reports an older system Node/npm, so the project also installs a local Node binary through the `node` dev dependency. In this environment, use:

```sh
PATH=node_modules/node/bin:$PATH npm run build
PATH=node_modules/node/bin:$PATH npm start
```

On a normal workstation or GitHub Actions runner with Node 22, regular npm commands are sufficient:

```sh
npm install
npm run build
npm start
```

## Project Map

- `src/pages/index.astro`: temporary Phase 0 page.
- `src/layouts/BaseLayout.astro`: base HTML layout and metadata.
- `src/styles/global.css`: Tailwind entrypoint and global styles.
- `src/content.config.ts`: Astro content collection schemas for board members and resources.
- `src/data/site.json`: CMS-managed singleton site settings data source.
- `.pages.yml`: Pages CMS configuration for site settings, board members, resources, and uploads.
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow.
- `scripts/deployment-audit.mjs`: static deployment preflight checks.
- `apps-script/`: Google Apps Script template for the temporary mailing-list Google Sheet backend.
- `docs/cms-content-architecture.md`: proposed Pages CMS/content model.
- `docs/deployment-and-qa.md`: GitHub Pages deployment and QA checklist.
- `public/uploads/`: future CMS-managed media uploads.
- `public/images/`: code-controlled static images.

## Proposed CMS Architecture

Routine content should be managed through Pages CMS rather than component code.

- Site settings: `src/data/site.json`
- Board members: `src/content/board/*.md`
- Resources: `src/content/resources/*.md`
- Uploads and media: `public/uploads/`

The `.pages.yml` file was created in Phase 2 after checking the current Pages CMS configuration documentation.

## Mailing List Backend

The temporary mailing-list backend lives in `apps-script/Code.gs`. To create the Google Sheet under a personal Google account, follow `apps-script/README.md`, then paste the deployed Web App URL into `mailingList.endpoint` in `src/data/site.json` or through Pages CMS.

The temporary sheet stores timestamp, email, normalized email, consent, and source. It does not store user agent.

## Deployment

GitHub Pages deployment is prepared through `.github/workflows/deploy.yml`.

For the default project GitHub Pages URL, the workflow automatically builds with `SITE_URL=https://OWNER.github.io` and `BASE_PATH=/REPOSITORY_NAME`.

Before production custom-domain deployment, set these GitHub repository variables:

- `SITE_URL`: the final production origin.
- `BASE_PATH`: `/` for a custom domain, or `/repository-name` for project Pages without a custom domain.

Run the local preflight before publishing:

```sh
PATH=node_modules/node/bin:$PATH npm run build
PATH=node_modules/node/bin:$PATH npm run audit:deployment
```

See `docs/deployment-and-qa.md` for the deployment and QA checklist.

## Phase 0 Verification

Last verified command:

```sh
PATH=node_modules/node/bin:$PATH npm run build
```

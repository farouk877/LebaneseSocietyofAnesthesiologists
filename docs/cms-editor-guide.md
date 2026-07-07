# Pages CMS Editor Guide

This guide describes the Phase 2 editing model. Pages CMS must be connected to the GitHub repository before non-engineers can use it.

## Site Settings

Edit `Site Settings` for normal homepage copy:

- Society name
- Temporary or official logo
- Hero heading, subheading, image, and buttons
- Navigation labels and anchor links
- About/history text and milestones
- Mission, vision, and values cards
- Board and resources section headings
- Mailing-list section copy
- Mailing-list Google Apps Script Web App URL and consent wording
- Contact information
- Footer text
- SEO title, description, canonical URL, and social image

Routine edits to these fields should not require touching `.astro`, TypeScript, Tailwind, or build files.

## Board Members

Use `Board Members` to add or edit leadership cards.

Important fields:

- `Name`: person displayed on the card.
- `Board Role`: role such as President or Treasurer.
- `Professional Title`: optional clinical or academic title.
- `Institution`: optional affiliation.
- `Photo`: optional portrait image.
- `Photo Alt Text`: describe the person in the image.
- `Display Order`: lower numbers appear first.
- `Show on Website`: turn off to hide a member without deleting the record.
- `Short Biography`: optional short profile text.

Photo guidance: use portrait-oriented images, ideally 4:5 aspect ratio and at least 800px wide.

## Resources

Use `Resources` for all four launch categories:

- Guidelines
- LSA Events
- University Resources
- Articles of the Month

Important fields:

- `Resource Category`: choose from the dropdown only.
- `Publication Status`: use `Published` to show the item on the website.
- `Featured`: prepared for Phase 3 behavior.
- `Display Order`: lower numbers appear first; otherwise newer dates sort first.
- `External URL`: for outside links.
- `Downloadable File`: for PDFs or documents uploaded through Pages CMS.

Current behavior: the homepage links to four dedicated pages: Guidelines, Events, University Resources, and Articles.

Guidelines, Events, and University Resources appear only on their category listing pages. Use `External URL` or `Downloadable File` for the public link.

Articles of the Month appear at `/articles/`, with the newest article first, and each article gets its own detail page. To add one, create a new Resource, choose `Articles of the Month`, set `Publication Status` to `Published`, write the article body in the rich-text field, and optionally add `External URL` as the source article link.

## Mailing List

The homepage mailing-list form is configured through `Site Settings`.

Important fields:

- `Google Apps Script Web App URL`: paste the deployed Apps Script Web App URL after the temporary Google Sheet backend is created.
- `Consent Label`: the required checkbox text shown below the email field.
- `Success Message`: shown after a successful submission.
- `Error Message`: shown if the submission fails.
- `Not Connected Message`: shown while the Web App URL is blank.

Current consent text is generic and temporary: `I agree to receive email updates from the Lebanese Society of Anesthesiologists.`

The Google Sheet backend stores timestamp, email, normalized email, consent, and source. It does not store browser user agent.

## Media

Pages CMS uploads are organized into:

- `public/uploads/images`
- `public/uploads/images/board`
- `public/uploads/images/resources`
- `public/uploads/documents`

Files in `public/` are served from the site root. For example, an uploaded board image under `public/uploads/images/board/name.jpg` is referenced as `/uploads/images/board/name.jpg`.

## Validation

Astro validates board and resource content during `npm run build`. Invalid resource categories, missing required titles, malformed dates, or invalid publication statuses should fail the build.

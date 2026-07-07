# Resource Hub Rules

The homepage resource section links to dedicated resource listing pages.

## Categories

Resources use one controlled category field:

- `guidelines`
- `lsa-events`
- `university-resources`
- `article-of-the-month`

Pages CMS exposes these as a dropdown, and Astro validates the values at build time.

## Visibility

Only resources with `status: published` render on public resource pages.

Draft and archived items remain in the repository and CMS but do not appear publicly.

## Ordering

Dedicated listing pages sort resources newest first.

## Dedicated Pages

- `/guidelines/` lists all published guidelines.
- `/events/` lists all published LSA events.
- `/university-resources/` lists all published university resources.
- `/articles/` lists all published Articles of the Month.

The homepage shows four static links to these pages rather than rendering filterable resource cards.

## Dates and Labels

- Events display an `Upcoming` or `Past` label based on the resource date.
- Articles of the Month display month/year.
- University Resources display the source/publisher field, which can be used for institution names.

## Links

Guidelines, Events, and University Resources cards prefer `externalUrl` when present. If no external URL exists, the card uses the uploaded `file` field. If neither is present, the card shows `Link pending`.

External links open in a new tab with `rel="noreferrer"`.

Articles of the Month are the exception: article archive cards link to the internal article detail route at `/articles/[slug]/`. The article detail page can still show `externalUrl` as an optional source link.

## Article Pages

Published resources with `category: article-of-the-month` also render at `/articles/`, sorted newest first. Each article detail page renders the Markdown body from its resource file and includes a back link to `/articles/`.

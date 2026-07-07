# LSA CMS and Content Architecture

This is the Phase 0 proposal for keeping routine site updates editable by non-engineers.

## Content Sources

- `src/data/site.json`: singleton site settings for homepage copy, navigation labels, contact details, footer copy, and SEO defaults.
- `src/content/board/`: one Markdown record per board member.
- `src/content/resources/`: one Markdown record per resource item.
- `public/uploads/images/`: Pages CMS upload target for board photos, resource images, logo replacements, and social sharing images.
- `public/uploads/documents/`: Pages CMS upload target for downloadable resource files.

## Proposed Pages CMS Groups

- Site Settings
- Board Members
- Resources

## Proposed Resource Categories

- `guidelines`
- `lsa-events`
- `university-resources`
- `article-of-the-month`

## Validation Approach

Astro content collections validate board and resource records at build time. The resource category and status fields are controlled enums so a typo cannot silently break filtering.

## Phase 2 Notes

The `.pages.yml` file was added during Phase 2 after checking the current Pages CMS documentation for top-level `media` and `content` syntax, collection/file entries, object-list fields, image fields, rich-text fields, and select options.

## Upload Guidance

- Board photos: use portrait images, ideally 4:5 aspect ratio and at least 800px wide.
- Resource images: use clear editorial or institutional images, ideally 16:9 or 4:3.
- Documents: upload PDFs or office documents only when LSA has permission to publish them.
- Replacement logo: upload the official mark when available, then update Site Settings > Logo.

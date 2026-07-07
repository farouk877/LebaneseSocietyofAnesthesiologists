# Mailing List Google Apps Script

This script creates and writes to a Google Sheet under the Google account that runs `setupMailingListSheet`.

## Setup

1. Go to <https://script.google.com/> while signed in to the personal Google account that should own the temporary sheet.
2. Create a new Apps Script project named `LSA Mailing List`.
3. Paste the contents of `Code.gs` into the default script file.
4. Save the project.
5. Run `setupMailingListSheet` once from the Apps Script editor and approve the requested Google permissions.
6. Open the execution result to copy the generated `spreadsheetUrl`, or open Google Drive and find `LSA Mailing List`.
7. Deploy the script as a Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
8. Copy the Web App URL into `src/data/site.json` at `mailingList.endpoint`, or edit the same field through Pages CMS.

## Data Collected

The sheet stores:

- Timestamp
- Email
- Normalized email
- Consent
- Source

It intentionally does not collect browser user agent.

Duplicate email submissions are treated as successful and do not create a new row.

## Consent

The website currently uses a brief generic consent statement:

`I agree to receive email updates from the Lebanese Society of Anesthesiologists.`

Replace this in Site Settings when final consent language is approved.

## Testing

After deployment, submit the homepage form once and verify a new row appears in the `Submissions` tab. If the browser blocks the direct request to the Apps Script URL, keep the Web App URL and update the frontend transport in the next integration pass.

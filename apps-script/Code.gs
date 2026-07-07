const CONFIG = {
  spreadsheetIdProperty: 'MAILING_LIST_SHEET_ID',
  sheetName: 'Submissions',
  sourceDefault: 'lsa-website',
  maxPayloadBytes: 2048,
  headers: ['Timestamp', 'Email', 'Normalized Email', 'Consent', 'Source']
};

function setupMailingListSheet() {
  const properties = PropertiesService.getScriptProperties();
  const existingSpreadsheetId = properties.getProperty(CONFIG.spreadsheetIdProperty);
  const spreadsheet = existingSpreadsheetId
    ? SpreadsheetApp.openById(existingSpreadsheetId)
    : SpreadsheetApp.create('LSA Mailing List');

  properties.setProperty(CONFIG.spreadsheetIdProperty, spreadsheet.getId());
  const sheet = getOrCreateSheet_(spreadsheet);
  ensureHeaders_(sheet);

  return {
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
    sheetName: CONFIG.sheetName
  };
}

function doGet() {
  return json_({
    ok: true,
    service: 'lsa-mailing-list'
  });
}

function doPost(event) {
  try {
    if (!event || !event.postData) {
      return json_({ ok: false, error: 'empty_request' });
    }

    if (Number(event.postData.length || 0) > CONFIG.maxPayloadBytes) {
      return json_({ ok: false, error: 'payload_too_large' });
    }

    const params = event.parameter || {};

    if (String(params.website || '').trim()) {
      return json_({ ok: true, duplicate: false });
    }

    const email = String(params.email || '').trim();
    const normalizedEmail = email.toLowerCase();

    if (!isValidEmail_(normalizedEmail)) {
      return json_({ ok: false, error: 'invalid_email' });
    }

    const consent = String(params.consent || '').toLowerCase() === 'true';
    if (!consent) {
      return json_({ ok: false, error: 'missing_consent' });
    }

    const source = String(params.source || CONFIG.sourceDefault).trim().slice(0, 80);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      const spreadsheet = getSpreadsheet_();
      const sheet = getOrCreateSheet_(spreadsheet);
      ensureHeaders_(sheet);

      if (normalizedEmailExists_(sheet, normalizedEmail)) {
        return json_({ ok: true, duplicate: true });
      }

      sheet.appendRow([new Date(), email, normalizedEmail, consent, source || CONFIG.sourceDefault]);
      return json_({ ok: true, duplicate: false });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: 'server_error' });
  }
}

function getSpreadsheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(CONFIG.spreadsheetIdProperty);

  if (!spreadsheetId) {
    throw new Error('Missing mailing-list spreadsheet. Run setupMailingListSheet first.');
  }

  return SpreadsheetApp.openById(spreadsheetId);
}

function getOrCreateSheet_(spreadsheet) {
  return spreadsheet.getSheetByName(CONFIG.sheetName) || spreadsheet.insertSheet(CONFIG.sheetName);
}

function ensureHeaders_(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, CONFIG.headers.length);
  const existingHeaders = headerRange.getValues()[0];
  const headersMatch = CONFIG.headers.every((header, index) => existingHeaders[index] === header);

  if (!headersMatch) {
    headerRange.setValues([CONFIG.headers]);
    sheet.setFrozenRows(1);
  }
}

function normalizedEmailExists_(sheet, normalizedEmail) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return false;
  }

  const normalizedEmailValues = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
  return normalizedEmailValues.some((row) => String(row[0] || '').toLowerCase() === normalizedEmail);
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

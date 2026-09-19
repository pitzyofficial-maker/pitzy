/**
 * Pitzy — Founder Application → Google Sheet
 *
 * Paste this into the Apps Script editor attached to your Google Sheet
 * (Extensions → Apps Script), then deploy it as a Web App.
 * Full steps are in GOOGLE-SHEET-SETUP.md.
 */

const SHEET_NAME = 'Applications';

// the brochure PDF must be uploaded to the Google Drive of the account running this script
const BROCHURE_FILE_NAME = 'pitzy brochure.pdf';
const EMAIL_SUBJECT = 'Thanks for your interest in Pitzy';
const EMAIL_SENDER_NAME = 'Team Pitzy';

const COLUMNS = [
  ['Timestamp',          null],
  ['Full Name',          'fullname'],
  ['Phone Number',       'phone'],
  ['Email',              'email'],
  ['Startup / Company',  'company'],
  ['Stage',              'stage'],
  ['Currently Raising',  'raising'],
  ['Round',              'round'],
  ['Amount',             'amount'],
  ['Needs Help With',    'help'],
  ['Biggest Challenge',  'challenge'],
  ['Has Pitch Deck',     'deck'],
  ['Timeline',           'timing'],
  ['Additional Details', 'details']
];

function doPost(e) {
  // one writer at a time, so two submissions can't land on the same row
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  const params = (e && e.parameter) || {};

  try {
    const sheet = getSheet_();

    const row = COLUMNS.map(function (col) {
      return col[1] === null ? new Date() : (params[col[1]] || '');
    });

    sheet.appendRow(row);
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }

  // the row is already saved, so a mail failure must not lose the application
  try {
    sendBrochure_(params.email);
  } catch (err) {
    console.error('Brochure email failed for ' + params.email + ': ' + err);
  }
  return json_({ ok: true });
}

function sendBrochure_(to) {
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(to)) return;

  const files = DriveApp.getFilesByName(BROCHURE_FILE_NAME);
  if (!files.hasNext()) throw new Error('"' + BROCHURE_FILE_NAME + '" not found in Google Drive');
  const brochure = files.next().getBlob().setName('Pitzy Brochure.pdf');

  const paragraphs = [
    'Hi there!',
    'Thanks for your interest in pitzy. We’ve received your details, and our team will reach out to you shortly.',
    'We’ve attached the brochure with the complete process, services, and pricing. Have a look, and we’ll speak soon.',
    'Team pitzy'
  ];

  GmailApp.sendEmail(to, EMAIL_SUBJECT, paragraphs.join('\n\n'), {
    name: EMAIL_SENDER_NAME,
    htmlBody: paragraphs.map(function (p) { return '<p>' + p + '</p>'; }).join(''),
    attachments: [brochure]
  });
}

// run this once from the editor: it asks for Gmail + Drive permission
// and sends the brochure email to your own inbox so you can see it
function testBrochureEmail() {
  sendBrochure_('pitzy.official@gmail.com');
}

// lets you confirm the deployment is live by opening the /exec URL in a browser
function doGet() {
  return json_({ ok: true, message: 'Pitzy application endpoint is live.' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    const headers = COLUMNS.map(function (col) { return col[0]; });
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

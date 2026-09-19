# Sending the Founder Application to a Google Sheet

Takes about five minutes. No server, no paid service — the sheet itself receives the submissions.

---

## 1. Create the sheet

Go to [sheets.new](https://sheets.new) and name it something like **Pitzy — Applications**.

You don't need to add any columns. The script creates a tab called `Applications`
with the right headers the first time someone applies.

## 2. Add the script

In that sheet: **Extensions → Apps Script**.

Delete whatever is in the editor, then paste the entire contents of
`google-apps-script.gs` (in this folder). Save with the disk icon.

## 3. Deploy it as a Web App

1. Top right: **Deploy → New deployment**
2. Click the gear next to "Select type" and choose **Web app**
3. Fill in:
   - **Description:** anything, e.g. `Pitzy form`
   - **Execute as:** `Me`
   - **Who has access:** **`Anyone`**  ← must be *Anyone*, not "Anyone with Google account"
4. **Deploy**
5. Google asks you to authorise. Choose your account → "Advanced" →
   "Go to (project name) (unsafe)" → **Allow**.
   That warning is normal for your own unpublished script.
6. Copy the **Web app URL**. It ends in `/exec`.

> Quick check: paste that `/exec` URL into a browser tab. You should see
> `{"ok":true,"message":"Pitzy application endpoint is live."}`

## 4. Connect the site

Open `script.js`. The very first lines are:

```js
const SHEET_ENDPOINT = '';
```

Paste your URL between the quotes:

```js
const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfy..../exec';
```

Save. Done — submissions now land in the sheet, one row each, with a timestamp.

---

## If you change the script later

Apps Script keeps serving the *deployed* version, not the saved one. After editing:

**Deploy → Manage deployments → pencil icon → Version: New version → Deploy**

The `/exec` URL stays the same.

---

## Notes

- **Multi-select:** question 8 allows several answers; they arrive in one cell,
  comma-separated (`Pitch Deck, Follow-ups`).
- **Question 12** is optional — the row is still written if it's blank.
- **Error handling:** Google's endpoint doesn't return CORS headers, so the browser
  can't read its reply. The form treats "the request left the browser" as success.
  A genuine network failure shows an error under the button and lets the visitor retry.
  This means that if the Apps Script itself errors, the visitor still sees the
  thank-you screen — so check the sheet after going live, and check
  **Apps Script → Executions** if a row is missing.
- **Spam:** the endpoint is public by necessity. If you start getting junk, the
  usual next step is adding a honeypot field or reCAPTCHA.
- **Email alerts:** to get notified per submission, add this inside `doPost`,
  just after `sheet.appendRow(row)`:

  ```js
  MailApp.sendEmail('pitzy.official@gmail.com', 'New Pitzy application',
    COLUMNS.map(function (c, i) { return c[0] + ': ' + row[i]; }).join('\n'));
  ```

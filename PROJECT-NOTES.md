# Pitzy website — handoff notes

Last updated 2026-09-16. Read this first when picking the project back up.

## Where things stand

- **Not live yet.** Site exists only in this folder. Plan: deploy via Netlify Drop (drag this folder to app.netlify.com/drop).
- **Google Sheet connection — WORKING 2026-09-16.** `/exec` URL in `script.js` line 6; user confirmed rows land in `Applications` tab.
- If the Apps Script is edited, it must be redeployed: Deploy → Manage deployments → edit → New version.
- **Auto brochure email — WORKING 2026-09-16.** Apps Script emails each website applicant (GmailApp, from pitzy.official@gmail.com as "Team Pitzy") with the brochure attached, found in Drive by exact name `pitzy brochure.pdf` (do not rename). Deployed as Version 2 of the existing deployment (same /exec URL). Meta lead-form rows bypass the script, so they do NOT get the email. Gmail limit ~100 emails/day. Website emails now use pitzy.official@gmail.com. Thank-you screen hides the form header.

## Files

| File | What it is |
|---|---|
| `index.html` | Homepage |
| `about.html` | About page |
| `styles.css` | **Shared** styles for both pages |
| `script.js` | **Shared** JS: scroll reveals, nav, 3D card tilt, Q&A accordion, and the application form (modal HTML is injected from here, so it isn't in the HTML files) |
| `google-apps-script.gs` | Paste into the Google Sheet's Apps Script |
| `GOOGLE-SHEET-SETUP.md` | Step-by-step sheet setup |
| `logo.png` | Transparent logo generated from `logo 2 (1).png` |
| `logo 2 (1).png` / `logo 2 (2).png` | Original logos (white-on-black / black-on-white, solid backgrounds) |
| `hero.png`, `2nd.png`, `footer.png` | Hero, "Why/Problem" band, closing CTA photos |
| `pitzy brochure.pdf` | Served by the hero "Download brochure" button (keep the filename) |

## Design decisions (settled with the user)

- **Dark-only site** (`data-theme="dark"` pinned on `<html>`; no toggle). Light/day tokens still exist in CSS.
- These bands stay **light in the dark theme** by re-declaring tokens on the section: problem/"Why" band (white), "What Pitzy is not" + Q&A (bright yellow `#ffe14d`), application form panel (white).
- Headings: Inter 600, `clamp(30px,4.6vw,62px)`, tight tracking. Playfair Display only for small italic accents (card numbers).
- Accents: blue `#1d4ed8` / yellow `#ffe14d`. Nav hover = yellow 3D pill.
- Hero: full-screen looping video `hero2-web.mp4` (1080p, muted, made from the 4K `hero2.mp4`; poster `hero2-poster.jpg`), same overlay + text scrim as before (user insisted the gradient stay identical), yellow hand-drawn stroke that draws in under "investors say yes to."
- Service cards: sticky stacked deck, light cards with photo backgrounds fading to white behind text, 3D hover tilt, **no sheen**.
- Pricing cards: white, reference-style; hover = lift only (**no colour change**).
- Sleek fade-out hairline dividers only between sections that share a background.
- All CTAs read **"Get Started"** and open the Founder Application modal.

## Application form (13 questions)

All required except Q13. Field `name`s must match the `COLUMNS` in `google-apps-script.gs`:
fullname, phone (digits only, 7–15), email, company, stage, raising, round, amount, help (multi-select → comma-joined), challenge, deck, timing, details (optional textarea).

## Testing note

The in-app preview pane pauses rendering: CSS transitions, `requestAnimationFrame`, `IntersectionObserver` and smooth scrolling don't advance, and screenshots can be stale. Verify computed styles with transitions disabled rather than trusting mid-transition reads.

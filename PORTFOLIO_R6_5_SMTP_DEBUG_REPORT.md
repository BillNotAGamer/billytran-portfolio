# PORTFOLIO_R6_5_SMTP_DEBUG_REPORT

## 1. Root cause analysis of the current error

- The terminal message `Contact form SMTP configuration is incomplete.` comes from `app/api/contact/route.ts`.
- Before this hardening pass, the route required all of these variables to exist at runtime before attempting to send mail:
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `SMTP_FROM`
  - `CONTACT_TO_EMAIL`
- No environment variable name mismatch was found between the contact route and the canonical names requested for R6.5.
- The current workspace does not have a root `.env.local` file, and `npm run check:contact-env` confirms the required SMTP variables are missing locally. That explains the current `POST /api/contact` 500 during manual QA.
- The previous implementation also had two avoidable weak points:
  - `SMTP_FROM` was treated as required even though it can safely fall back to `Portfolio Contact <SMTP_USER>`.
  - `CONTACT_TO_EMAIL` was treated as required even though it can safely fall back to `tranbao64416@gmail.com`.
- `.env.example` also contained real-looking SMTP credentials and has now been replaced with safe placeholders only.

## 2. Files changed

- `.env.example`
- `app/api/contact/route.ts`
- `package.json`
- `scripts/check-contact-env.mjs`

## 3. Whether an env name mismatch was found

- No env name mismatch was found.
- The code now uses the canonical names:
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `SMTP_FROM`
  - `CONTACT_TO_EMAIL`

## 4. Which env variables are required

Required at runtime:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

Optional with safe fallback:

- `SMTP_FROM`
  - Falls back to `Portfolio Contact <${SMTP_USER}>` when `SMTP_USER` exists.
- `CONTACT_TO_EMAIL`
  - Falls back to `tranbao64416@gmail.com`

Parsing rules:

- `SMTP_SECURE` must be one of:
  - `true`
  - `false`
  - `1`
  - `0`
  - `yes`
  - `no`
- `SMTP_PORT` must be a positive integer.

## 5. Which safe fallbacks were added

- `SMTP_FROM`
  - If missing and `SMTP_USER` exists, the route now uses `Portfolio Contact <${SMTP_USER}>`.
- `CONTACT_TO_EMAIL`
  - If missing, the route now uses `tranbao64416@gmail.com`.

No secret fallback was added for:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

## 6. How to create `.env.local`

Create a file named `.env.local` in the repository root:

`/billytran-portfolio/.env.local`

Use this template:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM="Portfolio Contact <your-email@gmail.com>"
CONTACT_TO_EMAIL=tranbao64416@gmail.com
```

Notes:

- `SMTP_PASS` must be a Gmail App Password if you are using Gmail SMTP.
- Do not use your normal Gmail password.
- Do not commit `.env.local`.

High-level Gmail App Password setup:

1. Enable 2-Step Verification on the Google account used for `SMTP_USER`.
2. Open the Google Account security settings and create an App Password.
3. Generate a password for Mail or a custom app name.
4. Put that generated App Password into `SMTP_PASS`.

## 7. Reminder to restart `npm run dev` after changing env vars

- If `.env.local` is created or changed while the dev server is already running, stop `npm run dev` and start it again.
- Next.js loads `.env.local` at runtime, but the running dev process will not always pick up changes automatically.

## 8. How to run the new env check script

Run:

```bash
npm run check:contact-env
```

What it does:

- checks the expected contact SMTP variable names
- reports present vs missing keys
- reports invalid `SMTP_PORT` / `SMTP_SECURE` formatting
- never prints secret values
- exits with code `1` when required config is missing or invalid
- exits with code `0` when the required config looks complete

## 9. How to test form submission locally

1. Create `/billytran-portfolio/.env.local` with real SMTP values.
2. Run:

```bash
npm run check:contact-env
npm run dev
```

3. Open:

```txt
http://localhost:3000/en#contact
```

4. Submit the form with a real email address in the email field.
5. Verify the message reaches `tranbao64416@gmail.com`.
6. If the dev server was already running before env changes, restart it and test again.

## 10. Validation results

- `npm run check:contact-env`
  - Completed and failed intentionally in this workspace because `.env.local` is not present.
  - Reported missing:
    - `SMTP_HOST`
    - `SMTP_PORT`
    - `SMTP_SECURE`
    - `SMTP_USER`
    - `SMTP_PASS`
- `npm run build`
  - Passed
- `npm run lint`
  - Passed
- Separate `typecheck` script
  - Not available in `package.json`
  - TypeScript validation still ran during `npm run build`

## 11. Known limitations

- The form cannot send mail without real SMTP credentials.
- Gmail SMTP requires a Gmail App Password.
- Deliverability depends on the SMTP provider and mailbox policies.

## 12. Confirmation

- No secrets were hardcoded.
- No external email API was added.
- Missing SMTP config now reports safer and clearer diagnostics on the server in development only.
- Production SMTP config failures still return a safe generic client-facing error.
- `POST /api/contact` remains intact.
- `/en` and `/vi` still build.

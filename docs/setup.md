# Setup

## Environment variables

Set these in Vercel under **Settings → Environment Variables**, with the
**Production** environment ticked. Vercel freezes variables at build time, so a
change only takes effect after the next deployment.

| Variable | Required | What it is |
|---|---|---|
| `RESEND_API_KEY` | yes | API key from [resend.com](https://resend.com). Without it the inquiry form returns 503 in production and the submission is lost. |
| `MAIL_FROM` | no | Sender. Defaults to `Surf and Cook <onboarding@resend.dev>`. |
| `MAIL_TO` | no | Recipient. Defaults to the placeholder in `src/lib/constants.ts`. |

### About the sender address

Resend only sends from a verified domain. Two ways forward:

**Without your own domain.** Leave `MAIL_FROM` unset, or set it to
`Surf and Cook <onboarding@resend.dev>`. This works immediately but delivers
**only to the email address the Resend account is registered with** — set
`MAIL_TO` to exactly that address, or nothing arrives.

**With your own domain.** Add `surfandcook.pe` under Domains in Resend, set the
DNS records it gives you, wait for verification, then set
`MAIL_FROM=Surf and Cook <hola@surfandcook.pe>`. After that mail can go to any
recipient.

### Checking it

```bash
curl -s -X POST https://surfandcook.vercel.app/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","people":2,"level":"none"}'
```

| Response | Meaning |
|---|---|
| `{"ok":true,"delivered":true}` | Sent. |
| `{"error":"mail_not_configured"}` — 503 | `RESEND_API_KEY` is not reaching this deployment. Check the Production tick and redeploy. |
| `{"error":"mail_failed"}` — 502 | Resend refused. The reason is in the Vercel runtime log — usually an unverified sender domain, or a recipient the free tier will not deliver to. |

## Still placeholders

- **Diego's story** — `messages/*.json`, under `about.body1` and `about.body2`.
  The page shows a dashed note until it is replaced.
- **Contact details** — `src/lib/constants.ts`. WhatsApp, email and Instagram are
  invented. Set `verified: true` there to hide the notice on the contact page.
- **Photography** — everything under `public/images` is cropped from AI-generated
  mockups in `design/source`, apart from the hero
  (`public/images/hero/diego-cooking.png`), which is supplied directly and is not
  produced by the crop script. Fine to launch with, worth replacing with real
  photos of Diego and Lobitos.

## Images

`node scripts/crop-source-images.mjs` regenerates the crops from
`design/source`. Those source files stay outside `public/` on purpose: they carry
baked-in headlines and a fabricated rating that must not be reachable publicly.

The hero is not among them. It is dropped into `public/images/hero/` by hand, so
the script leaves it alone and re-running the script will not restore or
overwrite it.

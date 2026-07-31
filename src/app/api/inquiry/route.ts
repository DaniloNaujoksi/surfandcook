import { NextResponse } from "next/server";
import { z } from "zod";
import { CONTACT } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  people: z.coerce.number().int().min(1).max(12),
  when: z.string().optional(),
  level: z.enum(["none", "some", "confident"]),
  message: z.string().optional(),
  locale: z.string().optional(),
});

const LEVELS = {
  none: "never surfed",
  some: "surfed a few times",
  confident: "comfortable in the water",
} as const;

/**
 * Resend refuses to send from a domain that has not been verified. Until
 * surfandcook.pe is set up there, onboarding@resend.dev works out of the box —
 * with the limitation that it can only deliver to the account owner's address.
 */
const FROM = process.env.MAIL_FROM || "Surf and Cook <onboarding@resend.dev>";
const TO = process.env.MAIL_TO || CONTACT.email;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
  }

  const { name, email, people, when, level, message, locale = "en" } = parsed.data;

  const text = [
    `Inquiry from ${name} <${email}>`,
    "",
    `People: ${people}`,
    `When: ${when || "not stated"}`,
    `Level: ${LEVELS[level]}`,
    `Site language: ${locale.toUpperCase()}`,
    "",
    message ? `Message: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // There is no database behind this form. Without a mail key the submission is
  // simply gone, so a guest must not be told it arrived — they get the error
  // state and the direct contact details next to the form.
  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "production") {
      console.error("[inquiry] RESEND_API_KEY is not set — submission was lost:\n" + text);
      return NextResponse.json({ error: "mail_not_configured", delivered: false }, { status: 503 });
    }

    console.log("[inquiry] no RESEND_API_KEY in development, nothing sent:\n" + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: TO,
      reply_to: email,
      subject: `Inquiry — ${people} ${people === 1 ? "person" : "people"}, ${when || "date open"}`,
      text,
    }),
  });

  if (!res.ok) {
    // Resend explains refusals precisely (unverified domain, bad key, recipient
    // not allowed on the free tier). Losing that message means guessing.
    const detail = await res.text().catch(() => "");
    console.error(`[inquiry] Resend refused (${res.status}): ${detail}\n${text}`);
    return NextResponse.json({ error: "mail_failed", delivered: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}

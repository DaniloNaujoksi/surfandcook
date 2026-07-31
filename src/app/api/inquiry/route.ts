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

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
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

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Surf and Cook <no-reply@surfandcook.pe>",
        to: CONTACT.email,
        reply_to: email,
        subject: `Inquiry — ${people} ${people === 1 ? "person" : "people"}, ${when || "date open"}`,
        text,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }
  } else {
    // Without a key nothing is delivered anywhere. Logging keeps a local trace
    // during development, but this must be configured before launch.
    console.log("[inquiry] RESEND_API_KEY not set, nothing was sent:\n" + text);
  }

  return NextResponse.json({ ok: true });
}

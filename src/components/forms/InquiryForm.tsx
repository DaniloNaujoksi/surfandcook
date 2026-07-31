"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  people: z.coerce.number().int().min(1).max(12),
  when: z.string().optional(),
  level: z.enum(["none", "some", "confident"]),
  message: z.string().optional(),
});

type FormValues = z.input<typeof schema>;

const field =
  "w-full rounded-xl border border-sand-warm bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-sea";

export function InquiryForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { people: 2, level: "none" },
  });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      reset({ people: 2, level: "none" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label text-ink/50" htmlFor="name">
            {t("name")}
          </label>
          <input id="name" className={`mt-2 ${field}`} {...register("name")} />
          {errors.name && <p className="mt-1.5 text-xs text-coral">{t("nameError")}</p>}
        </div>

        <div>
          <label className="label text-ink/50" htmlFor="email">
            {t("email")}
          </label>
          <input id="email" type="email" className={`mt-2 ${field}`} {...register("email")} />
          {errors.email && <p className="mt-1.5 text-xs text-coral">{t("emailError")}</p>}
        </div>

        <div>
          <label className="label text-ink/50" htmlFor="people">
            {t("people")}
          </label>
          <input
            id="people"
            type="number"
            min={1}
            max={12}
            className={`mt-2 ${field}`}
            {...register("people")}
          />
          {errors.people && <p className="mt-1.5 text-xs text-coral">{t("peopleError")}</p>}
        </div>

        <div>
          <label className="label text-ink/50" htmlFor="when">
            {t("date")}
          </label>
          <input id="when" type="date" className={`mt-2 ${field}`} {...register("when")} />
        </div>
      </div>

      <div>
        <label className="label text-ink/50" htmlFor="level">
          {t("level")}
        </label>
        <select id="level" className={`mt-2 ${field}`} {...register("level")}>
          <option value="none">{t("levelNone")}</option>
          <option value="some">{t("levelSome")}</option>
          <option value="confident">{t("levelConfident")}</option>
        </select>
      </div>

      <div>
        <label className="label text-ink/50" htmlFor="message">
          {t("message")}
        </label>
        <textarea id="message" rows={4} className={`mt-2 resize-y ${field}`} {...register("message")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-coral px-8 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-sea disabled:opacity-50"
      >
        {isSubmitting ? t("sending") : t("submit")}
      </button>

      {status === "success" && (
        <p className="rounded-xl bg-sea/10 px-5 py-4 text-sm text-sea">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="rounded-xl bg-coral/10 px-5 py-4 text-sm text-coral">{t("error")}</p>
      )}
    </form>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { CONTACT } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.hero" });
  return { title: t("title"), description: t("tagline") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <>
      <PageHero title={t("hero.title")} tagline={t("hero.tagline")} />

      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl md:text-3xl">{t("form.heading")}</h2>
            <div className="mt-8">
              <InquiryForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-sand px-6 py-7">
              <p className="label text-ink/45">{t("details.heading")}</p>

              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-ink/50">{t("details.whatsapp")}</dt>
                  <dd className="mt-1">
                    <a href={CONTACT.whatsappHref} className="text-sea hover:opacity-70">
                      {CONTACT.whatsappDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-ink/50">{t("details.email")}</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${CONTACT.email}`} className="break-all text-sea hover:opacity-70">
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-ink/50">{t("details.where")}</dt>
                  <dd className="mt-1">
                    <a
                      href={CONTACT.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sea hover:opacity-70"
                    >
                      {CONTACT.place}
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Visible on purpose while the details are stand-ins. */}
              {!CONTACT.verified && (
                <p className="mt-6 rounded-xl border border-dashed border-coral/50 bg-coral/5 px-4 py-3 text-xs leading-relaxed text-ink/70">
                  {t("details.placeholder")}
                </p>
              )}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

import { Container } from "@/components/ui/Container";

export function PageHero({ title, tagline }: { title: string; tagline: string }) {
  return (
    <section className="bg-sand pb-16 pt-32 md:pb-24 md:pt-40">
      <Container>
        <h1 className="max-w-3xl text-[2.5rem] md:text-6xl">{title}</h1>
        <p className="prose-body mt-6 max-w-2xl text-ink/70">{tagline}</p>
      </Container>
    </section>
  );
}

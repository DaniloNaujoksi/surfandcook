import type { ComponentProps } from "react";
import { clsx } from "clsx";
import { Link } from "@/i18n/navigation";

type Variant = "solid" | "outline" | "light";

const variants: Record<Variant, string> = {
  solid: "bg-coral text-white hover:bg-sea",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-shell",
  light: "border border-white/50 text-white hover:bg-white hover:text-ink",
};

// Labels never wrap: a two-line button reads as a layout fault rather than a
// control. Tracking and padding ease off on phones so long labels still fit.
const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 sm:px-8";

export function Button({
  variant = "solid",
  className,
  href,
  ...props
}: {
  variant?: Variant;
  className?: string;
  href?: ComponentProps<typeof Link>["href"];
} & Omit<ComponentProps<"button">, "className">) {
  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return <button type="button" className={classes} {...props} />;
}

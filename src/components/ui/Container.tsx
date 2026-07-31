import { clsx } from "clsx";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("mx-auto w-full max-w-6xl px-6 md:px-10", className)}>{children}</div>;
}

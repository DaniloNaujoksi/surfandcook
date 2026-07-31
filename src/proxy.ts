import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

/**
 * Locale detection, plus the rewrite from localized paths (`/de/kurse`) to the
 * route folders (`/de/courses`).
 *
 * The matcher is a plain path pattern on purpose. The negative-lookahead regex
 * matcher that most examples show — `/((?!api|_next|...).*)` — matched nothing
 * but `/` when tested against `next start`, so every localized path returned a
 * 404 while the proxy was never invoked at all. Excluding paths inside the
 * function costs a few string comparisons and cannot fail quietly.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isInternal =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.includes(".");

  if (isInternal) return NextResponse.next();

  return intl(request);
}

export const config = {
  matcher: ["/:path*"],
};

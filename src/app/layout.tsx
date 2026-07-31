// Every page lives under `[locale]`, and `[locale]/layout.tsx` is the layout
// that renders <html lang={locale}> and <body>. This file only exists because
// Next requires a layout at the root of `app/`, so it passes children straight
// through. Rendering <html>/<body> here too would nest them, and the browser
// would keep the outer pair — which meant every localised page shipped
// lang="en". See node_modules/next/dist/docs/01-app/03-api-reference/
// 03-file-conventions/layout.md, "Root Layout".
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

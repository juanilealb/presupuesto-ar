import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE } from "@/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} · ${SITE.headline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.dek,
  openGraph: {
    title: `${SITE.name} · ${SITE.headline}`,
    description: SITE.dek,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="shell flex-1 py-8 sm:py-12">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

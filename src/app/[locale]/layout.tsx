import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { isLocale, locales } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { Mitr } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AntiCopy from "@/components/AntiCopy";
import { notFound } from "next/navigation";
import "../globals.css";

const mitr = Mitr({
  subsets: ["thai", "latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-mitr",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "th";
  const d = getDict(locale);
  return {
    title: { default: `${d.meta.siteName} — ${d.meta.tagline}`, template: `%s · ${d.meta.siteName}` },
    description: d.meta.description,
    openGraph: {
      title: `${d.meta.siteName} — ${d.meta.tagline}`,
      description: d.meta.description,
      images: ["/img/og-image.webp"],
      locale,
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/`,
      languages: { th: "/th/", en: "/en/", zh: "/zh/" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const d = getDict(raw);
  return (
    <div lang={raw} className={mitr.variable} style={{ fontFamily: "var(--font-body)" }}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(raw)};document.documentElement.classList.add('js')`,
        }}
      />
      <Nav locale={raw} d={d} />
      <main>{children}</main>
      <Footer locale={raw} d={d} />
      <AntiCopy />
    </div>
  );
}

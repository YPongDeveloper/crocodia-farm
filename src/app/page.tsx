import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";

export const metadata: Metadata = {
  robots: { index: false },
};

/** Static-export root page: send visitors to the default locale (/th/). */
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      <link rel="canonical" href={`/${defaultLocale}/`} />
      <p style={{ fontFamily: "sans-serif", padding: 24 }}>
        Redirecting… ·{" "}
        <a href="/th/">ไทย</a> · <a href="/en/">English</a> · <a href="/zh/">中文</a>
      </p>
    </>
  );
}

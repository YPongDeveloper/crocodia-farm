import Footer from "@/components/Footer";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";

/** Layout for all standard pages: adds the site footer (the /map page opts out). */
export default async function SiteLayout({
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
    <>
      {children}
      <Footer locale={raw} d={d} />
    </>
  );
}

import MapExplorer from "@/components/MapExplorer";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const d = getDict(isLocale(raw) ? raw : "th");
  return { title: d.nav.map, description: d.map.sub };
}

export default async function MapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const d = getDict(locale);

  return (
    <MapExplorer locale={locale} d={d} />
  );
}

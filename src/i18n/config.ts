export const locales = ["th", "en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "th";

export const localeNames: Record<Locale, string> = {
  th: "ไทย",
  en: "English",
  zh: "中文",
};

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

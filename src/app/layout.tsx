import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ฟาร์มจระเข้และสวนสัตว์ สมุทรปราการ | Samutprakarn Crocodile Farm & Zoo",
  description: "The World's First & Largest Crocodile Farm — Samutprakarn Crocodile Farm & Zoo, Thailand",
  icons: { icon: "/icon-96.png", apple: "/icon-96.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";

import { site } from "@/lib/site";
import "./globals.css";

/**
 * The original theme loads Oswald (headings, nav, buttons) and Roboto (body)
 * from Google Fonts. next/font self-hosts both, which removes the render-blocking
 * request the WordPress build had.
 */
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description:
    "The American Subcontractors Association of Idaho promotes and protects the rights and interests of subcontractors and suppliers through education, legislation, networking and professional growth.",
  icons: {
    icon: "/wordpress-assets/favicon.png",
    apple: "/wordpress-assets/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LogoIntro } from "@/components/layout/LogoIntro";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { 
  generateLocalBusinessSchema, 
  generateOrganizationSchema, 
  generateWebSiteSchema 
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://timberpark.com.sg"),
  title: {
    default: "Timberpark Pte. Ltd. | Renovation & Construction Singapore",
    template: "%s | Timberpark Pte. Ltd.",
  },
  description:
    "Timberpark Pte. Ltd. — trusted Singapore construction and renovation company. Residential, commercial and industrial projects since 2021. Get a free quote today.",
  keywords: [
    "renovation Singapore",
    "construction company Singapore",
    "HDB renovation",
    "commercial renovation",
    "interior works Singapore",
    "M&E services",
    "Timberpark",
  ],
  authors: [{ name: "Timberpark Pte. Ltd." }],
  creator: "Timberpark Pte. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_SG",
    siteName: "Timberpark Pte. Ltd.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const orgSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, orgSchema, webSiteSchema]) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LogoIntro />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

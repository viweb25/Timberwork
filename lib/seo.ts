// lib/seo.ts
// SEO helper functions — metadata generation + JSON-LD schema

import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://timberpark.com.sg";

export interface PageSEO {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image = "/images/og-default.jpg",
}: PageSEO): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle = title === "Home"
    ? "Timberpark Pte. Ltd. | Renovation & Construction Singapore"
    : `${title} | Timberpark Pte. Ltd.`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Timberpark Pte. Ltd.",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    name: "Timberpark Pte. Ltd.",
    alternateName: "Timberpark",
    description:
      "Singapore-based construction and renovation company delivering reliable, high-quality solutions for residential, commercial and industrial projects since 2021.",
    url: BASE_URL,
    telephone: "+918217750424",
    email: "timberpark4@gmail.com",
    foundingDate: "2021",
    legalName: "TIMBERPARK PTE. LTD.",
    taxID: "202110926M",
    address: {
      "@type": "PostalAddress",
      streetAddress: "60 Paya Lebar Road, #06-28, Paya Lebar Square",
      addressLocality: "Singapore",
      postalCode: "409051",
      addressCountry: "SG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 1.3178,
      longitude: 103.8921,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Singapore",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction & Renovation Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "General Construction" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Renovation Works" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Works" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "M&E Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintenance Services" } },
      ],
    },
    sameAs: [],
  };
}

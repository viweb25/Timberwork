// lib/seo.ts
// SEO helper functions — metadata generation + JSON-LD schema

import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://timberpark.com.sg";
const SITE_NAME = "Timberpark Pte. Ltd.";

export interface PageSEO {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image = "/images/og-default.jpg",
  keywords = [],
}: PageSEO): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle = title === "Home"
    ? `${SITE_NAME} | Renovation & Construction Singapore`
    : `${title} | ${SITE_NAME}`;

  const defaultKeywords = [
    "renovation Singapore",
    "construction company Singapore",
    "HDB renovation",
    "commercial renovation",
    "interior works Singapore",
    "M&E services",
    "Timberpark",
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
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
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`, // Update with actual logo path if needed
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+65 8424 5286",
      contactType: "customer service",
      email: "timberpark4@gmail.com",
      areaServed: "SG",
      availableLanguage: "en",
    },
    sameAs: [
      "https://www.facebook.com/timberpark", // Placeholder
      "https://www.linkedin.com/company/timberpark", // Placeholder
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateWebPageSchema(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: `${BASE_URL}${path}`,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    name: SITE_NAME,
    alternateName: "Timberpark",
    description:
      "Singapore-based construction and renovation company delivering reliable, high-quality solutions for residential, commercial and industrial projects since 2021.",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    telephone: "+65 8424 5286",
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
    sameAs: [
      "https://www.facebook.com/timberpark",
      "https://www.linkedin.com/company/timberpark"
    ],
  };
}

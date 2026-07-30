// src/data/siteConfig.ts
// Source: ACRA Business Profile + business card + homepage mockup
// âš ï¸ Phone/email confirmed from business card version below.

import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  companyName: "Timberpark Pte. Ltd.",
  tagline: "Building Spaces & Creating Value",
  uen: "202110926M",
  incorporationDate: "28 Mar 2021",
  yearFounded: 2021,

  contact: {
    phone: "+91 82177 50424",
    email: "timberpark4@gmail.com",
    address: "60 Paya Lebar Road, #06-28, Paya Lebar Square, Singapore 409051",
    hours: {
      weekdays: "Mon - Fri: 9:00 AM - 6:00 PM",
      saturday: "Sat: 9:00 AM - 1:00 PM",
    },
  },

  socials: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },

  businessActivities: {
    primary: "Construction of Buildings N.E.C. (41009)",
    secondary: "Renovation Contractors (43301)",
  },

  hero: {
    eyebrow: "Building Spaces & Creating Value",
    headline: "Renovation & Construction",
    highlightWord: "Works",
    subheadline: "Built on quality. Delivered with pride.",
    description:
      "Timberpark Pte. Ltd. is a trusted Singapore-based construction and renovation company delivering reliable, high-quality and cost-effective solutions for residential, commercial and industrial projects. Since 2021.",
    ctaPrimary: { label: "Get a Free Quote", href: "/contact" },
    ctaSecondary: { label: "Our Projects", href: "/projects" },
  },

  stats: [
    { value: "5+", label: "Years of Experience" },
    { value: "100+", label: "Projects Completed" },
    { value: "20+", label: "Skilled Professionals" },
    { value: "100%", label: "Commitment to Quality & Safety" },
  ],

  about: {
    heading: "Building Your Vision With Expertise and Integrity.",
    highlightWord: "Expertise",
    body: "Established in 2021, Timberpark Pte. Ltd. is committed to delivering excellence in every project. We combine innovative solutions, quality workmanship and professional project management to exceed our clients' expectations.",
    mission:
      "To provide exceptional construction and renovation services that exceed customer expectations through quality, integrity and innovation.",
    vision:
      "To be one of Singapore's most trusted construction and renovation companies by delivering sustainable, reliable and high-quality solutions.",
  },
};

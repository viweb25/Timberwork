// Shared TypeScript interfaces for Timberpark website
// Phase 2: when migrating to a real backend, only data-service.ts changes â€”
// these types remain the same since the shape of data doesn't change.

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: "building" | "house" | "interior" | "mep" | "wrench" | "ceiling";
  features: string[];
  image?: string;
}

export interface ProjectCategory {
  slug: string;
  title: string;
  sector: "Residential" | "Commercial" | "Industrial";
  image: string;
  description: string;
}

export type ProjectCategoryName = "Residential" | "Commercial" | "Industrial";

export interface ProjectHighlight {
  id: string;
  title: string;
  category: ProjectCategoryName;
  location?: string;
  completionDate?: string;
  scopeOfWork: string[];
  description: string;
  images: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  text: string;
  rating: number;
  projectType: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

export interface ContactHours {
  weekdays: string;
  saturday: string;
}

export interface SiteConfig {
  companyName: string;
  tagline: string;
  uen: string;
  incorporationDate: string;
  yearFounded: number;
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: ContactHours;
  };
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  businessActivities: {
    primary: string;
    secondary: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    highlightWord: string;
    subheadline: string;
    description: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  stats: Array<{ value: string; label: string }>;
  about: {
    heading: string;
    highlightWord: string;
    body: string;
    mission: string;
    vision: string;
  };
}

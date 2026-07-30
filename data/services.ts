// data/services.ts
// Source: homepage mockup "Our Services" section

import type { Service } from "@/types";

export const servicesData: Service[] = [
  {
    slug: "general-construction",
    title: "General Construction",
    shortDescription: "Building with strength and precision.",
    fullDescription:
      "Timberpark delivers comprehensive general construction services across Singapore, covering new builds, additions and alterations (A&A works), structural work, and full project management from tender to handover. We work across residential, commercial and industrial sectors, ensuring every project is completed safely, on time and to specification.",
    icon: "building",
    features: [
      "New building construction",
      "Additions & alterations (A&A)",
      "Structural works",
      "Concrete & RC works",
      "Project management",
      "BCA compliance & safety",
    ],
  },
  {
    slug: "renovation-works",
    title: "Renovation Works",
    shortDescription: "Transforming spaces with quality.",
    fullDescription:
      "Whether it's a HDB flat, condominium, landed property or commercial unit, our renovation team transforms spaces with precision and craftsmanship. We handle full gut renovations, partial remodels, and tenant fit-outs â€” coordinating all trades under one roof to minimise disruption and deliver on schedule.",
    icon: "house",
    features: [
      "HDB & condominium renovation",
      "Landed property renovation",
      "Commercial & office fit-out",
      "Full & partial renovation",
      "Wet works (hacking, tiling, plastering)",
      "Carpentry & built-in joinery",
    ],
  },
  {
    slug: "interior-works",
    title: "Interior Works",
    shortDescription: "Functional, aesthetic and innovative.",
    fullDescription:
      "Our interior works team brings spaces to life through thoughtful design, quality materials and skilled execution. From feature walls and ceilings to bespoke cabinetry and marble installation, we create interiors that are both beautiful and built to last â€” tailored to each client's vision and lifestyle.",
    icon: "interior",
    features: [
      "Interior design & planning",
      "Feature walls & ceilings",
      "Flooring (timber, vinyl, tile, marble)",
      "Marble & stone installation",
      "Custom cabinetry & built-ins",
      "Painting & finishes",
    ],
  },
  {
    slug: "mne-services",
    title: "M&E Services",
    shortDescription: "Safe, efficient and reliable systems.",
    fullDescription:
      "Our Mechanical & Electrical (M&E) team provides certified installation, testing and commissioning of all building services. From electrical wiring and lighting to plumbing, air-conditioning and fire protection systems, we ensure every system meets Singapore's safety codes and regulatory standards.",
    icon: "mep",
    features: [
      "Electrical installation & wiring",
      "Lighting design & installation",
      "Plumbing & sanitary works",
      "Air-conditioning (ACMV) systems",
      "Underground & overhead piping",
      "Fire protection systems",
    ],
  },
  {
    slug: "maintenance-services",
    title: "Maintenance Services",
    shortDescription: "Keeping your property in perfect condition.",
    fullDescription:
      "Protecting the value of your property requires proactive maintenance. Timberpark offers scheduled and ad-hoc maintenance programmes for residential, commercial and industrial properties â€” covering everything from minor repairs and waterproofing to building inspections and ongoing facility management.",
    icon: "wrench",
    features: [
      "Preventive maintenance programmes",
      "Waterproofing & leakage repair",
      "Building inspections",
      "Touch-up painting & patching",
      "Timber deck maintenance",
      "General property repairs",
    ],
  },
];

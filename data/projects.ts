// data/projects.ts
// Category source: homepage mockup "Our Projects" section

import type { ProjectCategory } from "@/types";

export const projectCategories: ProjectCategory[] = [
  {
    slug: "residential-hdb-condo",
    title: "Residential HDB & Condominium",
    sector: "Residential",
    image: "/images/projects/residential.jpg",
    description:
      "Full renovation and addition & alteration works across HDB flats and condominium units in Singapore.",
  },
  {
    slug: "landed-house-renovation",
    title: "Landed House Renovation",
    sector: "Residential",
    image: "/images/projects/landed-house.jpg",
    description:
      "Comprehensive renovation and construction services for semi-detached, terrace and detached landed properties.",
  },
  {
    slug: "commercial-office-retail",
    title: "Commercial Office & Retail",
    sector: "Commercial",
    image: "/images/projects/commercial.jpg",
    description:
      "Office fit-outs, retail shop renovations and commercial A&A works delivered on schedule and within budget.",
  },
  {
    slug: "industrial-warehouse-factory",
    title: "Industrial Warehouse & Factory",
    sector: "Industrial",
    image: "/images/projects/industrial.jpg",
    description:
      "Specialist construction and M&E works for warehouses, factories and industrial facilities across Singapore.",
  },
];

export type ProjectCategory = "Residential" | "Commercial" | "Industrial";

export type ProjectHighlight = {
  id: string; // stable id/slug — used as the URL/modal key
  title: string;
  category: ProjectCategory;
  location?: string;
  completionDate?: string;
  scopeOfWork: string[];
  description: string;
  images: string[];
};

export const projectHighlights: ProjectHighlight[] = [
  {
    id: "kitchen-bukit-panjang",
    title: "Demolition & Reconstruction of Kitchen Cabinet",
    category: "Residential",
    location: "Bukit Panjang Ring Road",
    completionDate: "2024",
    scopeOfWork: [
      "Demolition of existing kitchen cabinetry",
      "Reconstruction of new kitchen cabinet layout",
      "Custom timber laminate finishes & countertop fitting",
      "Plumbing connection for sink & drain system",
    ],
    description:
      "Full demolition and reconstruction of the kitchen cabinet at a residential unit along Bukit Panjang Ring Road, delivered with attention to layout functionality and finish quality.",
    images: ["/images/projects/residential.jpg"],
  },
  {
    id: "holland-avenue-mep",
    title: "Electrical, Plumbing, Wall Treatment & Wooden Works",
    category: "Residential",
    location: "Holland Avenue",
    completionDate: "2024",
    scopeOfWork: [
      "Electrical wiring & lighting installations",
      "Plumbing works & sanitary fittings",
      "Skim coating & moisture-resistant wall treatment",
      "Custom wooden carpentry & built-in joinery",
    ],
    description:
      "Multi-trade renovation package covering electrical, plumbing, wall treatment and wooden works for a residential property at Holland Avenue.",
    images: ["/images/projects/residential.jpg"],
  },
  {
    id: "underslung-concrete-block",
    title: "Fabrication of 2,000lbs Underslung Concrete Block",
    category: "Industrial",
    location: "Tuas Industrial Estate",
    completionDate: "2023",
    scopeOfWork: [
      "Formwork & steel reinforcement mesh fabrication",
      "High-grade concrete pouring & curing",
      "Underslung load-bearing testing",
      "Quality assurance & structural compliance certification",
    ],
    description:
      "Fabrication of a heavy-duty 2,000lbs underslung concrete block for an industrial client, built to load and safety specifications.",
    images: ["/images/projects/industrial.jpg"],
  },
  {
    id: "refurbishment-pounder-m3g",
    title: "Refurbishment — Pounder, M3G Railings & Installation of LPS",
    category: "Commercial",
    location: "Central Commercial District",
    completionDate: "2024",
    scopeOfWork: [
      "Refurbishment of industrial pounder equipment",
      "Fabrication & installation of M3G safety railings",
      "Installation of Lightning Protection System (LPS)",
      "Testing & earthing certification to SS 555 standards",
    ],
    description:
      "Refurbishment works including pounder refurbishment, M3G railings, and installation of a lightning protection system (LPS) for a commercial site.",
    images: ["/images/projects/commercial.jpg"],
  },
  {
    id: "bca-braddell-letterbox",
    title: "Minor A&A Works — Letter Box Nest",
    category: "Commercial",
    location: "BCA Braddell Campus",
    completionDate: "2023",
    scopeOfWork: [
      "Minor addition & alteration (A&A) works",
      "Fabrication of stainless steel letter box nest",
      "Wall masonry integration & secure mounting",
      "Site clean-up & compliance sign-off",
    ],
    description:
      "Minor addition and alteration works including a letter box nest installation at the BCA Braddell Campus.",
    images: ["/images/projects/commercial.jpg"],
  },
  {
    id: "jalan-melor-semi-d",
    title: "Supply, Install & Waterproofing — Semi-Detached Dwelling",
    category: "Residential",
    location: "Jalan Melor",
    completionDate: "2024",
    scopeOfWork: [
      "Supply and installation of exterior & interior finishes",
      "Multi-layer polyurethane membrane waterproofing works",
      "Attic level structural addition",
      "Swimming pool tile & filtration waterproofing",
    ],
    description:
      "Supply, installation and waterproofing works for a semi-detached dwelling at Jalan Melor, including attic and swimming pool construction.",
    images: ["/images/projects/landed-house.jpg"],
  },
];

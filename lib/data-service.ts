// lib/data-service.ts
// ⭐ THE SWAP POINT — Phase 1 reads from static files.
//    Phase 2: replace function bodies only. Signatures and return types stay identical.
//    No page or component code changes required.

import { siteConfig } from "@/data/siteConfig";
import { servicesData } from "@/data/services";
import { projectCategories } from "@/data/projects";
import { projectHighlights, type ProjectHighlight } from "@/data/projectHighlights";
import { testimonialsData } from "@/data/testimonials";
import { teamData } from "@/data/team";

import type {
  SiteConfig,
  Service,
  ProjectCategory,
  Testimonial,
  TeamMember,
} from "@/types";

// ---------------------------------------------------------------------------
// Site Config
// ---------------------------------------------------------------------------

export async function getSiteConfig(): Promise<SiteConfig> {
  // PHASE 1: static file
  return siteConfig;
  // PHASE 2: return await fetch(`${process.env.API_URL}/site-config`).then(r => r.json());
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  // PHASE 1: static array
  return servicesData;
  // PHASE 2: return await fetch(`${process.env.API_URL}/services`).then(r => r.json());
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  // PHASE 1: find in static array
  return servicesData.find((s) => s.slug === slug) ?? null;
  // PHASE 2: return await fetch(`${process.env.API_URL}/services/${slug}`).then(r => r.json());
}

export async function getServiceSlugs(): Promise<string[]> {
  // PHASE 1: derive from static array
  return servicesData.map((s) => s.slug);
  // PHASE 2: return await fetch(`${process.env.API_URL}/services/slugs`).then(r => r.json());
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  // PHASE 1: static array
  return projectCategories;
  // PHASE 2: return await fetch(`${process.env.API_URL}/project-categories`).then(r => r.json());
}

export async function getProjectHighlights(): Promise<ProjectHighlight[]> {
  // PHASE 1: static array
  return projectHighlights;
  // PHASE 2: return await fetch(`${process.env.API_URL}/projects`).then(r => r.json());
}

export async function getProjectHighlightById(
  id: string
): Promise<ProjectHighlight | undefined> {
  // PHASE 1: static array
  return projectHighlights.find((p) => p.id === id);
  // PHASE 2: return await db.projectHighlights.findUnique({ where: { id } });
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function getTestimonials(): Promise<Testimonial[]> {
  // PHASE 1: static array
  return testimonialsData;
  // PHASE 2: return await fetch(`${process.env.API_URL}/testimonials`).then(r => r.json());
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

export async function getTeam(): Promise<TeamMember[]> {
  // PHASE 1: static array
  return teamData;
  // PHASE 2: return await fetch(`${process.env.API_URL}/team`).then(r => r.json());
}

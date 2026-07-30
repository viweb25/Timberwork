// lib/utils.ts
// Utility helpers

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatPhone(phone: string): string {
  // "+65 8177 5044" â†’ "8177 5044" for local display
  return phone.replace("+65 ", "");
}

import { cn } from "@/lib/utils";

type Sector = "Residential" | "Commercial" | "Industrial";

interface BadgeProps {
  label: Sector | string;
  className?: string;
}

const sectorColors: Record<string, string> = {
  Residential: "bg-green-100 text-green-800",
  Commercial: "bg-blue-100 text-blue-800",
  Industrial: "bg-orange-100 text-orange-800",
};

export function Badge({ label, className }: BadgeProps) {
  const colorClass = sectorColors[label] ?? "bg-gray-100 text-gray-700";
  return (
    <span
      className={cn(
        "inline-block text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-sm",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  );
}

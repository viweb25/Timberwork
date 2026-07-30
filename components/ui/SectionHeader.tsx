import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  highlightWord?: string;
  subheading?: string;
  centered?: boolean;
  mobileLeft?: boolean;
  light?: boolean; // white text for dark backgrounds
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  highlightWord,
  subheading,
  centered = true,
  mobileLeft = false,
  light = false,
  className,
}: SectionHeaderProps) {
  // Highlight a specific word in the heading
  const renderHeading = () => {
    if (!highlightWord) return heading;
    const parts = heading.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-brand-wood">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={cn(
        "mb-12",
        mobileLeft ? "text-left md:text-center" : centered && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 text-center",
            light ? "text-brand-woodLight" : "text-brand-wood"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-fluid-h2 font-semibold md:font-bold leading-[1.1] tracking-[-0.03em]",
          mobileLeft && "text-left md:text-center",
          light ? "text-white" : "text-brand-dark"
        )}
      >
        {renderHeading()}
      </h2>
      {subheading && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed font-normal tracking-tight max-w-2xl",
            mobileLeft ? "text-left md:text-center mx-0 md:mx-auto" : centered && "mx-auto",
            light ? "text-white/70" : "text-gray-500"
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}

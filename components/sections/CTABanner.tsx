import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface CTABannerProps {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  bgImageUrl?: string;
}

export function CTABanner({
  heading = "Let's Build Something Great Together",
  subheading = "Contact us today for a free consultation and quotation.",
  ctaLabel = "Get a Free Quote",
  ctaHref = "/contact",
  bgImageUrl = "https://res.cloudinary.com/defqgygsf/image/upload/v1785309050/img6_v5mecv.png",
}: CTABannerProps) {
  return (
    <section id="cta-banner" className="relative bg-brand-charcoal py-3 sm:py-6 md:py-8 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImageUrl}
          alt="CTA background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark100 via-brand-dark/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between gap-1.5 sm:gap-6">
          
          {/* Left Side: Logo + Single Line Text */}
          <div className="flex flex-row items-center gap-0.5 sm:gap-4 flex-1 min-w-0">
            {/* Logo Icon */}
            <div className="flex-shrink-0 w-9 h-9 min-[380px]:w-11 min-[380px]:h-11 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center relative">
              <Image 
                src="https://res.cloudinary.com/defqgygsf/image/upload/v1785310036/img7-removebg-preview_uru6ii.png" 
                alt="CTA Icon" 
                fill
                sizes="(max-width: 640px) 44px, (max-width: 768px) 80px, 96px"
                className="object-contain" 
              />
            </div>

            {/* Text Area (Strictly Single Line) */}
            <div className="flex-1 min-w-0">
              <h2 className="text-[9px] min-[360px]:text-[10px] min-[400px]:text-[11.5px] sm:text-2xl md:text-3xl font-semibold md:font-bold text-white leading-none tracking-tight whitespace-nowrap drop-shadow-sm">
                {heading}
              </h2>
              <p className="text-white/90 text-[7.5px] min-[360px]:text-[8.5px] min-[400px]:text-[9.5px] sm:text-sm md:text-base mt-1 font-normal leading-none tracking-tight whitespace-nowrap">
                {subheading}
              </p>
            </div>
          </div>

          {/* Right Side: Button with Ultra-Reduced Padding on Mobile */}
       <div className="flex-shrink-0">
  <Button 
    href={ctaHref} 
    variant="outlines" 
    size="sm" 
    arrow 
    id="cta-banner-button" 
    className="max-sm:!px-[3px] max-sm:!py-[0px] max-sm:!text-[5px] max-sm:gap-0.5 max-sm:tracking-tighter max-sm:[&_svg]:w-3 max-sm:[&_svg]:h-3 md:px-8 md:py-4 md:text-base whitespace-nowrap font-medium md:font-semibold tracking-tight"
  >
    {ctaLabel}
  </Button>
</div>

        </div>
      </div>
    </section>
  );
}
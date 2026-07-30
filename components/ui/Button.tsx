"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline"| "outlines";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  arrow?: boolean;
  id?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-wood text-white hover:bg-brand-woodLight shadow-wood hover:shadow-lg hover:-translate-y-0.5",
  secondary:
    "bg-transparent text-white border border-white hover:bg-white hover:text-brand-dark",
  ghost:
    "bg-transparent text-brand-wood hover:bg-brand-wood/10",
  outline:
    "bg-transparent text-brand-dark border border-brand-dark hover:bg-brand-dark hover:text-white",
  outlines:
  "bg-black text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  className,
  arrow = false,
  id,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 font-medium tracking-tight rounded-none transition-all duration-300 cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {children}
      {arrow && (
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} id={id} className={cn(classes, "group")} prefetch={true}>
        {content}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, "group")}
    >
      {content}
    </button>
  );
}

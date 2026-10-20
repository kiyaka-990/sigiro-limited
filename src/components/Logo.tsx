"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "color" | "light";
  href?: string;
  priority?: boolean;
}

const HEIGHTS = { sm: 30, md: 40, lg: 56 };
// Intrinsic dimensions of /logo.png (Sigiro wordmark)
const LOGO_W = 392;
const LOGO_H = 119;

export default function Logo({ className, size = "md", variant = "color", href = "/", priority = false }: LogoProps) {
  const h = HEIGHTS[size];
  const light = variant === "light";

  const img = (
    <Image
      src="/logo.png"
      alt="Sigiro Construction & General Supplies"
      width={LOGO_W}
      height={LOGO_H}
      priority={priority}
      className="w-auto object-contain"
      style={{ height: h, width: "auto" }}
    />
  );

  const content = (
    <span
      className={cn(
        "inline-flex items-center",
        // On dark backgrounds, sit the colored logo on a light chip so the
        // dark-green wordmark stays readable.
        light && "bg-white/95 rounded-xl px-2.5 py-1.5 shadow-sm",
        className
      )}
    >
      {img}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
        {content}
      </Link>
    );
  }
  return content;
}

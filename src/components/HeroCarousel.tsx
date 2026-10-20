"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: "/images/hero/road-infrastructure.jpg",
    kicker: "Road & Infrastructure",
    title: "Building the roads that connect Kenya",
    description: "From Nairobi's urban highways to rural access roads — engineered to last, delivered on schedule.",
    cta: { text: "Explore infrastructure", href: "/services#roads" },
  },
  {
    id: 2,
    image: "/images/hero/building-construction.jpg",
    kicker: "Building Construction",
    title: "Structures designed to stand for generations",
    description: "Residential, commercial and industrial buildings built to international standards with local expertise.",
    cta: { text: "See our buildings", href: "/services#building" },
  },
  {
    id: 3,
    image: "/images/hero/engineering-consultancy.jpg",
    kicker: "Engineering Consultancy",
    title: "Expert consultancy that delivers results",
    description: "Structural engineering, quantity surveying, project management and general supplies from a certified multidisciplinary team.",
    cta: { text: "Our consultancy", href: "/services" },
  },
  {
    id: 4,
    image: "/images/hero/water-works.jpg",
    kicker: "Water Works",
    title: "Clean water solutions for every community",
    description: "Boreholes, treatment plants and irrigation networks delivering reliable water across the region.",
    cta: { text: "Water solutions", href: "/services#water" },
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPlaying] = useState(true);

  const goTo = useCallback((i: number) => setCurrent(((i % slides.length) + slides.length) % slides.length), []);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [isPlaying, next, current]);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[640px] max-h-[920px] overflow-hidden bg-[#0e2016]" aria-label="Featured work">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={cn("absolute inset-0 transition-opacity duration-[1100ms] ease-in-out", i === current ? "opacity-100 z-10" : "opacity-0 z-0")}
          aria-hidden={i !== current}
        >
          <div
            className={cn("absolute inset-0 bg-cover bg-center", i === current && "animate-ken-burns")}
            style={{ backgroundImage: `url(${s.image})` }}
          />
          {/* neutral dark overlays — no green wash */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06120c]/90 via-[#06120c]/55 to-[#06120c]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06120c]/85 via-transparent to-[#06120c]/35" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div key={current} className="max-w-2xl animate-fade-in-up">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-[var(--gold)] text-xs font-bold uppercase tracking-[0.22em]">{slide.kicker}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight">
              {slide.title}
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-xl leading-relaxed">{slide.description}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={slide.cta.href}
                className="group inline-flex items-center gap-2 px-7 py-4 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white font-semibold rounded-full text-sm transition-all duration-300 shadow-xl shadow-amber-900/25 hover:-translate-y-0.5"
              >
                {slide.cta.text}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" /> Get a quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar: progress + arrows */}
      <div className="absolute z-30 inset-x-0 bottom-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between pb-8 gap-6">
            {/* numbered indicators */}
            <div className="flex items-center gap-5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className="group flex flex-col gap-2 text-left"
                  aria-label={`Go to slide ${i + 1}: ${s.kicker}`}
                >
                  <span className={cn("text-xs font-bold tabular-nums transition-colors", i === current ? "text-white" : "text-white/40 group-hover:text-white/70")}>
                    0{i + 1}
                  </span>
                  <span className="relative block h-0.5 w-10 sm:w-16 bg-white/20 overflow-hidden rounded-full">
                    <span
                      className={cn("absolute inset-y-0 left-0 bg-[var(--gold)] rounded-full", i === current ? "w-full" : "w-0")}
                      style={i === current ? { animation: "shimmer 6s linear", width: "100%" } : undefined}
                    />
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={prev} className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors" aria-label="Previous slide">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors" aria-label="Next slide">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

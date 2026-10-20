"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const services = [
  { name: "Road & Infrastructure", href: "/services#roads", desc: "Highways, access roads, bridges" },
  { name: "Building Construction", href: "/services#building", desc: "Residential, commercial, industrial" },
  { name: "Water Works", href: "/services#water", desc: "Boreholes, treatment, irrigation" },
  { name: "Landscaping", href: "/services#landscaping", desc: "Green spaces & horticulture" },
  { name: "Project Management", href: "/services#pm", desc: "Supervision & cost control" },
  { name: "General Supplies", href: "/services#supplies", desc: "Goods, materials & equipment" },
  { name: "Quantity Surveying", href: "/services#qs", desc: "BOQs & cost management" },
  { name: "Structural Engineering", href: "/services#structural", desc: "Analysis & foundation design" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // On home page, navbar floats over a dark hero until scrolled
  const overHero = pathname === "/" && !scrolled;
  const solid = !overHero;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        solid
          ? "bg-white/90 dark:bg-[#0c1a12]/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(15,23,42,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Logo size="md" variant={overHero ? "light" : "color"} priority />

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesOpen((v) => !v)}
                    className={cn(
                      "nav-link flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive(link.href) && "active",
                      solid
                        ? "text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                        : "text-white/90 hover:text-white"
                    )}
                    aria-expanded={servicesOpen}
                  >
                    {link.name}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", servicesOpen && "rotate-180")} />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[440px] bg-white dark:bg-[#11271b] rounded-2xl shadow-2xl shadow-slate-900/15 border border-slate-100 dark:border-[#16331f] p-2 animate-slide-down">
                      <div className="grid grid-cols-2 gap-1">
                        {services.map((sv) => (
                          <Link
                            key={sv.href}
                            href={sv.href}
                            className="group flex flex-col px-3 py-2.5 rounded-xl hover:bg-[#f3f8f4] dark:hover:bg-slate-800/60 transition-colors"
                          >
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[var(--gold)] transition-colors">
                              {sv.name}
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">{sv.desc}</span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/services"
                        className="flex items-center justify-center gap-2 mt-2 mx-1 mb-1 py-2.5 rounded-xl bg-[#0e2016] dark:bg-[#15351f] text-white text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                      >
                        View all services <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "nav-link px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive(link.href) && "active",
                    solid
                      ? "text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <div className={cn("w-px h-6", solid ? "bg-slate-200 dark:bg-[#1c3b27]" : "bg-white/20")} />
            <a
              href="tel:+254722311108"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                solid ? "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" : "text-white/80 hover:text-white"
              )}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+254 722 311 108</span>
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-amber-900/15 hover:shadow-amber-900/25"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen((v) => !v)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                solid ? "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800" : "text-white hover:bg-white/10"
              )}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white dark:bg-[#0c1a12] border-t border-slate-100 dark:border-[#16331f] overflow-y-auto animate-slide-down">
          <div className="px-4 py-5 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-colors",
                    isActive(link.href)
                      ? "bg-[#0e2016] text-white"
                      : "text-slate-700 dark:text-slate-200 hover:bg-[#f3f8f4] dark:hover:bg-slate-800"
                  )}
                >
                  {link.name}
                </Link>
                {link.hasDropdown && (
                  <div className="mt-1 ml-3 grid grid-cols-1 gap-0.5">
                    {services.map((sv) => (
                      <Link
                        key={sv.href}
                        href={sv.href}
                        className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-[var(--gold)] transition-colors"
                      >
                        {sv.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 mt-2 border-t border-slate-100 dark:border-[#16331f] space-y-3">
              <a
                href="tel:+254722311108"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                <Phone className="w-4 h-4 text-[var(--gold)]" /> +254 722 311 108
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-[var(--gold)] text-white text-base font-semibold rounded-xl"
              >
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

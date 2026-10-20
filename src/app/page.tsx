import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Building2, Droplets,
  Trees, HardHat, Package, BarChart3, Star, Quote,
} from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import AnimatedCounter from "@/components/AnimatedCounter";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Home" };

const services = [
  { icon: HardHat, title: "Road & Infrastructure", desc: "Urban highways, rural access roads, bridges and drainage engineered for Kenya's terrain.", href: "/services#roads" },
  { icon: Building2, title: "Building Construction", desc: "Residential, commercial and industrial structures built to international standards.", href: "/services#building" },
  { icon: Droplets, title: "Water Works", desc: "Borehole drilling, treatment plants, irrigation and complete plumbing systems.", href: "/services#water" },
  { icon: Trees, title: "Landscaping", desc: "Sustainable green spaces, garden design, sports turf and environmental restoration.", href: "/services#landscaping" },
  { icon: Package, title: "General Supplies", desc: "Quality goods, building materials and equipment supplied nationwide — on time and on budget.", href: "/services#supplies" },
  { icon: BarChart3, title: "Project Management", desc: "End-to-end supervision from planning through commissioning — on time, on budget.", href: "/services#pm" },
];

const stats = [
  { value: 100, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: " yrs", label: "Industry experience" },
  { value: 200, suffix: "+", label: "Satisfied clients" },
  { value: 47, suffix: "", label: "Counties served" },
];

const projects = [
  { title: " Road Expansion Phase II", category: "Roads", image: "/images/projects/road-expansion.jpg", desc: "12km dual carriageway with modern drainage and pedestrian walkways." },
  { title: " Water Treatment Plant", category: "Water Works", image: "/images/projects/water-treatment-plant.jpg", desc: "5,000 m³/day treatment facility serving Lavington residents." },
  { title: " Residential Buildings", category: "Buildings", image: "/images/projects/residential-buildings.jpg", desc: "18-storey Grade A office tower with smart building systems." },
];

const testimonials = [
  { name: "James Mwangi", role: "CEO, Westlands Development Ltd", text: "Sigiro delivered our commercial complex on time and within budget. Their attention to detail is unmatched in the Kenyan market.", rating: 5 },
  { name: "Grace Wanjiku", role: "Director, Nairobi County", text: "Their reliable supplies and professional team helped us keep every site running without delays. A genuinely professional outfit.", rating: 5 },
  { name: "Ahmed Hassan", role: "Project Manager, KeNHA", text: "Outstanding road construction on the Ngong Road expansion. The team consistently exceeded our quality expectations.", rating: 5 },
];

const certs = ["NCA Grade A", "EBK", "NEMA", "BORAQS", "ISO 9001:2015"];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      {/* Trust bar */}
      <section className="bg-[#0e2016] dark:bg-[#06120c] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-slate-400 text-sm font-medium">Certified &amp; accredited by Kenya&apos;s leading bodies</p>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {certs.map((c) => (
                <span key={c} className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[var(--gold)]" /> {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white dark:bg-[#0c1a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow">What we do</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Full-spectrum construction &amp; engineering consultancy
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 lg:max-w-sm leading-relaxed">
              From groundbreaking to commissioning, we deliver integrated infrastructure solutions across Kenya — under one accountable team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 dark:bg-[#15351f] rounded-3xl overflow-hidden border border-slate-100 dark:border-[#16331f]">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group relative bg-white dark:bg-[#0c1a12] p-8 transition-colors hover:bg-[#f3f8f4] dark:hover:bg-[#11271b]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0e2016] dark:bg-[#15351f] flex items-center justify-center group-hover:bg-[var(--gold)] transition-colors duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-[var(--gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/services" className="group inline-flex items-center gap-2 px-7 py-3.5 border border-slate-300 dark:border-[#16331f] text-slate-900 dark:text-white font-semibold rounded-full text-sm hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">
              View all 12 services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* About split */}
      <section className="py-24 bg-[#f3f8f4] dark:bg-[#06120c] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-[#0e2016] via-[#123021] to-[#0a1710] dot-grid">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                  <div className="w-36 h-36 rounded-full border-2 border-[var(--gold)]/40 flex items-center justify-center mb-6">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-2xl shadow-amber-900/40">
                      <span className="text-white text-4xl font-black tracking-tight">MA</span>
                    </div>
                  </div>
                  <p className="text-white text-xl font-black">Eng. Mohamednoor Adan</p>
                  <p className="text-[var(--gold)] text-sm font-semibold mt-1">Managing Director &amp; Founder</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-slate-400 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">15+ yrs experience</span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">EBK Registered</span>
                  </div>
                </div>
                <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-[var(--gold)]/50 rounded-tl-xl" />
                <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-[var(--gold)]/50 rounded-br-xl" />
              </div>
              {/* stat card */}
              <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white dark:bg-[#11271b] rounded-2xl shadow-xl border border-slate-100 dark:border-[#16331f] p-5 w-44">
                <p className="text-3xl font-black text-slate-900 dark:text-white">
                  KES <AnimatedCounter end={2} suffix="B+" />
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">in completed project value since 2010</p>
              </div>
            </div>

            <div>
              <span className="eyebrow">Who we are</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                A trusted partner in Kenya&apos;s built environment
              </h2>
              <p className="mt-5 text-slate-600 dark:text-slate-300 leading-relaxed">
                Founded by <strong className="text-slate-900 dark:text-white">Eng. Mohamednoor Adan</strong>, Sigiro Construction & General Supplies has grown from a focused consultancy into one of Nairobi&apos;s most trusted construction and engineering firms — with a portfolio spanning all 47 counties.
              </p>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                Our multidisciplinary team of engineers, architects, quantity surveyors and supply-chain specialists brings decades of combined expertise to every project.
              </p>
              <ul className="mt-7 grid sm:grid-cols-2 gap-3">
                {[
                  "Over KES 2 Billion delivered",
                  "Certified NCA, EBK, NEMA, BORAQS",
                  "ISO 9001:2015 quality system",
                  "98% client satisfaction rate",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0e2016] dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full text-sm hover:-translate-y-0.5 transition-transform">
                  About the firm <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/projects" className="inline-flex items-center px-7 py-3.5 text-slate-900 dark:text-white font-semibold rounded-full text-sm border border-slate-300 dark:border-[#16331f] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">
                  View projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative py-20 bg-[#0e2016] dark:bg-[#06120c] dot-grid overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 h-px w-10 bg-[var(--gold)] mx-auto lg:mx-0" />
                <p className="mt-3 text-slate-400 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 bg-white dark:bg-[#0c1a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Featured projects</h2>
            </div>
            <Link href="/projects" className="group inline-flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm hover:text-[var(--gold)] transition-colors">
              View full portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 90} from="up" className="h-full">
                <Link href="/projects" className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-[#11271b] border border-slate-100 dark:border-[#16331f] card-hover">
                  <div className="relative h-60 overflow-hidden img-zoom">
                    <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06120c]/60 to-transparent" />
                    <span className="absolute top-4 left-4 bg-white/95 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">{p.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[var(--gold)] transition-colors">{p.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#f3f8f4] dark:bg-[#06120c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="eyebrow justify-center">Client voices</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">What our clients say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal as="div" key={t.name} delay={i * 90} from="up" className="h-full">
              <figure className="h-full bg-white dark:bg-[#11271b] p-8 rounded-2xl border border-slate-100 dark:border-[#16331f] flex flex-col">
                <Quote className="w-8 h-8 text-[var(--gold)] mb-5" />
                <blockquote className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-1">&ldquo;{t.text}&rdquo;</blockquote>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                  ))}
                </div>
                <figcaption className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0e2016] dark:bg-[#1c3b27] flex items-center justify-center text-white font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="py-24 bg-[#0e2016] dark:bg-[#06120c] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[var(--gold)]/10 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow justify-center">Let&apos;s build</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Ready to start your next project?
          </h2>
          <p className="mt-5 text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Get a free consultation from our expert team. We respond to every enquiry within 24 hours.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white font-semibold rounded-full text-sm transition-all hover:-translate-y-0.5 shadow-xl shadow-amber-900/25">
              Get a free consultation
            </Link>
            <a href="https://wa.me/254722311108" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/25 text-white font-semibold rounded-full text-sm hover:bg-white/10 transition-colors">
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

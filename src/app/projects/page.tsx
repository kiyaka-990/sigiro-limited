import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Calendar, Tag } from "lucide-react";
import { listProjects } from "@/lib/server/db";

// Rendered per-request in the worker so portal edits appear immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Sigiro Construction & General Supplies' portfolio of completed construction and consultancy projects across Kenya — roads, buildings, water works, landscaping, and more.",
};

export default async function ProjectsPage() {
  const projects = (await listProjects()).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    location: p.location,
    year: p.year,
    value: p.value,
    image: p.image,
    desc: p.description,
    client: p.client,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-[#0a1710] via-[#0e2016] to-[#123021] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="animate-float absolute top-5 left-20 w-72 h-72 bg-white rounded-full" />
          <div className="animate-float absolute bottom-5 right-20 w-64 h-64 bg-white rounded-full" style={{ animationDelay: "4s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Our Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">
            Projects That{" "}
            <span className="text-[var(--gold)]">Transform Kenya</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            From Nairobi&apos;s skyline to Kenya&apos;s rural heartland — our projects are building the nation one milestone at a time.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white dark:bg-[#11271b] border-b border-slate-100 dark:border-[#16331f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { val: "100+", label: "Total Projects" },
              { val: "KES 2B+", label: "Total Value" },
              { val: "47", label: "Counties Served" },
              { val: "98%", label: "On-Time Delivery" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-black text-[var(--gold)]">{s.val}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <section className="py-20 bg-white dark:bg-[#0c1a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group bg-white dark:bg-[#11271b] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#16331f] card-hover"
              >
                <div className="relative h-52 overflow-hidden img-zoom">
                  <img loading="lazy" decoding="async"
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#0e2016] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Tag className="w-3 h-3" /> {project.category}
                    </span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        project.status === "Completed"
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-black text-base leading-tight">{project.title}</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 pt-1 border-t border-gray-100 dark:border-[#16331f] mt-1">
                    <span className="flex items-center gap-1 pt-3">
                      <MapPin className="w-3.5 h-3.5 text-brand-green" /> {project.location}
                    </span>
                    <span className="flex items-center gap-1 pt-3">
                      <Calendar className="w-3.5 h-3.5 text-brand-green" /> {project.year}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {projects.length === 0 && (
            <p className="text-center text-gray-400 dark:text-gray-500 py-16">
              Projects are on their way — check back soon.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f3f8f4] dark:bg-[#06120c]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Ready to Add Your Project to Our Portfolio?</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
            Join 200+ satisfied clients who trust Sigiro to deliver outstanding results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-9 py-4 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white font-black rounded-full text-base transition-all hover:-translate-y-1 shadow-xl inline-block">
              Start Your Project
            </Link>
            <Link href="/services" className="px-9 py-4 border-2 border-slate-300 text-[var(--gold)] dark:border-[#16331f] font-black rounded-full text-base hover:bg-[var(--gold)] hover:text-white dark:hover:bg-[var(--gold)] dark:hover:text-white transition-all inline-block">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

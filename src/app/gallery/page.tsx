import type { Metadata } from "next";
import Link from "next/link";
import { Images, Film, ImageIcon, ArrowRight } from "lucide-react";
import { listMedia } from "@/lib/server/db";

// Live uploads — rendered per-request so new media appears immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and videos from Sigiro Construction & General Supplies project sites across Kenya.",
};

export default async function GalleryPage() {
  const media = await listMedia();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 bg-gradient-to-br from-[#0a1710] via-[#0e2016] to-[#123021] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="animate-float absolute top-5 left-20 w-72 h-72 bg-white rounded-full" />
          <div className="animate-float absolute bottom-5 right-20 w-64 h-64 bg-white rounded-full" style={{ animationDelay: "4s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            <Images className="w-3.5 h-3.5" /> Site Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">
            Our Work <span className="text-[var(--gold)]">In Focus</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Photos and videos from our project sites — machinery, milestones and the people building Kenya.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-white dark:bg-[#0c1a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {media.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-dashed border-slate-200 dark:border-[#16331f] bg-[#f3f8f4] dark:bg-[#06120c]">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0e2016] flex items-center justify-center mb-5">
                <ImageIcon className="w-8 h-8 text-[var(--gold)]" />
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Gallery coming together</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm">
                New photos and videos are being added from our sites. Check back soon.
              </p>
              <div className="mt-6">
                <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white text-sm font-bold rounded-full transition-colors">
                  See our projects <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {media.map((item) => (
                <figure
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden border border-slate-100 dark:border-[#16331f] bg-slate-100 dark:bg-[#11271b] card-hover"
                >
                  <div className="aspect-[4/3]">
                    {item.kind === "video" ? (
                      <video
                        src={`/media/${item.id}`}
                        preload="metadata"
                        muted
                        playsInline
                        controls
                        className="w-full h-full object-cover bg-black"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/media/${item.id}`}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover img-zoom transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1.5 text-white text-xs font-semibold truncate">
                      {item.kind === "video" ? <Film className="w-3.5 h-3.5 text-[var(--gold)]" /> : <ImageIcon className="w-3.5 h-3.5 text-[var(--gold)]" />}
                      {item.name}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f3f8f4] dark:bg-[#06120c]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4">
            Want to see a project in person?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white font-bold rounded-full text-sm transition-all hover:-translate-y-0.5 shadow-xl inline-block">
              Book a site visit
            </Link>
            <Link href="/projects" className="px-8 py-3.5 border-2 border-slate-300 text-[var(--gold)] dark:border-[#16331f] font-bold rounded-full text-sm hover:bg-[var(--gold)] hover:text-white transition-all inline-block">
              Full portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

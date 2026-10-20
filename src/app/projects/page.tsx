import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Calendar, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Sigiro Construction & General Supplies' portfolio of completed construction and consultancy projects across Kenya — roads, buildings, water works, landscaping, and more.",
};

const categories = ["All", "Roads", "Buildings", "Water Works", "Landscaping", "Environment", "Consultancy"];

const projects = [
  {
    id: 1,
    title: " Road Expansion ",
    category: "Roads",
    status: "Completed",
    location: "Kilifi, Kenya",
    year: "2023",
    value: "KES 20M",
    image: "/images/projects/road-expansion.jpg",
    desc: "routine maintenance and spot improvement contract, managing earthworks, vegetative clearing, and asphalt concrete placement to meet strict alignment and design specifications.",
    client: "Kenya National Highways Authority (KeNHA)",
  },
  {
    id: 2,
    title: " Water Treatment Plant",
    category: "Water Works",
    status: "Completed",
    location: "Lavington, Nairobi",
    year: "2025",
    value: "KES 180M",
    image: "/images/projects/water-treatment-plant.jpg",
    desc: "structural evaluation and rehabilitation of water treatment infrastructure, sedimentation basins, chemical dosing lines, and peripheral safety handrails",
    client: "Nairobi City Water & Sewerage Company",
  },
  {
    id: 3,
    title: "Karen Business Park Development",
    category: "Landscaping",
    status: "Completed",
    location: "Karen, Nairobi",
    year: "2026",
    value: "KES 15M",
    image: "/images/projects/landscaping.jpg",
    desc: "50-acre mixed-use development featuring premium landscaping, Japanese gardens, water features, and sustainable green spaces.",
    client: "Karen Properties Ltd",
  },
  {
    id: 4,
    title: "Embakasi Industrial Complex",
    category: "Buildings",
    status: "Completed",
    location: "Embakasi, Nairobi",
    year: "2024",
    value: "KES 320M",
    image: "/images/projects/industrial-complex.jpg",
    desc: "8-unit warehouse development with modern loading bays, office facilities, fire suppression systems, and solar power integration.",
    client: "Embakasi Developers Ltd",
  },
  {
    id: 5,
    title: "Nairobi River Rehabilitation",
    category: "Environment",
    status: "Completed",
    location: "Nairobi CBD",
    year: "2025",
    value: "KES 95M",
    image: "/images/projects/nairobi-river-rehabilitation.jpg",
    desc: "Environmental restoration of a 3km stretch of the Nairobi River including riparian planting, bank stabilization, and pollution control.",
    client: "Nairobi Metropolitan Services (NMS)",
  },
  {
    id: 6,
    title: "Syokimau Residential Estate",
    category: "Buildings",
    status: "Completed",
    location: "Syokimau, Machakos",
    year: "2025",
    value: "KES 550M",
    image: "images/projects/syokimau-residential-estate.jpg",
    desc: "120-unit gated residential estate with 3 & 4-bedroom units, clubhouse, swimming pool, and comprehensive utilities.",
    client: "Syokimau Holdings Ltd",
  },
  {
    id: 7,
    title: "Road Drainage Upgrade",
    category: "Roads",
    status: "Completed",
    location: "Landhies road, Nairobi",
    year: "2024",
    value: "KES 51M",
    image: "/images/projects/road-drainage.jpg",
    desc: "Stormwater drainage system upgrade along Landhies Road, eliminating chronic flooding and improving traffic flow.",
    client: "Nairobi City Water & Sewerage Company (NCWSC)",
  },
  {
    id: 8,
    title: "Urban roads",
    category: "Roads",
    status: "Ongoing",
    location: "Nairobi County, Kenya",
    year: "2024",
    value: "KES 180M",
    image: "/images/projects/nairobi-roads.jpg",
    desc: "Improvement of access roads to College and periodic maintenance of Kabarsiran Road",
    client: "Kenya Ports Authority (KPA)",
  },
  {
    id: 9,
    title: "Westlands Office Tower",
    category: "Buildings",
    status: "Ongoing",
    location: "Westlands, Nairobi",
    year: "2024",
    value: "KES 890M",
    image: "/images/projects/Universal-Towers.jpg",
    desc: "Grade A office tower with underground parking, smart building systems, and LEED-aligned sustainability features.",
    client: "Westlands Development Ltd",
  },
  {
    id: 10,
    title: "Rural Water Supply",
    category: "Water Works",
    status: "Completed",
    location: "Kakamega County",
    year: "2022",
    value: "KES 140M",
    image: "/images/projects/water-supply.jpg",
    desc: "Rural water supply scheme serving 15,000 households across 8 sub-locations with boreholes, pipelines, and community kiosks.",
    client: "Kilyan Group Ltd",
  },
  {
    id: 11,
    title: "Landscaping & Grounds",
    category: "Landscaping",
    status: "Completed",
    location: "Runda",
    year: "2021",
    value: "KES 55M",
    image: "/images/projects/landscaping-2.jpg",
    desc: "Comprehensive landscaping  approaches, parking areas, and airside green spaces covering 30+ acres.",
    client: "Private Aviation Services Ltd",
  },
  {
    id: 12,
    title: "Construction of Single Residential House",
    category: "Building",
    status: "Completed",
    location: "Nairobi County",
    year: "2020",
    value: "KES 22M",
    image: "/images/projects/patel.jpg",
    desc: "Construction of fully furnished complete with landscaping services of a Single Residential House.",
    client: "Umang Patel",
  },
];

export default function ProjectsPage() {
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

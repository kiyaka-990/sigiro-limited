import type { Metadata } from "next";
import Link from "next/link";
import {
  HardHat, Building2, Droplets, Trees, Package, BarChart3,
  Ruler, Zap, Layers, Waves, Mountain, ArrowRight, CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Sigiro Construction & General Supplies' full range of services: roads, buildings, water works, landscaping, general supplies of goods, project management, structural engineering, and more.",
};

const services = [
  {
    id: "roads",
    icon: HardHat,
    title: "Road & Infrastructure Construction",
    subtitle: "Building Kenya's connectivity",
    image: "/images/services/road-construction.jpg",
    description:
      "We design and construct roads that withstand Kenya's diverse terrain and climate — from Nairobi's urban arterials to remote county roads. Our experienced teams work with asphalt, concrete, murram and paving block technologies.",
    features: [
      "Urban dual carriageways & highways",
      "Rural access roads & feeder roads",
      "Bridges, culverts & drainage structures",
      "Traffic management & road markings",
      "Road rehabilitation & maintenance",
      "Parking lots & driveways",
      "Pedestrian walkways & cycling paths",
      "KeNHA & KeRRA certified works",
    ],
    color: "bg-orange-50 dark:bg-orange-900/20",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-600",
  },
  {
    id: "building",
    icon: Building2,
    title: "Building Construction",
    subtitle: "Structures built to last generations",
    image: "/images/services/building-construction.jpg",
    description:
      "From residential homes to commercial towers, our building construction team delivers projects of any scale with precision. We employ modern construction methods including reinforced concrete, structural steel, and masonry.",
    features: [
      "Residential (bungalows, maisonettes, apartments)",
      "Commercial (offices, malls, hotels, retail)",
      "Industrial (factories, warehouses, plants)",
      "Institutional (schools, hospitals, churches)",
      "High-rise & multi-storey construction",
      "Renovation & fit-out works",
      "BIM design integration",
      "NCA Grade A certified",
    ],
    color: "bg-blue-50 dark:bg-blue-900/20",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    id: "water",
    icon: Droplets,
    title: "Water Works & Plumbing",
    subtitle: "Delivering life-sustaining water solutions",
    image: "/images/services/water-works.jpg",
    description:
      "Clean water is the foundation of healthy communities. Our water works division specializes in designing, constructing, and maintaining comprehensive water supply and sanitation systems across Kenya.",
    features: [
      "Water supply reticulation systems",
      "Borehole drilling & equipping",
      "Water treatment plants (WTP)",
      "Elevated water storage tanks",
      "Irrigation systems (drip, sprinkler, furrow)",
      "Sewerage & wastewater treatment",
      "HDPE, PVC & steel pipeline laying",
      "Water quality testing & monitoring",
    ],
    color: "bg-cyan-50 dark:bg-cyan-900/20",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
  },
  {
    id: "landscaping",
    icon: Trees,
    title: "Landscaping & Horticulture",
    subtitle: "Transforming spaces into green sanctuaries",
    image: "/images/services/landscaping.jpg",
    description:
      "Our landscaping team creates stunning, sustainable outdoor environments that enhance aesthetics, biodiversity, and wellbeing. From corporate campuses to residential gardens, we bring nature and design together.",
    features: [
      "Garden design & installation",
      "Lawn establishment & maintenance",
      "Tree planting & arboriculture",
      "Irrigation system design & installation",
      "Sports turf & football pitches",
      "Golf course construction",
      "Green roofing systems",
      "Ecological restoration & reforestation",
    ],
    color: "bg-[#f3f8f4] dark:bg-[#15351f]/40",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
  {
    id: "supplies",
    icon: Package,
    title: "General Supplies of Goods",
    subtitle: "Reliable supply chain for every project",
    image: "/images/services/general-supplies.jpg",
    description:
      "We supply a wide range of goods to institutions, businesses, and project sites across Kenya — from construction materials to office consumables. Our supply arm keeps projects moving with quality products, competitive pricing, and dependable delivery.",
    features: [
      "Building materials & hardware supplies",
      "Office supplies & stationery",
      "Protective gear & safety equipment",
      "Plumbing & electrical fittings",
      "Furniture & office equipment",
      "Industrial & cleaning consumables",
      "Tender & supply-chain fulfillment",
      "Countrywide delivery & logistics",
    ],
    color: "bg-[#f3f8f4] dark:bg-[#15351f]/40",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
  {
    id: "pm",
    icon: BarChart3,
    title: "Project Management & Supervision",
    subtitle: "Delivering on time, on budget, every time",
    image: "/images/services/project-management.jpg",
    description:
      "Our project management consultancy ensures your construction project runs smoothly from inception to commissioning. We integrate modern tools like MS Project, Primavera P6, and BIM to maximize efficiency.",
    features: [
      "Project planning & scheduling (Primavera P6)",
      "Full-time resident engineer supervision",
      "Cost management & budget control",
      "Quality assurance & quality control",
      "Risk assessment & management",
      "Contractor & subcontractor management",
      "Weekly & monthly progress reporting",
      "Final commissioning & handover",
    ],
    color: "bg-purple-50 dark:bg-purple-900/20",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
  },
  {
    id: "structural",
    icon: Layers,
    title: "Structural Engineering",
    subtitle: "Engineering strength into every structure",
    image: "/images/services/structural-engineering.jpg",
    description:
      "Our structural engineering team uses advanced analysis software (ETABS, SAP2000, SAFE) to design safe, efficient structural systems for all building types — from foundations to roof structures.",
    features: [
      "Structural analysis & design",
      "Foundation engineering (piles, raft, pad)",
      "Reinforced concrete structures",
      "Structural steel design & fabrication",
      "Retaining wall & basement design",
      "Seismic & wind load analysis",
      "Structural condition surveys",
      "EBK peer review certification",
    ],
    color: "bg-[#f3f8f4] dark:bg-[#0e2016]/20",
    iconBg: "bg-gradient-to-br from-slate-500 to-gray-600",
  },
  {
    id: "qs",
    icon: Ruler,
    title: "Quantity Surveying",
    subtitle: "Precise cost management for every project",
    image: "/images/services/quantity-surveying.jpg",
    description:
      "Our BORAQS-registered quantity surveyors provide comprehensive cost management services, ensuring your project achieves value for money through accurate measurement and cost control from design to completion.",
    features: [
      "Bills of Quantities (BOQ) preparation",
      "Cost planning & feasibility studies",
      "Tender documentation & evaluation",
      "Contract administration",
      "Interim & final valuations",
      "Claims preparation & assessment",
      "Value engineering",
      "Life cycle costing analysis",
    ],
    color: "bg-amber-50 dark:bg-amber-900/20",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    id: "mep",
    icon: Zap,
    title: "Mechanical & Electrical Engineering",
    subtitle: "Powering modern buildings intelligently",
    image: "/images/services/mechanical-electrical-engineering.jpg",
    description:
      "Our M&E team designs and installs comprehensive mechanical and electrical systems — from HVAC to solar — ensuring energy-efficient, compliant, and reliable building services.",
    features: [
      "Electrical installation & design",
      "HVAC systems (heating, ventilation, AC)",
      "Fire detection & suppression systems",
      "Solar & renewable energy systems",
      "Plumbing & sanitary works",
      "Lifts & escalators coordination",
      "Building Management Systems (BMS)",
      "Compliance with Kenya Electrical Code",
    ],
    color: "bg-yellow-50 dark:bg-yellow-900/20",
    iconBg: "bg-gradient-to-br from-yellow-500 to-amber-600",
  },
  {
    id: "drainage",
    icon: Waves,
    title: "Drainage & Sewerage",
    subtitle: "Managing water for safer communities",
    image: "/images/services/drainage-sewerage.jpg",
    description:
      "Effective drainage prevents flooding, property damage, and disease. Our drainage specialists design and construct stormwater management, sewerage networks, and wastewater treatment systems.",
    features: [
      "Stormwater management systems",
      "Urban drainage networks",
      "Sewer design & construction",
      "Wastewater treatment plants",
      "Septic tank & biodigestor systems",
      "Drain rehabilitation & CCTV surveys",
      "Flood risk assessment",
      "WASPA compliant designs",
    ],
    color: "bg-sky-50 dark:bg-sky-900/20",
    iconBg: "bg-gradient-to-br from-sky-500 to-cyan-600",
  },
  {
    id: "geotechnical",
    icon: Mountain,
    title: "Geotechnical Engineering",
    subtitle: "Understanding the ground beneath your project",
    image: "/images/services/geotechnical-engineering.jpg",
    description:
      "Solid foundations begin with understanding the ground. Our geotechnical team conducts comprehensive site investigations, soil testing, and ground improvement works to ensure safe and economical foundations.",
    features: [
      "Site investigation & soil testing",
      "Borehole & trial pit excavation",
      "Geotechnical reporting",
      "Foundation design recommendations",
      "Ground improvement works",
      "Slope stability analysis",
      "Soil contamination assessment",
      "Pile load testing",
    ],
    color: "bg-stone-50 dark:bg-stone-900/20",
    iconBg: "bg-gradient-to-br from-stone-500 to-amber-700",
  },
  {
    id: "urban",
    icon: Building2,
    title: "Urban & Regional Planning",
    subtitle: "Shaping Kenya's cities for tomorrow",
    image: "/images/services/urban-regional-planning.jpg",
    description:
      "Our urban planners work with county governments, developers, and communities to create sustainable, livable spaces through evidence-based land use planning and urban design.",
    features: [
      "Physical development plans",
      "Local urban structure plans",
      "Land use & zoning plans",
      "Urban design & streetscaping",
      "GIS mapping & spatial analysis",
      "County spatial plans",
      "Development control services",
      "Participatory planning processes",
    ],
    color: "bg-indigo-50 dark:bg-indigo-900/20",
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-[#0a1710] via-[#0e2016] to-[#123021] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="animate-float absolute top-10 right-20 w-80 h-80 bg-white rounded-full" />
          <div className="animate-float absolute bottom-0 left-10 w-64 h-64 bg-[var(--gold)] rounded-full" style={{ animationDelay: "2s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            What We Offer
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">
            Construction &{" "}
            <span className="text-[var(--gold)]">Consultancy Services</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive engineering and construction solutions tailored for Kenya&apos;s infrastructure needs — from feasibility to commissioning.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-white dark:bg-[#0c1a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center scroll-mt-24 ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Image */}
                <div className={`relative rounded-3xl overflow-hidden shadow-2xl img-zoom ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <img loading="lazy" decoding="async"
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`} />
                </div>

                {/* Content */}
                <div className={`space-y-5 ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-[var(--gold)] text-xs font-bold uppercase tracking-widest mb-2">
                      {service.subtitle}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white font-bold rounded-full text-sm transition-all duration-300 hover:-translate-y-1 shadow-lg"
                  >
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0e2016] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Don&apos;t See What You Need?</h2>
          <p className="text-slate-300 text-lg mb-8">
            Our team handles custom projects across all areas of civil engineering and construction. Contact us to discuss your specific requirements.
          </p>
          <Link href="/contact" className="px-9 py-4 bg-white text-[var(--gold)] font-black rounded-full text-base hover:bg-green-50 transition-all hover:-translate-y-1 shadow-xl inline-block">
            Contact Our Experts
          </Link>
        </div>
      </section>
    </>
  );
}

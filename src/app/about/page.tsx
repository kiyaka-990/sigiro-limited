import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Award, Users, Target, Eye, Heart, Mail } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sigiro Construction & General Supplies — our history, mission, vision, and the expert team led by Director Eng. Mohamednoor Adan based in Nairobi.",
};

const values = [
  {
    icon: Award,
    title: "Excellence",
    desc: "We uphold the highest standards in every project, ensuring quality that exceeds client expectations and industry benchmarks.",
    color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
  },
  {
    icon: Heart,
    title: "Integrity",
    desc: "Transparent dealings, honest timelines, and fair pricing are non-negotiable foundations of our business culture.",
    color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600",
  },
  {
    icon: Target,
    title: "Innovation",
    desc: "We embrace modern technologies, sustainable practices, and creative solutions to deliver cutting-edge infrastructure.",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Every project is an opportunity to uplift the communities we serve, creating lasting social and economic value.",
    color: "bg-slate-100 dark:bg-[#15351f] text-brand-green",
  },
];

const team = [
  {
    name: "Eng. Mohamednoor Adan",
    initials: "MA",
    role: "Managing Director & Founder",
    specialty: "Civil & Structural Engineering",
    accent: "from-amber-500 to-amber-700",
    bio: "15+ years in construction and consultancy. MSc Civil Engineering, University of Nairobi. EBK Registered.",
  },
  {
    name: "Eng. Fatuma Ochieng",
    initials: "FO",
    role: "Chief Engineer",
    specialty: "Roads & Infrastructure",
    accent: "from-emerald-500 to-emerald-700",
    bio: "12 years road construction expertise. BSc Civil Engineering. KeNHA certified contractor.",
  },
  {
    name: "Arch. Salim Mwangi",
    initials: "SM",
    role: "Lead Architect",
    specialty: "Architectural Design",
    accent: "from-sky-500 to-blue-700",
    bio: "AAK registered architect with 10 years designing iconic Kenyan structures.",
  },
  {
    name: "Vincent Ngala",
    initials: "AK",
    role: "Landscaper & Urban Planner",
    specialty: "Cost Management",
    accent: "from-violet-500 to-purple-700",
    bio: "BORAQS registered, 8 years delivering accurate BOQs and financial management.",
  },
];

const certifications = [
  { name: "NCA", full: "National Construction Authority", grade: "Grade A" },
  { name: "EBK", full: "Engineers Board of Kenya", grade: "Full Member" },
  { name: "NEMA", full: "National Environment Management Authority", grade: "EIA Certified" },
  { name: "BORAQS", full: "Board of Registration of Architects & Quantity Surveyors", grade: "Registered" },
  { name: "AAK", full: "Architectural Association of Kenya", grade: "Corporate Member" },
  { name: "ISO 9001", full: "Quality Management System", grade: "2015 Certified" },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-[#0a1710] via-[#0e2016] to-[#123021] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="animate-float absolute top-10 left-10 w-72 h-72 bg-emerald-400 rounded-full" />
          <div className="animate-float absolute bottom-10 right-10 w-64 h-64 bg-[var(--gold)] rounded-full" style={{ animationDelay: "3s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            About Sigiro
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">
            Building Kenya&apos;s Future<br />
            <span className="text-[var(--gold)]">Since 2010</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            A premier engineering construction and supplies firm headquartered in Nairobi — delivering excellence across Kenya.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white dark:bg-[#11271b] border-b border-slate-100 dark:border-[#16331f] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 100, suffix: "+", label: "Projects Completed" },
              { value: 2, prefix: "KES ", suffix: "B+", label: "Project Value" },
              { value: 200, suffix: "+", label: "Happy Clients" },
              { value: 47, suffix: "", label: "Counties Served" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-black text-[var(--gold)]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#f3f8f4] dark:bg-[#06120c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-[#11271b] rounded-3xl p-8 border border-slate-100 dark:border-[#16331f] card-hover">
              <div className="w-12 h-12 bg-slate-100 dark:bg-[#15351f] rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To deliver innovative, sustainable, and high-quality construction and consultancy solutions that transform communities, drive Kenya&apos;s economic development, and create lasting value for our clients and society.
              </p>
            </div>
            <div className="bg-white dark:bg-[#11271b] rounded-3xl p-8 border border-slate-100 dark:border-[#16331f] card-hover">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To be the most trusted and innovative construction and consultancy partner in East Africa, recognized for excellence, integrity, and our transformative impact on the built environment.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white dark:bg-[#11271b] rounded-2xl p-6 border border-gray-100 dark:border-[#16331f] card-hover text-center">
                  <div className={`w-14 h-14 rounded-2xl ${v.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Director */}
      <section className="py-20 bg-white dark:bg-[#0c1a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] max-w-md bg-gradient-to-br from-[#0e2016] via-[#123021] to-[#0a1710] dot-grid">
                {/* gold ring + monogram */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                  <div className="w-36 h-36 rounded-full border-2 border-[var(--gold)]/40 flex items-center justify-center mb-6">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-2xl shadow-amber-900/40">
                      <span className="text-white text-4xl font-black tracking-tight">MA</span>
                    </div>
                  </div>
                  <p className="text-white text-xl font-black">Eng. Mohamednoor Adan</p>
                  <p className="text-[var(--gold)] text-sm font-semibold mt-1">Managing Director &amp; Founder</p>
                  <div className="mt-5 flex items-center gap-2 text-slate-400 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">EBK Registered</span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">MSc Civil Eng.</span>
                  </div>
                </div>
                {/* corner accent */}
                <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-[var(--gold)]/50 rounded-tl-xl" />
                <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-[var(--gold)]/50 rounded-br-xl" />
              </div>
              <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-slate-100 dark:bg-[#15351f] animate-float rounded-full" />
            </div>
            <div className="space-y-5">
              <span className="text-[var(--gold)] font-bold text-sm uppercase tracking-widest">Meet the Director</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                Eng. Mohamednoor Adan
              </h2>
              <p className="text-[var(--gold)] font-semibold">
                Managing Director & Founder
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                With over <strong>15 years</strong> of experience in construction and engineering consultancy, Eng. Mohamednoor Adan founded Sigiro Construction & General Supplies with a vision to build infrastructure that transforms Kenyan communities.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                A graduate of the University of Nairobi with an MSc in Civil Engineering, he is a registered member of the Engineers Board of Kenya (EBK) and has overseen projects worth over KES 2 Billion across Kenya.
              </p>
              <ul className="space-y-2">
                {[
                  "MSc Civil Engineering – University of Nairobi",
                  "EBK Registered Professional Engineer",
                  "NCA Grade A Certified Contractor",
                  "15+ years industry experience",
                  "Projects across all 47 counties",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 pt-2">
                <a href="mailto:sigiroconstruction2122@gmail.com" className="flex items-center gap-2 px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white text-sm font-semibold rounded-full transition-colors">
                  <Mail className="w-4 h-4" /> Email Director
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#f3f8f4] dark:bg-[#06120c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[var(--gold)] font-bold text-sm uppercase tracking-widest">The Experts</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">Our Leadership Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {team.map((member) => (
              <div key={member.name} className="bg-white dark:bg-[#0c1a12] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#16331f] card-hover">
                <div className="relative h-40 bg-[#0e2016] dark:bg-[#11271b] dot-grid flex items-center justify-center">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.accent} flex items-center justify-center shadow-xl`}>
                    <span className="text-white text-3xl font-black tracking-tight">{member.initials}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{member.name}</h3>
                  <p className="text-[var(--gold)] text-xs font-semibold mb-1">{member.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{member.specialty}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-[#f3f8f4] dark:bg-[#06120c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Certifications & Accreditations</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {certifications.map((cert) => (
              <div key={cert.name} className="bg-white dark:bg-[#0c1a12] rounded-2xl p-5 border border-gray-100 dark:border-[#16331f] text-center card-hover">
                <div className="text-2xl font-black text-[var(--gold)] mb-1">{cert.name}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 leading-tight">{cert.full}</p>
                <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-[#15351f] text-[var(--gold)] rounded-full font-medium">
                  {cert.grade}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0e2016] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black mb-4">Let&apos;s Build Together</h2>
          <p className="text-slate-300 mb-8">Partner with Kenya&apos;s most trusted construction and consultancy firm.</p>
          <Link href="/contact" className="px-9 py-4 bg-white text-[var(--gold)] font-black rounded-full text-base hover:bg-green-50 transition-all hover:-translate-y-1 shadow-xl inline-block">
            Start a Project
          </Link>
        </div>
      </section>
    </>
  );
}

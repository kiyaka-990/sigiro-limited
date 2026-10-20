import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const services = [
  { name: "Road & Infrastructure", href: "/services#roads" },
  { name: "Building Construction", href: "/services#building" },
  { name: "Water Works", href: "/services#water" },
  { name: "Landscaping", href: "/services#landscaping" },
  { name: "Project Management", href: "/services#pm" },
  { name: "General Supplies", href: "/services#supplies" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Projects", href: "/projects" },
  { name: "Contact Us", href: "/contact" },
  { name: "Get a Quote", href: "/contact" },
  { name: "Admin Portal", href: "/admin" },
];

const socials = [
  { label: "Facebook", href: "#", svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" /> },
  { label: "X", href: "#", svg: <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> },
  { label: "Instagram", href: "#", svg: <><rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" fill="none" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></> },
  { label: "LinkedIn", href: "#", svg: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.8" fill="none" /><rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.8" fill="none" /><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8" fill="none" /></> },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#06120c] text-slate-300">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Have a project in mind?</h3>
            <p className="text-slate-400 text-sm mt-1">Get a free consultation from our expert team today.</p>
          </div>
          <div className="flex gap-3">
            <a href="https://wa.me/254722311108" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#25D366] hover:bg-[#1eb558] text-white font-semibold text-sm rounded-full transition-colors">
              WhatsApp Us
            </a>
            <Link href="/contact" className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white font-semibold text-sm rounded-full transition-colors">
              Contact Form <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo size="md" variant="light" className="mb-5" />
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              A premier construction and general supplies firm in Nairobi, Kenya — building the nation with integrity, innovation and excellence.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ svg, href, label }) => (
                <a key={label} href={href} aria-label={label} className="w-9 h-9 bg-white/5 hover:bg-[var(--gold)] text-slate-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200">
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" aria-hidden="true">{svg}</svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-slate-400 hover:text-[var(--gold)] transition-colors">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-[var(--gold)] transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Get in touch</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">P.O. Box: 4414 – 00200<br />Nairobi, Kenya</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                <a href="tel:+254722311108" className="text-sm text-slate-400 hover:text-[var(--gold)] transition-colors">+254 722 311 108</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                <a href="mailto:sigiroconstruction2122@gmail.com" className="text-sm text-slate-400 hover:text-[var(--gold)] transition-colors">sigiroconstruction2122@gmail.com</a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">Mon–Fri: 8:00 AM – 5:00 PM<br />Sat: 9:00 AM – 1:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 justify-center">
          {["NCA Grade A", "EBK", "NEMA", "BORAQS", "AAK", "ISO 9001:2015"].map((c) => (
            <span key={c} className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 rounded-full font-medium">{c}</span>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© {year} Sigiro Construction & General Supplies. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="text-xs text-slate-500 hover:text-[var(--gold)] transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="text-xs text-slate-500 hover:text-[var(--gold)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

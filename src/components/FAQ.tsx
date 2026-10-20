"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Which areas of Kenya do you serve?",
    a: "We are headquartered in Nairobi (P.O. Box: 4414 – 00200) and deliver projects across all 47 counties — from urban developments in Nairobi, Mombasa and Kisumu to rural infrastructure and water schemes nationwide.",
  },
  {
    q: "Are you licensed and certified?",
    a: "Yes. Sigiro Construction & General Supplies is registered and certified by the NCA (Grade A), Engineers Board of Kenya (EBK), NEMA, BORAQS and the Architectural Association of Kenya (AAK), and operates an ISO 9001:2015 quality management system.",
  },
  {
    q: "How do I get a quote for my project?",
    a: "Use the contact form, WhatsApp us, or call directly. Share your project type, location, approximate scope and timeline, and we'll respond with an initial consultation and quote within 24 hours — completely free.",
  },
  {
    q: "Do you handle both design and construction?",
    a: "Absolutely. We offer end-to-end services: feasibility studies, architectural and structural design, quantity surveying, construction, general supplies, and full project management through to commissioning and handover.",
  },
  {
    q: "How do you ensure projects finish on time and on budget?",
    a: "Every project is run by a dedicated project manager using tools like Primavera P6, with resident engineers on site, weekly progress reporting and rigorous cost control. We maintain a 98% on-time delivery record.",
  },
  {
    q: "Do you also supply goods and materials?",
    a: "Yes. Through our general supplies arm we procure and deliver building materials, hardware, office supplies, protective gear, furniture and industrial consumables — supporting institutions, businesses and our own project sites countrywide.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-[#0c1a12]" aria-label="Frequently asked questions">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="eyebrow justify-center">FAQ</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Everything you need to know about working with Sigiro Construction & General Supplies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60} from="up">
                <div
                  className={cn(
                    "rounded-2xl border transition-colors",
                    isOpen
                      ? "border-[var(--gold)]/40 bg-[#f3f8f4] dark:bg-[#11271b]"
                      : "border-slate-200 dark:border-[#16331f] bg-white dark:bg-[#0e2016]/40"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-[15px]">{f.q}</span>
                    <Plus
                      className={cn(
                        "w-5 h-5 flex-shrink-0 text-[var(--gold)] transition-transform duration-300",
                        isOpen && "rotate-45"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

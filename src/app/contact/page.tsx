"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";
import { addInquiry } from "@/lib/store";

const WHATSAPP_NUMBER = "254722311108";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    // Persist the inquiry — it appears live in the admin dashboard.
    addInquiry({
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service || "General Enquiry",
      message: form.message,
    });
    setLoading(false);
    setSubmitted(true);
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Sigiro Construction! My name is ${form.name || "[Your Name]"} and I'd like to inquire about ${form.service || "your services"}.`
  );

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-[#0a1710] via-[#0e2016] to-[#123021] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="animate-float absolute top-10 right-20 w-80 h-80 bg-white rounded-full" />
          <div className="animate-float absolute bottom-0 left-10 w-56 h-56 bg-[var(--gold)] rounded-full" style={{ animationDelay: "3s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight">
            Let&apos;s Build<br />
            <span className="text-[var(--gold)]">Something Great Together</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
            Reach out to our expert team for a free consultation on your construction or consultancy project.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#0c1a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: "Office", value: "P.O. Box: 4414 – 00200\nNairobi, Kenya" },
                    { icon: Phone, label: "Phone", value: "+254 722 311 108 | 0722 999 041", href: "tel:+254722311108" },
                    { icon: Mail, label: "Email", value: "sigiroconstruction2122@gmail.com", href: "mailto:sigiroconstruction2122@gmail.com" },
                    { icon: Clock, label: "Working Hours", value: "Mon–Fri: 8:00 AM – 5:00 PM\nSat: 9:00 AM – 1:00 PM" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex gap-4">
                      <div className="w-11 h-11 bg-slate-100 dark:bg-[#15351f] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[var(--gold)]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-gray-700 dark:text-gray-200 hover:text-[var(--gold)] font-medium transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-[#25D366]/10 dark:bg-[#25D366]/5 border border-[#25D366]/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Quick Response via WhatsApp</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Typically replies within minutes</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-[#16331f] shadow-lg h-64 bg-[#f3f8f4] dark:bg-[#06120c] flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="w-10 h-10 mx-auto mb-2 text-brand-green" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">P.O. Box: 4414 – 00200</p>
                  <p className="text-xs text-gray-400">Nairobi, Kenya</p>
                  <a
                    href="https://maps.google.com/?q=Nairobi,+Kenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs text-[var(--gold)] underline font-semibold"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-[#11271b] rounded-3xl border border-gray-100 dark:border-[#16331f] shadow-xl p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-[#15351f] rounded-full flex items-center justify-center mb-5 animate-bounce">
                      <CheckCircle className="w-10 h-10 text-brand-green" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Message Sent!</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                      Thank you, <strong>{form.name}</strong>! We&apos;ll get back to you within 24 hours. For urgent matters, WhatsApp us directly.
                    </p>
                    <div className="flex gap-3 mt-7">
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                        className="px-6 py-3 border border-slate-300 text-[var(--gold)] dark:border-[#16331f] font-bold rounded-full text-sm hover:bg-[#f3f8f4] dark:hover:bg-slate-800/60 transition-colors"
                      >
                        Send Another
                      </button>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-[#25D366] text-white font-bold rounded-full text-sm hover:bg-[#20bd5a] transition-colors"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-7">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-[#15351f] rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-[var(--gold)]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white">Send Us a Message</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Free consultation · We respond within 24hrs</p>
                      </div>
                    </div>

                    {error && (
                      <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Eng. John Kamau"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#16331f] bg-white dark:bg-[#0c1a12] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[var(--gold)] dark:focus:border-[var(--gold)] focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@company.co.ke"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#16331f] bg-white dark:bg-[#0c1a12] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[var(--gold)] dark:focus:border-[var(--gold)] focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-400"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+254 7XX XXX XXX"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#16331f] bg-white dark:bg-[#0c1a12] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[var(--gold)] dark:focus:border-[var(--gold)] focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                            Service Interested In
                          </label>
                          <select
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#16331f] bg-white dark:bg-[#0c1a12] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[var(--gold)] dark:focus:border-[var(--gold)] focus:ring-2 focus:ring-amber-500/20 transition-all"
                          >
                            <option value="">Select a service...</option>
                            <option>Road & Infrastructure</option>
                            <option>Building Construction</option>
                            <option>Water Works & Plumbing</option>
                            <option>Landscaping & Horticulture</option>
                            <option>General Supplies of Goods</option>
                            <option>Project Management</option>
                            <option>Structural Engineering</option>
                            <option>Quantity Surveying</option>
                            <option>M&E Engineering</option>
                            <option>Other / Multiple Services</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                          Project Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Describe your project, location, approximate budget, and timeline..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#16331f] bg-white dark:bg-[#0c1a12] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[var(--gold)] dark:focus:border-[var(--gold)] focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-400 resize-none"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--gold)] hover:bg-[var(--gold-hover)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-green-900/30"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Send Message
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                        By submitting, you agree to our Privacy Policy. We never share your data.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

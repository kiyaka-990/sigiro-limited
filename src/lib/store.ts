"use client";

/**
 * Lightweight real-time data store backed by localStorage with a pub/sub layer.
 * - Contact-form submissions are written here and appear live in the admin
 *   dashboard (same tab via a custom event, across tabs via the `storage` event).
 * - Admin edits (status changes, deletes, new projects) persist across reloads.
 *
 * Note: this is browser-local persistence. For multi-device/shared data, swap
 * these functions for API routes backed by a database (e.g. Vercel Postgres/KV).
 */

export type InquiryStatus = "New" | "Replied" | "In Progress" | "Completed";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  date: string; // ISO
  status: InquiryStatus;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  value: string;
  status: "Ongoing" | "Completed";
  progress: number;
}

const INQ_KEY = "sigiro_inquiries_v1";
const PRJ_KEY = "sigiro_projects_v1";
const EVENT = "sigiro:store";

const seedInquiries: Inquiry[] = [
  { id: "seed-1", name: "James Mwangi", email: "james@westlands.co.ke", service: "Building Construction", date: "2026-06-15T09:12:00Z", status: "New", message: "We need a 5-storey commercial building in Westlands. Looking for a design-and-build proposal." },
  { id: "seed-2", name: "Grace Njeri", email: "grace@county.go.ke", service: "Road & Infrastructure", date: "2026-06-14T14:03:00Z", status: "Replied", message: "Rehabilitation of 3km road in Kiambu — please advise on timelines and budget." },
  { id: "seed-3", name: "Ahmed Hassan", email: "ahmed@corp.com", service: "General Supplies", date: "2026-06-13T11:40:00Z", status: "In Progress", message: "Urgent supply quotation needed for construction materials for a hotel development in Naivasha." },
  { id: "seed-4", name: "Mary Wanjiku", email: "mary@homes.co.ke", service: "Landscaping", date: "2026-06-12T08:21:00Z", status: "Completed", message: "Garden design for a residential estate in Karen." },
];

const seedProjects: Project[] = [
  { id: "p1", title: "Westlands Office Tower", client: "Westlands Dev Ltd", value: "KES 890M", status: "Ongoing", progress: 45 },
  { id: "p2", title: "Kisumu Port Road", client: "Kenya Ports Authority", value: "KES 380M", status: "Ongoing", progress: 72 },
  { id: "p3", title: "Ngong Road Expansion", client: "KeNHA", value: "KES 450M", status: "Completed", progress: 100 },
  { id: "p4", title: "Lavington Water Treatment Plant", client: "NCWSC", value: "KES 180M", status: "Completed", progress: 100 },
];

function read<T>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as T[];
  } catch {
    return seed;
  }
}

function write<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { key } }));
}

export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/* ---------------- Inquiries ---------------- */
export function getInquiries(): Inquiry[] {
  return read<Inquiry>(INQ_KEY, seedInquiries).sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function addInquiry(data: Omit<Inquiry, "id" | "date" | "status">): Inquiry {
  const list = read<Inquiry>(INQ_KEY, seedInquiries);
  const inquiry: Inquiry = { ...data, id: genId(), date: new Date().toISOString(), status: "New" };
  write(INQ_KEY, [inquiry, ...list]);
  return inquiry;
}

export function updateInquiry(id: string, patch: Partial<Inquiry>) {
  const list = read<Inquiry>(INQ_KEY, seedInquiries).map((i) => (i.id === id ? { ...i, ...patch } : i));
  write(INQ_KEY, list);
}

export function deleteInquiry(id: string) {
  write(INQ_KEY, read<Inquiry>(INQ_KEY, seedInquiries).filter((i) => i.id !== id));
}

/* ---------------- Projects ---------------- */
export function getProjects(): Project[] {
  return read<Project>(PRJ_KEY, seedProjects);
}

export function addProject(data: Omit<Project, "id">): Project {
  const list = read<Project>(PRJ_KEY, seedProjects);
  const project: Project = { ...data, id: genId() };
  write(PRJ_KEY, [project, ...list]);
  return project;
}

export function updateProject(id: string, patch: Partial<Project>) {
  write(PRJ_KEY, read<Project>(PRJ_KEY, seedProjects).map((p) => (p.id === id ? { ...p, ...patch } : p)));
}

export function deleteProject(id: string) {
  write(PRJ_KEY, read<Project>(PRJ_KEY, seedProjects).filter((p) => p.id !== id));
}

/* ---------------- Subscription ---------------- */
export function subscribe(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

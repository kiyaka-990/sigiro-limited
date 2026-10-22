"use client";

import { useState } from "react";
import {
  Plus, Trash2, Pencil, X, Save, AlertCircle, Loader2, Image as ImageIcon, CheckCircle,
} from "lucide-react";
import { PROJECT_CATEGORIES, type MediaItem, type NewProject, type PortfolioProject } from "@/lib/portfolio";

interface Props {
  projects: PortfolioProject[];
  media: MediaItem[];
  refresh: () => void;
}

const EMPTY: NewProject = {
  title: "",
  category: PROJECT_CATEGORIES[0],
  status: "Ongoing",
  location: "",
  year: String(new Date().getFullYear()),
  value: "",
  image: "/images/projects/road-expansion.jpg",
  description: "",
  client: "",
  progress: 0,
};

const statusColor: Record<string, string> = {
  Ongoing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Completed: "bg-green-100 text-[var(--gold)] dark:bg-green-900/30 dark:text-[var(--gold)]",
};

const fieldCls =
  "w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#1c3b27] bg-white dark:bg-[#0c1a12] text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[var(--gold)] transition-colors";
const labelCls = "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5";

export default function ProjectsTab({ projects, media, refresh }: Props) {
  const [editing, setEditing] = useState<PortfolioProject | "new" | null>(null);
  const [form, setForm] = useState<NewProject>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  const set = <K extends keyof NewProject>(k: K, v: NewProject[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  function openNew() {
    setForm(EMPTY);
    setError("");
    setPickerOpen(false);
    setEditing("new");
  }

  function openEdit(p: PortfolioProject) {
    const { id: _id, ...rest } = p;
    void _id;
    setForm(rest);
    setError("");
    setPickerOpen(false);
    setEditing(p);
  }

  async function save() {
    if (!editing) return;
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const isNew = editing === "new";
      const res = await fetch(isNew ? "/api/admin/projects" : `/api/admin/projects/${(editing as PortfolioProject).id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || `Save failed (${res.status})`);
      }
      setEditing(null);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(p: PortfolioProject) {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    setBusyId(p.id);
    setError("");
    try {
      const res = await fetch(`/api/admin/projects/${p.id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || `Delete failed (${res.status})`);
      }
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  async function cycleStatus(p: PortfolioProject) {
    const next: NewProject = {
      ...p,
      status: p.status === "Ongoing" ? "Completed" : "Ongoing",
      progress: p.status === "Ongoing" ? 100 : 60,
    };
    setBusyId(p.id);
    const res = await fetch(`/api/admin/projects/${p.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(next),
    }).catch(() => null);
    setBusyId(null);
    if (!res || !res.ok) setError("Could not update status.");
    else refresh();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-gray-900 dark:text-white">Project Management</h2>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white text-sm font-bold rounded-full transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {projects.length === 0 && !error && (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500 text-sm">
          No projects yet — add the first one.
        </div>
      )}

      <div className="grid gap-5">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-[#11271b] rounded-2xl border border-gray-100 dark:border-[#16331f] p-4 sm:p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start gap-4">
              <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0c1a12] flex-shrink-0">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{p.title}</h3>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>
                    {p.status}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-[#0c1a12] text-gray-500 dark:text-gray-400">
                    {p.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {p.client} · {p.value} · {p.location} · {p.year}
                </p>
                <div className="mt-3 max-w-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="text-xs font-bold text-[var(--gold)]">{p.progress}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => cycleStatus(p)}
                  disabled={busyId === p.id}
                  title={p.status === "Ongoing" ? "Mark as completed" : "Reopen as ongoing"}
                  className="p-2.5 text-gray-500 hover:text-[var(--gold)] hover:bg-[#f3f8f4] dark:hover:bg-slate-800/60 rounded-xl transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openEdit(p)}
                  title="Edit project"
                  className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(p)}
                  disabled={busyId === p.id}
                  title="Delete project"
                  className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:p-6">
          <div className="w-full max-w-2xl bg-white dark:bg-[#0c1a12] rounded-2xl border border-gray-100 dark:border-[#16331f] shadow-2xl my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#16331f]">
              <h3 className="font-black text-gray-900 dark:text-white">
                {editing === "new" ? "Add Project" : "Edit Project"}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Title *</label>
                <input
                  className={fieldCls}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Road Expansion"
                  autoFocus
                />
              </div>

              <div>
                <label className={labelCls}>Category</label>
                <select className={fieldCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {PROJECT_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Status</label>
                <select
                  className={fieldCls}
                  value={form.status}
                  onChange={(e) => set("status", e.target.value === "Ongoing" ? "Ongoing" : "Completed")}
                >
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Client</label>
                <input className={fieldCls} value={form.client} onChange={(e) => set("client", e.target.value)} />
              </div>

              <div>
                <label className={labelCls}>Contract value</label>
                <input
                  className={fieldCls}
                  value={form.value}
                  onChange={(e) => set("value", e.target.value)}
                  placeholder="KES 250M"
                />
              </div>

              <div>
                <label className={labelCls}>Location</label>
                <input className={fieldCls} value={form.location} onChange={(e) => set("location", e.target.value)} />
              </div>

              <div>
                <label className={labelCls}>Year</label>
                <input className={fieldCls} value={form.year} onChange={(e) => set("year", e.target.value)} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls}>Progress (%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  className={fieldCls}
                  value={form.progress}
                  onChange={(e) => set("progress", Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls}>Cover image</label>
                <div className="flex gap-2">
                  <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-[#060e09] border border-gray-200 dark:border-[#1c3b27] flex-shrink-0">
                    {form.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={form.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <input
                    className={fieldCls}
                    value={form.image}
                    onChange={(e) => set("image", e.target.value)}
                    placeholder="/images/projects/x.jpg or /media/…"
                  />
                  <button
                    type="button"
                    onClick={() => setPickerOpen((v) => !v)}
                    className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-[#15351f] text-xs font-bold text-gray-600 dark:text-gray-200 hover:text-[var(--gold)] transition-colors whitespace-nowrap"
                  >
                    Library
                  </button>
                </div>

                {pickerOpen && (
                  <div className="mt-2 max-h-52 overflow-y-auto rounded-xl border border-gray-200 dark:border-[#1c3b27] p-2 grid grid-cols-4 sm:grid-cols-6 gap-2 bg-gray-50 dark:bg-[#060e09]">
                    {media.length === 0 && (
                      <p className="col-span-full text-xs text-gray-400 py-3 text-center">
                        No uploads yet — add files in the Media tab first.
                      </p>
                    )}
                    {media
                      .filter((m) => m.kind === "image")
                      .map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            set("image", `/media/${m.id}`);
                            setPickerOpen(false);
                          }}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                            form.image === `/media/${m.id}`
                              ? "border-[var(--gold)]"
                              : "border-transparent hover:border-gray-300 dark:hover:border-[#1c3b27]"
                          }`}
                          title={m.name}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`/media/${m.id}`} alt={m.name} className="w-full h-full object-cover" />
                        </button>
                      ))}
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls}>Description</label>
                <textarea
                  className={`${fieldCls} min-h-[96px]`}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-[#16331f]">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2.5 text-sm font-semibold text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-hover)] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Saving…" : "Save project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

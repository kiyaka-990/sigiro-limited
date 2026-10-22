"use client";

import { useRef, useState } from "react";
import { UploadCloud, Link2, Trash2, Film, ImageIcon, AlertCircle, Loader2 } from "lucide-react";
import type { MediaItem } from "@/lib/portfolio";

interface Props {
  items: MediaItem[];
  refresh: () => void;
}

function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaTab({ items, refresh }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [dragOver, setDragOver] = useState(false);

  async function uploadFiles(list: File[]) {
    const files = list.filter((f) => /^(image|video)\//.test(f.type));
    if (files.length === 0) {
      setError("Only image and video files can be uploaded.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        setProgress(`${i + 1} / ${files.length} — ${files[i].name}`);
        const fd = new FormData();
        fd.append("file", files[i]);
        const res = await fetch("/api/admin/media", { method: "POST", body: fd });
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(body.error || `Upload failed (${res.status})`);
        }
      }
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setProgress("");
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function copyLink(id: string) {
    const url = `${window.location.origin}/media/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(id);
      setTimeout(() => setCopied(""), 1600);
    } catch {
      setError("Could not copy — clipboard unavailable.");
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this file? Pages that use it will show a broken image.")) return;
    const res = await fetch(`/api/admin/media/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) {
      setError("Delete failed.");
      return;
    }
    refresh();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-black text-gray-900 dark:text-white">Media Library</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{items.length} files</span>
      </div>

      {/* Dropzone / upload */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (!busy) uploadFiles(Array.from(e.dataTransfer.files));
        }}
        className={`rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-colors ${
          dragOver
            ? "border-[var(--gold)] bg-amber-50 dark:bg-amber-900/10"
            : "border-gray-200 dark:border-[#1c3b27] bg-white dark:bg-[#11271b]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && uploadFiles(Array.from(e.target.files))}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-hover)] disabled:opacity-60 text-white text-sm font-bold rounded-full transition-colors"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
          {busy ? "Uploading…" : "Choose files"}
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          or drag &amp; drop images and videos here — up to 90&nbsp;MB each. They become live at
          <code className="mx-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#0c1a12]">/media/…</code>
          and can be used in projects or pages.
        </p>
        {busy && <p className="text-xs font-semibold text-[var(--gold)] mt-2">{progress}</p>}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {items.length === 0 && !busy && (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500 text-sm">
          No uploads yet. Your site&apos;s images and videos will appear here.
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group bg-white dark:bg-[#11271b] rounded-2xl border border-gray-100 dark:border-[#16331f] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3] bg-slate-100 dark:bg-[#0c1a12]">
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
                  className="w-full h-full object-cover"
                />
              )}
              <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-black/60 text-white">
                {item.kind === "video" ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                {item.kind}
              </span>
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-900 dark:text-white truncate" title={item.name}>
                {item.name}
              </p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                {fmtSize(item.size)} · {new Date(item.created_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <button
                  onClick={() => copyLink(item.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-1.5 text-[11px] font-semibold rounded-lg bg-gray-50 dark:bg-[#0c1a12] text-gray-600 dark:text-gray-300 hover:text-[var(--gold)] transition-colors"
                  title="Copy public URL"
                >
                  {copied === item.id ? "Copied!" : <><Link2 className="w-3 h-3" /> Copy URL</>}
                </button>
                <button
                  onClick={() => remove(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete file"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

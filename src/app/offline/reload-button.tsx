"use client";

import { RefreshCw } from "lucide-react";

export default function ReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white text-sm font-bold rounded-full transition-colors"
    >
      <RefreshCw className="w-4 h-4" /> Try again
    </button>
  );
}

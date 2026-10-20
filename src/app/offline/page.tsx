import type { Metadata } from "next";
import Link from "next/link";
import { WifiOff } from "lucide-react";
import ReloadButton from "./reload-button";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0c1a12] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#f3f8f4] dark:bg-[#15351f] flex items-center justify-center">
          <WifiOff className="w-8 h-8 text-[var(--gold)]" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
          You&apos;re offline
        </h1>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-7">
          It looks like you&apos;ve lost your connection. Your previously visited pages may
          still be available — otherwise, reconnect and try again.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ReloadButton />
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-[#16331f] text-gray-700 dark:text-gray-200 text-sm font-bold rounded-full hover:bg-[#f3f8f4] dark:hover:bg-slate-800/60 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}

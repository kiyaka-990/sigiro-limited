"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, X, Plus, Share } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/**
 * PWA install affordance:
 * - Chromium (Android/desktop): shows a pill when the browser fires
 *   `beforeinstallprompt`, triggering the native install dialog.
 * - iOS Safari: shows short Share → Add to Home Screen guidance.
 * Hides itself once the app is running standalone (already installed).
 * Also registers the service worker that makes the app installable.
 */
export default function PwaInstall() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  // Register the service worker (client only).
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => undefined);
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);

  // Detect standalone (installed) mode + iOS Safari.
  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari sets navigator.standalone when launched from the home screen
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalled(standalone);
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(navigator as Navigator & { MSStream?: unknown }).MSStream
    );
  }, []);

  // Capture the Chromium install prompt.
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    const onInstalled = () => {
      setInstalled(true);
      setVisible(false);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") setVisible(false);
    setDeferred(null);
  }, [deferred]);

  // Nothing to show: installed, dismissed, or no capability detected.
  if (installed || dismissed) return null;
  const showChromium = visible && !!deferred;
  const showIOS = isIOS; // iOS never fires beforeinstallprompt
  if (!showChromium && !showIOS) return null;

  return (
    <div className="fixed bottom-6 left-5 z-40 max-w-[280px] animate-fade-in-up">
      <div className="flex items-start gap-2.5 bg-white dark:bg-[#11271b] rounded-2xl rounded-bl-sm shadow-xl border border-slate-100 dark:border-[#16331f] px-4 py-3">
        <div className="w-9 h-9 shrink-0 rounded-xl bg-[var(--gold)] flex items-center justify-center">
          <Download className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            Install Sigiro app
          </p>
          {showChromium ? (
            <>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                Works on phone, tablet, laptop and desktop.
              </p>
              <button
                onClick={install}
                className="mt-2 w-full px-3 py-1.5 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white text-[11px] font-bold rounded-lg transition-colors"
              >
                Install
              </button>
            </>
          ) : (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
              Tap <Share className="w-3 h-3 inline -mt-0.5" aria-hidden /> share, then{" "}
              <Plus className="w-3 h-3 inline -mt-0.5" aria-hidden />{" "}
              <span className="font-semibold">Add to Home Screen</span>.
            </p>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 mt-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          aria-label="Dismiss install prompt"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

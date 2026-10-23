import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthConfigured } from "@/lib/server/auth";
import { hasStorage } from "@/lib/server/db";

export const metadata: Metadata = {
  title: "Admin Portal | Sigiro Construction & General Supplies",
  robots: { index: false, follow: false },
};

/**
 * Evaluated on every request — never baked in at build time, or the decision
 * would be frozen for all deployments.
 */
export const dynamic = "force-dynamic";

/** The deployment where the portal actually works (auth + D1/R2 storage). */
const PORTAL_HOST = "site-b6df6ecd32fc4c629e3131038b44c453.freebuff.page";
const PORTAL_URL = `https://${PORTAL_HOST}/admin/login`;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const host = `${h.get("x-forwarded-host") ?? ""} ${h.get("host") ?? ""}`;

  // On deployments where the portal cannot function (e.g. Vercel: no admin
  // credentials, no D1/R2), send browsers straight to the working portal
  // instead of showing a login form that can only fail. The host check
  // prevents redirecting the portal host to itself if it ever loses storage.
  const functional = isAuthConfigured() && hasStorage();
  if (!functional && !host.includes(PORTAL_HOST)) {
    redirect(PORTAL_URL);
  }

  return <>{children}</>;
}

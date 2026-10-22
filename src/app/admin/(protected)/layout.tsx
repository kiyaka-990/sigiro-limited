import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Server-side guard for every route inside this group (currently /admin).
 * The login page lives outside the group so it stays reachable.
 *
 * This replaces the former src/proxy.ts middleware, which ran on the Node
 * runtime — not supported by the Cloudflare (OpenNext) deployment target.
 */
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const session = jar.get("sigiro_session")?.value;
  const valid = session && session === process.env.ADMIN_SESSION_SECRET;

  if (!valid) {
    redirect("/admin/login?from=/admin");
  }

  return <>{children}</>;
}

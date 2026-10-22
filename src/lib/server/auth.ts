import { cookies } from "next/headers";

/** True when the caller carries the admin session cookie set by /api/admin/login. */
export async function requireAdmin(): Promise<boolean> {
  const jar = await cookies();
  const session = jar.get("sigiro_session")?.value;
  return !!session && session === process.env.ADMIN_SESSION_SECRET;
}

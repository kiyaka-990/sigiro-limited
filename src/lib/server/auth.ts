import { cookies } from "next/headers";

/** True when all three admin credentials exist as server configuration. */
export function isAuthConfigured(): boolean {
  return !!process.env.ADMIN_USERNAME && !!process.env.ADMIN_PASSWORD && !!process.env.ADMIN_SESSION_SECRET;
}

/** True when the caller carries the admin session cookie set by /api/admin/login. */
export async function requireAdmin(): Promise<boolean> {
  const jar = await cookies();
  const session = jar.get("sigiro_session")?.value;
  return !!session && session === process.env.ADMIN_SESSION_SECRET;
}

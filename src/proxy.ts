import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protect every /admin route except the login page itself.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const session = req.cookies.get("sigiro_session")?.value;
  const valid = session && session === process.env.ADMIN_SESSION_SECRET;

  if (!valid) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

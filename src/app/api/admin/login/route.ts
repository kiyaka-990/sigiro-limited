import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const USER = process.env.ADMIN_USERNAME;
  const PASS = process.env.ADMIN_PASSWORD;
  const SECRET = process.env.ADMIN_SESSION_SECRET;

  if (!USER || !PASS || !SECRET) {
    return NextResponse.json(
      {
        error:
          "Admin login is only configured on the Cloudflare-hosted site. Use https://site-b6df6ecd32fc4c629e3131038b44c453.freebuff.page/admin/login — this deployment serves the public site only.",
      },
      { status: 500 }
    );
  }

  if (body.username === USER && body.password === PASS) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("sigiro_session", SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
}

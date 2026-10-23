import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { getFiles, deleteMedia, hasStorage } from "@/lib/server/db";

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasStorage()) {
    return NextResponse.json({ error: "Storage is not available on this deployment." }, { status: 503 });
  }
  const { id } = await ctx.params;
  const key = decodeURIComponent(id);

  await getFiles()!.delete(key);
  await deleteMedia(key);

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { getFiles, insertMedia, listMedia } from "@/lib/server/db";

/* eslint-disable @typescript-eslint/no-explicit-any */

const MAX_BYTES = 90 * 1024 * 1024; // stay under the worker request-body limit

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "image/svg+xml": ".svg",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
};

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await listMedia();
  return NextResponse.json(items, {
    headers: { "cache-control": "no-store" },
  });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file field" }, { status: 400 });
  }
  if (!/^(image|video)\//.test(file.type)) {
    return NextResponse.json({ error: "Only images and videos are allowed" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File exceeds the 90MB limit" }, { status: 413 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "Empty file" }, { status: 400 });
  }

  const fallbackExt = file.name.match(/\.[a-z0-9]+$/i)?.[0]?.toLowerCase() ?? "";
  const ext = EXT_BY_TYPE[file.type] ?? fallbackExt;
  const key = `${crypto.randomUUID().replace(/-/g, "")}${ext}`;
  const contentType = file.type || "application/octet-stream";

  await getFiles().put(key, (file as any).stream(), {
    httpMetadata: { contentType },
  });

  const item = {
    id: key,
    kind: file.type.startsWith("video/") ? ("video" as const) : ("image" as const),
    name: file.name || key,
    type: contentType,
    size: file.size,
    created_at: new Date().toISOString(),
  };
  await insertMedia(item);

  return NextResponse.json(item, { status: 201 });
}

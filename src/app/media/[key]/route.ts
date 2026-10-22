import { getFiles } from "@/lib/server/db";

/**
 * Public media delivery: /media/<key>
 * Streams the R2 object with correct content-type, immutable caching and
 * single-range support (needed for <video> seeking).
 */

function parseRange(rangeHeader: string, size: number): { offset: number; length: number } | null {
  const m = rangeHeader.match(/bytes=(\d*)-(\d*)/);
  if (!m) return null;
  const [, startStr, endStr] = m;
  let start: number;
  let end: number;
  if (startStr === "") {
    // suffix form: last N bytes
    const suffix = parseInt(endStr, 10);
    if (!suffix) return null;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = parseInt(startStr, 10);
    end = endStr ? parseInt(endStr, 10) : size - 1;
  }
  if (Number.isNaN(start) || Number.isNaN(end) || start >= size || start > end) return null;
  end = Math.min(end, size - 1);
  return { offset: start, length: end - start + 1 };
}

export async function GET(req: Request, ctx: { params: Promise<{ key: string }> }) {
  const { key } = await ctx.params;
  const safeKey = decodeURIComponent(key);

  const files = getFiles();
  const obj = await files.get(safeKey);
  if (!obj) {
    return new Response("Not found", { status: 404 });
  }

  const baseHeaders: Record<string, string> = {
    "content-type": obj.httpMetadata?.contentType ?? "application/octet-stream",
    "cache-control": "public, max-age=31536000, immutable",
    "accept-ranges": "bytes",
    "content-length": String(obj.size),
    etag: obj.httpEtag,
  };

  const rangeHeader = req.headers.get("range");
  if (rangeHeader) {
    const range = parseRange(rangeHeader, obj.size);
    if (!range) {
      return new Response(null, {
        status: 416,
        headers: { "content-range": `bytes */${obj.size}` },
      });
    }
    const ranged = await files.get(safeKey, { range: { offset: range.offset, length: range.length } });
    if (!ranged) {
      return new Response("Not found", { status: 404 });
    }
    return new Response((ranged as { body: ReadableStream }).body, {
      status: 206,
      headers: {
        ...baseHeaders,
        "content-length": String(range.length),
        "content-range": `bytes ${range.offset}-${range.offset + range.length - 1}/${obj.size}`,
      },
    });
  }

  return new Response((obj as { body: ReadableStream }).body, {
    status: 200,
    headers: baseHeaders,
  });
}

import { PROJECT_CATEGORIES, type NewProject } from "@/lib/portfolio";

/**
 * Validate + normalise an incoming project payload.
 * Lives here (not in the route file) because Next.js restricts named exports
 * from route.ts to HTTP methods / route config.
 */
export function parseProject(body: unknown): { value: NewProject } | { error: string } {
  const b = body as Record<string, unknown>;
  if (!b || typeof b !== "object") return { error: "Invalid payload" };
  const str = (k: string, max = 500) => (typeof b[k] === "string" ? (b[k] as string).trim().slice(0, max) : "");
  const title = str("title", 200);
  if (!title) return { error: "Title is required" };
  const category = str("category", 60) || PROJECT_CATEGORIES[0];
  const status = b.status === "Ongoing" ? "Ongoing" : "Completed";
  const progressRaw = Number(b.progress);
  const progress = Number.isFinite(progressRaw)
    ? Math.min(100, Math.max(0, Math.round(progressRaw)))
    : status === "Completed"
      ? 100
      : 0;
  return {
    value: {
      title,
      category,
      status,
      location: str("location", 200) || "—",
      year: str("year", 10) || String(new Date().getFullYear()),
      value: str("value", 60) || "—",
      image: str("image", 500) || "/images/projects/road-expansion.jpg",
      description: str("description", 2000),
      client: str("client", 200) || "—",
      progress,
    },
  };
}

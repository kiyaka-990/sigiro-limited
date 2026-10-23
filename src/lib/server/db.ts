import { getCloudflareContext } from "@opennextjs/cloudflare";
import { SEED_PROJECTS, type NewProject, type PortfolioProject, type MediaItem } from "@/lib/portfolio";

/* Minimal structural types for the D1/R2 bindings (no workers-types dependency). */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface D1Stmt {
  bind(...args: any[]): D1Stmt;
  run(): Promise<unknown>;
  first<T = any>(): Promise<T | null>;
  all<T = any>(): Promise<{ results: T[] }>;
}
interface D1Like {
  prepare(sql: string): D1Stmt;
  batch(stmts: D1Stmt[]): Promise<unknown>;
}
interface R2ObjectBody {
  size: number;
  httpMetadata?: { contentType?: string };
  httpEtag: string;
  body: ReadableStream;
}
interface R2Like {
  get(
    key: string,
    options?: { range?: { offset: number; length: number } }
  ): Promise<R2ObjectBody | null>;
  put(key: string, value: any, options?: { httpMetadata?: { contentType?: string } }): Promise<unknown>;
  delete(key: string): Promise<void>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Resolve the D1/R2 bindings from the Cloudflare runtime context.
 * Returns null outside Cloudflare (e.g. Vercel, plain `next start`), where the
 * context is absent — callers fall back to read-only seed data instead of crashing.
 */
function bindings(): { DB: D1Like; FILES: R2Like } | null {
  try {
    const ctx = getCloudflareContext() as unknown as
      | { env?: { DB?: D1Like; FILES?: R2Like } }
      | undefined;
    const env = ctx?.env;
    if (env?.DB && env?.FILES) return { DB: env.DB, FILES: env.FILES };
  } catch {
    // getCloudflareContext() throws when no Cloudflare runtime is present.
  }
  return null;
}

/** True when D1/R2 storage is available in this deployment (Cloudflare). */
export function hasStorage(): boolean {
  return bindings() !== null;
}

/** Thrown by write helpers when storage is unavailable (deployments without D1/R2). */
export class StorageUnavailableError extends Error {
  constructor() {
    super("Content storage (D1/R2) is not available in this deployment");
    this.name = "StorageUnavailableError";
  }
}

const MIGRATIONS = [
  `CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY,
    kind TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size INTEGER NOT NULL,
    created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL,
    location TEXT NOT NULL,
    year TEXT NOT NULL,
    value TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    client TEXT NOT NULL,
    progress INTEGER NOT NULL DEFAULT 100
  )`,
];

let migrated: Promise<void> | null = null;

async function migrate(db: D1Like): Promise<void> {
  for (const sql of MIGRATIONS) {
    await db.prepare(sql).run();
  }
  const count = await db.prepare(`SELECT COUNT(*) AS n FROM projects`).first<{ n: number }>();
  if (!count || Number(count.n) === 0) {
    const insert = db.prepare(
      `INSERT INTO projects (title, category, status, location, year, value, image, description, client, progress)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    await db.batch(
      SEED_PROJECTS.map((p) =>
        insert.bind(p.title, p.category, p.status, p.location, p.year, p.value, p.image, p.description, p.client, p.progress)
      )
    );
  }
}

/** DB handle with schema guaranteed, or null when storage is unavailable. */
export async function getDb(): Promise<D1Like | null> {
  const b = bindings();
  if (!b) return null;
  const { DB } = b;
  if (!migrated) {
    migrated = migrate(DB).catch((err) => {
      migrated = null;
      throw err;
    });
  }
  await migrated;
  return DB;
}

/** R2 handle, or null when storage is unavailable. */
export function getFiles(): R2Like | null {
  return bindings()?.FILES ?? null;
}

/* ---------------- Projects ---------------- */

type ProjectRow = Record<string, unknown>;

function toProject(row: ProjectRow): PortfolioProject {
  return {
    id: Number(row.id),
    title: String(row.title),
    category: String(row.category),
    status: row.status === "Ongoing" ? "Ongoing" : "Completed",
    location: String(row.location),
    year: String(row.year),
    value: String(row.value),
    image: String(row.image),
    description: String(row.description),
    client: String(row.client),
    progress: Number(row.progress ?? 100),
  };
}

export async function listProjects(): Promise<PortfolioProject[]> {
  const db = await getDb();
  if (!db) {
    // No storage in this deployment (e.g. Vercel): serve the original portfolio.
    return SEED_PROJECTS.map((p, i) => ({ id: i + 1, ...p }));
  }
  const { results } = await db.prepare(`SELECT * FROM projects ORDER BY id ASC`).all<ProjectRow>();
  return results.map(toProject);
}

export async function createProject(p: NewProject): Promise<PortfolioProject> {
  const db = await getDb();
  if (!db) throw new StorageUnavailableError();
  const row = await db
    .prepare(
      `INSERT INTO projects (title, category, status, location, year, value, image, description, client, progress)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`
    )
    .bind(p.title, p.category, p.status, p.location, p.year, p.value, p.image, p.description, p.client, p.progress)
    .first<ProjectRow>();
  return toProject(row!);
}

export async function updateProject(id: number, p: NewProject): Promise<PortfolioProject | null> {
  const db = await getDb();
  if (!db) throw new StorageUnavailableError();
  const row = await db
    .prepare(
      `UPDATE projects SET title=?, category=?, status=?, location=?, year=?, value=?, image=?, description=?, client=?, progress=?
       WHERE id=? RETURNING *`
    )
    .bind(p.title, p.category, p.status, p.location, p.year, p.value, p.image, p.description, p.client, p.progress, id)
    .first<ProjectRow>();
  return row ? toProject(row) : null;
}

export async function deleteProject(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new StorageUnavailableError();
  const res = (await db.prepare(`DELETE FROM projects WHERE id=?`).bind(id).run()) as { meta?: { changes?: number } };
  return (res?.meta?.changes ?? 0) > 0;
}

/* ---------------- Media ---------------- */

function toMedia(row: ProjectRow): MediaItem {
  return {
    id: String(row.id),
    kind: row.kind === "video" ? "video" : "image",
    name: String(row.name),
    type: String(row.type),
    size: Number(row.size),
    created_at: String(row.created_at),
  };
}

export async function listMedia(): Promise<MediaItem[]> {
  const db = await getDb();
  if (!db) return []; // gallery empty state outside Cloudflare
  const { results } = await db.prepare(`SELECT * FROM media ORDER BY created_at DESC`).all<ProjectRow>();
  return results.map(toMedia);
}

export async function insertMedia(item: MediaItem): Promise<void> {
  const db = await getDb();
  if (!db) throw new StorageUnavailableError();
  await db
    .prepare(`INSERT INTO media (id, kind, name, type, size, created_at) VALUES (?, ?, ?, ?, ?, ?)`)
    .bind(item.id, item.kind, item.name, item.type, item.size, item.created_at)
    .run();
}

export async function deleteMedia(id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new StorageUnavailableError();
  await db.prepare(`DELETE FROM media WHERE id=?`).bind(id).run();
}

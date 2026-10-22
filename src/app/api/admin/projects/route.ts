import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { createProject, listProjects } from "@/lib/server/db";
import { parseProject } from "@/lib/server/project-input";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await listProjects();
  return NextResponse.json(projects, {
    headers: { "cache-control": "no-store" },
  });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = parseProject(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const project = await createProject(parsed.value);
  return NextResponse.json(project, { status: 201 });
}

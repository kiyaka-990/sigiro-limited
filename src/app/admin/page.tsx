"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, MessageSquare, Briefcase, Users, TrendingUp,
  LogOut, Menu, X, BarChart2, Calendar, Bell, Settings, Clock,
  Plus, Eye, Trash2, AlertCircle, DollarSign, CheckCircle,
} from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import {
  getInquiries, updateInquiry, deleteInquiry,
  getProjects, addProject, updateProject, deleteProject,
  subscribe, type Inquiry, type Project, type InquiryStatus,
} from "@/lib/store";

const statusColor: Record<string, string> = {
  New: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Replied: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "In Progress": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Completed: "bg-green-100 text-[var(--gold)] dark:bg-green-900/30 dark:text-[var(--gold)]",
  Ongoing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: MessageSquare, label: "Inquiries", id: "inquiries" },
  { icon: Briefcase, label: "Projects", id: "projects" },
  { icon: Users, label: "Clients", id: "clients" },
  { icon: BarChart2, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Access is enforced server-side by middleware; if we render, we're authed.
    setAuthenticated(true);

    // Load + live-subscribe to the store (updates when the contact form is
    // submitted, even from another tab).
    const refresh = () => { setInquiries(getInquiries()); setProjects(getProjects()); };
    refresh();
    const unsub = subscribe(refresh);

    // live clock
    setNow(new Date());
    const clock = setInterval(() => setNow(new Date()), 1000);

    return () => { unsub(); clearInterval(clock); };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.push("/admin/login");
    router.refresh();
  };

  const onDeleteInquiry = (id: string) => deleteInquiry(id);
  const onUpdateInquiryStatus = (id: string, status: InquiryStatus) => updateInquiry(id, { status });
  const onDeleteProject = (id: string) => deleteProject(id);
  const onCycleProjectStatus = (p: Project) =>
    updateProject(p.id, p.status === "Ongoing" ? { status: "Completed", progress: 100 } : { status: "Ongoing", progress: 60 });
  const onAddProject = () => {
    const title = window.prompt("Project title?");
    if (!title) return;
    const client = window.prompt("Client?") || "—";
    const value = window.prompt("Contract value? (e.g. KES 250M)") || "—";
    addProject({ title, client, value, status: "Ongoing", progress: 10 });
  };

  // Derived, real stats
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const activeProjects = projects.filter((p) => p.status === "Ongoing").length;
  const totalClients = new Set(inquiries.map((i) => i.email)).size + projects.length;
  const parseVal = (v: string) => {
    const n = parseFloat(v.replace(/[^0-9.]/g, "")) || 0;
    return /b/i.test(v) ? n * 1000 : n; // normalise to millions
  };
  const totalValueM = projects.reduce((s, p) => s + parseVal(p.value), 0);
  const valueLabel = totalValueM >= 1000 ? `KES ${(totalValueM / 1000).toFixed(1)}B` : `KES ${Math.round(totalValueM)}M`;

  const stats = [
    { icon: MessageSquare, label: "New Inquiries", value: String(newCount), change: `${inquiries.length} total`, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600" },
    { icon: Briefcase, label: "Active Projects", value: String(activeProjects), change: `${projects.length} total`, color: "bg-slate-100 dark:bg-[#15351f] text-brand-green" },
    { icon: DollarSign, label: "Portfolio Value", value: valueLabel, change: "live", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600" },
    { icon: Users, label: "Clients & Leads", value: String(totalClients), change: "live", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600" },
  ];

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c1a12]">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#060e09] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0c1a12] border-r border-gray-100 dark:border-[#16331f] shadow-xl transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:shadow-none flex flex-col`}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-gray-100 dark:border-[#16331f] flex items-center justify-between">
          <Logo size="sm" href="/" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === id
                  ? "bg-[#0e2016] text-white shadow-lg shadow-green-700/30"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-green-900/30 hover:text-[var(--gold)]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-100 dark:border-[#16331f]">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#0e2016] flex items-center justify-center text-white font-bold text-sm">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">Administrator</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 truncate">sigiroconstruction2122@gmail.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-[#0c1a12] border-b border-gray-100 dark:border-[#16331f] px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-green-900/30"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-black text-gray-900 dark:text-white capitalize">{activeTab}</h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {now ? now.toLocaleString("en-KE", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "—"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Live
            </span>
            <button className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-green-900/30" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              {newCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
            </button>
            <ThemeToggle />
            <Link href="/" className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white text-xs font-bold rounded-full transition-colors">
              <Eye className="w-3.5 h-3.5" /> View Site
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white dark:bg-[#11271b] rounded-2xl p-5 border border-gray-100 dark:border-[#16331f] shadow-sm hover:shadow-md transition-shadow">
                      <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
                      <p className="text-xs text-brand-green dark:text-[var(--gold)] mt-1 font-medium">{stat.change}</p>
                    </div>
                  );
                })}
              </div>

              {/* Recent inquiries & projects */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#11271b] rounded-2xl border border-gray-100 dark:border-[#16331f] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Recent Inquiries</h3>
                    <button onClick={() => setActiveTab("inquiries")} className="text-xs text-[var(--gold)] font-semibold hover:underline">View all</button>
                  </div>
                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-green-900/20 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#15351f] flex items-center justify-center flex-shrink-0 text-[var(--gold)] font-bold text-xs">
                          {inq.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{inq.name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{inq.service}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColor[inq.status]}`}>
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-[#11271b] rounded-2xl border border-gray-100 dark:border-[#16331f] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Active Projects</h3>
                    <button onClick={() => setActiveTab("projects")} className="text-xs text-[var(--gold)] font-semibold hover:underline">View all</button>
                  </div>
                  <div className="space-y-4">
                    {projects.filter((p) => p.status === "Ongoing").map((p) => (
                      <div key={p.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.title}</p>
                          <span className="text-xs text-[var(--gold)] font-bold">{p.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full transition-all duration-1000"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{p.client} · {p.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-white dark:bg-[#11271b] rounded-2xl border border-gray-100 dark:border-[#16331f] p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Plus, label: "Add Project", color: "bg-[#0e2016] text-white", action: onAddProject },
                    { icon: MessageSquare, label: "View Inquiries", color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600", action: () => setActiveTab("inquiries") },
                    { icon: Calendar, label: "Schedule Meeting", color: "bg-purple-50 dark:bg-purple-900/30 text-purple-600", action: () => { window.location.href = "mailto:sigiroconstruction2122@gmail.com?subject=Meeting%20request"; } },
                    { icon: TrendingUp, label: "View Reports", color: "bg-amber-50 dark:bg-amber-900/30 text-amber-600", action: () => setActiveTab("analytics") },
                  ].map(({ icon: Icon, label, color, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className={`${color} flex flex-col items-center gap-2 p-4 rounded-2xl text-xs font-semibold transition-all hover:scale-105`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-gray-900 dark:text-white">Contact Inquiries</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{inquiries.length} total · {newCount} new</span>
              </div>
              {inquiries.length === 0 && (
                <div className="text-center py-16 text-gray-400 dark:text-gray-500 text-sm">
                  No inquiries yet. Submissions from the contact form appear here in real time.
                </div>
              )}
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-white dark:bg-[#11271b] rounded-2xl border border-gray-100 dark:border-[#16331f] p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#15351f] flex items-center justify-center text-[var(--gold)] font-black flex-shrink-0">
                        {inq.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900 dark:text-white">{inq.name}</h3>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColor[inq.status]}`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                          {inq.email} · {inq.service} · {new Date(inq.date).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{inq.message}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <select
                          value={inq.status}
                          onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                          className="text-xs px-3 py-2 rounded-xl border border-gray-200 dark:border-[#16331f] bg-white dark:bg-[#0c1a12] text-gray-700 dark:text-gray-200 focus:outline-none focus:border-[var(--gold)]"
                        >
                          <option>New</option>
                          <option>Replied</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                        <button
                          onClick={() => onDeleteInquiry(inq.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                          aria-label="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-gray-900 dark:text-white">Project Management</h2>
                <button onClick={onAddProject} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white text-sm font-bold rounded-full transition-colors">
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>
              <div className="grid gap-5">
                {projects.map((p) => (
                  <div key={p.id} className="bg-white dark:bg-[#11271b] rounded-2xl border border-gray-100 dark:border-[#16331f] p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900 dark:text-white text-base">{p.title}</h3>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>
                            {p.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{p.client} · {p.value}</p>
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                            <span className="text-xs font-bold text-[var(--gold)]">{p.progress}%</span>
                          </div>
                          <div className="h-2.5 bg-gray-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[var(--gold)] to-amber-400 rounded-full"
                              style={{ width: `${p.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onCycleProjectStatus(p)}
                          title={p.status === "Ongoing" ? "Mark as completed" : "Reopen as ongoing"}
                          className="p-2.5 text-gray-500 hover:text-[var(--gold)] hover:bg-[#f3f8f4] dark:hover:bg-slate-800/60 rounded-xl transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProject(p.id)}
                          title="Delete project"
                          className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OTHER TABS */}
          {!["dashboard", "inquiries", "projects"].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-[#15351f] rounded-2xl flex items-center justify-center mb-5">
                <AlertCircle className="w-10 h-10 text-brand-green" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 capitalize">{activeTab}</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                This section is coming soon. Use the navigation to access Dashboard, Inquiries, or Projects.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

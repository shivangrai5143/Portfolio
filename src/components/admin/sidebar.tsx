"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  LayoutDashboard,
  FolderOpen,
  Cpu,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  Github,
  RefreshCw,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/skills", label: "Skills", icon: Cpu },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const triggerSync = async () => {
    setSyncing(true);
    try {
      await fetch("/api/github/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SYNC_SECRET || "default-secret-change-in-production"}`,
        },
      });
    } finally {
      setSyncing(false);
    }
  };

  const isActive = (item: (typeof NAV_ITEMS)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <aside
      className={`flex flex-col h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-white font-semibold text-sm">Admin Panel</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto"
        >
          {collapsed ? <Menu size={16} /> : <X size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                active
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <item.icon size={17} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && active && (
                <ChevronRight size={14} className="ml-auto text-blue-400/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {/* GitHub Sync */}
        <button
          onClick={triggerSync}
          disabled={syncing}
          title={collapsed ? "Sync GitHub" : undefined}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            syncing
              ? "text-blue-400 bg-blue-500/10 cursor-wait"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <RefreshCw size={17} className={`shrink-0 ${syncing ? "animate-spin" : ""}`} />
          {!collapsed && <span>{syncing ? "Syncing…" : "Sync GitHub"}</span>}
        </button>

        {/* View Site */}
        <Link
          href="/"
          target="_blank"
          title={collapsed ? "View Site" : undefined}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
        >
          <Github size={17} className="shrink-0" />
          {!collapsed && <span>View Site</span>}
        </Link>

        {/* User Info */}
        {!collapsed && user && (
          <div className="px-3 py-2 rounded-xl bg-slate-800/50 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{user.displayName || "Admin"}</p>
              <p className="text-slate-500 text-[10px] truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Sign Out */}
        <button
          onClick={signOut}
          title={collapsed ? "Sign Out" : undefined}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={17} className="shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

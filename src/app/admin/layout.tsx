"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthGuard } from "@/components/admin/auth-guard";
import { AdminSidebar } from "@/components/admin/sidebar";

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    // Login page is public — render without guard/sidebar
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <div className="flex h-screen bg-slate-950 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}

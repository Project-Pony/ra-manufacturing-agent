import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { getDashboardSnapshot } from "@/lib/data/dashboard";
import { getRoleScopedNotifications } from "@/lib/dashboard";

export default async function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const snapshot = await getDashboardSnapshot();

  if (!snapshot.currentUser || !snapshot.role) {
    redirect("/login");
  }

  const notifications = getRoleScopedNotifications(
    snapshot.notifications,
    snapshot.role,
    snapshot.currentUser.id
  );

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar currentUser={snapshot.currentUser} role={snapshot.role} />
      <div className="min-h-screen flex-1">
        <Topbar
          currentUser={snapshot.currentUser}
          isDemo={snapshot.isDemo}
          notifications={notifications}
          role={snapshot.role}
        />
        <MobileNav role={snapshot.role} />
        <main className="px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

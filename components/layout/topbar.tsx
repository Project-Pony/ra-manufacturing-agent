import { AppRole, AppUser, NotificationItem } from "@/types/app";
import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS } from "@/lib/constants";
import { NotificationBell } from "@/components/layout/notification-bell";
import { LogoutButton } from "@/components/layout/logout-button";

interface TopbarProps {
  currentUser: AppUser | null;
  role: AppRole | null;
  notifications: NotificationItem[];
  isDemo: boolean;
}

export function Topbar({
  currentUser,
  role,
  notifications,
  isDemo
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Sales Sampling Process
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            Welcome back{currentUser ? `, ${currentUser.fullName.split(" ")[0]}` : ""}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {isDemo ? (
            <Badge variant="yellow">Demo data active</Badge>
          ) : null}
          {role ? <Badge variant="blue">{ROLE_LABELS[role]}</Badge> : null}
          <NotificationBell notifications={notifications} role={role} />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

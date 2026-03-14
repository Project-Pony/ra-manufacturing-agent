"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bell } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROLE_HOME_PATHS } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import { AppRole, NotificationItem } from "@/types/app";

interface NotificationBellProps {
  notifications: NotificationItem[];
  role: AppRole | null;
}

export function NotificationBell({ notifications, role }: NotificationBellProps) {
  const [open, setOpen] = useState(false);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications]
  );

  const targetPath = role
    ? role === "admin" || role === "sales_manager"
      ? ROLE_HOME_PATHS.sales_manager
      : ROLE_HOME_PATHS[role]
    : "/login";

  return (
    <div className="relative">
      <Button
        className="relative h-11 w-11 rounded-2xl p-0"
        variant="secondary"
        onClick={() => setOpen((value) => !value)}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 ? (
          <span className="absolute right-2 top-2 flex h-2.5 w-2.5 rounded-full bg-primary" />
        ) : null}
      </Button>

      {open ? (
        <div className="absolute right-0 z-30 mt-3 w-[22rem] rounded-3xl border border-slate-200 bg-white p-4 shadow-panel">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Notifications</h3>
              <p className="text-sm text-slate-500">Unread items for your queue</p>
            </div>
            <Badge variant={unreadCount > 0 ? "blue" : "neutral"}>
              {unreadCount} unread
            </Badge>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500">
                No notifications right now.
              </p>
            ) : (
              notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={`${targetPath}?lead=${notification.leadId}`}
                  className="block rounded-2xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant={notification.isRead ? "neutral" : "blue"}>
                      {notification.isRead ? "Read" : "New"}
                    </Badge>
                    <span className="text-xs text-slate-400">
                      {formatDateTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-800">
                    {notification.message}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

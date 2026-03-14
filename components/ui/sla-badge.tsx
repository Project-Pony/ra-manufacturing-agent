"use client";

import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";

function getSlaTone(startedAt: string | null | undefined, deadlineAt: string | null | undefined) {
  if (!deadlineAt) {
    return "neutral" as const;
  }

  const deadline = new Date(deadlineAt).getTime();
  const start = startedAt ? new Date(startedAt).getTime() : Date.now();
  const totalWindow = Math.max(deadline - start, 1);
  const remaining = deadline - Date.now();
  const ratio = remaining / totalWindow;

  if (remaining <= 0) {
    return "red" as const;
  }

  if (ratio <= 0.2) {
    return "red" as const;
  }

  if (ratio <= 0.5) {
    return "yellow" as const;
  }

  return "green" as const;
}

function formatCountdown(deadlineAt: string | null | undefined) {
  if (!deadlineAt) {
    return "No SLA";
  }

  const diff = new Date(deadlineAt).getTime() - Date.now();

  if (diff <= 0) {
    return "Breached";
  }

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h left`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  }

  return `${minutes}m left`;
}

interface SLABadgeProps {
  startedAt?: string | null;
  deadlineAt?: string | null;
  className?: string;
}

export function SLABadge({ startedAt, deadlineAt, className }: SLABadgeProps) {
  const [label, setLabel] = useState(() => formatCountdown(deadlineAt));

  useEffect(() => {
    setLabel(formatCountdown(deadlineAt));

    const timer = window.setInterval(() => {
      setLabel(formatCountdown(deadlineAt));
    }, 60_000);

    return () => window.clearInterval(timer);
  }, [deadlineAt]);

  const tone = useMemo(() => getSlaTone(startedAt, deadlineAt), [startedAt, deadlineAt, label]);

  return (
    <Badge className={className} variant={tone}>
      {label}
    </Badge>
  );
}

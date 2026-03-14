"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DEMO_COOKIE_NAMES } from "@/lib/constants";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

function clearDemoCookies() {
  document.cookie = `${DEMO_COOKIE_NAMES.role}=; Max-Age=0; path=/`;
  document.cookie = `${DEMO_COOKIE_NAMES.userId}=; Max-Age=0; path=/`;
}

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const hasSupabase = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    try {
      if (hasSupabase) {
        const supabase = createSupabaseBrowserClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw error;
        }
      }

      clearDemoCookies();
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign out.");
    }
  };

  return (
    <Button className="gap-2" size="sm" variant="secondary" onClick={handleLogout}>
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}

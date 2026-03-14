import { redirect } from "next/navigation";

import { getCurrentAuthContext, getRoleHomePath } from "@/lib/auth";

export default async function HomePage() {
  const { role } = await getCurrentAuthContext();

  redirect(getRoleHomePath(role));
}

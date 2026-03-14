import { NextResponse, type NextRequest } from "next/server";

import { normalizeRole, getRoleHomePath, roleCanAccessPath } from "@/lib/auth";
import { DEMO_COOKIE_NAMES } from "@/lib/constants";
import { updateSession } from "@/lib/supabase/middleware";

function isIgnoredPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  );
}

function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isIgnoredPath(pathname)) {
    return NextResponse.next();
  }

  const isLoginRoute = pathname === "/login";
  const isRootRoute = pathname === "/";
  const usingSupabase = hasSupabaseEnv();

  if (!usingSupabase) {
    const role = normalizeRole(request.cookies.get(DEMO_COOKIE_NAMES.role)?.value);

    if (!role && !isLoginRoute && !isRootRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!role && isRootRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (role && (isRootRoute || isLoginRoute)) {
      return NextResponse.redirect(new URL(getRoleHomePath(role), request.url));
    }

    if (role && !roleCanAccessPath(role, pathname)) {
      return NextResponse.redirect(new URL(getRoleHomePath(role), request.url));
    }

    return NextResponse.next();
  }

  const { response, user } = await updateSession(request);
  const role = normalizeRole(
    (user?.app_metadata?.role as string | undefined) ??
      (user?.user_metadata?.role as string | undefined)
  );

  if (!user && !isLoginRoute && !isRootRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!user && isRootRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && (isLoginRoute || isRootRoute)) {
    return NextResponse.redirect(new URL(getRoleHomePath(role), request.url));
  }

  if (user && !roleCanAccessPath(role, pathname)) {
    return NextResponse.redirect(new URL(getRoleHomePath(role), request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

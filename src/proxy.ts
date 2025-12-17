import { NextRequest, NextResponse } from "next/server";
import { checkTokenExpiration } from "./libs/jwt";

const publicRoutes = ["/login", "/register", "/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionData = request.cookies.get("MJ-token.session_data");
  const isTokenExpired = checkTokenExpiration(sessionData?.value);
  const hasValidSession = sessionData?.value && !isTokenExpired;

  // If user has valid session and tries to access public routes, redirect to home
  if (publicRoutes.includes(pathname)) {
    if (hasValidSession) {
      const homeUrl = new URL("/", request.url);
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  // Protected routes - require valid session
  if (!hasValidSession) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

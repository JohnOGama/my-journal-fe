import { NextRequest, NextResponse } from "next/server";
import { checkTokenExpiration } from "./libs/jwt";

const publicRoutes = ["/login", "/register", "/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const sessionData = request.cookies.get("MJ-token.session_data");
  const isTokenExpired = checkTokenExpiration(sessionData?.value);

  if (!sessionData?.value || isTokenExpired) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

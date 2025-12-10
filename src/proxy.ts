import { NextRequest } from "next/server";

// Cookie names based on backend config (prefix: MJ-token)
const SESSION_TOKEN_COOKIE = "MJ-token.session_token";

/**
 * Check if the request has a valid session cookie
 */
export function hasSessionCookie(request: NextRequest): boolean {
  const sessionToken = request.cookies.get(SESSION_TOKEN_COOKIE);
  return !!sessionToken?.value;
}

/**
 * Get session token from request cookies
 */
export function getSessionToken(request: NextRequest): string | null {
  const sessionToken = request.cookies.get(SESSION_TOKEN_COOKIE);
  return sessionToken?.value ?? null;
}

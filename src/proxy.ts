import { NextRequest, NextResponse } from "next/server";
import { authClient } from "./libs/authClient";

function isSessionExpired(expiresAt: Date | string | undefined): boolean {
  if (!expiresAt) return true;

  const expirationDate =
    typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;

  return expirationDate.getTime() < Date.now();
}

export async function proxy(request: NextRequest) {
  const sessionStatus = await authClient.getSession();
  const session = sessionStatus?.data?.session;
  const user = sessionStatus?.data?.user;

  // Check if user exists and session is not expired
  if (!user || !session || isSessionExpired(session.expiresAt)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

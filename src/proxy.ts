import { NextRequest, NextResponse } from "next/server";
import { authClient } from "./libs/authClient";

export async function proxy(request: NextRequest) {
  const sessionStatus = await authClient.getSession();

  console.log("essionStatus?.data?.user", sessionStatus?.data?.user);

  if (!sessionStatus?.data?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

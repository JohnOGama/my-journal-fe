import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("MJ-token.session_token");
  const sessionData = request.cookies.get("MJ-token.session_data");

  console.log("tokens", {
    sessionToken,
    sessionData,
  });
}

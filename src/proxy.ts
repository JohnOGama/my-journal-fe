import { NextRequest } from "next/server";

// TODO: Guard Implementation
// Create utility function to get the token from the request
// Add protected routes
export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("MJ-token.session_token");
  const sessionData = request.cookies.get("MJ-token.session_data");

  console.log("tokens", {
    sessionToken,
    sessionData,
  });
}

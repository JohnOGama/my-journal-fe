import { createAuthClient } from "better-auth/client";

// Use relative URL to go through Next.js proxy (same-origin for cookies)
export const authClient = createAuthClient({
  baseURL: "",
  fetchOptions: {
    credentials: "include", // Include cookies in requests
  },
});

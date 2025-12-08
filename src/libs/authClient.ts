import { createAuthClient } from "better-auth/client";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export const authClient = createAuthClient({
  baseURL: BACKEND_URL,
  fetchOptions: {
    credentials: "include",
  },
});

import { createAuthClient } from "better-auth/client";
import { authStorage } from "./authStorage";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export const authClient = createAuthClient({
  baseURL: BACKEND_URL,
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => authStorage.getToken() || "",
    },
    onResponse: (ctx) => {
      // Check for 401 unauthorized responses and clear token
      if (ctx.response.status === 401) {
        authStorage.removeToken();
      }
    },
  },
});

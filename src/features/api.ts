import { authStorage } from "@/libs/authStorage";

interface ApiResponse<T> {
  response: number;
  success: string;
  error: string | null;
  data: T;
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = authStorage.getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(url, {
    headers: getAuthHeaders(),
    ...options,
  });

  // Handle 401 unauthorized - clear token
  if (res.status === 401) {
    authStorage.removeToken();
  }

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}

export const api = {
  get: <T>(url: string) => request<T>(url, { method: "GET" }),

  post: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: "POST", body: JSON.stringify(body) }),

  put: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: "PUT", body: JSON.stringify(body) }),

  patch: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: "PATCH", body: JSON.stringify(body) }),

  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};

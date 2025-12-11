import { decode } from "@msgpack/msgpack";

interface ApiResponse<T> {
  response: number;
  success: string;
  error: string | null;
  data: T;
}

const MSGPACK_CONTENT_TYPE = "application/msgpack";

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: MSGPACK_CONTENT_TYPE,
};

async function parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes(MSGPACK_CONTENT_TYPE)) {
    const buffer = await res.arrayBuffer();
    return decode(new Uint8Array(buffer)) as ApiResponse<T>;
  }

  return res.json();
}

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(url, {
    headers: defaultHeaders,
    credentials: "include",
    ...options,
  });

  if (!res.ok && res.status === 401 && typeof window !== "undefined") {
    window.location.href = "/login";
  }

  if (!res.ok) {
    const errorData = await parseResponse<T>(res);
    throw errorData;
  }

  return parseResponse<T>(res);
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

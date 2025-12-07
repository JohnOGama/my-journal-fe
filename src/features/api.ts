interface ApiResponse<T> {
  response: number;
  success: string;
  error: string | null;
  data: T;
}

export async function api<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}

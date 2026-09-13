const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

async function request(
  path,
  { method = 'GET', body, headers } = {}
) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.success === false) {
    throw new Error(
      json.message || `Request failed (${res.status})`
    );
  }

  return json.data;
}

export const api = {
  get: (path) => request(path),

  post: (path, body) =>
    request(path, {
      method: 'POST',
      body,
    }),

  delete: (path) =>
    request(path, {
      method: 'DELETE',
    }),
}; 
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function apiFetch(path, opts) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API error');
  return data;
}

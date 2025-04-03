export const fetchWithAuth = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
};

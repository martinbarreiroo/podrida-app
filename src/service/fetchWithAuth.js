// src/service/fetchWithAuth.js
export const fetchWithAuth = async (url, accessToken, options = {}) => {
  if (!accessToken) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
};

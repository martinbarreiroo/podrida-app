// src/service/userService.js
import { fetchWithAuth } from './fetchWithAuth';

export const userService = async (accessToken) => {
  try {
    console.log(accessToken);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    return await fetchWithAuth(`${baseUrl}/api/auth/user`, accessToken);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

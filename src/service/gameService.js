import { fetchWithAuth } from './fetchWithAuth';

export const gameService = {
  submitGame: async (gameData, accessToken) => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      return await fetchWithAuth(`${baseUrl}/api/games`, accessToken, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
    } catch (error) {
      console.error('Error submitting game:', error);
      throw error;
    }
  },

  getGames: async (accessToken) => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      return await fetchWithAuth(`${baseUrl}/api/games`, accessToken, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  },
};

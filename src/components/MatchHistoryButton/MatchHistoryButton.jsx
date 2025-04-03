'use client';

import { useState } from 'react';
import Dialog from '@/components/Dialog/Dialog';
import { FaHistory } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { gameService } from '@/service/gameService';
import styles from './MatchHistoryButton.module.scss';

function MatchHistoryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const handleOpen = async () => {
    if (!isAuthenticated) return;

    setIsOpen(true);
    setIsLoading(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently();
      const gamesData = await gameService.getGames(token);
      setGames(gamesData);
    } catch (err) {
      console.error('Failed to fetch games:', err);
      setError('Failed to load match history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <button onClick={handleOpen} className={styles.historyButton}>
        <FaHistory />
        <span>History</span>
      </button>

      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        title="Match History"
        description="Your previous games"
      >
        <div className={styles.historyContent}>
          {isLoading ? (
            <div className={styles.loadingState}>Loading your games...</div>
          ) : error ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : games.length > 0 ? (
            <div className={styles.gamesList}>
              {games.map((game) => (
                <div key={game.id} className={styles.gameItem}>
                  <h3>{game.name || `Game ${game.id}`}</h3>
                  <div className={styles.playerScores}>
                    {Object.entries(game.playerScores).map(
                      ([player, score]) => (
                        <div key={player} className={styles.playerScore}>
                          <span className={styles.playerName}>{player}</span>
                          <span className={styles.score}>{score}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className={styles.gameDate}>
                    {new Date(game.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noGames}>
              No games found in your history.
            </div>
          )}
          <button onClick={handleClose} className={styles.closeButton}>
            Close
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default MatchHistoryButton;

'use client';

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import styles from './Grid.module.scss';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import { gameService } from '@/service/gameService';

const generateRounds = (midSevensCount = 1) => {
  // Start with ascending rounds 1-7
  const ascending = Array.from({ length: 7 }, (_, i) => i + 1);

  // Generate the middle 7s (this is between the two 7s in the sequence)
  const midSevens = Array(midSevensCount).fill(7);

  // End with descending rounds 7-1
  const descending = Array.from({ length: 7 }, (_, i) => 7 - i);
  descending.push(1);

  // The pattern is [1,2,3,4,5,6,7] + [7,7,7...] + [7,6,5,4,3,2,1]
  // But we need to avoid duplicating the 7 at the boundaries
  return [...ascending, ...midSevens.slice(0, midSevensCount), ...descending];
};

const Grid = forwardRef(
  ({ playerCount = 2, midSevensCount = 1, pointsAwarded = 2 }, ref) => {
    const [rounds, setRounds] = useState(() => generateRounds(midSevensCount));

    const [scores, setScores] = useState(() => {
      return rounds.map(() =>
        Array(playerCount).fill({ select1: '-', select2: '-' })
      );
    });

    const [playerNames, setPlayerNames] = useState(() =>
      Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`)
    );

    const [editingPlayer, setEditingPlayer] = useState(null);
    const [gameSubmitted, setGameSubmitted] = useState(false);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    // Check if game is complete
    useEffect(() => {
      const isGameComplete = scores.every((round) =>
        round.every((score) => score.select1 !== '-' && score.select2 !== '-')
      );

      if (isGameComplete && !gameSubmitted && isAuthenticated) {
        submitGameResults();
      }
    }, [scores, gameSubmitted, isAuthenticated]);

    const submitGameResults = async () => {
      try {
        // Calculate final scores for all players
        const playerScores = {};
        playerNames.forEach((name, index) => {
          playerScores[name] = calculateTotal(index);
        });

        const gameData = {
          name: `Game ${new Date().toLocaleString()}`,
          playerScores: playerScores,
        };

        const token = await getAccessTokenSilently();
        await gameService.submitGame(gameData, token);

        setGameSubmitted(true);
        toast.success('Game has concluded and results saved!');
      } catch (error) {
        console.error('Error submitting game results:', error);
        toast.error('Failed to save game results');
      }
    };

    useEffect(() => {
      const updatedRounds = generateRounds(midSevensCount);
      setRounds(updatedRounds);
      setScores(() => {
        return updatedRounds.map(() =>
          Array.from({ length: playerCount }, () => ({
            select1: '-',
            select2: '-',
          }))
        );
      });

      setPlayerNames(() =>
        Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`)
      );
    }, [midSevensCount, playerCount]);

    // Modify useImperativeHandle to include game submission reset
    useImperativeHandle(ref, () => ({
      resetScores: () => {
        setScores(() => {
          return rounds.map(() =>
            Array.from({ length: playerCount }, () => ({
              select1: '-',
              select2: '-',
            }))
          );
        });
        setGameSubmitted(false);
      },
      submitGame: submitGameResults,
    }));

    const isRoundCompleted = (roundIndex) => {
      return scores[roundIndex].every(
        (score) => score.select1 !== '-' && score.select2 !== '-'
      );
    };

    const getCurrentDealer = () => {
      for (let i = 0; i < rounds.length; i++) {
        if (!isRoundCompleted(i)) {
          return i % playerCount;
        }
      }
      return null;
    };

    const handleNameClick = (index) => {
      setEditingPlayer(index);
    };

    const handleNameChange = (index, newName) => {
      setPlayerNames((prev) => {
        const updated = [...prev];
        updated[index] = newName;
        return updated;
      });
    };

    const handleNameBlur = (index) => {
      setPlayerNames((prev) => {
        const updated = [...prev];
        // If the name is empty, set it to a default value
        if (!updated[index].trim()) {
          updated[index] = `Player ${index + 1}`;
        }
        return updated;
      });
      setEditingPlayer(null);
    };

    const renderPlayerName = (index) => {
      const currentDealer = getCurrentDealer();
      const isDealer = currentDealer === index;

      const playerNameStyle = {
        color: isDealer ? 'red' : 'white',
      };

      if (editingPlayer === index) {
        return (
          <input
            type="text"
            value={playerNames[index]}
            onChange={(e) => handleNameChange(index, e.target.value)}
            onBlur={() => handleNameBlur(index)} // Pass the index here
            onFocus={(e) => e.target.select()}
            className={styles.playerNameInput}
            autoFocus
            style={playerNameStyle}
          />
        );
      }
      return (
        <span
          onClick={() => handleNameClick(index)}
          className={styles.playerName}
          style={playerNameStyle}
        >
          {playerNames[index]}
        </span>
      );
    };

    const getLastPlayer = (roundIndex) => roundIndex % playerCount;

    const handleScoreChange = (roundIndex, playerIndex, selectIndex, value) => {
      if (
        selectIndex === 1 &&
        value === '0' &&
        !isValidSelection(roundIndex, playerIndex, selectIndex)
      ) {
        toast.error('A player cannot select 0 three times in a row.');
        return;
      }

      if (selectIndex === 1 && !isValidSum(roundIndex, playerIndex, value)) {
        toast.error(
          `Player ${playerIndex + 1} cannot select this number as it would make the sum equal to the round number.`
        );
        return;
      }

      if (
        selectIndex === 2 &&
        !validWinRounds(roundIndex, playerIndex, value)
      ) {
        toast.error(
          `Player ${playerIndex + 1} cannot select this number as it would make the sum of win rounds greater than the round number.`
        );
        return;
      }

      setScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[roundIndex] = [...newScores[roundIndex]];
        newScores[roundIndex][playerIndex] = {
          ...newScores[roundIndex][playerIndex],
          [`select${selectIndex}`]: value,
        };
        return newScores;
      });
    };

    const isValidSelection = (roundIndex, playerIndex, selectIndex) => {
      if (roundIndex < 2) return true;

      const prevRound1 =
        scores[roundIndex - 1]?.[playerIndex]?.[`select${selectIndex}`];
      const prevRound2 =
        scores[roundIndex - 2]?.[playerIndex]?.[`select${selectIndex}`];

      return !(prevRound1 === '0' && prevRound2 === '0');
    };

    const isValidSum = (roundIndex, playerIndex, value) => {
      const lastPlayer = getLastPlayer(roundIndex);
      if (playerIndex !== lastPlayer) return true;

      const sum = scores[roundIndex]?.reduce((acc, score, index) => {
        if (index === playerIndex) return acc;
        return acc + (score.select1 === '-' ? 0 : parseInt(score.select1, 10));
      }, 0);

      return sum + parseInt(value, 10) !== rounds[roundIndex];
    };

    const validWinRounds = (roundIndex, playerIndex, value) => {
      // Skip validation for dash ('-') values
      if (value === '-') return true;

      const valueAsNumber = parseInt(value, 10);

      const sum = scores[roundIndex]?.reduce((acc, score, index) => {
        if (index === playerIndex) return acc;
        return acc + (score.select2 === '-' ? 0 : parseInt(score.select2, 10));
      }, 0);

      return sum + valueAsNumber <= rounds[roundIndex];
    };

    const calculateTotal = (playerIndex) => {
      return scores.reduce((total, round) => {
        const { select1, select2 } = round[playerIndex] || {};
        const num1 = select1 !== '-' ? parseInt(select1, 10) || 0 : 0;
        const num2 = select2 !== '-' ? parseInt(select2, 10) || 0 : 0;
        if (num1 === num2 && select1 !== '-' && select2 !== '-') {
          return total + 10 + pointsAwarded * num1;
        }

        if (num1 !== num2 && num2 !== 0) {
          const number = parseInt(select2, 10);
          return total + number * pointsAwarded;
        }

        return total;
      }, 0);
    };

    const renderSelect = (roundIndex, playerIndex, selectIndex) => {
      if (!scores[roundIndex] || !scores[roundIndex][playerIndex]) return null;

      const options = [
        '-',
        ...Array.from({ length: rounds[roundIndex] + 1 }, (_, i) => i),
      ];
      return (
        <select
          value={scores[roundIndex][playerIndex][`select${selectIndex}`]}
          className={styles.selectInput}
          onChange={(e) =>
            handleScoreChange(
              roundIndex,
              playerIndex,
              selectIndex,
              e.target.value
            )
          }
        >
          {options.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      );
    };

    return (
      <div className={styles.gridWrapper}>
        <div
          className={styles.gridContainer}
          style={{ '--player-count': playerCount }}
        >
          <div className={styles.headerRow}>
            <div className={styles.headerCell}>Round</div>
            {Array.from({ length: playerCount }).map((_, index) => (
              <div key={index} className={styles.headerCell}>
                {renderPlayerName(index)}
              </div>
            ))}
          </div>

          {rounds.map((roundNum, roundIndex) => (
            <div key={roundIndex} className={styles.row}>
              <div className={styles.roundNumberCell}>{roundNum}</div>
              {Array.from({ length: playerCount }).map((_, playerIndex) => (
                <div
                  key={`cell-${roundIndex}-${playerIndex}`}
                  className={styles.splitCell}
                >
                  <div className={styles.selectWrapper}>
                    {renderSelect(roundIndex, playerIndex, 1)}
                    {renderSelect(roundIndex, playerIndex, 2)}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className={styles.totalRow}>
            <div className={styles.roundNumberCell}>Total</div>
            {Array.from({ length: playerCount }).map((_, playerIndex) => (
              <div key={playerIndex} className={styles.totalCell}>
                {calculateTotal(playerIndex, pointsAwarded)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default Grid;

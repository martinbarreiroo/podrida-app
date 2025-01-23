'use client';

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import styles from './Grid.module.scss';
import { toast } from 'react-toastify';

const ROUNDS = [1, 2, 3, 4, 5, 6, 7, 7, 7, 6, 5, 4, 3, 2, 1, 1];

const Grid = forwardRef(({ playerCount = 2 }, ref) => {
  const [scores, setScores] = useState(() => {
    return ROUNDS.map(() =>
      Array(playerCount).fill({ select1: '-', select2: '-' })
    );
  });

  const [playerNames, setPlayerNames] = useState(() =>
    Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`)
  );

  const [editingPlayer, setEditingPlayer] = useState(null);

  useEffect(() => {
    setScores(() => {
      return ROUNDS.map(() =>
        Array.from({ length: playerCount }, () => ({
          select1: '-',
          select2: '-',
        }))
      );
    });

    setPlayerNames(() =>
      Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`)
    );
  }, [playerCount]);

  useImperativeHandle(ref, () => ({
    resetScores: () => {
      setScores(() => {
        return ROUNDS.map(() =>
          Array.from({ length: playerCount }, () => ({
            select1: '-',
            select2: '-',
          }))
        );
      });
    },
  }));

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

  const handleNameBlur = () => {
    setEditingPlayer(null);
  };

  const renderPlayerName = (index) => {
    if (editingPlayer === index) {
      return (
        <input
          type="text"
          value={playerNames[index]}
          onChange={(e) => handleNameChange(index, e.target.value)}
          onBlur={handleNameBlur}
          className={styles.playerNameInput}
          autoFocus
        />
      );
    }
    return (
      <span
        onClick={() => handleNameClick(index)}
        className={styles.playerName}
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

    return sum + parseInt(value, 10) !== ROUNDS[roundIndex];
  };

  const calculateTotal = (playerIndex) => {
    return scores.reduce((total, round) => {
      const { select1, select2 } = round[playerIndex] || {};
      const num1 = select1 !== '-' ? parseInt(select1, 10) || 0 : 0;
      const num2 = select2 !== '-' ? parseInt(select2, 10) || 0 : 0;
      if (num1 === num2 && select1 !== '-' && select2 !== '-') {
        return total + 10 + 2 * num1;
      }

      if (num1 !== num2 && num2 !== 0) {
        const number = parseInt(select2, 10);
        return total + number * 2;
      }

      return total;
    }, 0);
  };

  const renderSelect = (roundIndex, playerIndex, selectIndex) => {
    if (!scores[roundIndex] || !scores[roundIndex][playerIndex]) return null;

    const options = [
      '-',
      ...Array.from({ length: ROUNDS[roundIndex] + 1 }, (_, i) => i),
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

        {ROUNDS.map((roundNum, roundIndex) => (
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
              {calculateTotal(playerIndex)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Grid;

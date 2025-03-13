'use client';

import { useState } from 'react';
import Dialog, { DialogTrigger } from '@/components/Dialog/Dialog';
import { IoSettingsOutline } from 'react-icons/io5';
import styles from './SettingsDialog.module.scss';

function SettingsDialog({
  playerCount,
  midSevensCount,
  points,
  onPlayerCountChange,
  onMidSevensChange,
  onPointsChange,
  onReset,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [localPlayerCount, setLocalPlayerCount] = useState(playerCount);
  const [localMidSevens, setLocalMidSevens] = useState(midSevensCount);
  const [localPoints, setLocalPoints] = useState(points);

  const handleOpen = () => {
    setLocalPlayerCount(playerCount);
    setLocalMidSevens(midSevensCount);

    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    onPlayerCountChange(localPlayerCount);
    onMidSevensChange(localMidSevens);
    onPointsChange(localPoints);
    setIsOpen(false);
  };

  const handleResetScores = () => {
    onReset();
    setIsOpen(false);
  };

  const incrementPlayers = () =>
    setLocalPlayerCount((prev) => Math.min(prev + 1, 7));
  const decrementPlayers = () =>
    setLocalPlayerCount((prev) => Math.max(prev - 1, 2));

  const incrementMidSevens = () => setLocalMidSevens((prev) => prev + 1);
  const decrementMidSevens = () =>
    setLocalMidSevens((prev) => Math.max(prev - 1, 1));

  const incrementPoints = () => setLocalPoints((prev) => prev + 1);
  const decrementPoints = () => setLocalPoints((prev) => prev - 1);

  return (
    <>
      <button onClick={handleOpen} className={styles.settingsButton}>
        <IoSettingsOutline />
        <span>Settings</span>
      </button>

      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        title="Game Settings"
        description="Configure your Podrida game parameters"
      >
        <div className={styles.settingsContent}>
          <div className={styles.settingGroup}>
            <label htmlFor="playerCount">Number of Players:</label>
            <div className={styles.inputControl}>
              <button
                onClick={decrementPlayers}
                className={styles.controlButton}
                disabled={localPlayerCount <= 2}
              >
                -
              </button>
              <input
                type="number"
                id="playerCount"
                value={localPlayerCount}
                onChange={(e) =>
                  setLocalPlayerCount(
                    Math.max(2, Math.min(7, parseInt(e.target.value, 10) || 2))
                  )
                }
                min="2"
                max="7"
                className={styles.numberInput}
              />
              <button
                onClick={incrementPlayers}
                className={styles.controlButton}
                disabled={localPlayerCount >= 7}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.settingGroup}>
            <label htmlFor="midSevens">Non-Triumph-Card Rounds:</label>
            <div className={styles.inputControl}>
              <button
                onClick={decrementMidSevens}
                className={styles.controlButton}
                disabled={localMidSevens <= 1}
              >
                -
              </button>
              <input
                type="number"
                id="midSevens"
                value={localMidSevens}
                onChange={(e) =>
                  setLocalMidSevens(
                    Math.max(1, parseInt(e.target.value, 10) || 1)
                  )
                }
                min="1"
                className={styles.numberInput}
              />
              <button
                onClick={incrementMidSevens}
                className={styles.controlButton}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.settingGroup}>
            <label htmlFor="pointsAwarded">Points Awarded per winning:</label>
            <div className={styles.inputControl}>
              <button
                onClick={decrementPoints}
                className={styles.controlButton}
                disabled={localPoints <= 1}
              >
                -
              </button>
              <input
                type="number"
                id="points"
                value={localPoints}
                onChange={(e) =>
                  setLocalPoints(
                    Math.max(2, Math.min(7, parseInt(e.target.value, 10) || 2))
                  )
                }
                min="1"
                className={styles.numberInput}
              />
              <button
                onClick={incrementPoints}
                className={styles.controlButton}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.infoSection}>
            <h3>Round Structure:</h3>
            <div className={styles.roundStructure}>
              <div className={styles.roundPhase}>
                <span className={styles.phaseTitle}>Ascending</span>
                <span className={styles.roundList}>1, 2, 3, 4, 5, 6, 7</span>
              </div>
              <div className={styles.roundPhase}>
                <span className={styles.phaseTitle}>Middle 7s</span>
                <span className={styles.roundList}>
                  {Array(localMidSevens).fill(7).join(', ')}
                </span>
              </div>
              <div className={styles.roundPhase}>
                <span className={styles.phaseTitle}>Descending</span>
                <span className={styles.roundList}>7, 6, 5, 4, 3, 2, 1, 1</span>
              </div>
            </div>
            <div className={styles.totalRounds}>
              Total rounds: {15 + localMidSevens}
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={handleResetScores} className={styles.resetButton}>
              Reset Scores
            </button>
            <div className={styles.actionButtons}>
              <button onClick={handleClose} className={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={handleSave} className={styles.saveButton}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default SettingsDialog;

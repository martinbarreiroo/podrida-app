'use client';

import { useState, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header/Header';
import Grid from '../components/Grid/Grid';
import styles from './page.module.scss';

export default function HomePage() {
  const [playerCount, setPlayerCount] = useState(3);
  const gridRef = useRef();

  const incrementPlayers = () => {
    setPlayerCount((prev) => Math.min(prev + 1, 10));
  };

  const decrementPlayers = () => {
    setPlayerCount((prev) => Math.max(prev - 1, 2));
  };

  const resetScores = () => {
    if (gridRef.current) {
      gridRef.current.resetScores();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />

        <Header
          playerCount={playerCount}
          onIncrement={incrementPlayers}
          onDecrement={decrementPlayers}
          onReset={resetScores}
        />

        <Grid ref={gridRef} playerCount={playerCount} />
      </div>
    </div>
  );
}

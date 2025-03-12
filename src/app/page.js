'use client';

import { useState, useRef } from 'react';
import Head from 'next/head'; // Import Head for including manifest
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header/Header';
import Grid from '../components/Grid/Grid';
import styles from './page.module.scss';

export default function HomePage() {
  const [playerCount, setPlayerCount] = useState(3);
  const gridRef = useRef();
  const [midSevensCount, setMidSevensCount] = useState(1);
  const handleMidSevensChange = (count) => setMidSevensCount(count);

  const incrementPlayers = () => {
    setPlayerCount((prev) => Math.min(prev + 1, 7));
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
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>

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
            onMidSevensChange={handleMidSevensChange}
          />

          <Grid
            ref={gridRef}
            playerCount={playerCount}
            midSevensCount={midSevensCount}
          />
        </div>
      </div>
    </>
  );
}

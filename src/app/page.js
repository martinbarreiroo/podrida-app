'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header/Header';
import Grid from '../components/Grid/Grid';
import SettingsDialog from '../components/SettingsDialog/SettingsDialog';
import styles from './page.module.scss';

export default function HomePage() {
  const [playerCount, setPlayerCount] = useState(3);
  const gridRef = useRef();
  const [midSevensCount, setMidSevensCount] = useState(1);

  const handlePlayerCountChange = (count) => {
    setPlayerCount(count);
  };

  const handleMidSevensChange = (count) => {
    setMidSevensCount(count);
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

          <div className={styles.headerWithSettings}>
            <Header playerCount={playerCount} />
            <div className={styles.settingsWrapper}>
              <SettingsDialog
                playerCount={playerCount}
                midSevensCount={midSevensCount}
                onPlayerCountChange={handlePlayerCountChange}
                onMidSevensChange={handleMidSevensChange}
                onReset={resetScores}
              />
            </div>
          </div>

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

'use client';

import { useState } from 'react';
import styles from './Header.module.scss';
import ResetButton from '@/components/ResetButton/ResetButton';
import Image from 'next/image';

function Header({
  playerCount,
  onIncrement,
  onDecrement,
  onReset,
  onMidSevensChange,
}) {
  const [midSevensCount, setMidSevensCount] = useState(3);

  const handleMidSevensChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMidSevensCount(value);
    onMidSevensChange(value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <Image
          src="/assets/podrida.gif"
          alt="Podrida"
          width={75}
          height={75}
          unoptimized={true}
          priority
        />
        <h1>Podrida</h1>
        <Image
          src="/assets/podrida.gif"
          alt="Podrida"
          width={75}
          height={75}
          unoptimized={true}
          priority
        />
      </div>
      <div className={styles.controls}>
        <span className={styles.span}>Number of Players: {playerCount}</span>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
        <ResetButton onReset={onReset} />
        <div>
          <label htmlFor="midSevensCount">Mid 7s: </label>
          <input
            type="number"
            id="midSevensCount"
            value={midSevensCount}
            onChange={handleMidSevensChange}
            min="1"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

'use client';

import styles from './Header.module.scss';
import ResetButton from '@/components/ResetButton/ResetButton';
import Image from 'next/image';

function Header({ playerCount, onIncrement, onDecrement, onReset }) {
  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <Image
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExazcwbzN6c3hvNzB5ODB2NjFxeXhzcThzZ2QwYmd5NjlkY3B0dzlzbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xJEqVd9MQ1enBe/giphy.gif"
          alt="Podrida"
          width={75}
          height={75}
        />
        <h1>Podrida</h1>
        <Image
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExazcwbzN6c3hvNzB5ODB2NjFxeXhzcThzZ2QwYmd5NjlkY3B0dzlzbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xJEqVd9MQ1enBe/giphy.gif"
          alt="Podrida"
          width={75}
          height={75}
        />
      </div>
      <div className={styles.controls}>
        <span className={styles.span}>Number of Players: {playerCount}</span>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
        <ResetButton onReset={onReset} />
      </div>
    </div>
  );
}

export default Header;

'use client';

import styles from './Header.module.scss';
import ResetButton from "@/components/ResetButton/ResetButton";


function Header({ playerCount, onIncrement, onDecrement, onReset }) {
    return (
        <div className={styles.header}>
            <div className={styles.titleContainer}>
                <h1>Podrida</h1>
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

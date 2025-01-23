import React from 'react';
import styles from './ResetButton.module.scss';

const ResetButton = ({ onReset }) => {
  return (
    <button onClick={onReset} className={styles.resetButton}>
      Reset
    </button>
  );
};

export default ResetButton;

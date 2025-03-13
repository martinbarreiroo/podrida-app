'use client';

import { useState } from 'react';
import Dialog from '@/components/Dialog/Dialog';
import { IoHelpCircleOutline } from 'react-icons/io5';
import styles from './RulesDialog.module.scss';

function RulesDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen} className={styles.rulesButton}>
        <IoHelpCircleOutline />
        <span>Rules</span>
      </button>

      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        title="Game Rules"
        description="How to play Podrida"
      >
        <div className={styles.rulesContent}>
          <section className={styles.ruleSection}>
            <h3>Basic Rules</h3>
            <ul>
              <li>
                Dealer gives as many cards as the round number to each player.
              </li>

              <li>
                After every player has the same number of cards, the dealer
                places the "Triumph" card in the center.
              </li>

              <li>
                Each round has a specific number of sub-rounds to be played.
              </li>
              <li>
                Players must predict how many sub-rounds they'll win each round.
              </li>
              <li>
                Points are awarded based on correct predictions and sub-rounds
                won.
              </li>

              <li>
                A player cannot predict "0" cards won three times in a row.
              </li>
            </ul>
          </section>

          <section className={styles.ruleSection}>
            <h3>Scoring</h3>
            <ul>
              <li>
                When prediction matches sub-rounds won: 10 points + (points
                multiplier × number predicted)
              </li>
              <li>
                When prediction doesn't match: points multiplier × number of
                tricks won
              </li>
              <li>The sum of all predictions cannot equal the round number.</li>
            </ul>
          </section>

          <section className={styles.ruleSection}>
            <h3>Round Structure</h3>
            <p>The game follows a specific pattern of rounds:</p>
            <ul>
              <li>Ascending: 1 through 7 cards</li>
              <li>Middle 7s: Additional rounds with 7 cards (configurable)</li>
              <li>
                Descending: 7 down to 1 card, with an extra round of 1, in which
                the players are allowed to watch only the opponent's card, but
                not their own.{' '}
              </li>
            </ul>
          </section>

          <button onClick={handleClose} className={styles.closeButton}>
            Got It
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default RulesDialog;

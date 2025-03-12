'use client';

import { useEffect, useRef } from 'react';
import styles from './Dialog.module.scss';
import { createPortal } from 'react-dom';

export function Dialog({ isOpen, onClose, title, description, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    // Handle escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Prevent scrolling on body when dialog is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Focus trap for accessibility
  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) firstElement.focus();

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    dialog.addEventListener('keydown', handleTabKey);
    return () => dialog.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <div className={styles.header}>
          {title && (
            <h2 id="dialog-title" className={styles.title}>
              {title}
            </h2>
          )}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        {description && (
          <p id="dialog-description" className={styles.description}>
            {description}
          </p>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

// Export DialogTrigger component for easier usage
export function DialogTrigger({ children, onClick }) {
  return (
    <button className={styles.trigger} onClick={onClick}>
      {children}
    </button>
  );
}

export default Dialog;

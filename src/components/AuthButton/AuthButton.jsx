'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import styles from './AuthButton.module.scss';

export default function AuthButton() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.authButton}>
      {user ? (
        <div className={styles.userInfo}>
          <span>{user.name}</span>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
    </div>
  );
}

'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { userService } from '@/service/userService';
import styles from './AuthButton.module.scss';
import { FaUser } from 'react-icons/fa'; // Import the user icon

function AuthButton() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const [backendUser, setBackendUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      getAccessTokenSilently()
        .then((token) => {
          console.log(
            'Access token retrieved:',
            token ? 'Token found' : 'No token'
          );
          if (token) {
            return userService(token);
          }
        })
        .then((userData) => {
          if (userData) {
            console.log('Backend user data:', userData);
            setBackendUser(userData);
          }
        })
        .catch((error) => console.error('Auth error:', error));
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  if (isLoading) return <div className={styles.authButton}>Loading...</div>;

  return (
    <div className={styles.authButton}>
      {isAuthenticated ? (
        <div className={styles.userInfo}>
          <span>{user?.name}</span>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className={styles.logoutButton}
          >
            <FaUser />
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className={styles.loginButton}
        >
          <FaUser />
          Login
        </button>
      )}
    </div>
  );
}

export default AuthButton;

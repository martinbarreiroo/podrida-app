'use client';

import { Auth0Provider } from '@auth0/auth0-react';

export default function Auth0ClientProvider({ children }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL?.replace(
        'https://',
        ''
      )}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri:
          typeof window !== 'undefined' ? window.location.origin : '',
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: 'openid profile email',
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}

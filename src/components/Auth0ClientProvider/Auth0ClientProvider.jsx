'use client';

import { Auth0Provider } from '@auth0/auth0-react';

export default function Auth0ClientProvider({ children }) {
  const domain = process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL?.replace(
    'https://',
    ''
  );
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

  // For SSR compatibility
  const redirectUri =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.AUTH0_PROD_URL || process.env.AUTH0_BASE_URL;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: 'openid profile email',
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}

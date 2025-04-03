import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.scss';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration/ServiceWorkerRegistration';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: 'no',
  themeColor: '#333',
};

export const metadata = {
  title: 'La Podrida App',
  description: 'Generated by create next app',
  icons: {
    icon: '/favicon.png',
  },
  manifest: '/manifest.json',
  appleWebAppCapable: 'yes',
  appleWebAppStatusBarStyle: 'default',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <ServiceWorkerRegistration />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}

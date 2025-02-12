export default function OfflinePage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1>You&apos;re Offline</h1>
      <p>Please check your internet connection and try again.</p>
      <p>Some features may still be available while offline.</p>
    </div>
  );
}

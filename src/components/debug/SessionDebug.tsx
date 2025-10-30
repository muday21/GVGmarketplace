'use client';

import { useSession } from '../../lib/auth';

export function SessionDebug() {
  const { data: session, isPending, error } = useSession();
  
  console.log('Session Debug:', { session, isPending, error });
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      border: '1px solid #ccc', 
      padding: '10px', 
      zIndex: 9999,
      fontSize: '12px',
      maxWidth: '300px'
    }}>
      <h4>Session Debug</h4>
      <p><strong>isPending:</strong> {isPending ? 'true' : 'false'}</p>
      <p><strong>hasSession:</strong> {session ? 'true' : 'false'}</p>
      <p><strong>userName:</strong> {session?.user?.name || 'none'}</p>
      <p><strong>userEmail:</strong> {session?.user?.email || 'none'}</p>
      <p><strong>error:</strong> {error ? String(error) : 'none'}</p>
      <details>
        <summary>Full Session Data</summary>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </details>
    </div>
  );
}

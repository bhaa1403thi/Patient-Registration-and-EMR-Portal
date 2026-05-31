import React from 'react';
import Layout from '../components/Layout';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('currentUser')) || {};

  return (
    <Layout>
      <div className="card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{
          width: '96px', height: '96px', borderRadius: '50%', backgroundColor: '#2563eb', color: 'white',
          fontSize: '2.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
        }}>
          {user.name?.charAt(0)}
        </div>
        
        <h2>{user.name}</h2>
        <span className="badge badge-info" style={{ marginTop: '0.5rem', fontSize: '0.9rem', padding: '0.4rem 1.2rem' }}>
          ROLE LEVEL: {user.role?.toUpperCase()}
        </span>

        <div style={{ marginTop: '2.5rem', textAlign: 'left', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }} className="grid-2">
          <div>
            <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SYSTEM ROUTING EMAIL</strong>
            <p style={{ fontSize: '1.1rem', fontWeight: '500', marginTop: '0.25rem' }}>{user.username}</p>
          </div>
          <div>
            <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>GATEWAY ACCESS ID</strong>
            <p style={{ fontSize: '1.1rem', fontWeight: '500', marginTop: '0.25rem' }}><code>{user.id || 'N/A'}</code></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
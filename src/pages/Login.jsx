import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please provide complete account credentials.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const targetUser = users.find(u => u.username === username && u.password === password);

    if (targetUser) {
      localStorage.setItem('currentUser', JSON.stringify(targetUser));
      navigate(`/${targetUser.role}-dashboard`);
    } else {
      setError('Invalid username or access key password.');
    }
  };

  const handleDemoLogin = (userType) => {
    const defaultAccounts = {
      admin: ['admin@healthsync.com', 'password123'],
      doctor: ['doctor@healthsync.com', 'password123'],
      patient: ['patient@healthsync.com', 'password123']
    };
    setUsername(defaultAccounts[userType][0]);
    setPassword(defaultAccounts[userType][1]);
    setError('');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Split Screen Panel Left */}
      <div style={{
        flex: 1, background: 'radial-gradient(circle, #1e3a8a 0%, #0f172a 100%)',
        color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem'
      }}>
        <div style={{ maxWidth: '500px' }}>
          <span style={{ fontSize: '3rem' }}>🏥</span>
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginTop: '1.5rem' }}>HealthSync EMR Gateway</h1>
          <p style={{ color: '#94a3b8', marginTop: '1rem', fontSize: '1.1rem' }}>
            Deploy unified workflows, clinical history records tracking, secure multi-role portal layers, and custom onboarding modules.
          </p>
          <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <span>✓</span> <p style={{ color: '#e2e8f0' }}>Structured Medical Consent Logs</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <span>✓</span> <p style={{ color: '#e2e8f0' }}>Dynamic Treatment Allocation Engines</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel Right */}
      <div style={{ flex: 1, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem' }}>
        <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
          <h2>Portal Authorization</h2>
          <p style={{ marginBottom: '2rem' }}>Provide system operational credentials below</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>System Email Address</label>
              <input type="email" className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="name@healthsync.com" />
            </div>
            <div className="form-group">
              <label>Account Access Token Password</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Authenticate User</button>
          </form>

          <div style={{ marginTop: '2.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>PRE-CONFIGURED DEMO PROFILES</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button onClick={() => handleDemoLogin('admin')} className="btn" style={{ background: '#f1f5f9', color: '#1e293b', justifyContent: 'space-between' }}>
                <span>🔧 Load Executive Admin Suite</span> <strong>→</strong>
              </button>
              <button onClick={() => handleDemoLogin('doctor')} className="btn" style={{ background: '#f1f5f9', color: '#1e293b', justifyContent: 'space-between' }}>
                <span>🩺 Load Doctor Clinical Space</span> <strong>→</strong>
              </button>
              <button onClick={() => handleDemoLogin('patient')} className="btn" style={{ background: '#f1f5f9', color: '#1e293b', justifyContent: 'space-between' }}>
                <span>👤 Load Patient Medical Vault</span> <strong>→</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
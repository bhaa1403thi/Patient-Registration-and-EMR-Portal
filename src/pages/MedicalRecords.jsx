import React from 'react';
import Layout from '../components/Layout';

export default function MedicalRecords() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const record = patients.find(p => p.email === currentUser.username);

  if (!record) {
    return (
      <Layout>
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Clinical Block Created</h3>
          <p>Please finalize your onboarding framework application inside the registration terminal first.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>Electronic Health Record Vault</h2>
      <p style={{ marginBottom: '2rem' }}>Immutable state summary tracker of diagnostics logs and active medications.</p>

      <div className="grid-2">
        {/* Card Layer A: Personal Identifiers */}
        <div className="card">
          <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Personal Core Coordinates</h3>
          <table style={{ marginTop: '0' }}>
            <tbody>
              <tr><th>Tracking ID</th><td><code>{record.id.toUpperCase()}</code></td></tr>
              <tr><th>Full Identity</th><td>{record.name}</td></tr>
              <tr><th>Gender Signature</th><td>{record.gender}</td></tr>
              <tr><th>Date of Birth</th><td>{record.dob}</td></tr>
              <tr><th>Insurance Policy</th><td>{record.insurance}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Card Layer B: Diagnostics Matrix */}
        <div className="card">
          <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Clinical Data Metrics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ALLERGY LOG DATA</strong>
              <p style={{ color: 'var(--danger)', fontWeight: '600', fontSize: '1.1rem' }}>{record.allergies || 'No constraints tracked.'}</p>
            </div>
            <div>
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ONGOING PHARMACEUTICAL MATRIX</strong>
              <p style={{ color: '#0f172a', fontWeight: '500' }}>{record.medications || 'No compounds run.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Practitioner Notes Card Display Block */}
      {record.notes && (
        <div className="card" style={{ borderLeft: '4px solid var(--accent)', background: '#f0fdfa' }}>
          <h3 style={{ color: '#0f766e' }}>Practitioner Attestation Notes</h3>
          <p style={{ color: '#115e59', fontSize: '1.05rem', fontStyle: 'italic', marginTop: '0.75rem', lineHeight: '1.6' }}>
            "{record.notes}"
          </p>
        </div>
      )}
    </Layout>
  );
}
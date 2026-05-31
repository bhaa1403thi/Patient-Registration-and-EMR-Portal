import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function DoctorPatients() {
  const currentDoc = JSON.parse(localStorage.getItem('currentUser'));
  const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
  const activeDocId = doctors.find(d => d.email === currentDoc.username)?.id || '';

  const [patients, setPatients] = useState(JSON.parse(localStorage.getItem('patients')) || []);
  const myPatients = patients.filter(p => p.assignedDoctorId === activeDocId);

  const [activeNoteText, setActiveNoteText] = useState({});
  const [saveStatus, setSaveStatus] = useState({});

  const handleUpdateNotes = (patientId) => {
    const updated = patients.map(p => {
      if (p.id === patientId) {
        return { ...p, notes: activeNoteText[patientId] || p.notes };
      }
      return p;
    });
    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
    
    // Smooth inline status replacement for legacy alert box
    setSaveStatus(prev => ({ ...prev, [patientId]: 'Clinical history log committed successfully.' }));
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, [patientId]: '' }));
    }, 3000);
  };

  return (
    <Layout>
      <h2>My Assigned Care Registry</h2>
      <p style={{ marginBottom: '2rem' }}>Review records data and append real-time validation notes.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {myPatients.map(p => (
          <div className="card" key={p.id}>
            <div className="grid-2" style={{ marginBottom: '1rem' }}>
              <div>
                <h3>{p.name}</h3>
                <p>Gender Matrix: {p.gender} | Identity DOB: {p.dob}</p>
                <p style={{ marginTop: '0.5rem' }}><strong>Allergy Core:</strong> <span style={{ color: 'var(--danger)' }}>{p.allergies}</span></p>
                <p><strong>Medication List:</strong> {p.medications}</p>
              </div>
              <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
                <h5>Emergency Profile Contacts</h5>
                <p style={{ color: 'var(--text-main)', marginTop: '0.25rem' }}>{p.emergencyContact}</p>
                <h5 style={{ marginTop: '0.5rem' }}>Insurance Carrier Network</h5>
                <p style={{ color: 'var(--text-main)' }}>{p.insurance}</p>
              </div>
            </div>

            <div style={{ marginTop: '1rem', pt: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <label style={{ fontWeight: '700', fontSize: '0.85rem' }}>CLINICAL EXAMINATION NOTES</label>
              <textarea 
                className="form-control" 
                rows="3" 
                defaultValue={p.notes} 
                onChange={(e) => setActiveNoteText({ ...activeNoteText, [p.id]: e.target.value })}
                style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
                placeholder="Append latest diagnostics, physiological check values, and monitoring schedules..."
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--success)', fontWeight: '600', fontSize: '0.9rem' }}>{saveStatus[p.id]}</span>
                <button onClick={() => handleUpdateNotes(p.id)} className="btn btn-primary">Commit Chart Notes</button>
              </div>
            </div>
          </div>
        ))}
        {myPatients.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p>No patients have been assigned to your workspace profile yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function AdminPatients() {
  const [patients, setPatients] = useState(JSON.parse(localStorage.getItem('patients')) || []);
  const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
  const [confirmation, setConfirmation] = useState('');

  const handleAssignDoctor = (patientId, doctorId) => {
    const targetDoc = doctors.find(d => d.id === doctorId);
    const updated = patients.map(p => {
      if (p.id === patientId) {
        return { ...p, assignedDoctorId: doctorId };
      }
      return p;
    });
    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
    setConfirmation(`Successfully linked allocation to: ${targetDoc ? targetDoc.name : 'Unassigned'}`);
    setTimeout(() => setConfirmation(''), 4000);
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2>Enterprise Patient Records</h2>
          <p>Assign clinical care paths and monitor patient diagnostic background fields.</p>
        </div>
      </div>

      {confirmation && <div className="alert alert-success" style={{ padding: '0.75rem' }}>{confirmation}</div>}

      <div className="grid-2">
        {patients.map(patient => (
          <div className="card" key={patient.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem' }}>{patient.name}</h4>
                <p style={{ fontSize: '0.85rem' }}>{patient.email} | DOB: {patient.dob}</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div><strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ALLERGY CONSTRAINTS</strong><p style={{ color: '#b91c1c', fontWeight: '500' }}>{patient.allergies || 'None Recorded'}</p></div>
              <div><strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ACTIVE MEDICATIONS</strong><p style={{ color: '#0f172a' }}>{patient.medications || 'None Active'}</p></div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>PRIMARY ASSIGNED CLINICIAN</label>
              <select 
                className="form-control" 
                value={patient.assignedDoctorId || ''} 
                onChange={(e) => handleAssignDoctor(patient.id, e.target.value)}
              >
                <option value="">Unassigned Care</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
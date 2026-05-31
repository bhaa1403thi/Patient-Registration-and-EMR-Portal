import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function DoctorAppointments() {
  const currentDoc = JSON.parse(localStorage.getItem('currentUser'));
  const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
  const activeDocId = doctors.find(d => d.email === currentDoc.username)?.id || '';

  const [appointments, setAppointments] = useState(JSON.parse(localStorage.getItem('appointments')) || []);
  const myAppointments = appointments.filter(a => a.doctorId === activeDocId);

  const handleUpdateStatus = (id, newStatus) => {
    const updated = appointments.map(a => {
      if (a.id === id) return { ...a, status: newStatus };
      return a;
    });
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  return (
    <Layout>
      <h2>Consultation Routing Workspace</h2>
      <p>Approve scheduling tokens or clear conflicting booking pipelines.</p>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Patient Track Name</th>
                <th>Target Date</th>
                <th>Time Window</th>
                <th>Current Status Badge</th>
                <th>Action Controls Matrix</th>
              </tr>
            </thead>
            <tbody>
              {myAppointments.map(app => (
                <tr key={app.id}>
                  <td><strong>{app.patientName}</strong></td>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td><span className={`badge badge-${app.status}`}>{app.status}</span></td>
                  <td>
                    {app.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleUpdateStatus(app.id, 'confirmed')} className="btn btn-accent" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Confirm Slot</button>
                        <button onClick={() => handleUpdateStatus(app.id, 'cancelled')} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Cancel</button>
                      </div>
                    ) : (
                      <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>Locked</span>
                    )}
                  </td>
                </tr>
              ))}
              {myAppointments.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No interactive calendar events mapped to your ID.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
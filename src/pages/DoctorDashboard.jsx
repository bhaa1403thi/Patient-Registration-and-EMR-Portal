import React from 'react';
import Layout from '../components/Layout';

export default function DoctorDashboard() {
  const currentDoc = JSON.parse(localStorage.getItem('currentUser'));
  const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
  const activeDocId = doctors.find(d => d.email === currentDoc.username)?.id || '';

  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  const patients = JSON.parse(localStorage.getItem('patients')) || [];

  const docAppointments = appointments.filter(a => a.doctorId === activeDocId);
  const myPatientsCount = patients.filter(p => p.assignedDoctorId === activeDocId).length;
  
  // Runtime bug fix: correctly derive data from local structural scope
  const pendingCount = docAppointments.filter(a => a.status === 'pending').length;

  return (
    <Layout>
      <div className="banner">
        <h1>Welcome Back, {currentDoc.name}</h1>
        <p>Your workspace is online. Review pending clinical decisions, notes updates, and patient consultation sessions.</p>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Allocated Case Patients</div>
          <div className="stat-val">{myPatientsCount}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Actionable Pending Bookings</div>
          <div className="stat-val">{pendingCount}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Total Slotted Schedules</div>
          <div className="stat-val">{docAppointments.length}</div>
        </div>
      </div>

      <div className="card">
        <h3>Incoming Allocation Pipeline</h3>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Patient Designation</th>
                <th>Target Date</th>
                <th>Window Time</th>
                <th>Status Core</th>
              </tr>
            </thead>
            <tbody>
              {docAppointments.slice(0, 5).map(app => (
                <tr key={app.id}>
                  <td><strong>{app.patientName}</strong></td>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td><span className={`badge badge-${app.status}`}>{app.status}</span></td>
                </tr>
              ))}
              {docAppointments.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No localized consultation sequences found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
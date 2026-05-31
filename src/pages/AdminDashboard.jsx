import React from 'react';
import Layout from '../components/Layout';

export default function AdminDashboard() {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  return (
    <Layout>
      <div className="banner">
        <h1>Administrative Master Control</h1>
        <p>System deployment statistics, diagnostic rosters, and clinic-wide personnel records allocations.</p>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <span style={{ fontSize: '1.5rem' }}>👥</span>
          <div style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.5rem' }}>Registered Patients</div>
          <div className="stat-val">{patients.length}</div>
        </div>
        <div className="stat-card">
          <span style={{ fontSize: '1.5rem' }}>🩺</span>
          <div style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.5rem' }}>Active Personnel Doctors</div>
          <div className="stat-val">{doctors.length}</div>
        </div>
        <div className="stat-card">
          <span style={{ fontSize: '1.5rem' }}>📅</span>
          <div style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.5rem' }}>Total Session Bookings</div>
          <div className="stat-val">{appointments.length}</div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Central Appointments Status</h3>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Patient Track</th>
                <th>Assigned Officer</th>
                <th>Target Date</th>
                <th>Session Time</th>
                <th>Operational Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(-5).reverse().map(app => (
                <tr key={app.id}>
                  <td><strong>{app.patientName}</strong></td>
                  <td>{app.doctorName}</td>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td><span className={`badge badge-${app.status}`}>{app.status}</span></td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No tracking records active in system memory storage.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
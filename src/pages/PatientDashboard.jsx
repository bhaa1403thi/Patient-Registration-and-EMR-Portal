import React from 'react';
import Layout from '../components/Layout';

export default function PatientDashboard() {
  const currentPatient = JSON.parse(localStorage.getItem('currentUser'));
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const profileDetails = patients.find(p => p.email === currentPatient.username);
  
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  const myAppointments = appointments.filter(a => a.patientId === profileDetails?.id);

  return (
    <Layout>
      <div className="banner">
        <h1>Welcome to Your Care Vault, {currentPatient.name}</h1>
        <p>Coordinate consultations, maintain regulatory medical documentation, and verify treatment frameworks.</p>
      </div>

      {!profileDetails && (
        <div className="alert alert-danger">
          <strong>Action Required:</strong> Your healthcare registration profiling is incomplete. Access the registration sub-tab to submit health details.
        </div>
      )}

      <div className="grid-2">
        <div className="card">
          <h3>Active Diagnostics Summary</h3>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div><strong>Registration Health Status:</strong> {profileDetails ? '✓ Complete Profiles Checked' : '❌ Pending Verification Form'}</div>
            <div><strong>Assigned Practitioner Provider:</strong> {profileDetails?.assignedDoctorId ? 'Linked' : 'Awaiting Administration Assignment'}</div>
          </div>
        </div>

        <div className="card">
          <h3>Your Appointed Calendars</h3>
          <div style={{ marginTop: '1rem' }}>
            {myAppointments.slice(-2).map(app => (
              <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
                <div>
                  <strong>{app.doctorName}</strong>
                  <p style={{ fontSize: '0.8rem' }}>{app.date} @ {app.time}</p>
                </div>
                <span className={`badge badge-${app.status}`}>{app.status}</span>
              </div>
            ))}
            {myAppointments.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No consultation paths scheduled.</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
}
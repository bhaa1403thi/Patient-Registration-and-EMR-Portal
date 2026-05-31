import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function BookAppointment() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const profileDetails = patients.find(p => p.email === currentUser.username);

  const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
  
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [success, setSuccess] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
    if (!profileDetails) {
      alert('You must complete registration before booking an appointment.');
      return;
    }

    const selectedDoc = doctors.find(d => d.id === doctorId);
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    
    const newAppointment = {
      id: 'a' + (appointments.length + 1),
      patientId: profileDetails.id,
      patientName: profileDetails.name,
      doctorId,
      doctorName: selectedDoc ? selectedDoc.name : 'Unassigned',
      date,
      time,
      status: 'pending'
    };

    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    setDoctorId(''); setDate(''); setTime('');
    setSuccess('Calendar event requests successfully queued to clinical inbox.');
    setTimeout(() => setSuccess(''), 4000);
  };

  return (
    <Layout>
      <h2>Consultation Scheduling Matrix</h2>
      <p style={{ marginBottom: '1.5rem' }}>Secure a window with tracking healthcare specialists.</p>

      {success && <div className="alert alert-success">{success}</div>}

      <div className="card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleBooking}>
          <div className="form-group">
            <label>Select Clinical Specialist Provider</label>
            {doctors.length > 0 ? (
              <select className="form-control" value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
                <option value="">Query Active Medical Provider...</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.name} — [{doc.specialty}]</option>
                ))}
              </select>
            ) : (
              <input type="text" className="form-control" placeholder="No providers registered in local storage system." disabled />
            )}
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Target Execution Date</label>
              <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Preferred Time Window</label>
              <input type="time" className="form-control" value={time} onChange={e => setTime(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Transmit Booking Sequence
          </button>
        </form>
      </div>
    </Layout>
  );
}
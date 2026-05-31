import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function PatientRegistration() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [patients, setPatients] = useState(JSON.parse(localStorage.getItem('patients')) || []);
  const existingProfile = patients.find(p => p.email === currentUser.username) || {};

  // Comprehensive Multiphase Form Context State
  const [name, setName] = useState(existingProfile.name || currentUser.name);
  const [gender, setGender] = useState(existingProfile.gender || '');
  const [dob, setDob] = useState(existingProfile.dob || '');
  const [allergies, setAllergies] = useState(existingProfile.allergies || '');
  const [medications, setMedications] = useState(existingProfile.medications || '');
  const [emergencyContact, setEmergencyContact] = useState(existingProfile.emergencyContact || '');
  const [insurance, setInsurance] = useState(existingProfile.insurance || '');
  const [consent, setConsent] = useState(existingProfile.consent || false);
  
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!consent) {
      alert('Consent validation must be approved.');
      return;
    }

    const patientId = existingProfile.id || 'p' + (patients.length + 1);
    const newRecord = {
      id: patientId, name, email: currentUser.username, gender, dob,
      allergies, medications, emergencyContact, insurance, consent,
      assignedDoctorId: existingProfile.assignedDoctorId || null,
      notes: existingProfile.notes || ""
    };

    let updatedList;
    if (existingProfile.id) {
      updatedList = patients.map(p => p.id === existingProfile.id ? newRecord : p);
    } else {
      updatedList = [...patients, newRecord];
    }

    setPatients(updatedList);
    localStorage.setItem('patients', JSON.stringify(updatedList));
    setSuccessMsg('Comprehensive EMR data block saved successfully.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <Layout>
      <h2>EMR Onboarding Questionnaire Form</h2>
      <p style={{ marginBottom: '2rem' }}>Provide clinical baselines and consent profiles for complete integration.</p>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form onSubmit={handleRegisterSubmit}>
        {/* Core Layout Card 1: Personal Coordinates */}
        <div className="card">
          <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.2rem' }}>1. Primary Personal Information</h3>
          <div className="grid-3">
            <div className="form-group">
              <label>Legal Identification Name</label>
              <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Gender Architecture</label>
              <select className="form-control" value={gender} onChange={e => setGender(e.target.value)} required>
                <option value="">Select Gender Alignment</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Declined">Prefer Not to State</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Physiological Birth</label>
              <input type="date" className="form-control" value={dob} onChange={e => setDob(e.target.value)} required />
            </div>
          </div>
        </div>

        {/* Core Layout Card 2: Clinical Background Background Context */}
        <div className="card">
          <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.2rem' }}>2. Medical Background History</h3>
          <div className="grid-2">
            <div className="form-group">
              <label>Allergic Reactions & Complications</label>
              <textarea className="form-control" rows="3" value={allergies} onChange={e => setAllergies(e.target.value)} placeholder="Enumerate substance allergies (e.g., Penicillin, tree nuts) or write 'None'" required />
            </div>
            <div className="form-group">
              <label>Active Medications List</label>
              <textarea className="form-control" rows="3" value={medications} onChange={e => setMedications(e.target.value)} placeholder="Specify dosage and schedules of running compounds..." required />
            </div>
          </div>
        </div>

        {/* Core Layout Card 3: Administrative Backup Layers */}
        <div className="card">
          <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.2rem' }}>3. Emergency Parameters & Insurance</h3>
          <div className="grid-2">
            <div className="form-group">
              <label>Emergency Contact Route Line</label>
              <input type="text" className="form-control" value={emergencyContact} onChange={e => setEmergencyContact(e.target.value)} placeholder="Name - Relationship - Phone Number" required />
            </div>
            <div className="form-group">
              <label>Insurance Network Carrier & Policy ID</label>
              <input type="text" className="form-control" value={insurance} onChange={e => setInsurance(e.target.value)} placeholder="Provider Corp - ID #88741" required />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: '0.25rem' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                I formally authorize HealthSync system architecture nodes to process my encrypted Electronic Medical Records for institutional diagnostic routing paths.
              </span>
            </label>
          </div>
        </div>

        <div style={{ textAlign: 'right', marginBottom: '3rem' }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2.5rem' }}>Commit Profiles Block</button>
        </div>
      </form>
    </Layout>
  );
}
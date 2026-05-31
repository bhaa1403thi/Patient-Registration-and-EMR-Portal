import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState(JSON.parse(localStorage.getItem('doctors')) || []);
  const [isOpen, setIsOpen] = useState(false);
  const [sortKey, setSortKey] = useState('name');
  
  // Form State
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!name || !specialty || !email) return;

    const newDoc = { id: 'd' + (doctors.length + 1), name, specialty, email };
    const updated = [...doctors, newDoc];
    setDoctors(updated);
    localStorage.setItem('doctors', JSON.stringify(updated));

    // Create companion login profile
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ id: 'u' + (users.length + 1), username: email, password: 'password123', role: 'doctor', name });
    localStorage.setItem('users', JSON.stringify(users));

    setName(''); setSpecialty(''); setEmail('');
    setSuccess('New Practitioner initialized into enterprise storage framework.');
    setTimeout(() => setSuccess(''), 4000);
  };

  const sortedDoctors = [...doctors].sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>Staff Roster Management</h2>
          <p>Register practitioners and track functional operational specialties.</p>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary">
          {isOpen ? 'Collapse Form Panel' : '＋ Add Medical Officer'}
        </button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      {isOpen && (
        <div className="card" style={{ animation: 'fadeIn 0.3s' }}>
          <h3>Clinical Practitioner Initialization</h3>
          <form onSubmit={handleAddDoctor} style={{ marginTop: '1rem' }} className="grid-3">
            <div className="form-group">
              <label>Practitioner Full Name</label>
              <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Dr. Morgan Chase" required />
            </div>
            <div className="form-group">
              <label>Medical Specialty Sub-Tier</label>
              <input type="text" className="form-control" value={specialty} onChange={e => setSpecialty(e.target.value)} placeholder="Neurology" required />
            </div>
            <div className="form-group">
              <label>Enterprise Communications Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="chase@healthsync.com" required />
            </div>
            <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
              <button type="submit" className="btn btn-accent">Commit Registration</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Sort Vector Matrix:</span>
          <select className="form-control" style={{ width: '180px', padding: '0.4rem' }} onChange={(e) => setSortKey(e.target.value)}>
            <option value="name">Sort By Name</option>
            <option value="specialty">Sort By Specialty</option>
          </select>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Medical Provider ID</th>
                <th>Full Name Token</th>
                <th>Core Functional Specialty</th>
                <th>Data Contact Routing Line</th>
              </tr>
            </thead>
            <tbody>
              {sortedDoctors.map(doc => (
                <tr key={doc.id}>
                  <td><code>{doc.id.toUpperCase()}</code></td>
                  <td><strong>{doc.name}</strong></td>
                  <td><span className="badge badge-info">{doc.specialty}</span></td>
                  <td>{doc.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
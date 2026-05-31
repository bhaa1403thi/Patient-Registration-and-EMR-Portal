import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages Import Matrix
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminPatients from './pages/AdminPatients';
import AdminDoctors from './pages/AdminDoctors';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorPatients from './pages/DoctorPatients';
import DoctorAppointments from './pages/DoctorAppointments';
import PatientDashboard from './pages/PatientDashboard';
import PatientRegistration from './pages/PatientRegistration';
import BookAppointment from './pages/BookAppointment';
import MedicalRecords from './pages/MedicalRecords';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  useEffect(() => {
    // Hardcoded Seed Engine - Bypasses external JSON files completely
    const defaultUsers = [
      { "id": "u1", "username": "admin@healthsync.com", "password": "password123", "role": "admin", "name": "System Admin" },
      { "id": "u2", "username": "doctor@healthsync.com", "password": "password123", "role": "doctor", "name": "Dr. Sarah Jenkins" },
      { "id": "u3", "username": "patient@healthsync.com", "password": "password123", "role": "patient", "name": "John Doe" }
    ];

    const defaultDoctors = [
      { "id": "d1", "name": "Dr. Sarah Jenkins", "specialty": "Cardiology", "email": "doctor@healthsync.com" },
      { "id": "d2", "name": "Dr. Alex Patel", "specialty": "Pediatrics", "email": "patel@healthsync.com" }
    ];

    if (!localStorage.getItem('users') || localStorage.getItem('users') === '[]') {
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem('doctors') || localStorage.getItem('doctors') === '[]') {
      localStorage.setItem('doctors', JSON.stringify(defaultDoctors));
    }
    if (!localStorage.getItem('patients')) {
      localStorage.setItem('patients', JSON.stringify([]));
    }
    if (!localStorage.getItem('appointments')) {
      localStorage.setItem('appointments', JSON.stringify([]));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin-patients" element={<ProtectedRoute allowedRoles={['admin']}><AdminPatients /></ProtectedRoute>} />
        <Route path="/admin-doctors" element={<ProtectedRoute allowedRoles={['admin']}><AdminDoctors /></ProtectedRoute>} />
        <Route path="/doctor-dashboard" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/doctor-patients" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorPatients /></ProtectedRoute>} />
        <Route path="/doctor-appointments" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorAppointments /></ProtectedRoute>} />
        <Route path="/patient-dashboard" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
        <Route path="/patient-registration" element={<ProtectedRoute allowedRoles={['patient']}><PatientRegistration /></ProtectedRoute>} />
        <Route path="/book-appointment" element={<ProtectedRoute allowedRoles={['patient']}><BookAppointment /></ProtectedRoute>} />
        <Route path="/medical-records" element={<ProtectedRoute allowedRoles={['patient']}><MedicalRecords /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
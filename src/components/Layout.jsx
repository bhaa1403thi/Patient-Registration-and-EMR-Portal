import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'User', role: 'guest' };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const menuItems = {
    admin: [
      { path: '/admin-dashboard', label: 'Dashboard' },
      { path: '/admin-patients', label: 'Manage Patients' },
      { path: '/admin-doctors', label: 'Manage Doctors' },
    ],
    doctor: [
      { path: '/doctor-dashboard', label: 'Dashboard' },
      { path: '/doctor-patients', label: 'My Patients' },
      { path: '/doctor-appointments', label: 'Appointments' },
    ],
    patient: [
      { path: '/patient-dashboard', label: 'Dashboard' },
      { path: '/patient-registration', label: 'Complete Registration' },
      { path: '/book-appointment', label: 'Book Appointment' },
      { path: '/medical-records', label: 'Medical Records' },
    ],
  };

  const getAvatarColor = (role) => {
    if (role === 'admin') return '#ef4444';
    if (role === 'doctor') return '#0d9488';
    return '#2563eb';
  };

  return (
    <div className="app-container" style={{ display: 'flex', width: '100%' }}>
      {/* Sidebar Redesign */}
      <aside style={{
        width: '280px',
        backgroundColor: 'var(--bg-sidebar)',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '1.75rem' }}>🏥</span>
          <span style={{ fontWeight: '700', fontSize: '1.3rem', letterSpacing: '-0.5px' }}>HealthSync EMR</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #1e293b' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%', backgroundColor: getAvatarColor(user.role),
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white'
          }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{user.name}</div>
            <span className="badge" style={{ backgroundColor: '#1e293b', color: '#94a3b8', marginTop: '0.25rem', padding: '0.1rem 0.5rem' }}>
              {user.role.toUpperCase()}
            </span>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
            Navigation Pages
          </div>
          {menuItems[user.role]?.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} style={{
                textDecoration: 'none',
                color: isActive ? '#ffffff' : '#94a3b8',
                backgroundColor: isActive ? 'var(--sidebar-active)' : 'transparent',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'var(--transition)',
                display: 'block'
              }}>
                {item.label}
              </Link>
            );
          })}
          
          <Link to="/profile" style={{
            textDecoration: 'none',
            color: location.pathname === '/profile' ? '#ffffff' : '#94a3b8',
            backgroundColor: location.pathname === '/profile' ? 'var(--sidebar-active)' : 'transparent',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontWeight: '500',
            marginTop: 'auto'
          }}>👤 My Profile</Link>
        </nav>

        <button onClick={handleLogout} className="btn" style={{
          backgroundColor: 'transparent', color: '#fca5a5', border: '1px solid #7f1d1d', marginTop: '1rem', justifyContent: 'center'
        }}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserRole, User } from './types';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import CitizenHome from './pages/citizen/CitizenHome';
import ReportPlastic from './pages/citizen/ReportPlastic';
import PollutionMap from './pages/citizen/PollutionMap';
import NearbyNGOs from './pages/citizen/NearbyNGOs';
import VolunteerSignup from './pages/citizen/VolunteerSignup';

import Missions from './pages/volunteer/Missions';
import ProofUpload from './pages/volunteer/ProofUpload';
import Certificates from './pages/volunteer/Certificates';

import AdminDashboard from './pages/admin/AdminDashboard';
import IntelMap from './pages/admin/IntelMap';
import Operations from './pages/admin/Operations';
import SafetyAnalysis from './pages/admin/SafetyAnalysis';
import Verification from './pages/admin/Verification';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (role: UserRole) => {
    setUser({
      id: '123',
      name: 'User',
      email: 'user@oceanguard.org',
      role: role
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <ThemeProvider>
        <UserProvider user={user}>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          {user && <Navbar user={user} onLogout={handleLogout} />}
          
          <main className="flex-grow">
            <Routes>
            {/* Public/Auth Route */}
            <Route 
              path="/login" 
              element={!user ? <Auth onLogin={handleLogin} /> : <Navigate to="/" />} 
            />

            {/* Role-Based Protection */}
            {!user ? (
              <Route path="*" element={<Navigate to="/login" />} />
            ) : (
              <>
                {/* Home Redirect based on role */}
                <Route path="/" element={
                  user.role === UserRole.ADMIN ? <Navigate to="/admin" /> : 
                  user.role === UserRole.VOLUNTEER ? <Navigate to="/missions" /> :
                  <CitizenHome />
                } />

                {/* Settings - all roles */}
                <Route path="/settings" element={<Settings />} />

                {/* Citizen Routes */}
                {user.role === UserRole.CITIZEN && (
                  <>
                    <Route path="/report" element={<ReportPlastic />} />
                    <Route path="/map" element={<PollutionMap />} />
                    <Route path="/ngos" element={<NearbyNGOs />} />
                    <Route path="/volunteer-signup" element={<VolunteerSignup />} />
                  </>
                )}

                {/* Volunteer Routes */}
                {user.role === UserRole.VOLUNTEER && (
                  <>
                    <Route path="/missions" element={<Missions />} />
                    <Route path="/proof" element={<ProofUpload />} />
                    <Route path="/certificates" element={<Certificates />} />
                  </>
                )}

                {/* Admin Routes */}
                {user.role === UserRole.ADMIN && (
                  <>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/intel" element={<IntelMap />} />
                    <Route path="/admin/ops" element={<Operations />} />
                    <Route path="/admin/safety" element={<SafetyAnalysis />} />
                    <Route path="/admin/verify" element={<Verification />} />
                  </>
                )}
              </>
            )}
          </Routes>
        </main>

        <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-8 px-6 text-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-white font-semibold">
              <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">OG</div>
              OceanGuard &copy; {new Date().getFullYear()}
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">SDG-14 Compliance</a>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </footer>
          </div>
        </UserProvider>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;

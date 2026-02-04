// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Professional from './pages/Professional';
import Travel from './pages/Travel';
import TravelPost from './pages/TravelPost';
import Personal from './pages/Personal';
import PetSitting from './pages/PetSitting';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';

// Styles
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/professional" element={<Professional />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/travel/:slug" element={<TravelPost />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/petsitting" element={<PetSitting />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/*" element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

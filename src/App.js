import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Services from './Components/Services';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import UserTypeSelection from './Components/UserTypeSelection';
import LoginModal from './Components/Login';
import SignupModal from './Components/Signup';
import UserDashboard from './Components/UserDashboard';
import HospitalDashboard from './Components/HospitalDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('user_type');
    
    if (token && userType) {
      verifyToken(token, userType);
    }
  }, []);

  const verifyToken = async (token, userType) => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const userData = response.data.user || response.data.hospital;
      if (userData) {
        userData.userType = userType;
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_type');
    }
  };

  const handleLoginClick = () => {
    setCurrentAction('login');
    setShowUserTypeSelection(true);
  };

  const handleSignupClick = () => {
    setCurrentAction('signup');
    setShowUserTypeSelection(true);
  };

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
    setShowUserTypeSelection(false);
    
    if (currentAction === 'login') {
      setShowLoginModal(true);
    } else if (currentAction === 'signup') {
      setShowSignupModal(true);
    }
  };

  const handleLogin = (token, userData, userType) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_type', userType);
    setUser(userData);
    setIsAuthenticated(true);
    setShowLoginModal(false);
    setSelectedUserType(null);
    setCurrentAction(null);
  };

  const handleSignup = (token, userData, userType) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_type', userType);
    setUser(userData);
    setIsAuthenticated(true);
    setShowSignupModal(false);
    setSelectedUserType(null);
    setCurrentAction(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    setUser(null);
    setIsAuthenticated(false);
  };

  const closeModals = () => {
    setShowUserTypeSelection(false);
    setShowLoginModal(false);
    setShowSignupModal(false);
    setSelectedUserType(null);
    setCurrentAction(null);
  };

  return (
    <div className="App">
      {!isAuthenticated && (
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick}
          user={user}
        />
      )}

      {isAuthenticated ? (
        localStorage.getItem('user_type') === 'hospital' ? (
          <HospitalDashboard hospital={user} onLogout={handleLogout} />
        ) : (
          <UserDashboard user={user} onLogout={handleLogout} />
        )
      ) : (
        <>
          <main className="pt-16">
            <Home />
            <Services />
            <About />
            <Contact />
          </main>
          <Footer />
        </>
      )}

      <UserTypeSelection
        isOpen={showUserTypeSelection}
        onClose={closeModals}
        onUserTypeSelect={handleUserTypeSelect}
        action={currentAction}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={closeModals}
        onLogin={handleLogin}
        userType={selectedUserType}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={closeModals}
        onSignup={handleSignup}
        userType={selectedUserType}
      />
    </div>
  );
}

export default App;

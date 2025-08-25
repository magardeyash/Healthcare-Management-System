import React, { useState, useEffect } from 'react';

const Navbar = ({ isAuthenticated, onLogout, onLoginClick, onSignupClick, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20' 
        : 'bg-white/90 backdrop-blur-sm shadow-md border-b border-white/30'
    }`}>
      <div className="w-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-2xl shadow-lg transition-all duration-500 ${
                isScrolled 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                  : 'bg-white/90 backdrop-blur-sm'
              }`}>
                <svg className={`w-8 h-8 transition-colors duration-500 ${
                  isScrolled ? 'text-white' : 'text-blue-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h1 className={`text-2xl font-bold transition-colors duration-500 ${
                  isScrolled ? 'text-gray-900' : 'text-gray-800'
                }`}>
                  HealthCare+
                </h1>
                <p className={`text-xs transition-colors duration-500 ${
                  isScrolled ? 'text-gray-600' : 'text-gray-700'
                }`}>
                  Your Health, Our Priority
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <a href="#home" className={`text-base font-semibold transition-colors duration-300 hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-gray-700'
            }`}>
              Home
            </a>
            <a href="#services" className={`text-base font-semibold transition-colors duration-300 hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-gray-700'
            }`}>
              Services
            </a>
            <a href="#about" className={`text-base font-semibold transition-colors duration-300 hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-gray-700'
            }`}>
              About
            </a>
            <a href="#contact" className={`text-base font-semibold transition-colors duration-300 hover:text-blue-600 ${
              isScrolled ? 'text-gray-700' : 'text-gray-700'
            }`}>
              Contact
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className={`text-sm font-medium transition-colors duration-500 ${
                    isScrolled ? 'text-gray-600' : 'text-gray-600'
                  }`}>
                    Welcome back,
                  </p>
                  <p className={`font-bold transition-colors duration-500 ${
                    isScrolled ? 'text-gray-900' : 'text-gray-800'
                  }`}>
                    {user?.hospitalName || user?.username || 'User'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {user?.userType && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-300 ${
                      user.userType === 'doctor' 
                        ? 'bg-purple-100 text-purple-800 border-purple-300' 
                        : 'bg-blue-100 text-blue-800 border-blue-300'
                    }`}>
                      {user.userType === 'doctor' ? '👨‍⚕️ Doctor' : '👤 Patient'}
                    </span>
                  )}
                  {user?.hospitalName && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 border border-green-300 rounded-full text-xs font-bold">
                      🏥 Hospital
                    </span>
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onLoginClick}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${
                    isScrolled
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={onSignupClick}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-3 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 mb-4">
              <a
                href="#home"
                className="block py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#services"
                className="block py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#about"
                className="block py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                About
              </a>
              <a
                href="#contact"
                className="block py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                Contact
              </a>
              
              {isAuthenticated ? (
                <div className="pt-4 pb-2 border-t border-gray-200">
                  <div className="py-2">
                    <p className="text-sm text-gray-600">Welcome back,</p>
                    <p className="font-bold text-gray-900">{user?.hospitalName || user?.username || 'User'}</p>
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    {user?.userType && (
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        user.userType === 'doctor' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.userType === 'doctor' ? '👨‍⚕️ Doctor' : '👤 Patient'}
                      </span>
                    )}
                    {user?.hospitalName && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                        🏥 Hospital
                      </span>
                    )}
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
                  >
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 pb-2 border-t border-gray-200 space-y-2">
                  <button
                    onClick={onLoginClick}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onSignupClick}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
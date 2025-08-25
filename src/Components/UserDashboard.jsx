import React, { useState } from 'react';
import UserHome from './UserHome';
import UserAnalytics from './UserAnalytics';
import MedicalRecords from './MedicalRecords';

const UserDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', name: 'Profile Dashboard', icon: '🏠' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'records', name: 'Medical Records', icon: '📋' }
  ];

  const navigateToTab = (tabId) => {
    setActiveTab(tabId);
  };

  React.useEffect(() => {
    window.navigateToTab = navigateToTab;
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <UserHome user={user} />;
      case 'analytics':
        return <UserAnalytics user={user} />;
      case 'records':
        return <MedicalRecords user={user} />;
      default:
        return <UserHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      <nav className="bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg fixed w-full z-20 top-0 left-0 animate-fadeInDown dashboard-navbar">
        <div className="w-full px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-white tracking-wide">HealthCare+</span>
              <span className="text-white text-lg ml-4">|</span>
              <span className="text-white text-lg ml-4">User Dashboard</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                <span className="text-white text-sm">
                  Welcome, {user?.username || 'User'}!
                  {user?.userType && (
                    <span className="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded text-xs">
                      {user.userType === 'doctor' ? '👨‍⚕️ Doctor' : '👤 Patient'}
                    </span>
                  )}
                </span>
                <button 
                  onClick={onLogout} 
                  className="text-cyan-100 hover:bg-white hover:text-cyan-600 px-4 py-2 rounded-md text-lg font-semibold border border-cyan-200 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button className="text-white hover:text-cyan-200 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white shadow-md mt-16">
        <div className="w-full px-4 lg:px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-600 tab-active'
                    : 'border-transparent text-gray-500 hover:text-cyan-600 hover:border-cyan-300'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-4 lg:px-6 py-8">
        {activeTab === 'records' && <div id="records"></div>}
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;

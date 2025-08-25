import React from 'react';

const UserHome = ({ user }) => {
  // Mock data for demonstration - in real app, this would come from API
  const userStats = {
    totalRecords: 4, // Updated to match actual sample records (2 my records + 2 hospital records)
    lastVisit: '2024-01-20', // Updated to match most recent record date
    upcomingAppointments: 2,
    healthScore: 0 // Will be calculated based on actual health metrics
  };

  const recentActivities = [
    { type: 'Record Upload', date: '2024-01-20', description: 'Blood test results uploaded' },
    { type: 'Hospital Visit', date: '2024-01-15', description: 'Annual checkup at City Hospital' },
    { type: 'Record Upload', date: '2024-01-10', description: 'X-ray report uploaded by Metro Medical' },
    { type: 'Appointment', date: '2024-01-25', description: 'Dental appointment scheduled' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.username || 'User'}!</h1>
            <p className="text-cyan-100 text-lg mt-2">Manage your health records and track your medical journey</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Records</p>
              <p className="text-3xl font-bold text-gray-900">{userStats.totalRecords}</p>
            </div>
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Health Score</p>
              <p className="text-3xl font-bold text-gray-900">{userStats.healthScore}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">❤️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Upcoming Appointments</p>
              <p className="text-3xl font-bold text-gray-900">{userStats.upcomingAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Last Visit</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.lastVisit}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">👤</span>
            Profile Information
          </h2>
          
          {/* Patient ID Section */}
          <div className="mb-6 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-cyan-800 mb-1">Your Patient ID</h3>
                <p className="text-cyan-700 text-sm">Share this ID with hospitals to link your medical records</p>
              </div>
              <div className="text-center">
                <div className="font-mono text-2xl font-bold bg-white px-4 py-2 rounded-lg border border-cyan-300 text-cyan-800">
                  {user?.patientId || 'P' + String(Math.floor(Math.random() * 900000) + 100000)}
                </div>
                <button 
                  onClick={() => {
                    const patientId = user?.patientId || 'P' + String(Math.floor(Math.random() * Math.floor(900000) + 100000));
                    navigator.clipboard.writeText(patientId);
                    alert(`Patient ID ${patientId} copied to clipboard!`);
                  }}
                  className="mt-2 text-cyan-600 hover:text-cyan-800 text-sm hover:underline cursor-pointer"
                >
                  📋 Copy ID
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Username:</span>
              <span className="text-gray-900 font-semibold">{user?.username || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-900 font-semibold">{user?.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Account Type:</span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                Individual User
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 font-medium">Member Since:</span>
              <span className="text-gray-900 font-semibold">January 2024</span>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📝</span>
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-gray-900 font-medium">{activity.type}</p>
                    <span className="text-gray-500 text-sm">{activity.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">⚡</span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => window.navigateToTab && window.navigateToTab('records')}
            className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <span className="text-2xl">📤</span>
            <span className="font-semibold">Upload Record</span>
          </button>
          <button 
            onClick={() => alert('Appointment booking feature coming soon!')}
            className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <span className="text-2xl">📅</span>
            <span className="font-semibold">Book Appointment</span>
          </button>
          <button 
            onClick={() => window.navigateToTab && window.navigateToTab('records')}
            className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <span className="text-2xl">🔍</span>
            <span className="font-semibold">Search Records</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

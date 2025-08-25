import React from 'react';

const HospitalHome = ({ hospital }) => {
  // Mock data for demonstration - in real app, this would come from API
  const hospitalStats = {
    totalPatients: 1247,
    activePatients: 892,
    totalRecords: 5678,
    monthlyRecords: 234,
    doctors: 45,
    departments: 12
  };

  const recentActivities = [
    { type: 'Patient Admitted', date: '2024-01-20', description: 'John Doe admitted to Cardiology Ward' },
    { type: 'Record Uploaded', date: '2024-01-19', description: 'Blood test results for Patient ID: P001234' },
    { type: 'Patient Discharged', date: '2024-01-18', description: 'Sarah Wilson discharged from General Ward' },
    { type: 'New Patient', date: '2024-01-17', description: 'Michael Brown registered - Patient ID: P001235' }
  ];

  const quickActions = [
    { name: 'Add New Patient', icon: '👤', action: 'add-patient', color: 'from-blue-500 to-blue-600' },
    { name: 'Upload Records', icon: '📤', action: 'upload-records', color: 'from-green-500 to-green-600' },
    { name: 'View Patients', icon: '👥', action: 'view-patients', color: 'from-purple-500 to-purple-600' },
    { name: 'Generate Reports', icon: '📊', action: 'generate-reports', color: 'from-orange-500 to-orange-600' }
  ];

  const handleQuickAction = (action) => {
    switch (action) {
      case 'add-patient':
        alert('Navigate to Patient Management tab to add new patients');
        break;
      case 'upload-records':
        alert('Navigate to Medical Records tab to upload patient records');
        break;
      case 'view-patients':
        alert('Navigate to Patient Management tab to view all patients');
        break;
      case 'generate-reports':
        alert('Navigate to Analytics tab to generate reports');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-3xl">🏥</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {hospital?.name || 'Hospital'}!</h1>
            <p className="text-green-100 text-lg mt-2">Manage your patients and medical records efficiently</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalStats.totalPatients}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Patients</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalStats.activePatients}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Records</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalStats.totalRecords}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Monthly Records</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalStats.monthlyRecords}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Doctors</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalStats.doctors}</p>
            </div>
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-pink-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Departments</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalStats.departments}</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏢</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">⚡</span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.action)}
              className={`flex flex-col items-center justify-center space-y-3 p-6 bg-gradient-to-r ${action.color} text-white rounded-lg hover:shadow-xl transition-all duration-300 shadow-lg`}
            >
              <span className="text-3xl">{action.icon}</span>
              <span className="font-semibold text-center">{action.name}</span>
            </button>
          ))}
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
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
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

      {/* Hospital Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">🏥</span>
          Hospital Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Hospital Name:</span>
              <span className="text-gray-900 font-semibold">{hospital?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-900 font-semibold">{hospital?.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Account Type:</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Hospital
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 font-medium">Member Since:</span>
              <span className="text-gray-900 font-semibold">January 2024</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Total Beds:</span>
              <span className="text-gray-900 font-semibold">500</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Emergency Services:</span>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Available 24/7
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Accreditation:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                JCI Accredited
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 font-medium">Location:</span>
              <span className="text-gray-900 font-semibold">Downtown Medical District</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalHome;


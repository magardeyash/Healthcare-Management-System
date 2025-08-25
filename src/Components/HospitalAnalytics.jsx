import React from 'react';

const HospitalAnalytics = ({ hospital }) => {
  // Mock data for demonstration
  const hospitalStats = {
    totalPatients: 1247,
    activePatients: 892,
    totalRecords: 5678,
    monthlyRecords: 234,
    doctors: 45,
    departments: 12,
    averageStay: 4.2,
    readmissionRate: 8.5
  };

  const monthlyData = [
    { month: 'Jan', patients: 120, records: 450, revenue: 125000 },
    { month: 'Feb', patients: 135, records: 520, revenue: 138000 },
    { month: 'Mar', patients: 142, records: 580, revenue: 145000 },
    { month: 'Apr', patients: 128, records: 490, revenue: 132000 },
    { month: 'May', patients: 156, records: 620, revenue: 158000 },
    { month: 'Jun', patients: 148, records: 590, revenue: 152000 }
  ];

  const departmentStats = [
    { name: 'Cardiology', patients: 234, records: 890, occupancy: 85 },
    { name: 'General Surgery', patients: 189, records: 720, occupancy: 78 },
    { name: 'Emergency', patients: 156, records: 450, occupancy: 92 },
    { name: 'Pediatrics', patients: 98, records: 320, occupancy: 65 },
    { name: 'ICU', patients: 45, records: 180, occupancy: 88 }
  ];

  const recordTypes = [
    { type: 'Lab Tests', count: 2340, percentage: 41 },
    { type: 'Imaging', count: 1560, percentage: 27 },
    { type: 'Prescriptions', count: 890, percentage: 16 },
    { type: 'Bills', count: 680, percentage: 12 },
    { type: 'Other', count: 208, percentage: 4 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Hospital Analytics Dashboard</h1>
        <p className="text-green-100 text-lg">Comprehensive insights into hospital operations and patient care</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📊</span>
            Monthly Trends
          </h2>
          <div className="space-y-4">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 text-gray-600 font-medium">{item.month}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                        style={{ width: `${(item.patients / 160) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{item.patients}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Records: {item.records} | Revenue: ${item.revenue.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Record Types Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📋</span>
            Record Types Distribution
          </h2>
          <div className="space-y-4">
            {recordTypes.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}></div>
                  <span className="text-gray-700 font-medium">{item.type}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: `hsl(${index * 60}, 70%, 60%)`
                      }}
                    ></div>
                  </div>
                  <span className="text-gray-600 font-medium w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">🏢</span>
          Department Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Patients</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Records</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Occupancy %</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {departmentStats.map((dept, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{dept.name}</td>
                  <td className="py-3 px-4 text-gray-600">{dept.patients}</td>
                  <td className="py-3 px-4 text-gray-600">{dept.records}</td>
                  <td className="py-3 px-4 text-gray-600">{dept.occupancy}%</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dept.occupancy >= 90 ? 'bg-red-100 text-red-800' :
                      dept.occupancy >= 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {dept.occupancy >= 90 ? 'High' : dept.occupancy >= 80 ? 'Medium' : 'Good'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Stay</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalStats.averageStay}</p>
              <p className="text-gray-500 text-sm">days</p>
            </div>
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-pink-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Readmission Rate</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalStats.readmissionRate}%</p>
              <p className="text-gray-500 text-sm">of patients</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔄</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Medical Staff</p>
              <p className="text-3xl font-bold text-gray-900">{hospitalStats.doctors}</p>
              <p className="text-gray-500 text-sm">doctors</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-3">💡</span>
          Hospital Insights & Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Positive Trends</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Patient volume increased by 12% this quarter</li>
              <li>• Record management efficiency improved by 18%</li>
              <li>• Average patient stay reduced by 0.3 days</li>
              <li>• Emergency department response time improved</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Areas for Improvement</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• ICU occupancy rate is high (88%)</li>
              <li>• Consider expanding pediatric department</li>
              <li>• Implement digital record verification system</li>
              <li>• Optimize patient discharge processes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAnalytics;


import React, { useState, useEffect } from 'react';
import { 
  calculateHealthScore, 
  getLatestHealthMetrics, 
  getHealthMetricsHistory,
  calculateBloodPressureScore,
  calculateHeartRateScore,
  calculateTemperatureScore,
  calculateWeightScore
} from './HealthMetricsCalculator';

const UserAnalytics = ({ user }) => {
  const [healthMetrics, setHealthMetrics] = useState({
    bloodPressure: { systolic: null, diastolic: null, status: 'No Data' },
    heartRate: { value: null, status: 'No Data' },
    temperature: { value: null, status: 'No Data' },
    weight: { value: null, unit: 'kg', status: 'No Data' }
  });
  
  const [healthScore, setHealthScore] = useState(0);
  const [healthTrends, setHealthTrends] = useState([]);
  
  // Mock records data - in real app, this would come from props or API
  const mockRecords = [
    // These would be the actual records uploaded by users
  ];
  
  useEffect(() => {
    // Calculate health metrics from uploaded records
    const latestMetrics = getLatestHealthMetrics(mockRecords);
    if (latestMetrics) {
      setHealthMetrics({
        bloodPressure: {
          systolic: latestMetrics.systolic,
          diastolic: latestMetrics.diastolic,
          status: latestMetrics.systolic && latestMetrics.diastolic ? 
            getBloodPressureStatus(latestMetrics.systolic, latestMetrics.diastolic) : 'No Data'
        },
        heartRate: {
          value: latestMetrics.heartRate,
          status: latestMetrics.heartRate ? getHeartRateStatus(latestMetrics.heartRate) : 'No Data'
        },
        temperature: {
          value: latestMetrics.temperature,
          status: latestMetrics.temperature ? getTemperatureStatus(latestMetrics.temperature) : 'No Data'
        },
        weight: {
          value: latestMetrics.weight,
          unit: 'kg',
          status: latestMetrics.weight ? getWeightStatus(latestMetrics.weight) : 'No Data'
        }
      });
    }
    
    // Calculate health score
    const score = calculateHealthScore(mockRecords);
    setHealthScore(score);
    
    // Get health trends
    const trends = getHealthMetricsHistory(mockRecords);
    setHealthTrends(trends);
  }, [mockRecords]);
  
  const getBloodPressureStatus = (systolic, diastolic) => {
    if (systolic < 120 && diastolic < 80) return 'Normal';
    if (systolic < 130 && diastolic < 80) return 'Elevated';
    if (systolic < 140 && diastolic < 90) return 'High (Stage 1)';
    if (systolic < 160 && diastolic < 100) return 'High (Stage 2)';
    return 'High (Crisis)';
  };
  
  const getHeartRateStatus = (heartRate) => {
    if (heartRate >= 60 && heartRate <= 100) return 'Normal';
    if (heartRate >= 50 && heartRate <= 110) return 'Good';
    if (heartRate >= 40 && heartRate <= 120) return 'Fair';
    return 'Poor';
  };
  
  const getTemperatureStatus = (temperature) => {
    if (temperature >= 97 && temperature <= 99) return 'Normal';
    if (temperature >= 96.5 && temperature <= 99.5) return 'Good';
    if (temperature >= 96 && temperature <= 100) return 'Fair';
    return 'Poor';
  };
  
  const getWeightStatus = (weight) => {
    if (weight >= 50 && weight <= 100) return 'Healthy';
    if (weight >= 45 && weight <= 110) return 'Good';
    if (weight >= 40 && weight <= 120) return 'Fair';
    return 'Poor';
  };

  const monthlyVisits = [
    { month: 'Jan', visits: 3, records: 5 },
    { month: 'Feb', visits: 2, records: 3 },
    { month: 'Mar', visits: 4, records: 7 },
    { month: 'Apr', visits: 1, records: 2 },
    { month: 'May', visits: 3, records: 4 },
    { month: 'Jun', visits: 2, records: 3 }
  ];

  const recordTypes = [
    { type: 'Lab Tests', count: 12, percentage: 50 },
    { type: 'Imaging', count: 6, percentage: 25 },
    { type: 'Prescriptions', count: 4, percentage: 17 },
    { type: 'Vaccinations', count: 2, percentage: 8 }
  ];

  const mockHealthTrends = [
    { date: '2024-01-01', score: 82 },
    { date: '2024-01-15', score: 85 },
    { date: '2024-02-01', score: 87 },
    { date: '2024-02-15', score: 89 },
    { date: '2024-03-01', score: 88 },
    { date: '2024-03-15', score: 90 }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
      case 'healthy':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
             {/* Header */}
       <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
         <h1 className="text-3xl font-bold mb-2">Health Analytics Dashboard</h1>
         <p className="text-blue-100 text-lg">Track your health metrics and medical journey insights</p>
         {healthScore === 0 && (
           <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg">
             <p className="text-white text-sm">
               💡 <strong>Tip:</strong> Upload health metrics like Blood Pressure, Heart Rate, Temperature, or Weight 
               in the Medical Records section to see your health analytics here!
             </p>
           </div>
         )}
       </div>

      {/* Key Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500 hover-lift transition-all duration-300">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-gray-600 text-sm font-medium">Blood Pressure</p>
               {healthMetrics.bloodPressure.systolic && healthMetrics.bloodPressure.diastolic ? (
                 <>
                   <p className="text-2xl font-bold text-gray-900">{healthMetrics.bloodPressure.systolic}/{healthMetrics.bloodPressure.diastolic}</p>
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(healthMetrics.bloodPressure.status)}`}>
                     {healthMetrics.bloodPressure.status}
                   </span>
                 </>
               ) : (
                 <>
                   <p className="text-2xl font-bold text-gray-400">--/--</p>
                   <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                     No Data
                   </span>
                 </>
               )}
             </div>
             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
               <span className="text-2xl">💓</span>
             </div>
           </div>
         </div>

                 <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover-lift transition-all duration-300">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-gray-600 text-sm font-medium">Heart Rate</p>
               {healthMetrics.heartRate.value ? (
                 <>
                   <p className="text-2xl font-bold text-gray-900">{healthMetrics.heartRate.value} bpm</p>
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(healthMetrics.heartRate.status)}`}>
                     {healthMetrics.heartRate.status}
                   </span>
                 </>
               ) : (
                 <>
                   <p className="text-2xl font-bold text-gray-400">-- bpm</p>
                   <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                     No Data
                   </span>
                 </>
               )}
             </div>
             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
               <span className="text-2xl">❤️</span>
             </div>
           </div>
         </div>

                 <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-500 hover-lift transition-all duration-300">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-gray-600 text-sm font-medium">Temperature</p>
               {healthMetrics.temperature.value ? (
                 <>
                   <p className="text-2xl font-bold text-gray-900">{healthMetrics.temperature.value}°F</p>
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(healthMetrics.temperature.status)}`}>
                     {healthMetrics.temperature.status}
                   </span>
                 </>
               ) : (
                 <>
                   <p className="text-2xl font-bold text-gray-400">--°F</p>
                   <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                     No Data
                   </span>
                 </>
               )}
             </div>
             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
               <span className="text-2xl">🌡️</span>
             </div>
           </div>
         </div>

         <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500 hover-lift transition-all duration-300">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-gray-600 text-sm font-medium">Weight</p>
               {healthMetrics.weight.value ? (
                 <>
                   <p className="text-2xl font-bold text-gray-900">{healthMetrics.weight.value} {healthMetrics.weight.unit}</p>
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(healthMetrics.weight.status)}`}>
                     {healthMetrics.weight.status}
                   </span>
                 </>
               ) : (
                 <>
                   <p className="text-2xl font-bold text-gray-400">-- {healthMetrics.weight.unit}</p>
                   <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                     No Data
                   </span>
                 </>
               )}
             </div>
             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
               <span className="text-2xl">⚖️</span>
             </div>
           </div>
                  </div>
       </div>

       {/* Health Score Card */}
       <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
         <div className="flex items-center justify-between">
           <div>
             <h2 className="text-2xl font-bold mb-2">Your Health Score</h2>
             <p className="text-cyan-100 text-lg">
               {healthScore > 0 ? 
                 `Based on ${healthTrends.length} health metric${healthTrends.length > 1 ? 's' : ''} uploaded` : 
                 'No health metrics uploaded yet'
               }
             </p>
           </div>
           <div className="text-center">
             <div className="text-6xl font-bold">{healthScore}</div>
             <div className="text-cyan-100 text-lg">out of 100</div>
           </div>
         </div>
         {healthScore === 0 && (
           <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg">
             <p className="text-white text-sm">
               📊 Upload health metrics in the Medical Records section to calculate your health score!
             </p>
           </div>
         )}
       </div>

       {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Visits Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📊</span>
            Monthly Visits & Records
          </h2>
          <div className="space-y-4">
            {monthlyVisits.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 text-gray-600 font-medium">{item.month}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full"
                        style={{ width: `${(item.visits / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{item.visits}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Records: {item.records}</div>
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
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${index * 90}, 70%, 60%)` }}></div>
                  <span className="text-gray-700 font-medium">{item.type}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: `hsl(${index * 90}, 70%, 60%)`
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

             {/* Health Score Trend */}
       <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
         <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
           <span className="mr-3">📈</span>
           Health Score Trend
         </h2>
         <div className="flex items-end space-x-2 h-32">
           {healthTrends.length > 0 ? (
             healthTrends.map((trend, index) => (
               <div key={index} className="flex-1 flex flex-col items-center">
                 <div className="w-full bg-gray-200 rounded-t-sm relative">
                   <div 
                     className="bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-sm transition-all duration-500"
                     style={{ height: `${(trend.score / 100) * 100}%` }}
                   ></div>
                 </div>
                 <div className="text-xs text-gray-600 mt-2 text-center">
                   <div className="font-medium">{trend.score}</div>
                   <div className="text-gray-400">{new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                 </div>
               </div>
             ))
           ) : (
             <div className="w-full text-center text-gray-500 py-8">
               <p>No health trends available yet</p>
               <p className="text-sm">Upload health metrics to see trends</p>
             </div>
           )}
         </div>
       </div>

      {/* Insights and Recommendations */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-3">💡</span>
          Health Insights & Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Positive Trends</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Health score improved by 8 points this quarter</li>
              <li>• Consistent medical checkups maintained</li>
              <li>• All vital signs within normal ranges</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Recommendations</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Schedule annual physical examination</li>
              <li>• Consider updating vaccination records</li>
              <li>• Continue regular exercise routine</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;

import React, { useState } from 'react';

const MedicalRecords = ({ user }) => {
  const [activeTab, setActiveTab] = useState('my-records');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadForm, setUploadForm] = useState({
    recordType: '',
    hospital: '',
    date: '',
    description: '',
    file: null,
    // Health metrics fields
    systolic: '',
    diastolic: '',
    heartRate: '',
    temperature: '',
    weight: '',
    cholesterol: '',
    bloodSugar: ''
  });

  // Mock data for demonstration - in real app, this would come from API
  const myRecords = [
    {
      id: 1,
      type: 'Blood Test',
      hospital: 'Self Upload',
      date: '2024-01-20',
      description: 'Complete blood count and lipid profile',
      status: 'uploaded',
      fileSize: '2.3 MB',
      fileUrl: '#'
    },
    {
      id: 2,
      type: 'X-Ray Report',
      hospital: 'Self Upload',
      date: '2024-01-15',
      description: 'Chest X-ray for respiratory check',
      status: 'uploaded',
      fileSize: '1.8 MB',
      fileUrl: '#'
    }
  ];

  const hospitalRecords = [
    {
      id: 4,
      type: 'Lab Test',
      hospital: 'City General Hospital',
      date: '2024-01-18',
      description: 'Comprehensive metabolic panel',
      status: 'verified',
      fileSize: '3.1 MB',
      doctor: 'Dr. Sarah Johnson',
      ward: 'Cardiology Ward',
      fileUrl: '#'
    },
    {
      id: 5,
      type: 'Blood Pressure',
      hospital: 'City General Hospital',
      date: '2024-01-14',
      description: 'Routine blood pressure monitoring',
      status: 'verified',
      fileSize: '0.5 MB',
      doctor: 'Dr. Emily Davis',
      ward: 'Emergency Ward',
      fileUrl: '#',
      healthMetrics: {
        systolic: 125,
        diastolic: 82
      }
    }
  ];

  const recordTypes = [
    'Blood Test', 'X-Ray', 'MRI Scan', 'CT Scan', 'Lab Test', 
    'Prescription', 'Vaccination Record', 'Surgery Report', 
    'Discharge Summary', 'Blood Pressure', 'Heart Rate', 'Temperature', 'Weight',
    'Cholesterol Test', 'Diabetes Test', 'Other'
  ];

  const hospitals = [
    'City General Hospital', 'Metro Medical Center', 'Community Health Clinic',
    'University Medical Center', 'Private Practice', 'Other'
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadForm(prev => ({ ...prev, file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log('Upload form:', uploadForm);
    
    // Add the new record to the myRecords array
    const newRecord = {
      id: Date.now(), // Simple ID generation
      type: uploadForm.recordType,
      hospital: uploadForm.hospital || 'Self Upload',
      date: uploadForm.date,
      description: uploadForm.description || 'No description provided',
      status: 'uploaded',
      fileSize: uploadForm.file ? `${(uploadForm.file.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB',
      fileUrl: '#',
      // Include health metrics if available
      healthMetrics: {
        systolic: uploadForm.systolic || null,
        diastolic: uploadForm.diastolic || null,
        heartRate: uploadForm.heartRate || null,
        temperature: uploadForm.temperature || null,
        weight: uploadForm.weight || null,
        cholesterol: uploadForm.cholesterol || null,
        bloodSugar: uploadForm.bloodSugar || null
      }
    };
    
    // Add to myRecords array
    myRecords.push(newRecord);
    
    // In a real app, this would be sent to the backend
    // For demo purposes, we'll just show a success message
    alert(`Record "${uploadForm.recordType}" uploaded successfully!`);
    
    // Reset form
    setUploadForm({
      recordType: '',
      hospital: '',
      date: '',
      description: '',
      file: null,
      systolic: '',
      diastolic: '',
      heartRate: '',
      temperature: '',
      weight: '',
      cholesterol: '',
      bloodSugar: ''
    });
  };

  const handleViewRecord = (record) => {
    const details = `
Record Type: ${record.type}
Hospital/Clinic: ${record.hospital}
Date: ${record.date}
Description: ${record.description}
File Size: ${record.fileSize}
Status: ${record.status}
${record.doctor ? `Doctor: ${record.doctor}` : ''}
    `;
    alert(`Record Details:\n${details}`);
    // In a real app, this would open a modal with formatted details
  };

  const handleDownloadRecord = (record) => {
    alert(`Downloading ${record.type} record: ${record.description}\n\nIn a real application, this would download the actual file.`);
    // In a real app, this would trigger a file download
    // For demo purposes, we'll simulate a download
    const link = document.createElement('a');
    link.href = record.fileUrl;
    link.download = `${record.type}_${record.date}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      uploaded: 'bg-blue-100 text-blue-800',
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status] || statusConfig.uploaded}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRecordIcon = (type) => {
    const iconMap = {
      'Blood Test': '🩸',
      'X-Ray': '📷',
      'MRI Scan': '🧠',
      'CT Scan': '🫁',
      'Lab Test': '🧪',
      'Prescription': '💊',
      'Vaccination Record': '💉',
      'Surgery Report': '🔪',
      'Discharge Summary': '📄',
      'Other': '📋'
    };
    return iconMap[type] || '📋';
  };

  // Filter records based on search term
  const filterRecords = (records) => {
    if (!searchTerm) return records;
    return records.filter(record => 
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.date.includes(searchTerm) ||
      (record.hospital && record.hospital.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const filteredMyRecords = filterRecords(myRecords);
  const filteredHospitalRecords = filterRecords(hospitalRecords);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Medical Records Management</h1>
        <p className="text-green-100 text-lg">Upload, organize, and access your complete medical history</p>
      </div>

             {/* Upload Section */}
       <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
         <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
           <span className="mr-3">📤</span>
           Upload New Medical Record
         </h2>
         <div className="mb-6 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
           <p className="text-cyan-800 text-sm">
             💡 <strong>Health Analytics:</strong> Upload health metrics like Blood Pressure, Heart Rate, Temperature, 
             Weight, Cholesterol Test, or Diabetes Test to see your health analytics in the Analytics tab!
           </p>
           <p className="text-cyan-700 text-sm mt-2">
             🏥 <strong>Hospital Records:</strong> Share your Patient ID (from your profile) with hospitals to see records 
             they upload for you in the "Hospital Records" section below!
           </p>
         </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Record Type *
              </label>
              <select
                required
                value={uploadForm.recordType}
                onChange={(e) => setUploadForm(prev => ({ ...prev, recordType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select record type</option>
                {recordTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hospital/Clinic
              </label>
              <select
                value={uploadForm.hospital}
                onChange={(e) => setUploadForm(prev => ({ ...prev, hospital: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select hospital/clinic</option>
                {hospitals.map(hospital => (
                  <option key={hospital} value={hospital}>{hospital}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={uploadForm.date}
                onChange={(e) => setUploadForm(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File *
              </label>
              <input
                type="file"
                required
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
              />
            </div>
          </div>

                     <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Description
             </label>
             <textarea
               value={uploadForm.description}
               onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
               rows="3"
               placeholder="Describe the medical record..."
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
             />
           </div>

           {/* Health Metrics Fields - Show only for relevant record types */}
           {(uploadForm.recordType === 'Blood Pressure' || uploadForm.recordType === 'Heart Rate' || 
             uploadForm.recordType === 'Temperature' || uploadForm.recordType === 'Weight' ||
             uploadForm.recordType === 'Cholesterol Test' || uploadForm.recordType === 'Diabetes Test') && (
             <div className="border-t border-gray-200 pt-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Metrics</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {uploadForm.recordType === 'Blood Pressure' && (
                   <>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Systolic (mmHg)
                       </label>
                       <input
                         type="number"
                         value={uploadForm.systolic}
                         onChange={(e) => setUploadForm(prev => ({ ...prev, systolic: e.target.value }))}
                         placeholder="120"
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Diastolic (mmHg)
                       </label>
                       <input
                         type="number"
                         value={uploadForm.diastolic}
                         onChange={(e) => setUploadForm(prev => ({ ...prev, diastolic: e.target.value }))}
                         placeholder="80"
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                       />
                     </div>
                   </>
                 )}
                 
                 {uploadForm.recordType === 'Heart Rate' && (
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Heart Rate (bpm)
                     </label>
                     <input
                       type="number"
                       value={uploadForm.heartRate}
                       onChange={(e) => setUploadForm(prev => ({ ...prev, heartRate: e.target.value }))}
                       placeholder="72"
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                     />
                   </div>
                 )}

                 {uploadForm.recordType === 'Temperature' && (
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Temperature (°F)
                     </label>
                     <input
                       type="number"
                       step="0.1"
                       value={uploadForm.temperature}
                       onChange={(e) => setUploadForm(prev => ({ ...prev, temperature: e.target.value }))}
                       placeholder="98.6"
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                     />
                   </div>
                 )}

                 {uploadForm.recordType === 'Weight' && (
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Weight (kg)
                     </label>
                     <input
                       type="number"
                       step="0.1"
                       value={uploadForm.weight}
                       onChange={(e) => setUploadForm(prev => ({ ...prev, weight: e.target.value }))}
                       placeholder="70"
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                     />
                   </div>
                 )}

                 {uploadForm.recordType === 'Cholesterol Test' && (
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Total Cholesterol (mg/dL)
                     </label>
                     <input
                       type="number"
                       value={uploadForm.cholesterol}
                       onChange={(e) => setUploadForm(prev => ({ ...prev, cholesterol: e.target.value }))}
                       placeholder="200"
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                     />
                   </div>
                 )}

                 {uploadForm.recordType === 'Diabetes Test' && (
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Blood Sugar (mg/dL)
                     </label>
                     <input
                       type="number"
                       value={uploadForm.bloodSugar}
                       onChange={(e) => setUploadForm(prev => ({ ...prev, bloodSugar: e.target.value }))}
                       placeholder="100"
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                     />
                   </div>
                 )}
               </div>
             </div>
           )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Upload Record
            </button>
          </div>
        </form>
      </div>

      {/* Records Navigation */}
      <div className="bg-white rounded-xl shadow-lg hover-lift transition-all duration-300">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('my-records')}
              className={`py-4 px-2 border-b-2 font-medium text-lg transition-all duration-300 ${
                activeTab === 'my-records'
                  ? 'border-cyan-500 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-cyan-600 hover:border-cyan-300'
              }`}
            >
              My Uploads ({myRecords.length})
            </button>
            <button
              onClick={() => setActiveTab('hospital-records')}
              className={`py-4 px-2 border-b-2 font-medium text-lg transition-all duration-300 ${
                activeTab === 'hospital-records'
                  ? 'border-cyan-500 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-cyan-600 hover:border-cyan-300'
              }`}
            >
              Hospital Records ({hospitalRecords.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search records by type, description, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>

          {activeTab === 'my-records' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Records Uploaded by You</h3>
              {filteredMyRecords.map(record => (
                <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{getRecordIcon(record.type)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{record.type}</h4>
                      <p className="text-gray-600 text-sm">{record.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-gray-500 text-sm">{record.date}</span>
                        <span className="text-gray-500 text-sm">{record.fileSize}</span>
                        {getStatusBadge(record.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewRecord(record)}
                      className="text-cyan-600 hover:text-cyan-800 font-medium text-sm hover:underline cursor-pointer"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleDownloadRecord(record)}
                      className="text-gray-600 hover:text-gray-800 font-medium text-sm hover:underline cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'hospital-records' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Records from Hospitals</h3>
              {filteredHospitalRecords.map(record => (
                <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{getRecordIcon(record.type)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{record.type}</h4>
                      <p className="text-gray-600 text-sm">{record.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-gray-500 text-sm">{record.date}</span>
                        <span className="text-gray-500 text-sm">{record.fileSize}</span>
                        <span className="text-gray-500 text-sm">Dr. {record.doctor}</span>
                        {getStatusBadge(record.status)}
                      </div>
                      <p className="text-cyan-600 text-sm font-medium mt-1">{record.hospital}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewRecord(record)}
                      className="text-cyan-600 hover:text-cyan-800 font-medium text-sm hover:underline cursor-pointer"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleDownloadRecord(record)}
                      className="text-gray-600 hover:text-gray-800 font-medium text-sm hover:underline cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Records Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Records</p>
              <p className="text-3xl font-bold text-gray-900">{filteredMyRecords.length + filteredHospitalRecords.length}</p>
              {searchTerm && (
                <p className="text-xs text-gray-500 mt-1">Filtered from {myRecords.length + hospitalRecords.length} total</p>
              )}
            </div>
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">My Uploads</p>
              <p className="text-3xl font-bold text-gray-900">{filteredMyRecords.length}</p>
              {searchTerm && (
                <p className="text-xs text-gray-500 mt-1">Filtered from {myRecords.length} total</p>
              )}
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📤</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover-lift transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Hospital Records</p>
              <p className="text-3xl font-bold text-gray-900">{filteredHospitalRecords.length}</p>
              {searchTerm && (
                <p className="text-xs text-gray-500 mt-1">Filtered from {hospitalRecords.length} total</p>
              )}
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;

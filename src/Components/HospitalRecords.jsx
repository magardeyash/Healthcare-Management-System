import React, { useState } from 'react';

const HospitalRecords = ({ hospital }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock patient data
  const [patients] = useState([
    { id: 'P001234', name: 'John Doe' },
    { id: 'P001235', name: 'Sarah Wilson' },
    { id: 'P001236', name: 'Michael Brown' }
  ]);

  // Mock records data
  const [hospitalRecords, setHospitalRecords] = useState([
    {
      id: 1,
      patientId: 'P001234',
      patientName: 'John Doe',
      recordType: 'Blood Test',
      date: '2024-01-20',
      description: 'Complete blood count and lipid profile',
      doctor: 'Dr. Sarah Johnson',
      ward: 'Cardiology Ward',
      fileSize: '2.3 MB',
      status: 'verified'
    }
  ]);

  const [uploadForm, setUploadForm] = useState({
    patientId: '',
    recordType: '',
    date: '',
    description: '',
    doctor: '',
    ward: '',
    file: null
  });

  const recordTypes = ['Blood Test', 'X-Ray', 'MRI Scan', 'Lab Test', 'Prescription', 'Bill', 'Other'];
  const wards = ['General Ward', 'Cardiology Ward', 'Emergency Ward', 'ICU'];
  const doctors = ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Davis'];

  const handleUploadRecord = (e) => {
    e.preventDefault();
    
    if (!uploadForm.patientId) {
      alert('Please select a patient first');
      return;
    }

    const selectedPatient = patients.find(p => p.id === uploadForm.patientId);
    
    const newRecord = {
      id: Date.now(),
      patientId: uploadForm.patientId,
      patientName: selectedPatient.name,
      recordType: uploadForm.recordType,
      date: uploadForm.date,
      description: uploadForm.description,
      doctor: uploadForm.doctor,
      ward: uploadForm.ward,
      fileSize: uploadForm.file ? `${(uploadForm.file.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB',
      status: 'pending'
    };
    
    setHospitalRecords([...hospitalRecords, newRecord]);
    alert(`Record uploaded successfully for ${selectedPatient.name}!`);
    
    setUploadForm({
      patientId: '', recordType: '', date: '', description: '', doctor: '', ward: '', file: null
    });
    setShowUploadForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadForm(prev => ({ ...prev, file }));
  };

  const filterRecords = (records) => {
    if (!searchTerm) return records;
    return records.filter(record => 
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.recordType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredRecords = filterRecords(hospitalRecords);

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status] || statusConfig.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Medical Records Management</h1>
        <p className="text-green-100 text-lg">Upload and manage medical records for your patients</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {showUploadForm ? 'Cancel' : '📤 Upload New Record'}
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Medical Record</h2>
          
          <form onSubmit={handleUploadRecord} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
                <select
                  required
                  name="patientId"
                  value={uploadForm.patientId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.id} - {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Record Type *</label>
                <select
                  required
                  name="recordType"
                  value={uploadForm.recordType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select record type</option>
                  {recordTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  required
                  name="date"
                  value={uploadForm.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Doctor *</label>
                <select
                  required
                  name="doctor"
                  value={uploadForm.doctor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
                <select
                  required
                  name="ward"
                  value={uploadForm.ward}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select ward</option>
                  {wards.map(ward => (
                    <option key={ward} value={ward}>{ward}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File *</label>
                <input
                  type="file"
                  required
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={uploadForm.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe the medical record..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Upload Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Records List */}
      <div className="bg-white rounded-xl shadow-lg hover-lift transition-all duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Hospital Records ({filteredRecords.length})</h2>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>

          <div className="space-y-4">
            {filteredRecords.map(record => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{record.recordType}</h3>
                    <p className="text-gray-600 text-sm">{record.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-2">
                      <div><span className="text-gray-600">Patient:</span> <span className="font-medium">{record.patientName}</span></div>
                      <div><span className="text-gray-600">ID:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{record.patientId}</span></div>
                      <div><span className="text-gray-600">Date:</span> <span className="font-medium">{record.date}</span></div>
                      <div><span className="text-gray-600">Doctor:</span> <span className="font-medium">{record.doctor}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {getStatusBadge(record.status)}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRecords;

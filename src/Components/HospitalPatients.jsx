import React, { useState } from 'react';

const HospitalPatients = ({ hospital }) => {
  const [activeTab, setActiveTab] = useState('view-patients');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);
  
  // Mock patient data - in real app, this would come from API
  const [patients, setPatients] = useState([
    {
      id: 'P001234',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      phone: '+1-555-0123',
      email: 'john.doe@email.com',
      address: '123 Main St, City, State',
      bloodGroup: 'O+',
      emergencyContact: 'Jane Doe (Wife) - +1-555-0124',
      admissionDate: '2024-01-15',
      status: 'Admitted',
      ward: 'Cardiology Ward',
      doctor: 'Dr. Sarah Johnson',
      medicalHistory: 'Hypertension, Diabetes Type 2',
      allergies: 'Penicillin'
    },
    {
      id: 'P001235',
      name: 'Sarah Wilson',
      age: 32,
      gender: 'Female',
      phone: '+1-555-0125',
      email: 'sarah.wilson@email.com',
      address: '456 Oak Ave, City, State',
      bloodGroup: 'A+',
      emergencyContact: 'Mike Wilson (Husband) - +1-555-0126',
      admissionDate: '2024-01-10',
      status: 'Discharged',
      ward: 'General Ward',
      doctor: 'Dr. Michael Chen',
      medicalHistory: 'Asthma',
      allergies: 'None'
    },
    {
      id: 'P001236',
      name: 'Michael Brown',
      age: 28,
      gender: 'Male',
      phone: '+1-555-0127',
      email: 'michael.brown@email.com',
      address: '789 Pine Rd, City, State',
      bloodGroup: 'B+',
      emergencyContact: 'Lisa Brown (Mother) - +1-555-0128',
      admissionDate: '2024-01-17',
      status: 'Admitted',
      ward: 'Emergency Ward',
      doctor: 'Dr. Emily Davis',
      medicalHistory: 'None',
      allergies: 'Shellfish'
    }
  ]);

  const [addPatientForm, setAddPatientForm] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    bloodGroup: '',
    emergencyContact: '',
    medicalHistory: '',
    allergies: '',
    ward: '',
    doctor: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other'];
  const wards = ['General Ward', 'Cardiology Ward', 'Emergency Ward', 'ICU', 'Surgery Ward', 'Pediatric Ward'];
  const doctors = ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Davis', 'Dr. Robert Wilson', 'Dr. Lisa Anderson'];

  const handleAddPatient = (e) => {
    e.preventDefault();
    
    // Generate unique patient ID
    const newPatientId = `P${String(patients.length + 1000001).padStart(6, '0')}`;
    
    const newPatient = {
      id: newPatientId,
      ...addPatientForm,
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'Admitted'
    };
    
    setPatients([...patients, newPatient]);
    setAddPatientForm({
      name: '', age: '', gender: '', phone: '', email: '', address: '',
      bloodGroup: '', emergencyContact: '', medicalHistory: '', allergies: '', ward: '', doctor: ''
    });
    setShowAddPatient(false);
    
    alert(`Patient ${newPatient.name} added successfully with ID: ${newPatientId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddPatientForm(prev => ({ ...prev, [name]: value }));
  };

  const filterPatients = (patients) => {
    if (!searchTerm) return patients;
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPatients = filterPatients(patients);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Admitted': 'bg-blue-100 text-blue-800',
      'Discharged': 'bg-green-100 text-green-800',
      'Under Observation': 'bg-yellow-100 text-yellow-800',
      'Critical': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status] || statusConfig['Admitted']}`}>
        {status}
      </span>
    );
  };

  const copyPatientId = (patientId) => {
    navigator.clipboard.writeText(patientId);
    alert(`Patient ID ${patientId} copied to clipboard!`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Patient Management</h1>
        <p className="text-blue-100 text-lg">Manage your patient database and medical records</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowAddPatient(!showAddPatient)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {showAddPatient ? 'Cancel' : '➕ Add New Patient'}
        </button>
        <button
          onClick={() => setActiveTab('view-patients')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          👥 View All Patients
        </button>
      </div>

      {/* Add Patient Form */}
      {showAddPatient && (
        <div className="bg-white rounded-xl p-6 shadow-lg hover-lift transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">👤</span>
            Add New Patient
          </h2>
          <form onSubmit={handleAddPatient} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={addPatientForm.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter patient's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  value={addPatientForm.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  required
                  value={addPatientForm.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={addPatientForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={addPatientForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={addPatientForm.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ward *
                </label>
                <select
                  name="ward"
                  required
                  value={addPatientForm.ward}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned Doctor *
                </label>
                <select
                  name="doctor"
                  required
                  value={addPatientForm.doctor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={addPatientForm.address}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter patient's address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={addPatientForm.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Name and relationship - Phone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allergies
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={addPatientForm.allergies}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="List any allergies or 'None'"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical History
              </label>
              <textarea
                name="medicalHistory"
                value={addPatientForm.medicalHistory}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter relevant medical history or 'None'"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Add Patient
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Patient List */}
      <div className="bg-white rounded-xl shadow-lg hover-lift transition-all duration-300">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">👥</span>
              Patient Database ({filteredPatients.length})
            </h2>
            
            {/* Search Bar */}
            <div className="relative mt-4 sm:mt-0">
              <input
                type="text"
                placeholder="Search patients by name, ID, ward, or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPatients.map(patient => (
              <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{patient.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">ID:</span>
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{patient.id}</span>
                        <button
                          onClick={() => copyPatientId(patient.id)}
                          className="text-green-600 hover:text-green-800 text-sm hover:underline"
                          title="Copy Patient ID"
                        >
                          📋 Copy
                        </button>
                      </div>
                      {getStatusBadge(patient.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Age:</span>
                        <span className="ml-2 font-medium">{patient.age} years</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Gender:</span>
                        <span className="ml-2 font-medium">{patient.gender}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Blood Group:</span>
                        <span className="ml-2 font-medium">{patient.bloodGroup}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <span className="ml-2 font-medium">{patient.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ward:</span>
                        <span className="ml-2 font-medium">{patient.ward}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Doctor:</span>
                        <span className="ml-2 font-medium">{patient.doctor}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Admission:</span>
                        <span className="ml-2 font-medium">{patient.admissionDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Emergency:</span>
                        <span className="ml-2 font-medium">{patient.emergencyContact}</span>
                      </div>
                    </div>
                    
                    {(patient.medicalHistory || patient.allergies) && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        {patient.medicalHistory && (
                          <div className="text-sm">
                            <span className="text-gray-600">Medical History:</span>
                            <span className="ml-2">{patient.medicalHistory}</span>
                          </div>
                        )}
                        {patient.allergies && (
                          <div className="text-sm mt-1">
                            <span className="text-gray-600">Allergies:</span>
                            <span className="ml-2">{patient.allergies}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                      📋 View Records
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                      📤 Upload Record
                    </button>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                      ✏️ Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">No patients found</p>
                <p className="text-sm">Try adjusting your search terms or add a new patient</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patient ID Information */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-3">💡</span>
          About Patient IDs
        </h2>
        <div className="space-y-3 text-sm text-gray-700">
          <p>• <strong>Patient IDs are automatically generated</strong> when you add a new patient</p>
          <p>• <strong>Share the Patient ID with users</strong> so they can link their accounts</p>
          <p>• <strong>Users can enter this ID</strong> in their profile to see records uploaded by your hospital</p>
          <p>• <strong>Format:</strong> P + 6-digit number (e.g., P001234)</p>
          <p>• <strong>Click the "Copy" button</strong> next to any Patient ID to copy it to clipboard</p>
        </div>
      </div>
    </div>
  );
};

export default HospitalPatients;


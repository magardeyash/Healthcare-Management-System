import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignupModal = ({ isOpen, onClose, onSignup, userType }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'patient',
    hospitalName: '',
    licenseNumber: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userType) {
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'patient',
        hospitalName: '',
        licenseNumber: '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      });
      setError('');
    }
  }, [userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const endpoint = userType === 'hospital' ? '/api/hospital/register' : '/api/register';
      const requestData = userType === 'hospital' 
        ? {
            hospitalName: formData.hospitalName,
            email: formData.email,
            password: formData.password,
            licenseNumber: formData.licenseNumber,
            phone: formData.phone,
            address: formData.address
          }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            userType: formData.userType
          };
      
      const response = await axios.post(`http://localhost:5000${endpoint}`, requestData);
      const userData = response.data.user || response.data.hospital;
      
      if (userData) {
        userData.userType = userType;
      }
      onSignup(response.data.token, userData, userType);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !userType) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-8 pb-4 border-b border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Sign Up as {userType === 'hospital' ? 'Hospital' : 'User'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl bg-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
            >
              ×
            </button>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {userType === 'hospital' ? (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Hospital Name</label>
                <input
                  type="text"
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">License Number</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Street</label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => setFormData({
                      ...formData, 
                      address: {...formData.address, street: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => setFormData({
                      ...formData, 
                      address: {...formData.address, city: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) => setFormData({
                      ...formData, 
                      address: {...formData.address, state: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.address.zipCode}
                    onChange={(e) => setFormData({
                      ...formData, 
                      address: {...formData.address, zipCode: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) => setFormData({
                      ...formData, 
                      address: {...formData.address, country: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
                <select
                  value={formData.userType}
                  onChange={(e) => setFormData({...formData, userType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
                  required
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
              required
            />
          </div>
        </form>

        <div className="px-8 py-6 border-t border-gray-200 bg-white">
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-4 rounded-md hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 font-semibold text-lg"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
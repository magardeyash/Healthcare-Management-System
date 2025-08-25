import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginModal = ({ isOpen, onClose, onLogin, userType }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userType) {
      setFormData({
        email: '',
        password: ''
      });
      setError('');
    }
  }, [userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = userType === 'hospital' ? '/api/hospital/login' : '/api/login';
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      const userData = response.data.user || response.data.hospital;
      
      if (userData) {
        userData.userType = userType;
      }
      onLogin(response.data.token, userData, userType);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !userType) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Login as {userType === 'hospital' ? 'Hospital' : 'User'}
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

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
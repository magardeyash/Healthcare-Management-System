import React from 'react';

const UserTypeSelection = ({ isOpen, onClose, onUserTypeSelect, action }) => {
  if (!isOpen || !action) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {action === 'login' ? 'Login as' : 'Sign up as'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl bg-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-sm"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => onUserTypeSelect('user')}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 text-lg font-semibold"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Regular User</span>
            </div>
            <p className="text-sm mt-2 opacity-90">Patient or Doctor</p>
          </button>

          <button
            onClick={() => onUserTypeSelect('hospital')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg hover:from-emerald-600 hover:to-green-500 transition-all duration-300 text-lg font-semibold"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Hospital</span>
            </div>
            <p className="text-sm mt-2 opacity-90">Medical Institution</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;

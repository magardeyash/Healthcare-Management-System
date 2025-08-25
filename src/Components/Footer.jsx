import React from 'react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-6 text-center animate-fadeInUp">
    <div className="max-w-7xl mx-auto px-4">
      &copy; {new Date().getFullYear()} HealthCare+. All rights reserved.
    </div>
  </footer>
);


export default Footer;

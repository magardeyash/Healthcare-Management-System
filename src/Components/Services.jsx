import React from 'react';

const Services = () => (
  <section id="services" className="py-20 bg-white animate-fadeIn">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-12 animate-slideInDown">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { icon: '🩺', title: 'General Consultation', desc: 'Expert advice and checkups for all ages.' },
          { icon: '💊', title: 'Pharmacy', desc: 'On-site pharmacy with a wide range of medicines.' },
          { icon: '🏥', title: 'Emergency Care', desc: '24/7 emergency services for urgent needs.' },
          { icon: '🧑‍⚕️', title: 'Specialist Doctors', desc: 'Access to top specialists in every field.' },
          { icon: '🧪', title: 'Lab Tests', desc: 'Comprehensive diagnostic and lab services.' },
          { icon: '🤱', title: 'Maternity Care', desc: 'Caring support for mothers and newborns.' },
        ].map((service, idx) => (
          <div key={idx} className="bg-gradient-to-br from-cyan-100 to-blue-50 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 animate-fadeInUp">
            <div className="text-5xl mb-4 animate-bounce-slow">{service.icon}</div>
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">{service.title}</h3>
            <p className="text-blue-600 text-center">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


export default Services;
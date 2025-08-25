import React from 'react';

const Contact = () => (
  <section id="contact" className="py-20 bg-white animate-fadeIn">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold text-blue-700 mb-6 animate-slideInDown">Contact Us</h2>
      <p className="text-xl text-blue-800 mb-8 animate-fadeInUp">Have questions or need help? Reach out to us!</p>
      <form className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Name" className="flex-1 px-6 py-3 rounded-lg border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg transition-all duration-300" />
          <input type="email" placeholder="Email" className="flex-1 px-6 py-3 rounded-lg border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg transition-all duration-300" />
        </div>
        <textarea placeholder="Your Message" rows="4" className="w-full px-6 py-3 rounded-lg border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg transition-all duration-300"></textarea>
        <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow hover:scale-105 transition-all duration-300 animate-bounce">Send Message</button>
      </form>
    </div>
  </section>
);

export default Contact;
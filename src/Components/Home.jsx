import React from 'react'

const Home = () => (
  <section id="home" className="pt-8 pb-20 bg-gradient-to-br from-cyan-50 to-blue-100 min-h-screen flex items-center justify-center animate-fadeIn">
    <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-6 drop-shadow-lg animate-slideInDown">
          Your Health, <div className="text-cyan-500">Our Priority</div>
        </h1>
        <p className="text-xl md:text-2xl text-blue-800 mb-8 animate-fadeInUp">
          Comprehensive healthcare services for you and your family. Experience world-class care, modern facilities, and compassionate professionals.
        </p>
        <a href="#services" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:scale-105 hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 animate-bounce">
          Explore Services
        </a>
      </div>
      <div className="flex-1 flex justify-center animate-fadeInUp">
        <img src="undraw_doctors_djoj.svg" alt="Healthcare" className="rounded-3xl shadow-2xl w-2/3 max-w-xl border-8 border-white" />
      </div>
    </div>
  </section>
);

export default Home

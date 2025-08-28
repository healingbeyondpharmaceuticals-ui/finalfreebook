import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20">
      <div className="absolute inset-0">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/68ae94a5eedbe96a21c1eca2_1756271821356_0162fe3b.webp"
          alt="Social Connection"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-blue-900/60"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Free Speech <span className="text-blue-400">First</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Connect, share, and express yourself without limits. Join the platform where your voice matters and authentic conversations thrive.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
            Join FreeBook Today
          </button>
          <button className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all">
            Explore Communities
          </button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
          <div>
            <div className="text-3xl font-bold text-blue-400">100M+</div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">Zero</div>
            <div className="text-gray-300">Censorship</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400">24/7</div>
            <div className="text-gray-300">Free Expression</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
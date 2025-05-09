import React from 'react';
import { FaDownload, FaUpload, FaClipboard, FaBell } from 'react-icons/fa';

const ServiceSection = () => (
  <section id="services" className="p-16 bg-gradient-to-br from-blue-600 to-purple-600 text-black">
    <h2 className="text-4xl font-extrabold text-yellow-300 mb-12 text-center">Our Services</h2>
    
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {/* Download Notes Service */}
      <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="text-4xl mb-6 text-yellow-400">
          <FaDownload />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Download Notes</h3>
        <p className="text-lg">Get access to notes from various universities.</p>
      </div>

      {/* Sell Notes Service */}
      <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="text-4xl mb-6 text-yellow-400">
          <FaUpload />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Sell Notes</h3>
        <p className="text-lg">Login to sell your own notes and earn.</p>
      </div>

      {/* Exam Papers Service */}
      <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="text-4xl mb-6 text-yellow-400">
          <FaClipboard />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Exam Papers</h3>
        <p className="text-lg">Access previous year exam papers to prepare better.</p>
      </div>

      {/* Updates Service */}
      <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="text-4xl mb-6 text-yellow-400">
          <FaBell />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Updates</h3>
        <p className="text-lg">Stay updated with the latest scholarship and exam notifications.</p>
      </div>
    </div>
  </section>
);

export default ServiceSection;

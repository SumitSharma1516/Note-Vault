import React from 'react';
import { FaUsers, FaFileAlt, FaUniversity } from 'react-icons/fa';
import Footer from './Footer';

const AboutSection = () => {
  return <>
    <section id="about" className="bg-gradient-to-br from-blue-600 to-purple-600 p-16 text-black">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-yellow-300 mb-8">About Note Vault</h2>
        <p className="text-lg text-gray-200 mb-12">Note Vault is one of the oldest platforms to share and sell academic notes. Over the years, we have achieved great milestones:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Users Section */}
          <div className="text-center p-8 bg-white bg-opacity-20 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-6 text-yellow-400 animate-pulse">
              <FaUsers />
            </div>
            <h3 className="text-4xl font-semibold mb-4">100,000+</h3>
            <p className="text-xl">Happy Users</p>
          </div>

          {/* Notes Section */}
          <div className="text-center p-8 bg-white bg-opacity-20 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-6 text-yellow-400 animate-pulse">
              <FaFileAlt />
            </div>
            <h3 className="text-4xl font-semibold mb-4">50,000+</h3>
            <p className="text-xl">Notes Uploaded</p>
          </div>

          {/* Colleges Section */}
          <div className="text-center p-8 bg-white bg-opacity-20 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-6 text-yellow-400 animate-pulse">
              <FaUniversity />
            </div>
            <h3 className="text-4xl font-semibold mb-4">200+</h3>
            <p className="text-xl">Colleges & Universities</p>
          </div>
        </div>
      </div>
    </section>
  </>;
};

export default AboutSection;

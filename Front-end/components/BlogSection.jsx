import React from 'react';

const BlogSection = () => (
  <section id="blog" className="p-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center">
    <h2 className="text-4xl font-extrabold mb-8 text-yellow-300">Latest Updates</h2>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">Exam Date Announced</h3>
        <p className="text-gray-700">The exam dates for the upcoming semester have been announced. Stay tuned for more details.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">Scholarship Application Open</h3>
        <p className="text-gray-700">Apply for the new scholarship program before the deadline. Don’t miss out on this opportunity!</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">New Notes Uploaded</h3>
        <p className="text-gray-700">New notes for various subjects are available for download. Check out the latest materials now!</p>
      </div>
    </div>
  </section>
);

export default BlogSection;

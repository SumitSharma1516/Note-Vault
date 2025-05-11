import React, { useState,useEffect } from 'react';
import { FaUsers, FaFileAlt, FaUniversity } from 'react-icons/fa';
import { FaDownload, FaUpload, FaClipboard, FaBell,FaGraduationCap } from 'react-icons/fa';
import { FaBookOpen, FaSearch } from 'react-icons/fa';

const HeroSection = () => {

  const [filters, setFilters] = useState({ colleges: [], courses: [], semesters: [] });
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch dropdown values (filters) from backend once
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('https://note-vault-hiiy.onrender.com//notes/filters');
        const data = await response.json();
        setFilters(data);
      } catch (err) {
        console.error('Failed to load filters', err);
      }
    };
    fetchFilters();
  }, []);

  const fetchNotes = async () => {
    if (!college || !course || !semester) {
      setError('Please select college, course, and semester!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const query = new URLSearchParams({ college, course, semester });
      const response = await fetch(`https://note-vault-hiiy.onrender.com/notes/all?${query.toString()}`);
      const data = await response.json();

      if (data.notes?.length > 0) {
        setNotes(data.notes);
      } else {
        setNotes([]);
        setError('No notes found for the selected criteria.');
      }
    } catch (err) {
      setError('Failed to fetch notes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return<>
  <section className="bg-gradient-to-r from-green-400 to-blue-500 h-[80vh] text-white flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold animate__animated animate__fadeIn">
      Welcome to Note Vault
    </h1>
    <p className="mt-4 text-lg sm:text-xl lg:text-2xl animate__animated animate__fadeIn animate__delay-1s text-center">
      Your one-stop platform for educational resources, notes, exam papers, and more!
    </p>
    <button className="mt-6 px-6 py-2 bg-white text-black rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out">
      Get Started
    </button>
  </section>

  {/* // about section  */}
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
      {/* Service section  */}

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

        {/* Blog section  */}
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

  {/* Search Section  */}

  <section className="p-10 sm:p-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center">
       <h2 className="text-4xl font-bold mb-6">🔍 Search Notes & Papers</h2>
 
       <div className="space-y-6 max-w-xl mx-auto">
         {/* Dropdowns */}
         <div className="text-left">
           <label className="block text-lg mb-2"><FaUniversity className="inline mr-2 text-yellow-300" />College</label>
           <select value={college} onChange={(e) => setCollege(e.target.value)} className="w-full p-3 rounded-md text-black">
             <option value="">-- Select College --</option>
             {/* {filters.colleges.map((col, i) => <option key={i} value={col}>{col}</option>)} */}
           </select>
         </div>
 
         <div className="text-left">
           <label className="block text-lg mb-2"><FaBookOpen className="inline mr-2 text-yellow-300" />Course</label>
           <select value={course} onChange={(e) => setCourse(e.target.value)} className="w-full p-3 rounded-md text-black">
             <option value="">-- Select Course --</option>
             {/* {filters.courses.map((c, i) => <option key={i} value={c}>{c}</option>)} */}
           </select>
         </div>
 
         <div className="text-left">
           <label className="block text-lg mb-2"><FaGraduationCap className="inline mr-2 text-yellow-300" />Semester</label>
           <select value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full p-3 rounded-md text-black">
             <option value="">-- Select Semester --</option>
             {/* {filters.semesters.map((s, i) => <option key={i} value={s}>{s}</option>)} */}
           </select>
         </div>
 
         <button onClick={fetchNotes} className="mt-4 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md shadow-lg flex items-center justify-center mx-auto">
           <FaSearch className="mr-2" /> Search
         </button>
       </div>
 
       <div className="mt-8">
         {loading && <p className="text-white text-xl">Loading notes...</p>}
         {error && <p className="text-red-400 text-xl">{error}</p>}
 
         {notes.length > 0 && (
           <div className="mt-6 space-y-6">
             {notes.map((note, i) => (
               <div key={i} className="bg-white text-black p-6 rounded-lg shadow-lg">
                 <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                 <p className="mb-2">{note.description}</p>
                 <a
                   href={`http://localhost:5000/uploads/${note.file}`}
                   download
                   className="inline-block mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                 >
                   <FaDownload className="inline mr-2" /> Download
                 </a>
               </div>
             ))}
           </div>
         )}
       </div>
     </section>

      {/* Footer section  */}
      <footer className="bg-blue-600 text-white p-6 text-center">
    <p>&copy; 2025 Note Vault | All Rights Reserved</p>
    <p>Contact Us: support@notevault.com</p>
  </footer>
  </>};

export default HeroSection;

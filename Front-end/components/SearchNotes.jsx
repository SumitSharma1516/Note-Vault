import React, { useEffect, useState } from 'react';
import { FaUniversity, FaBookOpen, FaSearch, FaGraduationCap, FaDownload } from 'react-icons/fa';

const SearchNotes = () => {
  const [filters, setFilters] = useState({ colleges: ["-- Select Semester --"], courses: [], semesters: [] });
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log(filters)
  // Fetch dropdown values (filters) from backend once
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('http://localhost:5000/notes/filters');
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
      const response = await fetch(`http://localhost:5000/notes/all?${query.toString()}`);
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

  return (
    <section className="p-10 sm:p-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center">
      <h2 className="text-4xl font-bold mb-6">🔍 Search Notes & Papers</h2>

      <div className="space-y-6 max-w-xl mx-auto">
        {/* Dropdowns */}
        <div className="text-left">
          <label className="block text-lg mb-2"><FaUniversity className="inline mr-2 text-yellow-300" />College</label>
          <select value={college} onChange={(e) => setCollege(e.target.value)} className="w-full p-3 rounded-md text-black">
            <option value="">-- Select College --</option>
            {filters.colleges.map((col, i) => <option key={i} value={col}>{col}</option>)}
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
  );
};

export default SearchNotes;

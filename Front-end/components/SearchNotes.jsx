import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUniversity, FaBookOpen, FaSearch, FaGraduationCap, FaDownload } from 'react-icons/fa';

import {
  fetchColleges,
  fetchCourses,
  fetchSemesters,
  fetchNotes,
  setCollege,
  setCourse,
  setSemester,
  addWatchedNote,
  resetWatchedNotes,
} from '../Redux/slices/notesSlice';

const API_URL = 'http://localhost:5000';

const SearchNotes = () => {
  const dispatch = useDispatch();

  const { filters = {}, selected = {}, notes = [], loading, error, watchedNotes = new Set() } = useSelector(state => state.notes);
console.log(filters.colleges)
  useEffect(() => {
    dispatch(fetchColleges());
  }, [dispatch]);

  useEffect(() => {
    if (selected.college) {
      dispatch(fetchCourses(selected.college));
    }
  }, [dispatch, selected.college]);

  useEffect(() => {
    if (selected.college && selected.course) {
      dispatch(fetchSemesters({ college: selected.college, course: selected.course }));
    }
  }, [dispatch, selected.college, selected.course]);

  useEffect(() => {
    notes.forEach(note => {
      if (!watchedNotes.has(note._id)) {
        fetch(`${API_URL}/notes/watch/${note._id}`, { method: 'GET' }).catch(() => {});
        dispatch(addWatchedNote(note._id));
      }
    });
  }, [notes, watchedNotes, dispatch]);

  const handleSearch = () => {
    if (!selected.college || !selected.course || !selected.semester) {
      alert('Please select college, course, and semester!');
      return;
    }
    dispatch(fetchNotes({ college: selected.college, course: selected.course, semester: selected.semester }));
    dispatch(resetWatchedNotes());
  };

  return (
    <section className="p-10 sm:p-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center">
      <h2 className="text-4xl font-bold mb-6">🔍 Search Notes & Papers</h2>

      <div className="space-y-6 max-w-xl mx-auto">
        <div className="text-left">
          <label htmlFor="college-select" className="block text-lg mb-2">
            <FaUniversity className="inline mr-2 text-yellow-300" />
            College
          </label>
          <select
            id="college-select"
            value={selected.college || ''}
            onChange={e => dispatch(setCollege(e.target.value))}
            className="w-full p-3 rounded-md text-black"
            aria-label="Select College"
          >
            <option value="">-- Select College --</option>
            {filters.colleges && filters.colleges.length > 0 ? (
              filters.colleges.map((col, i) => (
                <option key={i} value={col}>{col}</option>
              ))
            ) : (
              <option disabled>Loading Colleges...</option>
            )}
          </select>
        </div>

        <div className="text-left">
          <label htmlFor="course-select" className="block text-lg mb-2">
            <FaBookOpen className="inline mr-2 text-yellow-300" />
            Course
          </label>
          <select
            id="course-select"
            value={selected.course || ''}
            onChange={e => dispatch(setCourse(e.target.value))}
            className="w-full p-3 rounded-md text-black"
            disabled={!selected.college}
            aria-label="Select Course"
          >
            <option value="">-- Select Course --</option>
            {filters.courses && filters.courses.length > 0 ? (
              filters.courses.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))
            ) : (
              <option disabled>{selected.college ? 'Loading Courses...' : 'Select College First'}</option>
            )}
          </select>
        </div>

        <div className="text-left">
          <label htmlFor="semester-select" className="block text-lg mb-2">
            <FaGraduationCap className="inline mr-2 text-yellow-300" />
            Semester
          </label>
          <select
            id="semester-select"
            value={selected.semester || ''}
            onChange={e => dispatch(setSemester(e.target.value))}
            className="w-full p-3 rounded-md text-black"
            disabled={!selected.course}
            aria-label="Select Semester"
          >
            <option value="">-- Select Semester --</option>
            {filters.semesters && filters.semesters.length > 0 ? (
              filters.semesters.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))
            ) : (
              <option disabled>{selected.course ? 'Loading Semesters...' : 'Select Course First'}</option>
            )}
          </select>
        </div>

        <button
          onClick={handleSearch}
          disabled={!selected.college || !selected.course || !selected.semester || loading}
          className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 font-semibold px-6 py-3 rounded-md text-black w-full flex items-center justify-center space-x-2"
          aria-label="Search Notes"
        >
          <FaSearch />
          <span>Search</span>
        </button>
      </div>

      <div className="mt-10 max-w-4xl mx-auto text-left">
        {loading && <p className="text-yellow-300 font-semibold">Loading notes...</p>}
        {error && <p className="text-red-400 font-semibold">{error}</p>}

        {!loading && !error && notes.length > 0 && (
          <ul className="space-y-6">
            {notes.map(note => (
              <li key={note._id} className="bg-white rounded-lg p-4 shadow-md text-black">
                <h3 className="text-xl font-bold mb-2">{note.title}</h3>
                <p className="mb-1"><strong>Description:</strong> {note.description}</p>
                <p className="mb-1"><strong>College:</strong> {note.college}</p>
                <p className="mb-1"><strong>Course:</strong> {note.course}</p>
                <p className="mb-1"><strong>Semester:</strong> {note.semester}</p>
                <p className="mb-1"><strong>Uploaded By:</strong> {note.uploadedBy}</p>
                <p className="mb-3"><strong>Uploaded At:</strong> {new Date(note.createdAt).toLocaleDateString()}</p>
                <a
                  href={note.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                  aria-label={`Download ${note.title}`}
                >
                  <FaDownload className="mr-2" />
                  Download PDF
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SearchNotes;

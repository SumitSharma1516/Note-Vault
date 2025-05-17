import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Action example to update notes list (aap apne store ke hisaab se change karna)
const noteUploadSuccess = (newNote) => ({
  type: 'notes/addNote',
  payload: newNote,
});

const UploadNotes = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const [form, setForm] = useState({
    title: '', description: '', college: '', course: '', semester: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/notes/upload', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Note Uploaded!");

      // Dispatch action to Redux store - aap apne notes reducer ko update kar sakte ho
      dispatch(noteUploadSuccess(response.data));

      // Clear form
      setForm({ title: '', description: '', college: '', course: '', semester: '' });
      setFile(null);
    } catch (err) {
      alert("Upload Failed");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Upload Notes</h2>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          type="text"
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={form[key]}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
          className="block w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ))}
      <input
        type="file"
        name="file"
        onChange={e => setFile(e.target.files[0])}
        className="mb-4 w-full"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadNotes;

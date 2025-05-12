import React, { useState } from 'react';
import axios from 'axios';

const UploadNotes = () => {
  const [form, setForm] = useState({
    title: '', description: '', college: '', course: '', semester: ''
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/notes/upload', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert("Note Uploaded!");
    } catch (err) {
      alert("Upload Failed");
    }
  };

  return (
 <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Upload Notes</h2>
  {Object.keys(form).map((key) => (
    <input key={key} type="text" placeholder={key}
      value={form[key]}
      onChange={e => setForm({ ...form, [key]: e.target.value })}
      className="block w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
  ))}
  <input type="file" name="file" onChange={e => setFile(e.target.files[0])}
    className="mb-4 w-full" />
  <button onClick={handleSubmit}
    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded hover:opacity-90 w-full">
    Upload
  </button>
</div>

  );
};

export default UploadNotes;

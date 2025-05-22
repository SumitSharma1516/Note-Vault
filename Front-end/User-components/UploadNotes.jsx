import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

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
  const [notesFile, setNotesFile] = useState(null); // PDF
  const [photoFile, setPhotoFile] = useState(null); // Image
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!notesFile) {
      alert("Please select a PDF file for notes.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('notes', notesFile); // Must match multer field
    if (photoFile) formData.append('photo', photoFile); // Optional

  try {
  const response = await axios.post('https://note-vault-hiiy.onrender.com/notes/upload', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  });

  alert("Note Uploaded!");
  dispatch(noteUploadSuccess(response.data));  // response.data contains the saved note

  // Reset form inputs only (do not add fileUrl or uploadedBy here)
  setForm({ title: '', description: '', college: '', course: '', semester: '' });
  setNotesFile(null);
  setPhotoFile(null);

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

      <label className="block mb-2 font-medium">Upload PDF Notes</label>
      <input
        type="file"
        name="file"
        // accept="application/pdf"
        onChange={e => setNotesFile(e.target.files[0])}
        className="mb-4 w-full"
      />

      {/* <label className="block mb-2 font-medium">Upload Image (Optional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={e => setPhotoFile(e.target.files[0])}
        className="mb-4 w-full"
      /> */}

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

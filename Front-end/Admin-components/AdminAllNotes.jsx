import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAllNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('/api/notes') // public API assumed
      .then(res => setNotes(res.data.notes))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Uploaded Notes</h2>
      <ul className="space-y-2">
        {notes.map((note, i) => (
          <li key={i} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{note.title}</h3>
            <p>{note.description}</p>
            <p className="text-sm text-gray-600">Uploaded By: {note.uploadedBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAllNotes;

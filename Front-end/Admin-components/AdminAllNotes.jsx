import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNotes } from '../Redux/slices/notesSlice';

const AdminAllNotes = () => {
  const dispatch = useDispatch();
  const { allNotes, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchAllNotes());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Uploaded Notes</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {allNotes.map((note, i) => (
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

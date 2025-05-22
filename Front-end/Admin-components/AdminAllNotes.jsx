import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNotes } from '../Redux/slices/adminSlice';

const AdminAllNotes = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllNotes());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">📚 All Uploaded Notes</h2>

      {loading && <p className="text-center text-blue-600">Loading notes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-5 border border-blue-100 hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-3 line-clamp-3">{note.description}</p>

            <div className="text-sm text-gray-500 mt-2">
              <span className="font-medium">Uploaded By:</span>{' '}
              <span className="text-blue-600">{note.uploadedBy?.username || 'Unknown'}</span>
            </div>

            <div className="text-xs text-gray-400 mt-1">
              📅 {new Date(note.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllNotes;

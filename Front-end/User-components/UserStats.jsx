import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserStats = () => {
  const [stats, setStats] = useState({
    notes: 0,
    watchCount: 0,
    downloadCount: 0,
    userNotes: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://note-vault-hiiy.onrender.com/user/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (err) {
        setError('Failed to load stats');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center text-blue-600 text-xl mt-10">Loading stats...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 text-xl mt-10">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Stats Section */}
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">📊 Your Dashboard Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-200 to-purple-300 p-6 rounded-xl shadow-md text-center">
          <p className="text-lg font-semibold text-gray-700">Total Notes</p>
          <p className="text-4xl font-bold text-blue-800">{stats.notes}</p>
        </div>
        <div className="bg-gradient-to-br from-green-200 to-green-300 p-6 rounded-xl shadow-md text-center">
          <p className="text-lg font-semibold text-gray-700">Total Watch Count</p>
          <p className="text-4xl font-bold text-green-800">{stats.watchCount}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 p-6 rounded-xl shadow-md text-center">
          <p className="text-lg font-semibold text-gray-700">Total Download Count</p>
          <p className="text-4xl font-bold text-yellow-700">{stats.downloadCount}</p>
        </div>
      </div>

      {/* Notes List Section */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">📚 Your Uploaded Notes</h3>

      {stats.userNotes.length === 0 ? (
        <p className="text-center text-gray-600">You haven't uploaded any notes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.userNotes.map((note) => (
            <div key={note._id} className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition">
              <h4 className="text-lg font-bold text-blue-700 mb-2">{note.title}</h4>
              <p className="text-sm text-gray-700 mb-2">{note.description}</p>
              <div className="text-sm text-gray-500">
                <p><strong>College:</strong> {note.college}</p>
                <p><strong>Course:</strong> {note.course}</p>
                <p><strong>Semester:</strong> {note.semester}</p>
              </div>
              <div className="mt-3 flex justify-between text-xs text-gray-500">
                <span>📺 {note.watchCount || 0} views</span>
                <span>⬇️ {note.downloadCount || 0} downloads</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserStats;

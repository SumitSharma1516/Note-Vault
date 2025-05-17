import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserStats = () => {
  const [stats, setStats] = useState({
    notes: 0,
    watchCount: 0,
    downloadCount: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user/dashboard', {
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Your Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-200 to-purple-200 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-gray-700">Total Notes</p>
          <p className="text-3xl font-bold text-blue-800">{stats.notes}</p>
        </div>
        <div className="bg-gradient-to-br from-green-200 to-green-300 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-gray-700">Total Watch Count</p>
          <p className="text-3xl font-bold text-green-800">{stats.watchCount}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-gray-700">Total Download Count</p>
          <p className="text-3xl font-bold text-yellow-700">{stats.downloadCount}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserStats = () => {
  const [stats, setStats] = useState({ noteCount: 0, watchCount: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/user/dashboard', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setStats(res.data)).catch(console.error);
  }, []);
console.log(stats)
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Stats</h2>
      <p>Total Notes: <strong>{stats.notes}</strong></p>
      <p>Total Watch Count: <strong>{stats.watchCount}</strong></p>
    </div>
  );
};

export default UserStats;

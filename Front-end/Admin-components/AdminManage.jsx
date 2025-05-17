import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const AdminManage = () => {
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [errorUsers, setErrorUsers] = useState('');
  const [errorNotes, setErrorNotes] = useState('');
  const [actionLoadingIds, setActionLoadingIds] = useState(new Set());
  const [searchUser, setSearchUser] = useState('');

  const token = localStorage.getItem('adminToken');

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setErrorUsers('');
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data.users || data);
    } catch (err) {
      setErrorUsers(err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchNotes = async () => {
    setLoadingNotes(true);
    setErrorNotes('');
    try {
      const res = await fetch(`${API_URL}/notes/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch notes');
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setErrorNotes(err.message);
    } finally {
      setLoadingNotes(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchNotes();
  }, []);

  const startActionLoading = (id) => setActionLoadingIds(prev => new Set(prev).add(id));
  const stopActionLoading = (id) => {
    const newSet = new Set(actionLoadingIds);
    newSet.delete(id);
    setActionLoadingIds(newSet);
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    startActionLoading(userId);
    setErrorUsers('');
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete user');
      await fetchUsers();
      alert('User deleted successfully');
    } catch (err) {
      setErrorUsers(err.message);
    } finally {
      stopActionLoading(userId);
    }
  };

  const deleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) return;
    startActionLoading(noteId);
    setErrorNotes('');
    try {
      const res = await fetch(`${API_URL}/notes/${noteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete note');
      await fetchNotes();
      alert('Note deleted successfully');
    } catch (err) {
      setErrorNotes(err.message);
    } finally {
      stopActionLoading(noteId);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin: Manage Users & Notes</h2>

      {/* Users Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Users</h3>
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="mb-4 p-2 border rounded w-full md:w-1/2"
        />
        {errorUsers && <p className="text-red-600 mb-4 text-center">{errorUsers}</p>}
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md shadow-md">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Username</th>
                  <th className="px-4 py-2 border">Mobile</th>
                  <th className="px-4 py-2 border">DOB</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => {
                  const loading = actionLoadingIds.has(user._id);
                  return (
                    <tr key={user._id} className="even:bg-gray-50">
                      <td className="px-4 py-2 border">{user.fullName || user.name}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 border">{user.username}</td>
                      <td className="px-4 py-2 border">{user.mobile}</td>
                      <td className="px-4 py-2 border">{user.dob ? new Date(user.dob).toLocaleDateString('en-IN') : '-'}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => deleteUser(user._id)}
                          disabled={loading}
                          className={`bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {loading ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Notes Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Uploaded Notes</h3>
        {errorNotes && <p className="text-red-600 mb-4 text-center">{errorNotes}</p>}
        {loadingNotes ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p>No notes uploaded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md shadow-md">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Uploaded By</th>
                  <th className="px-4 py-2 border">College</th>
                  <th className="px-4 py-2 border">Course</th>
                  <th className="px-4 py-2 border">Semester</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map(note => {
                  const loading = actionLoadingIds.has(note._id);
                  return (
                    <tr key={note._id} className="even:bg-gray-50">
                      <td className="px-4 py-2 border">{note.title}</td>
                      <td className="px-4 py-2 border">{note.description}</td>
                      <td className="px-4 py-2 border">{note.uploadedByName || note.uploadedBy || 'Unknown'}</td>
                      <td className="px-4 py-2 border">{note.college}</td>
                      <td className="px-4 py-2 border">{note.course}</td>
                      <td className="px-4 py-2 border">{note.semester}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => deleteNote(note._id)}
                          disabled={loading}
                          className={`bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {loading ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminManage;

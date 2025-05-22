// src/Redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://note-vault-hiiy.onrender.com';

// -------------------- Async Thunks --------------------

// Admin Login
export const adminLogin = createAsyncThunk(
  'admin/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/admin/login`, { email, password });
      console.log('Admin login response:', res.data);  // <=== check this
      // Save token and email to localStorage
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminEmail', res.data.email);
      localStorage.setItem('adminRole', 'admin');

      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      return {
        token: res.data.token,
        email: res.data.email,
        role: 'admin',
      };
    } catch (err) {
      console.log('Admin login error:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.msg || 'Invalid admin credentials');
    }
  }
);
// Fetch All Users
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;
      const res = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

// Fetch All Notes
export const fetchAllNotes = createAsyncThunk(
  'admin/fetchNotes',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;
      const res = await axios.get(`${API_URL}/notes/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch notes');
    }
  }
);

// -------------------- Slice --------------------

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    token: localStorage.getItem('adminToken') || null,
    email: localStorage.getItem('adminEmail') || null,
    role: localStorage.getItem('adminRole') || null,
    isAuthenticated: !!localStorage.getItem('adminToken'),
    users: [],
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {
    adminLogout: (state) => {
      state.token = null;
      state.email = null;
      state.role = null;
      state.isAuthenticated = false;
      state.users = [];
      state.notes = [];
      state.error = null;

      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminRole');
      delete axios.defaults.headers.common['Authorization'];
    },
    setAdminCredentials: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticated = true;

      axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
      localStorage.setItem('adminToken', action.payload.token);
      localStorage.setItem('adminEmail', action.payload.email);
      localStorage.setItem('adminRole', action.payload.role);
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Notes
      .addCase(fetchAllNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// -------------------- Exports --------------------

export const { adminLogout, setAdminCredentials } = adminSlice.actions;
export default adminSlice.reducer;

// Redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://note-vault-hiiy.onrender.com';

// Async Thunks

// 1. Admin Login
export const adminLogin = createAsyncThunk(
  'admin/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/admin/login`, { email, password });

      // Save token to localStorage for persistence
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminEmail', res.data.email);
      return res.data;
    } catch (err) {
      return rejectWithValue('Invalid admin credentials');
    }
  }
);

// 2. Get All Users
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      const res = await axios.get(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

// 3. Get All Notes
export const fetchAllNotes = createAsyncThunk(
  'admin/fetchNotes',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      const res = await axios.get(`${API_URL}/notes/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch notes');
    }
  }
);

// Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
      isAuthenticated: !!localStorage.getItem('adminToken'),
  token: localStorage.getItem('adminToken') || null,
  email: localStorage.getItem('adminEmail') || null,
    users: [],
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {
    adminLogout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.token = null;
      state.users = [];
      state.notes = [];
      state.error = null;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminEmail');
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
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.email = action.payload.email;
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

// Export reducer and actions
export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;

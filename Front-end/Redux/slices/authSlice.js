// Redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;
const API_URL = 'https://note-vault-hiiy.onrender.com';

// Login
export const login = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { username, password });
    return res.data;     // Yahan return karo taaki extraReducers me mile
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

// Register
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const res = await axios.put(`${API_URL}/user/update`, formData, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Profile update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
 initialState: {
  user: parsedUser,
  token: localStorage.getItem('token') || null,
  isAdmin: parsedUser?.role !== 'user' || false,
  loading: false,
  error: null,
  success: false,
},
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      state.error = null;
      state.success = false;
      // Clear localStorage too
  localStorage.removeItem('user');
  localStorage.removeItem('token');
    },
    setCredentials(state, action) {
      // Guard against undefined payloads
      if (action.payload) {
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.isAdmin = action.payload.role === 'admin';
      } else {
        state.user = null;
        state.token = null;
        state.isAdmin = false;
      }
    },
    resetAuthStatus(state) {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
 .addCase(login.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isAdmin = action.payload.user?.role !== 'user';

  // ✅ Save to localStorage
  localStorage.setItem('user', JSON.stringify(action.payload.user));
  localStorage.setItem('token', action.payload.token);
})
      // Register
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
        state.isAdmin = false;
        state.error = null;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload?.user || state.user;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;

// Redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://note-vault-hiiy.onrender.com';

// Admin Login
export const adminLogin = createAsyncThunk('admin/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/admin/login`, { email, password });
    return res.data;
  } catch (err) {
    return rejectWithValue('Invalid admin credentials');
  }
});

// Get All Users
export const fetchAllUsers = createAsyncThunk('admin/fetchUsers', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const res = await axios.get(`${API_URL}/admin/users`, config);
    return res.data;
  } catch (err) {
    return rejectWithValue('Failed to fetch users');
  }
});

// Change Admin Password
export const changeAdminPassword = createAsyncThunk('admin/changePassword', async (data, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const res = await axios.post(`${API_URL}/admin/change-password`, data, config);
    return res.data;
  } catch (err) {
    return rejectWithValue('Failed to change password');
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;

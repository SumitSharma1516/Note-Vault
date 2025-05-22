import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://note-vault-hiiy.onrender.com';

export const updateUser = createAsyncThunk('user/updateUser', async (formData, { getState, rejectWithValue }) => {
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
    return rejectWithValue('Update failed');
  }
});

export const getUserDetails = createAsyncThunk('user/getUserDetails', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const res = await axios.get(`${API_URL}/user/details`, config);
    return res.data;
  } catch (err) {
    return rejectWithValue('Failed to fetch user details');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = userSlice.actions;
export default userSlice.reducer;

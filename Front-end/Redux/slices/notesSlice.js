import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://note-vault-hiiy.onrender.com';

// ===== Thunks =====
export const uploadNote = createAsyncThunk(
  'notes/uploadNote',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/notes/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Upload failed');
    }
  }
);

export const fetchAllNotes = createAsyncThunk(
  'notes/fetchAllNotes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/notes/all`);
      console.log(res)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch notes');
    }
  }
);

export const fetchFilteredNotes = createAsyncThunk(
  'notes/fetchFilteredNotes',
  async ({ college, course, semester }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/notes/all`, {
        params: { college, course, semester },
      });
      return res.data.notes || res.data; // adjust based on API response
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch filtered notes');
    }
  }
);

export const fetchColleges = createAsyncThunk(
  'notes/fetchColleges',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/notes/filters`);
      return res.data.colleges || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch colleges');
    }
  }
);

export const fetchCourses = createAsyncThunk(
  'notes/fetchCourses',
  async (college, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/notes/filters`, {
        params: { college },
      });
      return res.data.courses || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch courses');
    }
  }
);

export const fetchSemesters = createAsyncThunk(
  'notes/fetchSemesters',
  async ({ college, course }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/notes/filters`, {
        params: { college, course },
      });
      return res.data.semesters || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch semesters');
    }
  }
);

// ===== Initial State =====
const initialState = {
  notes: [],
  loading: false,
  error: null,
  success: false,
  filters: {
    colleges: [],
    courses: [],
    semesters: [],
  },
  selected: {
    college: '',
    course: '',
    semester: '',
  },
  watchedNotes: [],
};

// ===== Slice =====
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetNoteStatus(state) {
      state.success = false;
      state.error = null;
    },
    setCollege(state, action) {
      state.selected.college = action.payload;
      state.selected.course = '';
      state.selected.semester = '';
      state.filters.courses = [];
      state.filters.semesters = [];
    },
    setCourse(state, action) {
      state.selected.course = action.payload;
      state.selected.semester = '';
      state.filters.semesters = [];
    },
    setSemester(state, action) {
      state.selected.semester = action.payload;
    },
    resetWatchedNotes(state) {
      state.watchedNotes = [];
    },
    addWatchedNote(state, action) {
      const note = action.payload;
      const exists = state.watchedNotes.find((n) => n._id === note._id);
      if (!exists) {
        state.watchedNotes.push(note);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload Note
      .addCase(uploadNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadNote.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notes.push(action.payload);
      })
      .addCase(uploadNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Notes
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
      })

      // Fetch Filtered Notes
      .addCase(fetchFilteredNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchFilteredNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Colleges
      .addCase(fetchColleges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.loading = false;
        state.filters.colleges = action.payload;
      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.filters.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Semesters
      .addCase(fetchSemesters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSemesters.fulfilled, (state, action) => {
        state.loading = false;
        state.filters.semesters = action.payload;
      })
      .addCase(fetchSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ===== Exports =====
export const {
  resetNoteStatus,
  setCollege,
  setCourse,
  setSemester,
  resetWatchedNotes,
  addWatchedNote,
} = notesSlice.actions;

export {
  fetchFilteredNotes as fetchNotes, // alias for clarity if needed
};

export default notesSlice.reducer;

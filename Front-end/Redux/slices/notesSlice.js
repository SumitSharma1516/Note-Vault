import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

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
      return rejectWithValue(err.response.data.message || 'Upload failed');
    }
  }
);

export const fetchAllNotes = createAsyncThunk(
  'notes/fetchAllNotes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/notes/all`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Failed to fetch notes');
    }
  }
);

export const fetchFilteredNotes = createAsyncThunk(
  'notes/fetchFilteredNotes',
  async ({ college, course, semester }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/notes/filters`, {
        params: { college, course, semester },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Failed to fetch filtered notes');
    }
  }
);

export const fetchColleges = createAsyncThunk(
  'notes/fetchColleges',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/notes/filters`);
      return res.data.colleges;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Failed to fetch colleges');
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
      return res.data.courses;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Failed to fetch courses');
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
      return res.data.semesters;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Failed to fetch semesters');
    }
  }
);


// ===== Initial State =====
const initialState = {
  notes: [],
  loading: false,
  error: null,
  success: false,
  college: '',
  course: '',
  semester: '',
  colleges: [],
  courses: [],
  semesters: [],
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
      state.college = action.payload;
      state.course = '';
      state.semester = '';
    },
    setCourse(state, action) {
      state.course = action.payload;
      state.semester = '';
    },
    setSemester(state, action) {
      state.semester = action.payload;
    },
    resetWatchedNotes(state) {
      state.notes = [];
    },
    addWatchedNote(state, action) {
      const note = action.payload;
      const exists = state.notes.find((n) => n._id === note._id);
      if (!exists) {
        state.notes.push(note);
      }
    },
  },
  extraReducers: (builder) => {
    builder
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

      .addCase(fetchColleges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.loading = false;
        state.colleges = action.payload;
      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSemesters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSemesters.fulfilled, (state, action) => {
        state.loading = false;
        state.semesters = action.payload;
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
  fetchFilteredNotes as fetchNotes,
};

export default notesSlice.reducer;

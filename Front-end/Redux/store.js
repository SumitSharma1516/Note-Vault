import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import notesReducer from './slices/notesSlice';
import adminReducer from './slices/adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    notes: notesReducer,
    admin: adminReducer,
  },
});

export default store;

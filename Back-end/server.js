const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');
const adminRoutes = require('./routes/admin');
const cors = require('cors');
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

//Test route
app.get('/',(req,res)=>{res.send('NoteVualt API is working')})

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/auth', require('./routes/auth'));
app.use('/auth', require('./routes/auth'));     // /auth/register, /auth/login
app.use('/user', require('./routes/user'));     // /user/update, /user/dashboard
app.use('/admin', require('./routes/admin'));   // /admin/login
app.use('/notes', require('./routes/note'));    // /notes/upload, /notes/all, /notes/filters


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

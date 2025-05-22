const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');
const adminRoutes = require('./routes/admin');
dotenv.config();
// Connect to MongoDB
connectDB();
const app = express();
// .env file mein MONGO_URI hona chahiye
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Create upload folder if missing
const uploadDir = path.join(__dirname, '/uploads/profile_photos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created uploads/profile_photos folder');
}

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'notes') {
      cb(null, './uploads/notes');
    } else if (file.fieldname === 'photo') {
      cb(null, './uploads/photos');
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === 'notes') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files allowed for notes'), false);
      }
    } else if (file.fieldname === 'photo') {
      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error('Only images (jpeg, jpg, png) are allowed'), false);
      }
    } else {
      cb(new Error('Invalid field'), false);
    }
  }
});

const uploadFolders = [
  path.join(__dirname, '/uploads/notes'),
  path.join(__dirname, '/uploads/photos'),
  path.join(__dirname, '/uploads/profile_photos')
];

uploadFolders.forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`✅ Created folder: ${folder}`);
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder setup - yeh line zaroor add karein
app.use('/files/uploads/notes', express.static(path.join(__dirname, 'uploads/notes')));
app.use('/uploads/photos', express.static(path.join(__dirname, '/uploads/photos')));
app.use('/uploads/profile_photos', express.static(path.join(__dirname, '/uploads/profile_photos')));

// Simple test route
app.get('/', (req, res) => {
  res.send('NoteVault API is working');
});

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://note-vault-woad.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Allow server-to-server or Postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  credentials: true,
}));

// Trust proxy if behind load balancer or HTTPS proxy (Render uses this)
app.set('trust proxy', 1)
// User update route: username, password (optional), photo upload (optional)
app.post('/user/update', upload.single('photo'), (req, res) => {
  try {
    const { username, password } = req.body;
    let photoFilename = null;
    if (req.file) {
      photoFilename = req.file.filename;
    }
    // For demonstration, just respond back with received data:
    res.json({
      message: 'Profile updated',
      username,
      // password: password ? 'updated' : 'unchanged',
      photo: photoFilename,
      photoUrl: photoFilename ? `${req.protocol}://${req.get('host')}/uploads/profile_photos/${photoFilename}` : null
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


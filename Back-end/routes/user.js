const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const { getDashboard, updateProfile,getUserDetails } = require('../controllers/userController');

// Multer setup for profile photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile_photos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Get user dashboard stats (protected)
router.get('/dashboard', auth, getDashboard);

// Update user profile with optional photo upload (protected)
router.put('/update', auth, upload.single('photo'), updateProfile);

router.get('/details', auth, getUserDetails);

module.exports = router;

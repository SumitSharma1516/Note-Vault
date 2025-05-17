const express = require('express');
const router = express.Router();
const { getAllUsers, getAllNotes,adminLogin } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Note = require('../models/Note');
const adminAuth = require('../middleware/adminAuth');

router.post('/login', adminLogin);

// Protected route to get all users (only accessible with a valid token)
router.get('/users', auth, getAllUsers);

// Protected route to get all notes (only accessible with a valid token)
router.get('/notes', auth, getAllNotes);

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude passwords
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete user by ID
router.delete('/users/:userId', adminAuth, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    // Optionally, delete all notes uploaded by this user
    await Note.deleteMany({ uploadedBy: userId });

    res.json({ message: 'User and related notes deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const adminAuth = require('../middleware/adminAuth');
const { uploadNotes, getAllNotes, getAdminFilteredNotes, getFilters, incrementWatchCount, incrementDownloadCount } = require('../controllers/noteController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
router.post('/upload', auth, upload.single('file'), uploadNotes);

// Public routes
router.get('/filters', getFilters);
router.get('/all', getAllNotes);

// Admin protected routes
router.get('/admin', adminAuth, getAdminFilteredNotes);

// New endpoints
router.get('/watch/:id', incrementWatchCount);
router.get('/download/:id', incrementDownloadCount);

// Get all notes (admin view)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const notes = await Note.find().populate('uploadedBy', 'fullName username');
    const notesWithUploader = notes.map(note => ({
      ...note._doc,
      uploadedByName: note.uploadedBy ? note.uploadedBy.fullName || note.uploadedBy.username : 'Unknown',
    }));
    res.json(notesWithUploader);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete note by ID
router.delete('/:noteId', adminAuth, async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

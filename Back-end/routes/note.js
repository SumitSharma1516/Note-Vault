const express = require('express');
const router = express.Router();
const { uploadNotes,getAllNotes, getFilteredNotes } = require('../controllers/noteController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // make sure this folder exists
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });


router.post('/upload', auth, upload.single('file'), uploadNotes);
router.get('/all', getAllNotes);                  // admin gets all notes
router.get('/filters', getFilteredNotes);         // public filtered view

module.exports = router;

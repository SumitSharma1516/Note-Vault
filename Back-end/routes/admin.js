const express = require('express');
const router = express.Router();
const { getAllUsers, getAllNotes,adminLogin } = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/login', adminLogin);

// Protected route to get all users (only accessible with a valid token)
router.get('/users', auth, getAllUsers);

// Protected route to get all notes (only accessible with a valid token)
router.get('/notes', auth, getAllNotes);

module.exports = router;

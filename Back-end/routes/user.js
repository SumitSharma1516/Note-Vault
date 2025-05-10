const express = require('express');
const router = express.Router();
const { updateProfile, getDashboard } = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require("../middleware/upload")
router.put('/update', auth, upload.single('photo'), updateProfile);
router.get('/dashboard', auth, getDashboard);

module.exports = router;

const express = require('express');
const router = express.Router();
const { updateProfile, getDashboard } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.put('/update', auth, updateProfile);
router.get('/dashboard', auth, getDashboard);

module.exports = router;

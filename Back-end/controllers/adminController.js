const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Note = require('../models/Note');

// Static admin credentials (hardcoded)
const ADMIN_EMAIL = 'Sumitshar2452@gmail.com';
const ADMIN_PASSWORD = 'Sharmaji1436';

// Admin Login Controller
exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  // Check if the provided email and password match the static admin credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Create a JWT token
    const token = jwt.sign({ email: ADMIN_EMAIL, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      msg: 'Admin logged in successfully',
      token,
    });
  } else {
    return res.status(401).json({
      msg: 'Invalid email or password',
    });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get All Notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

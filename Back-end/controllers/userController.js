const User = require('../models/User');
const Note = require('../models/Note');
const bcrypt = require('bcryptjs');


// Get User Dashboard Stats
exports.getDashboard = async (req, res) => {
  try {
    // Fetch all notes uploaded by the user
    const notes = await Note.find({ uploadedBy: req.user.id });
    //  res.json(notes)
    // console.log('Fetched Notes:', notes);
    if (notes.length === 0) {
      return res.json({ notes: 0, watchCount: 0, downloadCount: 0 });
    }

    // Calculate watchCount and downloadCount
    const watchCount = notes.reduce((acc, note) => acc + note.watchCount, 0);
    const downloadCount = notes.reduce((acc, note) => acc + note.downloadCount, 0);

    // Return the dashboard stats
    res.json({ notes: notes.length, watchCount, downloadCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Update User Profile
exports.updateProfile = async (req, res) => {
  const { username, password } = req.body;
  const photo = req.file;

  try {
    // Find existing user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update only the provided fields
    if (username) user.username = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (photo) user.photo = photo.filename;

    // Save only updated fields, keeping rest safe
    await user.save();

    res.json({ msg: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get User Details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
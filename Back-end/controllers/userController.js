const User = require('../models/User');
const Note = require('../models/Note');

// Update User Profile
exports.updateProfile = async (req, res) => {
  const { username, password, photo } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (username) user.username = username;
    if (password) user.password = password;
    if (photo) user.photo = photo;

    await user.save();
    res.json({ msg: 'Profile updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get User Dashboard Stats
exports.getDashboard = async (req, res) => {
  try {
    const notes = await Note.find({ uploadedBy: req.user.id });
    const watchCount = notes.reduce((acc, note) => acc + note.watchCount, 0);
    const downloadCount = notes.reduce((acc, note) => acc + note.downloadCount, 0);
    res.json({ notes: notes.length, watchCount, downloadCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

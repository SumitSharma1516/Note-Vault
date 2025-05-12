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

// Example of incrementing watchCount when note is viewed
exports.incrementWatchCount = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Increment the watch count
    note.watchCount += 1;

    // Save the updated note
    await note.save();

    res.json({ msg: 'Watch count updated successfully', note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Example of incrementing downloadCount when note is downloaded
exports.incrementDownloadCount = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Increment the download count
    note.downloadCount += 1;

    // Save the updated note
    await note.save();

    res.json({ msg: 'Download count updated successfully', note });
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
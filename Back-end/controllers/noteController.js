const Note = require('../models/Note');

// Upload Notes
exports.uploadNotes = async (req, res) => {
  const { title, description, college, course, semester } = req.body;
  const file = req.file;
  
  try {
    const newNote = new Note({
      title,
      description,
      college,
      course,
      semester,
      fileUrl: file.filename,
      uploadedBy: req.user._id
    });

    await newNote.save();
    res.json({ msg: 'Note uploaded successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin: Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('uploadedBy', 'username');
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Public: Filter notes by college, course, semester
exports.getFilteredNotes = async (req, res) => {
  const { college, course, semester } = req.query;

  try {
    const query = {};
    if (college) query.college = college;
    if (course) query.course = course;
    if (semester) query.semester = semester;

    const notes = await Note.find(query).populate('uploadedBy', 'username');
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Public: Get distinct filters for dropdowns
exports.getFilters = async (req, res) => {
  try {
    const colleges = await Note.distinct("college");
    const courses = await Note.distinct("course");
    const semesters = await Note.distinct("semester");

    res.json({ colleges, courses, semesters });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to load filters' });
  }
};

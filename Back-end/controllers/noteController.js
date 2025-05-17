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


// Public API (No auth, for users)

exports.getFilters = async (req, res) => {
  try {
    const { college, course } = req.query;

    const cleanArray = arr => [...new Set(arr.map(v => v.trim()))];

    // Always get all colleges for first dropdown
    const colleges = await Note.distinct("college");

    let courses = [];
    let semesters = [];

    // If college is selected, get courses for that college
    if (college) {
      courses = await Note.find({ college: { $regex: `^${college.trim()}$`, $options: 'i' } }).distinct("course");
    }

    // If college & course both selected, get semesters for that combination
    if (college && course) {
      semesters = await Note.find({
        college: { $regex: `^${college.trim()}$`, $options: 'i' },
        course: { $regex: `^${course.trim()}$`, $options: 'i' }
      }).distinct("semester");
    }

    res.json({
      colleges: cleanArray(colleges),
      courses: cleanArray(courses),
      semesters: cleanArray(semesters),
    });
  } catch (err) {
    console.error("Filter fetch error:", err.message);
    res.status(500).json({ message: 'Failed to load filters' });
  }
};

// GET /notes/all

exports.getAllNotes = async (req, res) => {
  try {
    const { college, course, semester } = req.query;

    const filter = {};
    if (college) filter.college = { $regex: `^${college.trim()}$`, $options: 'i' };
    if (course) filter.course = { $regex: `^${course.trim()}$`, $options: 'i' };
    if (semester) filter.semester = { $regex: `^${semester.trim()}$`, $options: 'i' };

    const notes = await Note.find(filter).populate('uploadedBy', 'username');

    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// GET /admin/notes

exports.getAdminFilteredNotes = async (req, res) => {
  const { college, course, semester } = req.query;

  try {
    const query = {};
    if (college) query.college = { $regex: `^${college.trim()}$`, $options: 'i' };
    if (course) query.course = { $regex: `^${course.trim()}$`, $options: 'i' };
    if (semester) query.semester = { $regex: `^${semester.trim()}$`, $options: 'i' };

    const notes = await Note.find(query).populate('uploadedBy', 'username');

    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Increment watch count when user views a note
exports.incrementWatchCount = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }
    note.watchCount += 1;
    await note.save();
    res.json({ msg: 'Watch count updated successfully', note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Increment download count when user downloads a note
exports.incrementDownloadCount = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }
    note.downloadCount += 1;
    await note.save();
    res.json({ msg: 'Download count updated successfully', note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

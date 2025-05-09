const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  watchCount: { type: Number, default: 0 },
  downloadCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 fullName: { type: String, required: true },
 email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
 mobile: { type: String, required: true },
 dob: { type: Date, required: true },
  password: { type: String, required: true },
 photo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Registration
exports.register = async (req, res) => {
  const { fullName, email, username, mobile, dob, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      username,
      mobile,
      dob,
      password: hashedPassword
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ msg:'User Register',token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// User Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
  msg: 'User Login',
  token: token,
  user: {
    id: user._id,
    name: user.name,
    username: user.username,
    role: "user",      // admin ya user
    profilePic: user.photo || null,
  }
});;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

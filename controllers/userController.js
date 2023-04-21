const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getRegister = (req, res) => {
  res.render('users/register');
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.redirect('/users/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getLogin = (req, res) => {
  res.render('users/login');
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render('users/login', { error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render('users/login', { error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.redirect('/users/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

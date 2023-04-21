const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.session.token || '';

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    req.flash('error', 'Invalid token');
    res.redirect('/users/login');
  }
};

module.exports = { generateToken, verifyToken };

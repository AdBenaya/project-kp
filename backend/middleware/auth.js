// backend/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware untuk melindungi route
const protect = async (req, res, next) => {
  let token;

  // Memeriksa header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Mengambil token dari header
    console.log('Token:', token);

    try {
      // Memverifikasi token dengan JWT_SECRET yang benar
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      console.log('Decoded Token:', decoded);

      // Mencari pengguna berdasarkan ID yang terdecode
      req.user = await User.findById(decoded.user.id).select('-password'); // Pastikan decoded.user.id sesuai dengan payload
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      console.log('Authenticated User:', req.user);
      next(); // Melanjutkan ke middleware berikutnya
    } catch (error) {
      console.error('Authentication Error:', error.message || error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('No Token Found');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware untuk memeriksa peran admin
const admin = (req, res, next) => {
  console.log('Checking Admin Role:', req.user.role);
  if (req.user && req.user.role === 'admin') {
    next(); // Melanjutkan jika pengguna adalah admin
  } else {
    console.log('User is not admin');
    return res.status(403).json({ message: 'Not authorized as an admin' }); // Mengembalikan kesalahan jika bukan admin
  }
};

module.exports = { protect, admin };
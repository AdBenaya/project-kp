const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Rute registrasi
router.post('/register', asyncHandler(async (req, res) => {
    const { nama, nik, noTelpon, email, password, gender, address } = req.body;

    // Cek apakah email sudah terdaftar
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Cek apakah NIK sudah terdaftar
    user = await User.findOne({ nik });
    if (user) {
        return res.status(400).json({ message: 'NIK sudah terdaftar' });
    }

    // Buat instance baru dari user
    user = new User({
        name: nama, // Sesuaikan dengan field 'name' di model
        nik,
        noTelpon,
        email,
        password,
        gender,  // Tambahkan gender
        address,  // Tambahkan alamat
    });

    // Hash password sebelum menyimpan
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Buat token JWT
    const token = jwt.sign(
        { user: { id: user._id, role: user.role } },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '1h' }
    );

    res.status(201).json({ token });
}));

// Rute login
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Buat token JWT
    const token = jwt.sign(
        { user: { id: user._id, role: user.role } },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '24h' }
    );

    res.json({ token });
}));

module.exports = router;


// // backend/routes/auth.js

// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const asyncHandler = require('express-async-handler');

// // Rute login
// router.post('/login', asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     // Cari pengguna berdasarkan email
//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Cek password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Buat token menggunakan JWT_SECRET
//     const token = jwt.sign(
//         { user: { id: user._id, role: user.role } }, // Payload
//         process.env.JWT_SECRET || 'secretkey', // Kunci rahasia
//         { expiresIn: '1h' } // Waktu kedaluwarsa token
//     );

//     res.json({ token });
// }));

// module.exports = router;

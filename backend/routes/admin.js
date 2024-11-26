// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Complaints = require('../models/Complaints'); // Pastikan model Complaints ada

// Middleware untuk memeriksa peran admin
function adminAuth(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
}

// Mendapatkan Semua Pengaduan (Hanya Admin)
router.get('/complaints', auth, adminAuth, async (req, res) => {
    try {
        const complaints = await Complaints.find().populate('user', ['nama', 'email']);
        res.json(complaints); // Mengubah dari pengaduan ke complaints
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Mengupdate Status Pengaduan (Hanya Admin)
router.put('/complaints/:id', auth, adminAuth, async (req, res) => {
    const { status } = req.body;
    try {
        let complaint = await Complaints.findById(req.params.id); // Mengubah dari Pengaduan ke Complaints
        if (!complaint) return res.status(404).json({ msg: 'Pengaduan tidak ditemukan' });

        complaint.status = status;
        await complaint.save();
        res.json(complaint);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Menanggapi Pengaduan (Hanya Admin)
router.post('/complaints/:id/tanggapan', auth, adminAuth, async (req, res) => {
    const { tanggapan } = req.body;
    try {
        let complaint = await Complaints.findById(req.params.id); // Mengubah dari Pengaduan ke Complaints
        if (!complaint) return res.status(404).json({ msg: 'Pengaduan tidak ditemukan' });

        complaint.tanggapan = tanggapan;
        complaint.status = 'ditanggapi';
        await complaint.save();
        res.json(complaint);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

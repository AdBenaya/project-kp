const multer = require('multer');
const path = require('path');

// Menentukan lokasi penyimpanan file dan nama file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder penyimpanan file
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nama file unik
  },
});

// Filter untuk memastikan hanya jenis file tertentu yang diterima
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung. Hanya menerima file gambar.'), false);
  }
};

// Membuat middleware untuk mengunggah file
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Maksimal file 10MB
  fileFilter,
});

module.exports = upload;



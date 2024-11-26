const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth');
const complaintsRoutes = require('./routes/complaints');

dotenv.config(); // Pastikan ini ada sebelum menggunakan variabel lingkungan

const app = express();

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware CSP untuk mengizinkan konten dari sumber yang sesuai
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " + 
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " + 
    "style-src 'self' 'unsafe-inline'; " + 
    "img-src 'self' http://localhost:5000; " + 
    "font-src 'self'; " + 
    "connect-src 'self' http://localhost:5000; " + 
    "object-src 'none'; " + 
    "base-uri 'self';"
  );
  next();
});

// Middleware untuk membuat folder 'uploads' dapat diakses
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware lainnya
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintsRoutes);

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is Connected'))
  .catch(err => console.log(err));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Something went wrong!',
  });
});
// Menyajikan file statis dari folder 'uploads'
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));



// // backend/server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const complaintsRoutes = require('./routes/complaints');

// dotenv.config(); // Pastikan ini ada sebelum menggunakan variabel lingkungan

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/complaints', complaintsRoutes);

// // Koneksi ke MongoDB
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB is Connected'))
//     .catch(err => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));

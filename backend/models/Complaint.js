const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ComplaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved'],
    default: 'pending',
  },
  response: {
    type: String,
    trim: true,
  },
  companyName: {
    type: String,
    required: false,
    trim: true,
  },
  documentation: {
    type: String, // Menyimpan path file foto dokumentasi
    required: false, // Atur ke true jika wajib diisi
    trim: true,
  },
}, { timestamps: true });  // Menambahkan timestamps (createdAt dan updatedAt)

// Menambahkan plugin pagination
ComplaintSchema.plugin(mongoosePaginate);

// Menambahkan method untuk mendapatkan URL foto jika dokumentasi tersedia
ComplaintSchema.methods.getDocumentationUrl = function () {
  if (this.documentation) {
    // Asumsikan file disimpan di folder 'uploads'
    return `/uploads/${this.documentation}`;
  }
  return null; // Jika tidak ada dokumentasi
};

module.exports = mongoose.model('Complaint', ComplaintSchema);


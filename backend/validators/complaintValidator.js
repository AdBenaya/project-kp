// backend/validators/complaintValidator.js

const Joi = require('joi');

// Skema validasi untuk membuat pengaduan
const createComplaintSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  companyName: Joi.string().optional(), // Menambahkan companyName sebagai optional
  documentation: Joi.string().optional(), // Menambahkan documentation sebagai optional
});

// Skema validasi untuk memperbarui pengaduan
const updateComplaintSchema = Joi.object({
  status: Joi.string().valid('pending', 'in_progress', 'resolved'),
  response: Joi.string().min(10),
  companyName: Joi.string().optional(), // Menambahkan companyName sebagai optional
  documentation: Joi.string().optional(), // Menambahkan documentation sebagai optional
});

module.exports = { createComplaintSchema, updateComplaintSchema };


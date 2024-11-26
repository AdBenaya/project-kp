const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    nik: {
        type: String,
        required: true,
        unique: true,
    },
    noTelpon: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: { // Field gender baru
        type: String,
        required: true,
    },
    address: { // Field alamat baru
        type: String,
        required: true,
    },
  
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);







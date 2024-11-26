const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        const user = await User.findOne({ email: 'ade@gmail.com' });

        if (user) {
            if (!user.name) {
                user.name = 'Adelce'; // Ganti dengan nama yang sesuai
            }
            user.role = 'admin';
            await user.save();
            console.log('Pengguna berhasil dijadikan admin:', user);
        } else {
            console.log('Pengguna tidak ditemukan.');
        }

        mongoose.disconnect();
    })
    .catch(err => console.log(err));

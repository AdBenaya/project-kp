import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        nik: '',
        noTelpon: '',
        gender: '',
        address: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { nama, email, password, nik, noTelpon, gender, address } = formData;

    const onChange = (e) => {
        if (errorMessage) setErrorMessage('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err);
            setErrorMessage(err.response?.data.msg || 'Registrasi Gagal');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Registrasi Akun</h2>

                {errorMessage && (
                    <p className="text-red-500 text-center bg-red-100 p-2 rounded mb-4">
                        {errorMessage}
                    </p>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            name="nama"
                            value={nama}
                            onChange={onChange}
                            placeholder="Masukkan nama lengkap"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
                            NIK
                        </label>
                        <input
                            type="text"
                            name="nik"
                            value={nik}
                            onChange={onChange}
                            placeholder="Masukkan NIK"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="noTelpon" className="block text-sm font-medium text-gray-700">
                            No. Telepon
                        </label>
                        <input
                            type="tel"
                            name="noTelpon"
                            value={noTelpon}
                            onChange={onChange}
                            placeholder="Masukkan nomor telepon"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={gender}
                            onChange={onChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled>
                                Pilih gender
                            </option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Alamat
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={onChange}
                            placeholder="Masukkan alamat"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Masukkan email"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Masukkan password"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Daftar
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Sudah punya akun?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login di sini
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;






// frontend/src/pages/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Menggunakan default import
import { AuthContext } from '../context/AuthContext'; // Asumsikan Anda menggunakan AuthContext

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // State untuk pesan kesalahan
    const [loading, setLoading] = useState(false); // State untuk loading

    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Menggunakan AuthContext

    const { email, password } = formData;

    const onChange = e => {
        // Menghapus pesan kesalahan saat pengguna mulai mengetik
        if (errorMessage) setErrorMessage('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true); // Set loading ke true saat proses login dimulai

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData);
            localStorage.setItem('token', res.data.token);
            
            // Decode token untuk mendapatkan role
            const decoded = jwtDecode(res.data.token);
            console.log("Decoded token:", decoded); // Log decoded token untuk debugging

            // Simpan informasi pengguna ke AuthContext
            login(res.data.token);

            if (decoded.user && decoded.user.role === 'admin') {
                navigate('/admin-dashboard'); // Redirect ke Admin Dashboard
            } else {
                navigate('/submit-complaint'); // Redirect ke halaman pengaduan
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response) {
                console.error('Response data:', err.response.data);
                setErrorMessage(err.response.data.message || 'Login failed, please try again.');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false); // Set loading ke false setelah proses selesai
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Tampilkan pesan kesalahan */}
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading} // Disable tombol saat loading
                    >
                        {loading ? 'Logging in...' : 'Login'} {/* Tampilkan teks loading */}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

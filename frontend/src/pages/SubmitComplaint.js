import React, { useState } from 'react';
import axios from 'axios';

const SubmitComplaint = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        companyName: '',
        documentation: null,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Tambahkan state untuk pesan sukses

    const { title, description, companyName, documentation } = formData;

    const onChange = e => {
        if (errorMessage) setErrorMessage('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFileChange = e => {
        setFormData({ ...formData, documentation: e.target.files[0] });
    };

    const onSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            setErrorMessage('Anda harus login terlebih dahulu');
            return;
        }

        if (!title || !description || !companyName) {
            setErrorMessage('Judul, deskripsi, dan nama perusahaan wajib diisi.');
            return;
        }

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('title', title);
        formDataToSubmit.append('description', description);
        formDataToSubmit.append('companyName', companyName);
        if (documentation) formDataToSubmit.append('documentation', documentation);

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/complaints`,
                formDataToSubmit,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setSuccessMessage(`Pengaduan berhasil diajukan dengan ID: ${res.data._id}`);
            setFormData({ title: '', description: '', companyName: '', documentation: null }); // Reset form
        } catch (err) {
            console.error('Error submitting complaint:', err.response?.data || err);
            setErrorMessage(err.response?.data?.message || 'Gagal mengirim pengaduan. Silakan coba lagi.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Ajukan Pengaduan</h2>
                {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Judul Pengaduan</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Deskripsi Pengaduan</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nama Perusahaan</label>
                        <input
                            type="text"
                            name="companyName"
                            value={companyName}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Dokumentasi</label>
                        <input
                            type="file"
                            name="documentation"
                            onChange={onFileChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                    >
                        Kirim Pengaduan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitComplaint;


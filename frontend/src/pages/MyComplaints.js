import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token tidak ditemukan. Silakan login ulang.');
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/complaints`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // Menyesuaikan dengan struktur respons yang diharapkan
                setComplaints(res.data || []);  // Sesuaikan jika struktur data berbeda
            } catch (err) {
                console.error(err.response?.data || err);
                setError(err.response?.data?.message || 'Gagal mengambil data pengaduan');
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    if (loading) {
        return <div className="text-center">Memuat data...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-6">Pengaduan Saya</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Judul</th>
                            <th className="py-2 px-4 border-b">Deskripsi</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Nama Perusahaan</th>
                            <th className="py-2 px-4 border-b">Dokumentasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.length > 0 ? (
                            complaints.map((c) => (
                                <tr key={c._id}>
                                    <td className="py-2 px-4 border-b">{c.title}</td>
                                    <td className="py-2 px-4 border-b">{c.description}</td>
                                    <td className="py-2 px-4 border-b">{c.status}</td>
                                    <td className="py-2 px-4 border-b">{c.companyName}</td>
                                    <td className="py-2 px-4 border-b">
                                        {c.documentation && (
                                            <a href={c.documentation} target="_blank" rel="noopener noreferrer">
                                                Lihat Dokumentasi
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-2 px-4 border-b text-center">Tidak ada pengaduan ditemukan</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyComplaints;

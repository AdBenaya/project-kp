import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LaporanTerdisposisi = () => {
  const [complaints, setComplaints] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ status: 'resolved', response: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const complaintsPerPage = 3; // Menentukan jumlah pengaduan per halaman

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`/api/complaints?status=in_progress&page=${currentPage}&limit=${complaintsPerPage}`);
        if (res.data && Array.isArray(res.data.docs)) {
          // Urutkan pengaduan berdasarkan tanggal (createdAt) secara ascending
          const sortedComplaints = res.data.docs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setComplaints(sortedComplaints);
          setTotalPages(res.data.totalPages);
        } else {
          setComplaints([]);
        }
      } catch (error) {
        setError('Gagal mengambil data pengaduan.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [currentPage]);

  const handleSelect = (complaint) => {
    setSelected(complaint);
    setForm({ status: 'resolved', response: complaint.response || '' });
    setMessage('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/complaints/${selected._id}`, form);
      setMessage('Pengaduan diselesaikan');
      // Refresh complaints setelah update
      const res = await axios.get(`/api/complaints?status=in_progress&page=${currentPage}&limit=${complaintsPerPage}`);
      if (res.data && Array.isArray(res.data.docs)) {
        const sortedComplaints = res.data.docs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setComplaints(sortedComplaints);
      } else {
        setComplaints([]);
      }
      setSelected(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating complaint');
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Laporan Terdisposisi</h2>
      {message && <div className="bg-green-200 text-green-700 p-2 mb-4">{message}</div>}

      <div className="flex justify-between mb-4">
        <div className="text-right">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Cetak Laporan
          </button>
        </div>
        <div className="flex">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg mr-2"
          >
            Prev
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg ml-2"
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 mr-4">
          <h3 className="text-xl mb-2">Daftar Pengaduan Terdisposisi</h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Pengguna</th>
                <th className="px-4 py-2">Perusahaan</th>
                <th className="px-4 py-2">Deskripsi</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length > 0 ? (
                complaints.map((complaint, index) => (
                  <tr key={complaint._id} className="text-center">
                    <td className="border px-4 py-2">
                      {(currentPage - 1) * complaintsPerPage + index + 1}
                    </td>
                    <td className="border px-4 py-2">{complaint.title}</td>
                    <td className="border px-4 py-2">{complaint.user ? complaint.user.name : 'Tidak ada pengguna'}</td>
                    <td className="border px-4 py-2">{complaint.companyName || 'Tidak ada perusahaan'}</td>
                    <td className="border px-4 py-2">{complaint.description || 'Tidak ada deskripsi'}</td>
                    <td className="border px-4 py-2">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleSelect(complaint)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Selesaikan
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="border px-4 py-2 text-center">Tidak ada laporan terdisposisi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="w-1/2">
            <h3 className="text-xl mb-2">Selesaikan Pengaduan</h3>
            <form onSubmit={handleUpdate} className="flex flex-col">
              <textarea
                name="response"
                placeholder="Respon"
                value={form.response}
                onChange={handleChange}
                className="mb-2 p-2 border rounded"
                required
              ></textarea>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="mb-2 p-2 border rounded"
                required
              >
                <option value="resolved">Resolved</option>
              </select>
              <button type="submit" className="bg-green-500 text-white p-2 rounded">Selesaikan</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaporanTerdisposisi;


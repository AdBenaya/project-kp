import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LaporanSelesai = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 5; // Jumlah laporan per halaman

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('/api/complaints?status=resolved');
        if (res.data && Array.isArray(res.data.docs)) {
          // Urutkan berdasarkan tanggal laporan pertama
          const sortedComplaints = res.data.docs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setComplaints(sortedComplaints);
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
  }, []);

  // Hitung indeks laporan yang akan ditampilkan di halaman saat ini
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = complaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  // Fungsi untuk berpindah halaman
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(complaints.length / complaintsPerPage);

  // Fungsi cetak laporan
  const handlePrint = () => {
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
      <html>
        <head>
          <title>Laporan Pengaduan Selesai</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h2, h3 { text-align: center; }
            @media print {
              body { margin: 0; padding: 0; }
            }
          </style>
        </head>
        <body>
          <h2>Laporan Pengaduan Selesai</h2>
          <h3>Daftar Pengaduan Selesai</h3>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Pengguna</th>
                <th>Tanggal</th>
                <th>Respon</th>
              </tr>
            </thead>
            <tbody>
              ${complaints.map((complaint, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${complaint.title}</td>
                  <td>${complaint.user ? complaint.user.name : 'Tidak ada pengguna'}</td>
                  <td>${new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td>${complaint.response || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    window.print();
    document.body.innerHTML = originalContent;
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Laporan Selesai</h2>
      <div className="flex">
        <div className="w-full mr-4">
          <h3 className="text-xl mb-2">Daftar Pengaduan Selesai</h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Pengguna</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Respon</th>
              </tr>
            </thead>
            <tbody>
              {currentComplaints.length > 0 ? (
                currentComplaints.map((complaint, index) => (
                  <tr key={complaint._id} className="text-center">
                    <td className="border px-4 py-2">{indexOfFirstComplaint + index + 1}</td>
                    <td className="border px-4 py-2">{complaint.title}</td>
                    <td className="border px-4 py-2">{complaint.user ? complaint.user.name : 'Tidak ada pengguna'}</td>
                    <td className="border px-4 py-2">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{complaint.response || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">Tidak ada laporan selesai.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="text-center mt-4">
            <button 
              onClick={handlePrint} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Cetak Laporan
            </button>
          </div>

          {/* Pagination controls */}
          <div className="text-center mt-4">
            <button 
              disabled={currentPage === 1} 
              onClick={() => handlePageChange(currentPage - 1)} 
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded mx-1"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
              >
                {index + 1}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => handlePageChange(currentPage + 1)} 
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded mx-1"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanSelesai;


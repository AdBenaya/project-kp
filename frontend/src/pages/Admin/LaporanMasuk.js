import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LaporanMasuk = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 3; // Jumlah laporan per halaman

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('/api/complaints');
        if (Array.isArray(res.data.docs)) {
          // Urutkan berdasarkan waktu pembuatan dari yang pertama kali dibuat
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
          <title>Laporan Pengaduan Masuk</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h2, h3 { text-align: center; }
            img { max-width: 100px; max-height: 100px; }
            @media print {
              body { margin: 0; padding: 0; }
              img { max-width: 200px; max-height: 200px; }
            }
          </style>
        </head>
        <body>
          <h2>Laporan Pengaduan Masuk</h2>
          <h3>Daftar Pengaduan</h3>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Judul Pengaduan</th>
                <th>Nama</th>
                <th>Nama Perusahaan</th>
                <th>Deskripsi</th>
                <th>Dokumentasi</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              ${complaints.map((complaint, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${complaint.title}</td>
                  <td>${complaint.user ? complaint.user.name : 'Tidak ada pengguna'}</td>
                  <td>${complaint.companyName || 'Tidak ada perusahaan'}</td>
                  <td>${complaint.description}</td>
                  <td>${complaint.documentation ? `<img src="${process.env.REACT_APP_BASE_URL}/${complaint.documentation}" alt="Dokumentasi" />` : 'Tidak ada dokumentasi'}</td>
                  <td>${new Date(complaint.createdAt).toLocaleDateString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    window.print();
    document.body.innerHTML = originalContent;
    // window.location.reload(); // Refresh untuk mengembalikan ke halaman semula
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="dashboard flex flex-col p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Laporan Masuk</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">Total Laporan: {complaints.length}</p>
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Cetak Laporan
        </button>
      </div>
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Judul</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Perusahaan</th>
              <th className="px-6 py-3">Deskripsi</th>
              <th className="px-6 py-3">Dokumentasi</th>
              <th className="px-6 py-3">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {currentComplaints.length > 0 ? (
              currentComplaints.map((complaint, index) => (
                <tr key={complaint._id}>
                  <td className="border px-6 py-2">{indexOfFirstComplaint + index + 1}</td>
                  <td className="border px-6 py-2">{complaint.title}</td>
                  <td className="border px-6 py-2">{complaint.user?.name || '-'}</td>
                  <td className="border px-6 py-2">{complaint.companyName || '-'}</td>
                  <td className="border px-6 py-2">{complaint.description}</td>
                  <td className="border px-6 py-2">
                    {complaint.documentation ? (
                      <img
                      // ubah dari dotenv ke enpoint backend 
                        src={"http://localhost:5000/"+ complaint.documentation}
                        alt="Dokumentasi"
                      />
                    ) : (
                      'Tidak ada dokumentasi'
                    )}
                  </td>
                  <td className="border px-6 py-2">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center px-6 py-4">Tidak ada laporan masuk.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination flex justify-center items-center mt-4">
          <button
            aria-label="Halaman Sebelumnya"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              aria-label={`Halaman ${index + 1}`}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            aria-label="Halaman Selanjutnya"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LaporanMasuk;


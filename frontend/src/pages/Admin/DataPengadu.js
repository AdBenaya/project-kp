import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataPengadu = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 3; // Jumlah data pengadu per halaman

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('/api/complaints/data-pengadu', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setComplaints(res.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter(complaint =>
    (complaint.user && complaint.user.name.toLowerCase().includes(search.toLowerCase())) ||
    (complaint.user && complaint.user.email.toLowerCase().includes(search.toLowerCase())) ||
    (complaint.user && complaint.user.nik && complaint.user.nik.toLowerCase().includes(search.toLowerCase())) ||
    (complaint.user && complaint.user.noTelpon && complaint.user.noTelpon.toLowerCase().includes(search.toLowerCase())) ||
    (complaint.user && complaint.user.address && complaint.user.address.toLowerCase().includes(search.toLowerCase())) ||
    (complaint.user && complaint.user.companyName && complaint.user.companyName.toLowerCase().includes(search.toLowerCase())) ||
    (complaint.user && complaint.user.gender && complaint.user.gender.toLowerCase().includes(search.toLowerCase()))
  );

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrint = () => {
    const content = document.getElementById("printTable").outerHTML;
    console.log(content); 
    const win = window.open("", "", "width=800,height=600");
    win.document.write(`
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
    `);
    win.document.close();
    win.print();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Data Pengadu</h2>
      <input 
        type="text" 
        placeholder="Cari Pengadu..." 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        className="mb-4 p-2 border rounded w-full"
      />
      <button 
        onClick={handlePrint} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Cetak Laporan
      </button>
      <table className="w-full table-auto border" id="printTable">
        <thead>
          <tr>
            <th className="px-4 py-2 border">No</th>
            <th className="px-4 py-2 border">Nama</th>
            <th className="px-4 py-2 border">NIK</th>
            <th className="px-4 py-2 border">No. Telpon</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Alamat</th>
            <th className="px-4 py-2 border">Nama Perusahaan</th>
            <th className="px-4 py-2 border">Gender</th>
            {/* <th className="px-4 py-2 border">Tanggal Pengaduan</th>
            <th className="px-4 py-2 border">Status</th> */}
          </tr>
        </thead>
        <tbody>
          {currentComplaints.map((complaint, index) => (
            <tr key={complaint._id} className="text-center">
              <td className="border px-4 py-2">{indexOfFirstComplaint + index + 1}</td>
              <td className="border px-4 py-2">{complaint.user?.name || 'Tidak tersedia'}</td>
              <td className="border px-4 py-2">{complaint.user?.nik || 'Tidak tersedia'}</td>
              <td className="border px-4 py-2">{complaint.user?.noTelpon || 'Tidak tersedia'}</td>
              <td className="border px-4 py-2">{complaint.user?.email || 'Tidak tersedia'}</td>
              <td className="border px-4 py-2">{complaint.user?.address || 'Tidak tersedia'}</td>
              <td className="border px-4 py-2">{complaint.companyName || 'Tidak tersedia'}</td>
              <td className="border px-4 py-2">{complaint.user?.gender || 'Tidak tersedia'}</td>
              {/* <td className="border px-4 py-2">
                {complaint.user?.createdAt ? new Date(complaint.user.createdAt).toLocaleDateString() : 'Tidak tersedia'}
              </td>
              <td className="border px-4 py-2">{complaint.status || 'Tidak tersedia'}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="bg-gray-300 text-gray-700 px-2 py-1 rounded mx-1"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="bg-gray-300 text-gray-700 px-2 py-1 rounded mx-1"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataPengadu;

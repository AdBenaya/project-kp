// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CetakLaporan = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const response = await axios.get('/api/complaints', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setComplaints(response.data);
//       } catch (error) {
//         console.error('Error fetching complaints:', error);
//         setError('Gagal mengambil data pengaduan.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Cetak Laporan</h1>
//       {Array.isArray(complaints) && complaints.length > 0 ? (
//         complaints.map((complaint) => (
//           <div key={complaint._id} className="border p-4 mb-4 rounded">
//             <h2 className="text-xl font-bold">{complaint.title}</h2>
//             <p className="text-gray-700">{complaint.description}</p>
//             {/* Tambahkan properti tambahan dari complaint jika diperlukan */}
//           </div>
//         ))
//       ) : (
//         <p>Tidak ada pengaduan yang tersedia.</p>
//       )}
//       <button onClick={() => window.print()} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//         Cetak Laporan
//       </button>
//     </div>
//   );
// };

// export default CetakLaporan;






// // // frontend/src/pages/Admin/CetakLaporan.js

// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const CetakLaporan = () => {
// //   const [complaints, setComplaints] = useState([]);
// //   const [loading, setLoading] = useState(true); // Menangani status loading
// //   const [error, setError] = useState(null); // Menangani kesalahan

// //   useEffect(() => {
// //     const fetchComplaints = async () => {
// //       try {
// //         const response = await axios.get('/api/complaints'); // Sesuaikan endpoint dengan yang Anda gunakan
// //         setComplaints(response.data); // Pastikan response.data adalah array
// //       } catch (error) {
// //         console.error('Error fetching complaints:', error);
// //         setError('Gagal mengambil data pengaduan.'); // Set pesan kesalahan
// //       } finally {
// //         setLoading(false); // Menandakan bahwa loading telah selesai
// //       }
// //     };

// //     fetchComplaints();
// //   }, []);

// //   // Tangani loading dan error
// //   if (loading) {
// //     return <p>Loading...</p>; // Tampilkan loading saat data sedang diambil
// //   }

// //   if (error) {
// //     return <p>{error}</p>; // Tampilkan pesan kesalahan jika ada
// //   }

// //   return (
// //     <div>
// //       <h1>Cetak Laporan</h1>
// //       {Array.isArray(complaints) && complaints.length > 0 ? (
// //         complaints.map((complaint) => (
// //           <div key={complaint.id} className="border p-4 mb-4 rounded">
// //             <h2 className="text-xl font-bold">{complaint.title}</h2>
// //             <p className="text-gray-700">{complaint.description}</p>
// //             {/* Render informasi lain dari complaint di sini */}
// //           </div>
// //         ))
// //       ) : (
// //         <p>Tidak ada pengaduan yang tersedia.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default CetakLaporan;

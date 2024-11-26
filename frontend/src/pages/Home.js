import React from 'react';
import { Link } from 'react-router-dom'; // Impor Link untuk navigasi
import { FaSignInAlt, FaUserPlus, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center min-h-screen relative flex flex-col justify-center items-center text-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.alphacoders.com/786/786034.jpg")',
          backgroundAttachment: 'fixed', // Efek parallax
        }}
      >
        {/* Overlay gelap untuk kontras */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="relative z-10 px-6 sm:px-8 lg:px-12">
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Selamat Datang di Pelayanan Pengaduan Hubungan Industrial
          </h3>

          {/* Tombol Login dan Register */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 mb-6 space-y-4 sm:space-y-0 justify-center">
            <Link
              to="/login"
              className="flex items-center bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-600 transition transform hover:scale-105 duration-300"
            >
              <FaSignInAlt className="mr-2" /> Login
            </Link>
            <Link
              to="/register"
              className="flex items-center bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition transform hover:scale-105 duration-300"
            >
              <FaUserPlus className="mr-2" /> Register
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-gradient-to-r from-blue-100 to-indigo-200 py-20">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Tentang Pengaduan Hubungan Industri</h2>
        <p className="text-center mt-4 max-w-4xl mx-auto text-lg text-gray-600">
          Pengaduan Hubungan Industri adalah sistem yang memfasilitasi karyawan dan masyarakat untuk melaporkan masalah terkait dunia industri. Anda bisa melaporkan berbagai jenis pengaduan, mulai dari ketidakadilan hingga masalah lingkungan kerja.
        </p>
      </div>

      {/* Berita Section */}
      <div id="news" className="bg-white py-20">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">Berita</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Berita 1 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              <Link to="/news/1">Berita 1</Link>
            </h3>
            <p className="text-gray-600">Pemilik Hak Ulayat Pertanyakan Dana Royalti dari PT Gag Nikel</p>
          </div>

          {/* Berita 2 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              <Link to="/news/2">Berita 2</Link>
            </h3>
            <p className="text-gray-600">Disnakertrans Raja Ampat Luncurkan Buku Rencana Tenaga Kerja 2023-2026</p>
          </div>

          {/* Berita 3 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              <Link to="/news/3">Berita 3</Link>
            </h3>
            <p className="text-gray-600">Disnakertrans Sosialisasikan Penyusunan Dokumen Rencana Tenaga Kerja Kabupaten Raja Ampat TA. 2023-2027 </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-gradient-to-r ">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Kontak</h2>
        <p className="text-center text-lg text-gray-600 mb-6">Jika Anda membutuhkan bantuan atau memiliki pertanyaan, jangan ragu untuk menghubungi kami melalui informasi kontak berikut.</p>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold text-gray-700 mb-2">Nama</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Masukkan nama Anda"
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Masukkan email Anda"
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="message" className="font-semibold text-gray-700 mb-2">Pesan</label>
              <textarea
                id="message"
                placeholder="Tuliskan pesan Anda"
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>

      {/* Footer - Media Sosial */}
      <div className="bg-black text-white py-6 mt-12">
        <div className="max-w-4xl mx-auto flex justify-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-500">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-500">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-700">
            <FaLinkedinIn />
          </a>
        </div>
        <div className="text-center text-sm mt-4">
          <p>© 2024 Pengaduan Hubungan Industri. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;






// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaSignInAlt, FaUserPlus, FaInfoCircle, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// const Home = () => {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <div
//         className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-center"
//         style={{
//           backgroundImage: 'url("https://images.alphacoders.com/786/786034.jpg")',
//         }}
//       >
//         <div className="bg-opacity-30 min-h-screen flex flex-col justify-center items-center text-center overflow-y-auto">
//           <h3 className="text-5xl font-extrabold text-white mb-4 animate__animated animate__fadeIn animate__delay-1s">
//             Selamat Datang di Pengaduan Hubungan Industri
//           </h3>

//           {/* Tombol Login dan Register */}
//           <div className="flex space-x-6 mb-6">
//             <Link to="/login" className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 duration-300">
//               <FaSignInAlt className="mr-2" /> Login
//             </Link>
//             <Link to="/register" className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-105 duration-300">
//               <FaUserPlus className="mr-2" /> Register
//             </Link>
//           </div>

//           {/* Informasi Aplikasi */}
//           <div className="max-w-4xl text-white text-lg space-y-4 mb-8">
//             <div className="flex items-center justify-center space-x-3">
//               <FaInfoCircle className="text-3xl" />
//               <h4 className="text-xl font-semibold">Apa itu Pengaduan Hubungan Industri?</h4>
//             </div>
//             <p>
//               Pengaduan Hubungan Industri adalah sistem yang memfasilitasi karyawan dan masyarakat untuk melaporkan masalah terkait dunia industri. Anda bisa melaporkan berbagai jenis pengaduan, mulai dari ketidakadilan hingga masalah lingkungan kerja.
//             </p>
//           </div>

//           {/* Link Pelajari Lebih Lanjut */}
//           <div className="mt-8 space-x-6">
//             <Link to="/about" className="text-white hover:text-blue-400 text-lg transition duration-300">
//               Pelajari lebih lanjut tentang kami
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Berita Terkini Section */}
//       <div className="bg-gray-100 py-12">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Berita Terkini</h2>

//           {/* News Cards with Grid Layout */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
//               <img src="https://via.placeholder.com/400" alt="Berita 1" className="w-full h-48 object-cover"/>
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Berita Terkini 1</h3>
//                 <p className="text-gray-600 text-sm mb-4">Deskripsi singkat tentang berita ini. Informasi lebih lanjut tentang isu terbaru di dunia industri.</p>
//                 <Link to="/news/1" className="text-blue-500 hover:underline text-sm mt-2 inline-block">Baca Selengkapnya</Link>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
//               <img src="https://via.placeholder.com/400" alt="Berita 2" className="w-full h-48 object-cover"/>
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Berita Terkini 2</h3>
//                 <p className="text-gray-600 text-sm mb-4">Deskripsi singkat tentang berita ini. Cari tahu lebih banyak tentang pengaruh perubahan di industri.</p>
//                 <Link to="/news/2" className="text-blue-500 hover:underline text-sm mt-2 inline-block">Baca Selengkapnya</Link>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
//               <img src="https://via.placeholder.com/400" alt="Berita 3" className="w-full h-48 object-cover"/>
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Berita Terkini 3</h3>
//                 <p className="text-gray-600 text-sm mb-4">Informasi terbaru mengenai pengaduan industri dan bagaimana peraturan berubah untuk melindungi hak pekerja.</p>
//                 <Link to="/news/3" className="text-blue-500 hover:underline text-sm mt-2 inline-block">Baca Selengkapnya</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer - Media Sosial */}
//       <div className="bg-black text-white py-6 mt-12">
//         <div className="max-w-4xl mx-auto flex justify-center space-x-6">
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-500">
//             <FaFacebookF />
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
//             <FaTwitter />
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-500">
//           <FaInstagram />
//           </a>
//           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-700">
//             <FaLinkedinIn />
//           </a>
//         </div>
//         <div className="text-center text-sm mt-4">
//           <p>© 2024 Pengaduan Hubungan Industri. All rights reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import { FaSignOutAlt } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll'; // Import dari react-scroll

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const routesWithLogout = ['/login', '/register', '/submit-complaint', '/admin'];
  const shouldShowLogout = routesWithLogout.some((route) =>
    location.pathname.startsWith(route)
  );
  const isLoginOrRegister = ['/login', '/register'].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="h-14 fixed top-0 left-0 w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white flex justify-between items-center z-50 shadow-md">
      {/* Logo dan Nama Situs */}
      <div className="flex items-center pl-4">
        <img
          src="https://www.pinclipart.com/picdir/middle/519-5196314_kabupaten-raja-ampat-clipart.png"
          alt="Logo"
          className="h-8 mr-2"
        />
        <h1 className="text-xl font-bold">DISNAKERTRANS</h1>
      </div>

      {/* Navigasi Khusus untuk Halaman Home */}
      <div className="flex items-center space-x-4 pr-4">
        {isHomePage && (
          <nav className="flex space-x-6">
            <ScrollLink
              to="about" // ID yang digunakan di bagian About
              smooth={true} // Aktifkan smooth scroll
              duration={500} // Durasi scroll
              className="text-white hover:underline transition duration-300"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="news" // ID yang digunakan di bagian Berita
              smooth={true}
              duration={500}
              className="text-white hover:underline transition duration-300"
            >
              Berita
            </ScrollLink>
            <ScrollLink
              to="contact" // ID yang digunakan di bagian Kontak
              smooth={true}
              duration={500}
              className="text-white hover:underline transition duration-300"
            >
              Kontak
            </ScrollLink>
          </nav>
        )}

        {/* Tombol Logout */}
        {shouldShowLogout && (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition duration-300 flex items-center space-x-2"
          >
            <FaSignOutAlt size={14} />
            <span>Logout</span>
          </button>
        )}

        {/* Tampilkan tombol Login hanya jika pengguna belum login dan halaman bukan Register atau Login */}
        {!auth.token && !isLoginOrRegister && (
          <Link
            to="/login"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;



// import React, { useContext } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; 
// import { FaSignOutAlt } from 'react-icons/fa';
// import { Link as ScrollLink } from 'react-scroll'; // Import dari react-scroll

// const Header = () => {
//   const { auth, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isHomePage = location.pathname === '/';
//   const routesWithLogout = ['/login', '/register', '/submit-complaint', '/admin'];
//   const shouldShowLogout = routesWithLogout.some((route) =>
//     location.pathname.startsWith(route)
//   );
//   const isLoginOrRegister = ['/login', '/register'].includes(location.pathname);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <header className="h-14 fixed top-0 left-0 w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white flex justify-between items-center z-50 shadow-md">
//       {/* Logo dan Nama Situs */}
//       <div className="flex items-center pl-4">
//         <img
//           src="https://www.pinclipart.com/picdir/middle/519-5196314_kabupaten-raja-ampat-clipart.png"
//           alt="Logo"
//           className="h-8 mr-2"
//         />
//         <h1 className="text-xl font-bold">DISNAKERTRANS</h1>
//       </div>

//       {/* Navigasi Khusus untuk Halaman Home */}
//       <div className="flex items-center space-x-4 pr-4">
//         {isHomePage && (
//           <nav className="flex space-x-6">
//             <ScrollLink
//               to="about" // ID yang digunakan di bagian About
//               smooth={true} // Aktifkan smooth scroll
//               duration={500} // Durasi scroll
//               className="text-white hover:underline transition duration-300"
//             >
//               About
//             </ScrollLink>
//             <ScrollLink
//               to="news" // ID yang digunakan di bagian Berita
//               smooth={true}
//               duration={500}
//               className="text-white hover:underline transition duration-300"
//             >
//               Berita
//             </ScrollLink>
//             <ScrollLink
//               to="contact" // ID yang digunakan di bagian Kontak
//               smooth={true}
//               duration={500}
//               className="text-white hover:underline transition duration-300"
//             >
//               Kontak
//             </ScrollLink>
//           </nav>
//         )}

//         {/* Tombol Logout */}
//         {shouldShowLogout && (
//           <button
//             onClick={handleLogout}
//             className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition duration-300 flex items-center space-x-2"
//           >
//             <FaSignOutAlt size={14} />
//             <span>Logout</span>
//           </button>
//         )}

//         {/* Tampilkan tombol Login hanya jika pengguna belum login dan halaman bukan Register atau Login */}
//         {!auth.token && !isLoginOrRegister && (
//           <Link
//             to="/login"
//             className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition duration-300"
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;





// // frontend/src/components/Header.js

// import React, { useContext } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; // Pastikan jalur impor sesuai
// import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Contoh ikon pengguna

// const Header = () => {
//   const { auth, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Daftar rute di mana tombol Logout harus ditampilkan
//   const routesWithLogout = ['/login', '/register', '/submit-complaint', '/admin'];

//   // Cek apakah rute saat ini termasuk dalam daftar rute yang memerlukan Logout
//   const shouldShowLogout = routesWithLogout.some(route =>
//     location.pathname.startsWith(route)
//   );

//   const handleLogout = () => {
//     logout(); // Panggil fungsi logout dari AuthContext
//     navigate('/'); // Redirect ke halaman Home setelah logout
//   };

//   return (
//     <header className="h-14 bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-4 flex justify-between items-center">
//       {/* Logo dan Nama Situs */}
//       <div className="flex items-center">
//         <img
//           src="https://www.pinclipart.com/picdir/middle/519-5196314_kabupaten-raja-ampat-clipart.png"
//           alt="Logo"
//           className="h-8 mr-2"
//         />
//         <h1 className="text-xl font-bold">DISNAKERTRANS</h1>
//       </div>

//       {/* Navigasi dan Aksi */}
//       <div className="flex items-center space-x-4">
//         {/* Jika pengguna sudah login dan berada di rute yang memerlukan Logout, tampilkan tombol Logout */}
//         {auth.token && shouldShowLogout && (
//           <>
//             <div className="flex items-center">
//               {/* Menambahkan pengecekan jika auth.user ada */}
//               {auth.user && (
//                 <>
//                   <FaUserCircle className="mr-1" />
//                   <span>{auth.user.name}</span> {/* Menampilkan nama pengguna */}
//                 </>
//               )}
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition duration-300"
//             >
//               <FaSignOutAlt className="mr-1" size={12} /> {/* Ikon Logout */}
//               Logout
//             </button>
//           </>
//         )}

//         {/* Jika pengguna belum login, tampilkan tombol Login */}
//         {!auth.token && (
//           <Link
//             to="/login"
//             className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition duration-300"
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

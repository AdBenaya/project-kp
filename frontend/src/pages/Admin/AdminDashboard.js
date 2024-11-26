// frontend/src/pages/Admin/AdminDashboard.js

import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { FaHome, FaUser, FaClipboardList, FaClipboardCheck, FaClipboard } from 'react-icons/fa'; // Import icons
import Beranda from './Beranda';
import DataPengadu from './DataPengadu';
import LaporanMasuk from './LaporanMasuk';
import LaporanTerdisposisi from './LaporanTerdisposisi';
import LaporanSelesai from './LaporanSelesai';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white h-screen p-5">
        <h2 className="text-2xl mb-4">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="beranda" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaHome className="mr-2" /> Beranda
          </Link>
          <Link to="data-pengadu" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaUser className="mr-2" /> Data Pengadu
          </Link>
          <Link to="laporan-masuk" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaClipboardList className="mr-2" /> Laporan Masuk
          </Link>
          <Link to="laporan-terdisposisi" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaClipboardCheck className="mr-2" /> Laporan Terdisposisi
          </Link>
          <Link to="laporan-selesai" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaClipboard className="mr-2" /> Laporan Selesai
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="w-3/4 p-4 overflow-y-auto">
        <Routes>
          <Route path="beranda" element={<Beranda />} />
          <Route path="data-pengadu" element={<DataPengadu />} />
          <Route path="laporan-masuk" element={<LaporanMasuk />} />
          <Route path="laporan-terdisposisi" element={<LaporanTerdisposisi />} />
          <Route path="laporan-selesai" element={<LaporanSelesai />} />
          <Route path="" element={<Beranda />} /> {/* Default route */}
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;


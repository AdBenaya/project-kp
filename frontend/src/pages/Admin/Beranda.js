import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Pastikan axios diimpor
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Mendaftar elemen yang diperlukan untuk pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const Beranda = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [totalRes, pendingRes, inProgressRes, resolvedRes] = await Promise.all([
          axios.get('/api/complaints'),
          axios.get('/api/complaints?status=pending'),
          axios.get('/api/complaints?status=in_progress'),
          axios.get('/api/complaints?status=resolved'),
        ]);

        setStats({
          total: totalRes.data.totalDocs,
          pending: pendingRes.data.totalDocs,
          inProgress: inProgressRes.data.totalDocs,
          resolved: resolvedRes.data.totalDocs,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const chartData = {
    labels: ['Total', 'Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        label: 'Jumlah Pengaduan',
        data: [stats.total, stats.pending, stats.inProgress, stats.resolved],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
      },
    ],
  };

  return (
    <div
      className="container mx-auto p-4 overflow-y-auto" // Tambahkan overflow-y-auto untuk scroll vertikal
      style={{ height: '100vh' }} // Menyesuaikan agar kontainer menggunakan tinggi penuh
    >
      <h2 className="text-2xl mb-4">Beranda</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-500 p-4 rounded-lg shadow-lg text-white">
          <h3 className="text-xl">Total Pengaduan</h3>
          <p className="text-3xl">{stats.total}</p>
        </div>
        <div className="bg-yellow-500 p-4 rounded-lg shadow-lg text-white">
          <h3 className="text-xl">Pengaduan Masuk</h3>
          <p className="text-3xl">{stats.pending}</p>
        </div>
        <div className="bg-purple-500 p-4 rounded-lg shadow-lg text-white">
          <h3 className="text-xl">Pengaduan Terdisposisi</h3>
          <p className="text-3xl">{stats.inProgress}</p>
        </div>
        <div className="bg-green-500 p-4 rounded-lg shadow-lg text-white">
          <h3 className="text-xl">Pengaduan Selesai</h3>
          <p className="text-3xl">{stats.resolved}</p>
        </div>
      </div>

      <div className="mt-8">
        <Pie 
          data={chartData} 
          width={500} 
          height={500} 
        />
      </div>
    </div>
  );
};

export default Beranda;


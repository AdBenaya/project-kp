// src/pages/NewsDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams(); // Mengambil ID dari URL

  // Data berita yang diisi secara statis
  const newsData = {
    1: {
      title: "Berita 1 - Pemilik Hak Ulayat",
      content: "Pemilik Hak Ulayat Pertanyakan Dana Royalti dari PT Gag Nikel",
      link: "https://suarapapua.com/2024/08/06/pemilik-hak-ulayat-pertanyakan-dana-royalti-dari-pt-gag-nikel/"
    },
    2: {
      title: "Berita 2 - Disnakertrans Raja Ampat Luncurkan Buku Rencana Tenaga Kerja 2023-2026",
      content: "Disnakertrans Raja Ampat Luncurkan Buku Rencana Tenaga Kerja 2023-2026",
      link: "https://sorong.tribunnews.com/2023/12/21/disnakertrans-raja-ampat-luncurkan-buku-rencana-tenaga-kerja2023-2026#google_vignette"
    },
    3: {
      title: "Berita 3 - Dinas Tenaga Kerja dan Transmigrasi",
      content: "Disnakertrans  Sosialisasikan  Penyusunan Dokumen Rencana Tenaga Kerja Kabupaten Raja Ampat TA. 2023-2027 ",
      link: "https://www.infopublik.id/kategori/nusantara/757952/disnakertrans-sosialisasikan-penyusunan-dokumen-rencana-tenaga-kerja-kabupaten-raja-ampat-ta-2023-2027"
    },
  };

  // Menampilkan berita berdasarkan ID yang ada di URL
  const news = newsData[id] || { title: "Berita Tidak Ditemukan", content: "Konten berita tidak tersedia." };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">{news.title}</h2>
      <p className="text-lg text-gray-600">{news.content}</p>
      {/* Menambahkan rel="noopener noreferrer" untuk menghindari masalah keamanan */}
      <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">Baca Selengkapnya</a>
    </div>
  );
};

export default NewsDetail;

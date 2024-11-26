import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header di atas semua konten */}
      <Header />

      {/* Konten utama dengan padding atas setara tinggi Header */}
      <div className="pt-14">
        <Routes>
          {/* Rute Umum */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/submit-complaint" element={<SubmitComplaint />} />
          <Route path="/mycomplaint" element={<MyComplaints />} />
          
          {/* Rute Terproteksi untuk Admin */}
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute admin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;



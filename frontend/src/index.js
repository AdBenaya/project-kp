import React from 'react';
import ReactDOM from 'react-dom/client'; // Menggunakan 'react-dom/client' untuk React 18
import { BrowserRouter } from 'react-router-dom'; // Impor BrowserRouter
import './index.css';
import App from './App';
import AuthProvider from './context/AuthContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Membuat root baru

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter> {/* Bungkus App dengan BrowserRouter */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

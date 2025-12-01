import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import AdminLayout from './components/Layout';
import Inventaris from './pages/Inventaris';
import Keuangan from './pages/Keuangan';
import Zakat from './pages/Zakat';
import Kurban from './pages/Kurban';
import Jadwal from './pages/Jadwal';
import Pengurus from './pages/Pengurus';

import PublicLayout from './pages/public/PublicLayout';
import Home from './pages/public/Home';
import PublicJadwal from './pages/public/PublicJadwal';
import PublicKeuangan from './pages/public/PublicKeuangan';
import PublicZakat from './pages/public/PublicZakat';
import PublicKurban from './pages/public/PublicKurban';
import PublicPengurus from './pages/public/PublicPengurus';
import DashboardHome from './pages/DashboardHome';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="keuangan-publik" element={<PublicKeuangan />} />
          <Route path="zakat-publik" element={<PublicZakat />} />
          <Route path="kurban-publik" element={<PublicKurban />} />
          <Route path="pengurus-publik" element={<PublicPengurus />} />
          <Route path="jadwal-sholat" element={<PublicJadwal />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/app" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome/>} />
          <Route path="inventaris" element={<Inventaris />} />
          <Route path="keuangan" element={<Keuangan />} />
          <Route path="zakat" element={<Zakat />} />
          <Route path="kurban" element={<Kurban />} />
          <Route path="jadwal" element={<Jadwal />} />
          <Route path="pengurus" element={<Pengurus />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
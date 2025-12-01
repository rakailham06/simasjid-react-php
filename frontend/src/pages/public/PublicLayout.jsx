import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserCircle, Phone, Mail } from 'lucide-react';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div>
              <p className="text-xs text-gray-500">Selamat Datang di</p>
              <h1 className="text-lg font-bold text-green-800 leading-tight"> Website Masjid Al-Furqan</h1>
            </div>
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-4 text-xs md:text-sm font-medium">
              <div className="flex items-center gap-2">
                <Phone size={14} fill="currentColor" /> 
                <span>Call (+62)8981188887</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} /> 
                <span>info@masjidalfurqan.com</span>
              </div>
            </div>

          <Link to="/login" className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-700 rounded-full hover:bg-green-50 transition text-sm font-semibold">
            <UserCircle size={18} />
            Login Pengurus
          </Link>
        </div>
      </nav>
      
      <main>
        <Outlet />
      </main>
      
      <footer className="bg-green-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Masjid Al-Furqan. All rights reserved.</p>
          <p className="text-green-300 text-sm mt-2">Jl. Utama No. 50, Pekanbaru, Riau</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
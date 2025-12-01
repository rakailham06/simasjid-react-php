import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Wallet, 
  HeartHandshake, 
  Beef, 
  CalendarDays, 
  Users, 
  LogOut, 
  User, 
  Menu,
  X
} from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')) || { nama: 'Pengurus' };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const navItems = [
    { path: '/app', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/app/inventaris', label: 'Data Inventaris', icon: <Package size={20} /> },
    { path: '/app/keuangan', label: 'Data Keuangan', icon: <Wallet size={20} /> },
    { path: '/app/zakat', label: 'Data Zakat', icon: <HeartHandshake size={20} /> },
    { path: '/app/kurban', label: 'Data Kurban', icon: <Beef size={20} /> },
    { path: '/app/jadwal', label: 'Jadwal Imam/Khatib', icon: <CalendarDays size={20} /> },
    { path: '/app/pengurus', label: 'Data Pengurus', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-green-900 text-white flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>

        <div className="p-6 border-b border-green-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide text-green-100">Masjid Al-Furqan</h1>
            <p className="text-xs text-green-400">Panel Pengurus</p>
          </div>

          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-green-300">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {

            const isActive = location.pathname === item.path || 
                             (item.path !== '/app' && location.pathname.startsWith(item.path));

            return (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-green-700 text-white shadow-md' 
                    : 'text-green-100 hover:bg-green-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-green-800">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 w-full p-3 text-red-300 hover:bg-red-900/30 hover:text-red-100 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center z-10">
          <button 
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <h2 className="hidden md:block text-lg font-semibold text-gray-700 capitalize">
            {location.pathname === '/app' ? 'Dashboard' : location.pathname.replace('/app/', '').replace('-', ' ')}
          </h2>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{user.nama_lengkap || user.nama || 'Pengurus'}</p>
              <p className="text-xs text-gray-500">{user.jabatan || 'Administrator'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 border border-green-200">
              <User size={20} />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
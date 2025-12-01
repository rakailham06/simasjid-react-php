import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Wallet, Users, Package, Calendar } from 'lucide-react';

const DashboardHome = () => {
  const [stats, setStats] = useState({ uang: 0, aset: 0, pengurus: 0 });

  useEffect(() => {
        document.title = "Dashboard Admin - Masjid Al-Furqan";
      }, []);

  useEffect(() => {
    const fetchStats = async () => {
      const baseUrl = 'http://localhost/simasjid/backend/api.php?table=';
      
      try {
        const resUang = await axios.get(baseUrl + 'keuangan');
        const resAset = await axios.get(baseUrl + 'inventaris');
        const resPengurus = await axios.get(baseUrl + 'pengurus');

        const masuk = resUang.data.filter(i => i.jenis === 'Pemasukan').reduce((a,b)=>a+Number(b.jumlah),0);
        const keluar = resUang.data.filter(i => i.jenis === 'Pengeluaran').reduce((a,b)=>a+Number(b.jumlah),0);

        setStats({
          uang: masuk - keluar,
          aset: resAset.data.length,
          pengurus: resPengurus.data.length
        });
      } catch (e) { console.error(e); }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Saldo Kas Masjid</p>
            <h2 className="text-3xl font-bold text-gray-800">Rp {stats.uang.toLocaleString()}</h2>
          </div>
          <div className="p-3 bg-green-100 rounded-full text-green-600"><Wallet size={32}/></div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Aset Inventaris</p>
            <h2 className="text-3xl font-bold text-gray-800">{stats.aset} <span className="text-sm font-normal">Barang</span></h2>
          </div>
          <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Package size={32}/></div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Jumlah Pengurus</p>
            <h2 className="text-3xl font-bold text-gray-800">{stats.pengurus} <span className="text-sm font-normal">Orang</span></h2>
          </div>
          <div className="p-3 bg-purple-100 rounded-full text-purple-600"><Users size={32}/></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
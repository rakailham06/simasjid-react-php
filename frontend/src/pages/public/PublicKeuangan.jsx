import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const PublicKeuangan = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({ masuk: 0, keluar: 0, saldo: 0 });

  const API_URL = 'http://localhost/simasjid/backend/api.php?table=keuangan';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        setData(res.data);
        
        let masuk = 0;
        let keluar = 0;
        res.data.forEach(item => {
          if (item.jenis === 'Pemasukan') masuk += Number(item.jumlah);
          else keluar += Number(item.jumlah);
        });
        setSummary({ masuk, keluar, saldo: masuk - keluar });

      } catch (error) { console.error(error); }
    };
    fetchData();
  }, []);

  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Laporan Kas Masjid</h2>
        <p className="text-gray-500 mt-2">Transparansi dana umat untuk kemaslahatan bersama</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center gap-3 text-green-700 mb-2">
            <TrendingUp /> <span className="font-semibold">Total Pemasukan</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{formatRupiah(summary.masuk)}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-xl border border-red-200">
          <div className="flex items-center gap-3 text-red-700 mb-2">
            <TrendingDown /> <span className="font-semibold">Total Pengeluaran</span>
          </div>
          <p className="text-2xl font-bold text-red-800">{formatRupiah(summary.keluar)}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3 text-blue-700 mb-2">
            <Wallet /> <span className="font-semibold">Saldo Saat Ini</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{formatRupiah(summary.saldo)}</p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Keterangan</th>
              <th className="p-4 text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-600 text-sm">{item.tanggal}</td>
                <td className="p-4">
                  <div className="font-bold text-gray-800">{item.kategori}</div>
                  <div className="text-sm text-gray-500">{item.keterangan}</div>
                </td>
                <td className={`p-4 text-right font-mono font-bold ${item.jenis === 'Pemasukan' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.jenis === 'Pemasukan' ? '+' : '-'} {formatRupiah(item.jumlah)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublicKeuangan;
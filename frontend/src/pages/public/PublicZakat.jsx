import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeartHandshake } from 'lucide-react';

const PublicZakat = () => {
  const [data, setData] = useState([]);
  const API_URL = 'http://localhost/simasjid/backend/api.php?table=zakat';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        setData(res.data);
      } catch (error) { console.error(error); }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Laporan Zakat & Infaq</h2>
        <p className="text-gray-500 mt-2">Daftar penerimaan dan penyaluran dana sosial</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-2 md:mb-0">
              <div className={`p-3 rounded-full ${item.jenis_transaksi === 'Penerimaan' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                <HeartHandshake size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{item.nama_pihak}</h4>
                <span className="text-sm text-gray-500">{item.jenis_zakat} ({item.jenis_transaksi})</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-lg text-gray-700">
                {item.bentuk === 'Uang' 
                  ? `Rp ${parseInt(item.jumlah_uang).toLocaleString('id-ID')}`
                  : `${item.jumlah_beras_kg} Kg Beras`
                }
              </div>
              <div className="text-xs text-gray-400">{item.tanggal_transaksi}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicZakat;
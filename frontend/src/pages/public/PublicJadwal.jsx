import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar } from 'lucide-react';

const PublicJadwal = () => {
  const [data, setData] = useState([]);

  const API_URL = 'http://localhost/simasjid/backend/api.php?table=jadwal_imam';

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
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Jadwal Imam, Muadzin dan Khatib Jumat</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item.id} className="bg-white border-l-4 border-green-600 shadow-md rounded-r-lg p-5 hover:shadow-lg transition">
            <div className="flex items-center gap-2 text-green-500 mb-3 ">
              <Calendar size={16} /> <span>{item.tanggal}</span>
            </div>
            <div className="text-2xl font-bold text-green-800 mb-1">{item.waktu_sholat}</div>
            <hr className="my-3 border-gray-100" />

            <div className="text-gray-700 space-y-2">
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-500">Imam:</span>
                <span className="font-semibold text-gray-800">{item.nama_imam || '-'}</span>
              </div>

              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-500">Muadzin:</span>
                <span className="font-semibold text-gray-800">{item.nama_muadzin || '-'}</span>
              </div>

              {item.waktu_sholat === 'Jumat' && (
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-500">Khatib:</span>
                  <span className="font-semibold text-green-700">{item.nama_khatib || '-'}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicJadwal;
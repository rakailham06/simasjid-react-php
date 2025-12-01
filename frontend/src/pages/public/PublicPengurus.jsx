import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Phone } from 'lucide-react';

const PublicPengurus = () => {
  const [data, setData] = useState([]);
  const API_URL = 'http://localhost/simasjid/backend/api.php?table=pengurus';

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API_URL);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Struktur Pengurus</h2>
        <p className="text-gray-500 mt-2">Dewan Kemakmuran Masjid Al-Furqan</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:-translate-y-1 transition duration-300">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
              <User size={48} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">{item.nama_lengkap}</h3>
            <p className="text-green-600 font-medium text-sm mb-4">{item.jabatan}</p>
            
            {item.no_hp && (
              <a 
                href={`https://wa.me/${item.no_hp.replace(/^0/, '62')}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 text-sm transition"
              >
                <Phone size={16} /> {item.no_hp}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicPengurus;
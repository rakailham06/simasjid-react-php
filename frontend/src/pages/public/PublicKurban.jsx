import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

const PublicKurban = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  
  const API_URL = 'http://localhost/simasjid/backend/api.php?table=kurban';

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API_URL);
      setData(res.data);
    };
    fetchData();
  }, []);

  const filteredData = data.filter(item => 
    item.nama_pekurban.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Daftar Pekurban 1446H</h2>
        <p className="text-gray-500 mt-2">Cek status hewan kurban Anda di sini</p>
      </div>

      <div className="max-w-md mx-auto mb-8 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Cari nama pekurban..." 
          className="w-full pl-10 pr-4 py-3 border rounded-full shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white border border-amber-100 rounded-xl p-6 shadow-sm hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
              {item.jenis_hewan}
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.nama_pekurban}</h3>
            <p className="text-sm text-gray-500 mb-4">Tahun: {item.tahun_hijriah}</p>
            
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-sm text-gray-600">Status Hewan:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold
                ${item.status_hewan === 'Diterima' ? 'bg-blue-100 text-blue-800' : 
                  item.status_hewan === 'Disembelih' ? 'bg-green-100 text-green-800' : 
                  'bg-gray-100 text-gray-800'}`}>
                {item.status_hewan}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicKurban;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Calendar, User } from 'lucide-react';

const Jadwal = () => {
  const [data, setData] = useState([]);
  const [listPengurus, setListPengurus] = useState([]); // Data untuk dropdown
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State Form (Default value string kosong biar dropdown 'Pilih' muncul)
  const [form, setForm] = useState({ 
    tanggal: '', 
    waktu_sholat: 'Subuh', 
    imam_id: '', 
    muadzin_id: '',
    khatib_id: '' // Tambahan untuk Jumat
  });

  // GANTI URL SESUAI FOLDER
  const BASE_URL = 'http://localhost/simasjid/backend/api.php';

  useEffect(() => {
    document.title = "Jadwal Imam - Masjid Al-Furqan";
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. Ambil Data Jadwal (Sudah di-join Namanya di Backend)
      const resJadwal = await axios.get(`${BASE_URL}?table=jadwal_imam`);
      setData(resJadwal.data);

      // 2. Ambil Data Pengurus (Untuk isi Dropdown)
      const resPengurus = await axios.get(`${BASE_URL}?table=pengurus`);
      setListPengurus(resPengurus.data);
    } catch (error) { console.error(error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validasi sederhana
      if (!form.imam_id || !form.muadzin_id) {
        alert("Mohon pilih Imam dan Muadzin");
        return;
      }
      // Jika Jumat, Khatib wajib diisi
      if (form.waktu_sholat === 'Jumat' && !form.khatib_id) {
        alert("Untuk Sholat Jumat, Khatib wajib diisi!");
        return;
      }

      await axios.post(`${BASE_URL}?table=jadwal_imam`, form);
      setIsModalOpen(false);
      
      // Reset Form
      setForm({ tanggal: '', waktu_sholat: 'Subuh', imam_id: '', muadzin_id: '', khatib_id: '' });
      fetchData();
    } catch (error) {
      alert("Gagal menyimpan. Cek apakah jadwal di tanggal & waktu tersebut sudah ada?");
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus jadwal ini?')) {
      await axios.delete(`${BASE_URL}?table=jadwal_imam&id=${id}`);
      fetchData();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Jadwal Imam & Muadzin</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-purple-700 transition shadow">
          <Plus size={18} /> Buat Jadwal
        </button>
      </div>

      {/* Grid Card Jadwal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className={`border p-4 rounded-lg hover:shadow-md transition relative overflow-hidden ${item.waktu_sholat === 'Jumat' ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
            
            {/* Penanda Jumat */}
            {item.waktu_sholat === 'Jumat' && (
              <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">
                JUMATAN
              </div>
            )}

            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Calendar size={16} /> <span className="text-sm font-medium">{item.tanggal}</span>
            </div>
            
            <div className={`text-2xl font-bold mb-3 ${item.waktu_sholat === 'Jumat' ? 'text-green-800' : 'text-purple-800'}`}>
              {item.waktu_sholat}
            </div>
            
            <div className="mt-2 text-sm space-y-2 bg-white p-3 rounded border border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1"><User size={12}/> Imam:</span>
                <b className="text-gray-800 truncate max-w-[120px]">{item.nama_imam || item.imam_id}</b>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1"><User size={12}/> Muadzin:</span>
                <b className="text-gray-800 truncate max-w-[120px]">{item.nama_muadzin || item.muadzin_id}</b>
              </div>
              
              {item.waktu_sholat === 'Jumat' && (
                <div className="flex justify-between items-center border-t pt-2 mt-2">
                  <span className="text-green-700 font-bold">Khatib:</span>
                  <b className="text-green-800 truncate max-w-[120px]">{item.nama_khatib || item.khatib_id}</b>
                </div>
              )}
            </div>
            
            <button onClick={() => handleDelete(item.id)} className="mt-4 w-full text-red-500 text-xs border border-red-200 py-1.5 rounded hover:bg-red-50 transition">
              Hapus Jadwal
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Calendar className="text-purple-600"/> Input Jadwal
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500">Tanggal</label>
                  <input type="date" className="w-full border p-2 rounded" value={form.tanggal} onChange={e => setForm({ ...form, tanggal: e.target.value })} required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500">Waktu Sholat</label>
                  <select className="w-full border p-2 rounded bg-white" value={form.waktu_sholat} onChange={e => setForm({ ...form, waktu_sholat: e.target.value })}>
                    {['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya', 'Jumat'].map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500">Pilih Imam</label>
                <select className="w-full border p-2 rounded bg-gray-50" value={form.imam_id} onChange={e => setForm({ ...form, imam_id: e.target.value })} required>
                  <option value="">-- Siapa Imamnya? --</option>
                  {listPengurus.map(p => <option key={p.id} value={p.id}>{p.nama_lengkap} ({p.jabatan})</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500">Pilih Muadzin</label>
                <select className="w-full border p-2 rounded bg-gray-50" value={form.muadzin_id} onChange={e => setForm({ ...form, muadzin_id: e.target.value })} required>
                  <option value="">-- Siapa Muadzinnya? --</option>
                  {listPengurus.map(p => <option key={p.id} value={p.id}>{p.nama_lengkap}</option>)}
                </select>
              </div>

              {form.waktu_sholat === 'Jumat' && (
                <div className="bg-green-50 p-3 rounded border border-green-200 animate-fade-in-down">
                  <label className="text-xs font-bold text-green-700 block mb-1">Pilih Khatib (Khusus Jumat)</label>
                  <select className="w-full border border-green-300 p-2 rounded bg-white" value={form.khatib_id} onChange={e => setForm({ ...form, khatib_id: e.target.value })} required>
                    <option value="">-- Siapa Khatibnya? --</option>
                    {listPengurus.map(p => <option key={p.id} value={p.id}>{p.nama_lengkap}</option>)}
                  </select>
                </div>
              )}

              <div className="flex gap-2 justify-end mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Batal</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 shadow">Simpan Jadwal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jadwal;
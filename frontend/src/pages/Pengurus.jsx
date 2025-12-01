import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus } from 'lucide-react';

const Pengurus = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ 
    nama_lengkap: '', jabatan: '', no_hp: '', alamat: '' 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
        document.title = "Pengurus - Masjid Al-Furqan";
      }, []);

  const API_URL = 'http://localhost/simasjid/backend/api.php?table=pengurus';

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchData() }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, user_id: Math.floor(Math.random() * 99999) }; 
    
    await axios.post(API_URL, payload);
    setIsModalOpen(false);
    setForm({ nama_lengkap: '', jabatan: '', no_hp: '', alamat: '' });
    fetchData();
  };

  const handleDelete = async (id) => {
    if(confirm('Yakin ingin menghapus pengurus ini?')) {
      await axios.delete(`${API_URL}&id=${id}`);
      fetchData();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Pengurus</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18}/> Tambah Pengurus
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3">Nama Lengkap</th>
              <th className="p-3">Jabatan</th>
              <th className="p-3">No HP</th>
              <th className="p-3">Alamat</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{item.nama_lengkap}</td>
                <td className="p-3">{item.jabatan}</td>
                <td className="p-3">{item.no_hp}</td>
                <td className="p-3 truncate max-w-xs">{item.alamat}</td>
                <td className="p-3">
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Tambah Pengurus</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Nama Lengkap" className="w-full border p-2 rounded" value={form.nama_lengkap} onChange={e => setForm({...form, nama_lengkap: e.target.value})} required />
              <input type="text" placeholder="Jabatan (Mis: Ketua, Sekretaris)" className="w-full border p-2 rounded" value={form.jabatan} onChange={e => setForm({...form, jabatan: e.target.value})} required />
              <input type="text" placeholder="No HP" className="w-full border p-2 rounded" value={form.no_hp} onChange={e => setForm({...form, no_hp: e.target.value})} />
              <textarea placeholder="Alamat" className="w-full border p-2 rounded" value={form.alamat} onChange={e => setForm({...form, alamat: e.target.value})}></textarea>
              <div className="flex gap-2 justify-end mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pengurus;
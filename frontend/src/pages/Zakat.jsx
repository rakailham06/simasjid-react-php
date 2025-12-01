import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus } from 'lucide-react';

const Zakat = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ 
    tahun_hijriah: '1446', 
    jenis_transaksi: 'Penerimaan', 
    nama_pihak: '', 
    jenis_zakat: 'Fitrah', 
    bentuk: 'Uang', 
    jumlah_uang: 0, 
    jumlah_beras_kg: 0, 
    amil_id: 1 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
        document.title = "Zakat - Masjid Al-Furqan";
      }, []);

  const API_URL = 'http://localhost/simasjid/backend/api.php?table=zakat';

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchData() }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { 
      ...form, 
      tanggal_transaksi: new Date().toISOString().slice(0, 19).replace('T', ' '),
      // Reset nilai yang tidak relevan berdasarkan bentuk
      jumlah_uang: form.bentuk === 'Uang' ? form.jumlah_uang : 0,
      jumlah_beras_kg: form.bentuk === 'Beras' ? form.jumlah_beras_kg : 0
    };
    await axios.post(API_URL, payload);
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if(confirm('Hapus data zakat ini?')) {
      await axios.delete(`${API_URL}&id=${id}`);
      fetchData();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Zakat</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-emerald-700">
          <Plus size={18}/> Input Zakat
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3">Nama (Muzakki/Mustahiq)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Jenis</th>
              <th className="p-3">Bentuk</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{item.nama_pihak}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${item.jenis_transaksi === 'Penerimaan' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                    {item.jenis_transaksi}
                  </span>
                </td>
                <td className="p-3">{item.jenis_zakat}</td>
                <td className="p-3">{item.bentuk}</td>
                <td className="p-3 font-bold text-gray-700">
                  {item.bentuk === 'Uang' 
                    ? `Rp ${parseInt(item.jumlah_uang).toLocaleString()}` 
                    : `${item.jumlah_beras_kg} Kg`
                  }
                </td>
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
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Input Zakat</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Tahun (1446)" className="border p-2 rounded" value={form.tahun_hijriah} onChange={e => setForm({...form, tahun_hijriah: e.target.value})} />
                <select className="border p-2 rounded" value={form.jenis_transaksi} onChange={e => setForm({...form, jenis_transaksi: e.target.value})}>
                  <option value="Penerimaan">Penerimaan (Masuk)</option>
                  <option value="Penyaluran">Penyaluran (Keluar)</option>
                </select>
              </div>
              <input type="text" placeholder="Nama Muzakki / Mustahiq" className="w-full border p-2 rounded" value={form.nama_pihak} onChange={e => setForm({...form, nama_pihak: e.target.value})} required />
              
              <div className="grid grid-cols-2 gap-4">
                <select className="border p-2 rounded" value={form.jenis_zakat} onChange={e => setForm({...form, jenis_zakat: e.target.value})}>
                  <option value="Fitrah">Zakat Fitrah</option>
                  <option value="Maal">Zakat Maal</option>
                  <option value="Infaq">Infaq</option>
                </select>
                <select className="border p-2 rounded" value={form.bentuk} onChange={e => setForm({...form, bentuk: e.target.value})}>
                  <option value="Uang">Uang (Rp)</option>
                  <option value="Beras">Beras (Kg)</option>
                </select>
              </div>

              {form.bentuk === 'Uang' ? (
                <input type="number" placeholder="Jumlah Uang (Rp)" className="w-full border p-2 rounded" value={form.jumlah_uang} onChange={e => setForm({...form, jumlah_uang: e.target.value})} />
              ) : (
                <input type="number" step="0.1" placeholder="Jumlah Beras (Kg)" className="w-full border p-2 rounded" value={form.jumlah_beras_kg} onChange={e => setForm({...form, jumlah_beras_kg: e.target.value})} />
              )}

              <div className="flex gap-2 justify-end mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Zakat;
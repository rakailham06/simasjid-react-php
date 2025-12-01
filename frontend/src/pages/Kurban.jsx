import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Search, Beef } from 'lucide-react';

const Kurban = () => {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [listPanitia, setListPanitia] = useState([]);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    tahun_hijriah: '1446',
    nama_pekurban: '',
    jenis_hewan: 'Sapi',
    status_hewan: 'Diterima',
    panitia_id: ''
  });

  const BASE_URL = 'http://localhost/simasjid/backend/api.php';

  useEffect(() => {
    document.title = "Data Kurban - Masjid Al-Furqan";
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resKurban = await axios.get(`${BASE_URL}?table=kurban`);
      setRawData(resKurban.data);
      setFilteredData(resKurban.data);

      const resPengurus = await axios.get(`${BASE_URL}?table=pengurus`);
      setListPanitia(resPengurus.data);

      if (resPengurus.data.length > 0) {
        setForm(f => ({ ...f, panitia_id: resPengurus.data[0].id }));
      }
    } catch (error) { console.error("Gagal ambil data", error); }
  };

  useEffect(() => {
    if (search === '') {
      setFilteredData(rawData);
    } else {
      const lowerSearch = search.toLowerCase();
      const hasil = rawData.filter(item =>
        item.nama_pekurban.toLowerCase().includes(lowerSearch) ||
        item.jenis_hewan.toLowerCase().includes(lowerSearch)
      );
      setFilteredData(hasil);
    }
  }, [search, rawData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}?table=kurban`, form);
      setIsModalOpen(false);
      setForm(prev => ({ ...prev, nama_pekurban: '' }));
      fetchData();
    } catch (error) {
      alert("Gagal menyimpan. Pastikan Panitia dipilih.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus data kurban ini?')) {
      try {
        await axios.delete(`${BASE_URL}?table=kurban&id=${id}`);
        fetchData();
      } catch (error) { console.error(error); }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Data Hewan Kurban</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-amber-700 transition shadow">
          <Plus size={18} /> Tambah Pekurban
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Cari nama pekurban atau jenis hewan..."
          className="w-full md:w-1/3 pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3">Tahun</th>
              <th className="p-3">Nama Pekurban</th>
              <th className="p-3">Hewan</th>
              <th className="p-3">Status</th>
              <th className="p-3">Panitia</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3">{item.tahun_hijriah}</td>
                  <td className="p-3 font-medium text-gray-800">{item.nama_pekurban}</td>
                  <td className="p-3">{item.jenis_hewan}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs border font-medium
                      ${item.status_hewan === 'Diterima' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                        item.status_hewan === 'Disembelih' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                          'bg-green-50 border-green-200 text-green-700'}`}>
                      {item.status_hewan}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-gray-700">
                    {item.nama_panitia || <span className="text-red-400 text-xs">(Pengurus Dihapus)</span>}
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="p-8 text-center text-gray-500">Data tidak ditemukan</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Beef className="text-amber-600" /> Tambah Pekurban
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500">Tahun Hijriah</label>
                <input type="text" placeholder="1446" className="w-full border p-2 rounded" value={form.tahun_hijriah} onChange={e => setForm({ ...form, tahun_hijriah: e.target.value })} />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500">Nama Pekurban</label>
                <input type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-amber-500" value={form.nama_pekurban} onChange={e => setForm({ ...form, nama_pekurban: e.target.value })} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500">Jenis Hewan</label>
                  <select className="w-full border p-2 rounded" value={form.jenis_hewan} onChange={e => setForm({ ...form, jenis_hewan: e.target.value })}>
                    <option value="Sapi">Sapi</option>
                    <option value="Kambing">Kambing</option>
                    <option value="Domba">Domba</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500">Status</label>
                  <select className="w-full border p-2 rounded" value={form.status_hewan} onChange={e => setForm({ ...form, status_hewan: e.target.value })}>
                    <option value="Diterima">Diterima</option>
                    <option value="Disembelih">Disembelih</option>
                    <option value="Didistribusikan">Didistribusikan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Panitia Pencatat</label>
                <select
                  className="w-full border p-2 rounded bg-gray-50"
                  value={form.panitia_id}
                  onChange={e => setForm({ ...form, panitia_id: e.target.value })}
                  required
                >
                  <option value="">-- Pilih Panitia --</option>
                  {listPanitia.map(p => (
                    <option key={p.id} value={p.id}>{p.nama_lengkap}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 justify-end mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Batal</button>
                <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 shadow">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kurban;
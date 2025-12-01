import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Package, Search } from 'lucide-react';

const Inventaris = () => {
  // State Data Utama
  const [rawData, setRawData] = useState([]); // Data asli dari DB
  const [filteredData, setFilteredData] = useState([]); // Data setelah di-search
  const [listPengurus, setListPengurus] = useState([]); // Data untuk dropdown
  const [search, setSearch] = useState('');
  
  // State Form & Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ 
    nama_barang: '', kode_barang: '', jumlah: '', satuan: 'unit', 
    kondisi: 'Baik', lokasi_simpan: '', penanggung_jawab_id: '' 
  });

  // GANTI URL SESUAI FOLDER ANDA (simasjid / sim-masjid)
  const BASE_URL = 'http://localhost/simasjid/backend/api.php';

  useEffect(() => {
    document.title = "Inventaris - Masjid Al-Furqan";
    fetchData();
  }, []);

  // 1. Fetch Data (Ambil Barang & Pengurus)
  const fetchData = async () => {
    try {
      // Ambil Data Inventaris (sudah di-join di backend agar muncul nama_pj)
      const resBarang = await axios.get(`${BASE_URL}?table=inventaris`);
      setRawData(resBarang.data);
      setFilteredData(resBarang.data); // Reset filter

      // Ambil Data Pengurus (Untuk Dropdown Form)
      const resPengurus = await axios.get(`${BASE_URL}?table=pengurus`);
      setListPengurus(resPengurus.data);
      
      // Set default penanggung jawab ke orang pertama (UX)
      if (resPengurus.data.length > 0) {
        setForm(f => ({ ...f, penanggung_jawab_id: resPengurus.data[0].id }));
      }
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  // 2. Logic Searching (Client Side - Lebih Cepat)
  useEffect(() => {
    if (search === '') {
      setFilteredData(rawData);
    } else {
      const lowerSearch = search.toLowerCase();
      const hasil = rawData.filter(item => 
        item.nama_barang.toLowerCase().includes(lowerSearch) ||
        (item.kode_barang && item.kode_barang.toLowerCase().includes(lowerSearch)) ||
        (item.lokasi_simpan && item.lokasi_simpan.toLowerCase().includes(lowerSearch))
      );
      setFilteredData(hasil);
    }
  }, [search, rawData]);

  // 3. Handle Submit (Tambah Data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perhatikan URL menggunakan '&' bukan '?' karena parameter kedua
      await axios.post(`${BASE_URL}?table=inventaris`, form);
      setIsModalOpen(false);
      // Reset form penting
      setForm(prev => ({ ...prev, nama_barang: '', kode_barang: '', jumlah: '' }));
      fetchData(); // Refresh tabel
    } catch (error) {
      alert("Gagal menyimpan data.");
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id) => {
    if(confirm('Yakin ingin menghapus barang ini?')) {
      try {
        await axios.delete(`${BASE_URL}?table=inventaris&id=${id}`);
        fetchData();
      } catch (error) { console.error(error); }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Data Inventaris</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition flex items-center gap-2"
        >
          <Plus size={18}/> Tambah Barang
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Cari nama barang, kode, atau lokasi..."
          className="w-full md:w-1/3 pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABEL */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3">Nama Barang</th>
              <th className="p-3">Kode</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Kondisi</th>
              <th className="p-3">Lokasi</th>
              <th className="p-3">Penanggung Jawab</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 border-b text-sm">
                  <td className="p-3 font-medium">{item.nama_barang}</td>
                  <td className="p-3 font-mono text-xs bg-gray-50 rounded w-max">{item.kode_barang || '-'}</td>
                  <td className="p-3">{item.jumlah} {item.satuan}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.kondisi === 'Baik' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.kondisi}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{item.lokasi_simpan}</td>
                  {/* Menampilkan Nama PJ (hasil join backend) */}
                  <td className="p-3 text-blue-600">{item.nama_pj || '-'}</td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition">
                        <Trash2 size={16}/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="p-8 text-center text-gray-500">Data tidak ditemukan</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM TAMBAH */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <Package className="text-green-700"/> Input Barang
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                  <label className="text-xs font-bold text-gray-500">Nama Barang</label>
                  <input type="text" className="w-full border p-2 rounded" value={form.nama_barang} onChange={e => setForm({...form, nama_barang: e.target.value})} required />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs font-bold text-gray-500">Kode</label>
                    <input type="text" className="w-full border p-2 rounded" value={form.kode_barang} onChange={e => setForm({...form, kode_barang: e.target.value})} />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500">Lokasi</label>
                    <input type="text" className="w-full border p-2 rounded" value={form.lokasi_simpan} onChange={e => setForm({...form, lokasi_simpan: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs font-bold text-gray-500">Jumlah</label>
                    <input type="number" className="w-full border p-2 rounded" value={form.jumlah} onChange={e => setForm({...form, jumlah: e.target.value})} required />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500">Satuan</label>
                    <input type="text" placeholder="Unit/Pcs" className="w-full border p-2 rounded" value={form.satuan} onChange={e => setForm({...form, satuan: e.target.value})} />
                </div>
              </div>

              <div>
                  <label className="text-xs font-bold text-gray-500">Kondisi</label>
                  <select className="w-full border p-2 rounded" value={form.kondisi} onChange={e => setForm({...form, kondisi: e.target.value})}>
                    <option value="Baik">Baik</option>
                    <option value="Rusak Ringan">Rusak Ringan</option>
                    <option value="Rusak Berat">Rusak Berat</option>
                  </select>
              </div>

              {/* Dropdown Penanggung Jawab (PENTING) */}
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Penanggung Jawab</label>
                <select 
                  className="w-full border p-2 rounded bg-gray-50" 
                  value={form.penanggung_jawab_id} 
                  onChange={e => setForm({...form, penanggung_jawab_id: e.target.value})}
                  required
                >
                  <option value="">-- Pilih Pengurus --</option>
                  {listPengurus.map(p => (
                    <option key={p.id} value={p.id}>{p.nama_lengkap}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 justify-end mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Batal</button>
                <button type="submit" className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 shadow">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventaris;
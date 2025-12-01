import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Printer, Search } from 'lucide-react';

const Keuangan = () => {
  const [rawData, setRawData] = useState([]); // Data Asli dari DB
  const [filteredData, setFilteredData] = useState([]); // Data setelah filter
  const [filter, setFilter] = useState({ startDate: '', endDate: '', search: '' });

  useEffect(() => {
      document.title = "Keuangan - Masjid Al-Furqan";
    }, []);
  
  // State Form & Modal (Tetap sama seperti sebelumnya)
  const [form, setForm] = useState({ jenis: 'Pemasukan', kategori: '', jumlah: '', keterangan: '', dicatat_oleh_id: 1 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = 'http://localhost/simasjid/backend/api.php?table=keuangan'; // Sesuaikan folder

  // 1. Fetch Data
  const fetchData = async () => {
    const res = await axios.get(API_URL);
    setRawData(res.data);
    setFilteredData(res.data); // Awalnya tampilkan semua
  };

  useEffect(() => { fetchData() }, []);

  // 2. Logic Filter & Searching (Reporting)
  useEffect(() => {
    let result = rawData;

    // Filter Tanggal
    if (filter.startDate) {
      result = result.filter(item => item.tanggal >= filter.startDate);
    }
    if (filter.endDate) {
      // Tambah ' 23:59:59' agar mencakup sampai akhir hari tersebut
      result = result.filter(item => item.tanggal <= filter.endDate + ' 23:59:59');
    }

    // Filter Search
    if (filter.search) {
      result = result.filter(item => 
        item.kategori.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    setFilteredData(result);
  }, [filter, rawData]);

  // Hitung Total (Otomatis berdasarkan filter)
  const totalMasuk = filteredData.filter(i => i.jenis === 'Pemasukan').reduce((a,b) => a + Number(b.jumlah), 0);
  const totalKeluar = filteredData.filter(i => i.jenis === 'Pengeluaran').reduce((a,b) => a + Number(b.jumlah), 0);

  // Fungsi Cetak
  const handlePrint = () => {
    window.print();
  };
  
  // ... (Fungsi handleSubmit & handleDelete tetap sama, copy dari kode sebelumnya) ...
  // SAYA PERSINGKAT UTK MENAMPILKAN LOGIC BARU SAJA
  const handleSubmit = async (e) => { e.preventDefault(); await axios.post(API_URL, {...form, tanggal: new Date().toISOString().slice(0, 19).replace('T', ' ')}); setIsModalOpen(false); fetchData(); };
  const handleDelete = async (id) => { if(confirm('Hapus?')) { await axios.delete(`${API_URL}&id=${id}`); fetchData(); }};

  return (
    <div className="bg-white rounded-lg shadow p-6">
      
      {/* HEADER: Hilang saat diprint */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 print:hidden gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Keuangan Masjid</h1>
        <div className="flex gap-2">
           <button onClick={handlePrint} className="bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700">
            <Printer size={18}/> Cetak Laporan
          </button>
          <button onClick={() => setIsModalOpen(true)} className="bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-800">
            <Plus size={18}/> Transaksi Baru
          </button>
        </div>
      </div>

      {/* FILTER BAR: Hilang saat diprint */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-end print:hidden border">
        <div>
           <label className="text-xs font-bold text-gray-500">Dari Tanggal</label>
           <input type="date" className="border p-2 rounded w-full" value={filter.startDate} onChange={e => setFilter({...filter, startDate: e.target.value})} />
        </div>
        <div>
           <label className="text-xs font-bold text-gray-500">Sampai Tanggal</label>
           <input type="date" className="border p-2 rounded w-full" value={filter.endDate} onChange={e => setFilter({...filter, endDate: e.target.value})} />
        </div>
        <div className="flex-1">
           <label className="text-xs font-bold text-gray-500">Cari Transaksi</label>
           <div className="relative">
             <Search className="absolute left-2 top-2.5 text-gray-400" size={18}/>
             <input type="text" placeholder="Cari infaq, listrik..." className="border p-2 pl-9 rounded w-full" value={filter.search} onChange={e => setFilter({...filter, search: e.target.value})} />
           </div>
        </div>
      </div>

      {/* JUDUL CETAK: Hanya muncul saat diprint */}
      <div className="hidden print:block text-center mb-6">
        <h2 className="text-2xl font-bold">Laporan Keuangan Masjid</h2>
        <p>Periode: {filter.startDate || 'Awal'} s/d {filter.endDate || 'Sekarang'}</p>
      </div>

      {/* TABEL */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3">Tanggal</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Ket</th>
              <th className="p-3 text-right">Masuk</th>
              <th className="p-3 text-right">Keluar</th>
              <th className="p-3 print:hidden">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm">{item.tanggal.substring(0,10)}</td>
                <td className="p-3 font-medium">{item.kategori}</td>
                <td className="p-3 text-gray-500 text-sm">{item.keterangan}</td>
                <td className="p-3 text-right text-green-700 font-mono">
                  {item.jenis === 'Pemasukan' ? parseInt(item.jumlah).toLocaleString() : '-'}
                </td>
                <td className="p-3 text-right text-red-700 font-mono">
                  {item.jenis === 'Pengeluaran' ? parseInt(item.jumlah).toLocaleString() : '-'}
                </td>
                <td className="p-3 print:hidden">
                  <button onClick={() => handleDelete(item.id)} className="text-red-500"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* FOOTER TABEL: TOTAL */}
          <tfoot className="bg-gray-100 font-bold">
            <tr>
              <td colSpan="3" className="p-3 text-right">TOTAL</td>
              <td className="p-3 text-right text-green-800">{totalMasuk.toLocaleString()}</td>
              <td className="p-3 text-right text-red-800">{totalKeluar.toLocaleString()}</td>
              <td className="print:hidden"></td>
            </tr>
            <tr>
              <td colSpan="3" className="p-3 text-right">SALDO AKHIR</td>
              <td colSpan="2" className="p-3 text-center bg-blue-100 text-blue-800">
                {(totalMasuk - totalKeluar).toLocaleString()}
              </td>
              <td className="print:hidden"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* MODAL (Tetap sama seperti kode sebelumnya, copy paste saja bagian ini) */}
      {isModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 print:hidden">
            {/* ... Isi form modal sama seperti sebelumnya ... */}
            {/* Tips: Gunakan kode modal dari jawaban 'Keuangan.jsx' sebelumnya */}
             <div className="bg-white p-6 rounded w-96">
                <h3 className="font-bold mb-4">Tambah Data</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <select className="border w-full p-2" value={form.jenis} onChange={e=>setForm({...form, jenis:e.target.value})}><option>Pemasukan</option><option>Pengeluaran</option></select>
                    <input className="border w-full p-2" placeholder="Kategori" value={form.kategori} onChange={e=>setForm({...form, kategori:e.target.value})} required/>
                    <input className="border w-full p-2" placeholder="Jumlah" type="number" value={form.jumlah} onChange={e=>setForm({...form, jumlah:e.target.value})} required/>
                    <input className="border w-full p-2" placeholder="Keterangan" value={form.keterangan} onChange={e=>setForm({...form, keterangan:e.target.value})} />
                    <button className="bg-green-700 text-white w-full py-2 rounded">Simpan</button>
                    <button type="button" onClick={()=>setIsModalOpen(false)} className="w-full py-2 text-gray-500">Batal</button>
                </form>
             </div>
         </div>
      )}
    </div>
  );
};

export default Keuangan;
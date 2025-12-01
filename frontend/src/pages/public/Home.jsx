import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  CloudMoon, Sun, CloudSun, Sunset, Moon, Calendar, 
  Wallet, HeartHandshake, Beef, Users, ArrowRight 
} from 'lucide-react';

const Home = () => {
  const [jadwal, setJadwal] = useState(null);
  const [tanggal, setTanggal] = useState({ masehi: '', hijriah: '' });
  const [loading, setLoading] = useState(true);

  const formatTime = (time24) => {
    if (!time24) return '--:--';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'pm' : 'am';
    const h12 = h % 12 || 12;
    return `${h12 < 10 ? '0' + h12 : h12}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    document.title = "Beranda - Masjid Al-Furqan";

    const fetchJadwalSholat = async () => {
      try {
        const res = await axios.get('https://api.aladhan.com/v1/timingsByCity?city=Pekanbaru&country=Indonesia&method=20');

        const data = res.data.data;
        setJadwal(data.timings);
        setTanggal({
          masehi: data.date.readable,
          hijriah: `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} AH`
        });
        setLoading(false);
      } catch (error) {
        console.error("Gagal memuat jadwal sholat", error);
        setLoading(false);
      }
    };

    fetchJadwalSholat();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="relative w-full h-[500px] bg-gray-900 flex flex-col justify-center items-center text-white overflow-hidden shadow-xl">

        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589495180659-8bcc1c5d4908?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        ></div>

        <div className="relative z-10 container mx-auto px-4 text-center">

          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2 tracking-wide drop-shadow-md">
            Jadwal Sholat Hari Ini (Pekanbaru Dskt.)
          </h1>

          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full shadow-lg"></div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-sm md:text-lg text-gray-100 mb-10 font-light tracking-wide">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-amber-400" />
              <span>Islamic: {tanggal.hijriah}</span>
            </div>
            <div className="hidden md:block text-gray-400">|</div>
            <div>{tanggal.masehi}</div>
          </div>

          {loading ? (
            <div className="animate-pulse text-gray-300">Memuat Jadwal...</div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 max-w-5xl mx-auto">
              <PrayerItem icon={<CloudMoon size={32} />} name="Subuh" time={formatTime(jadwal?.Fajr)} />
              <PrayerItem icon={<Sun size={32} />} name="Terbit" time={formatTime(jadwal?.Sunrise)} />
              <PrayerItem icon={<Sun size={32} className="text-amber-300" />} name="Dzuhur" time={formatTime(jadwal?.Dhuhr)} />
              <PrayerItem icon={<CloudSun size={32} />} name="Ashar" time={formatTime(jadwal?.Asr)} />
              <PrayerItem icon={<Sunset size={32} className="text-orange-400" />} name="Maghrib" time={formatTime(jadwal?.Maghrib)} />
              <PrayerItem icon={<Moon size={32} />} name="Isya" time={formatTime(jadwal?.Isha)} />
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <MenuCard
            to="/keuangan-publik"
            icon={<Wallet size={40} className="text-blue-600" />}
            title="Laporan Keuangan"
            desc="Transparansi arus kas masuk dan keluar masjid secara real-time."
            color="border-blue-500"
          />
          <MenuCard
            to="/zakat-publik"
            icon={<HeartHandshake size={40} className="text-emerald-600" />}
            title="Data Zakat & Infaq"
            desc="Laporan penerimaan dan penyaluran zakat fitrah, maal, dan infaq."
            color="border-emerald-500"
          />
          <MenuCard
            to="/kurban-publik"
            icon={<Beef size={40} className="text-amber-600" />}
            title="Info Kurban"
            desc="Daftar pekurban dan status pemotongan hewan kurban tahun ini."
            color="border-amber-500"
          />
          <MenuCard
            to="/jadwal-sholat"
            icon={<Calendar size={40} className="text-purple-600" />}
            title="Jadwal Imam"
            desc="Informasi petugas imam, muadzin, dan khatib harian."
            color="border-purple-500"
          />
          <MenuCard
            to="/pengurus-publik"
            icon={<Users size={40} className="text-gray-600" />}
            title="Profil Pengurus"
            desc="Struktur organisasi DKM dan kontak yang bisa dihubungi."
            color="border-gray-500"
          />

          <Link to="/login" className="bg-green-700 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 group flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
              <Users size={100} />
            </div>

            <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:bg-white/30 transition shadow-inner">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-wide">Login Pengurus</h3>
            <p className="text-green-100 text-sm mb-6 px-4">Area khusus administrator untuk mengelola data masjid.</p>
            <span className="inline-flex items-center gap-2 font-bold bg-white text-green-800 px-6 py-2.5 rounded-full text-sm hover:bg-green-50 transition shadow-md">
              Masuk Dashboard <ArrowRight size={16} />
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
};

const PrayerItem = ({ icon, name, time }) => (
  <div className="flex flex-col items-center group cursor-default">
    <div className="mb-3 text-gray-300 group-hover:text-white group-hover:scale-110 transition duration-300 transform">
      {icon}
    </div>
    <h4 className="text-lg font-bold text-white mb-1 drop-shadow-sm">{name}</h4>
    <p className="text-amber-400 font-mono text-base font-semibold tracking-wide bg-black/20 px-2 rounded">{time}</p>
  </div>
);

const MenuCard = ({ to, icon, title, desc, color }) => (
  <Link to={to} className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 border-t-4 ${color} group flex flex-col h-full`}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition shadow-sm">
        {icon}
      </div>
      <ArrowRight className="text-gray-300 group-hover:text-gray-600 transition transform group-hover:translate-x-1" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed flex-grow">{desc}</p>
  </Link>
);

export default Home;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login Pengurus - Masjid Al-Furqan";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost/simasjid/backend/login.php', {
        email,
        password
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/app');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Email atau Password salah.');
      } else {
        setError('Gagal terhubung ke server. Pastikan backend berjalan.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border-t-4 border-green-700 relative">
        
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 transition font-medium"
          >
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-green-700" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Login Pengurus</h2>
          <p className="text-gray-500 text-sm mt-1">Sistem Informasi Masjid</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm flex items-center gap-2 border border-red-200">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400" size={18} />
              </div>
              <input 
                type="email" 
                className="pl-10 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Masukkan Email Anda"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={18} />
              </div>
              <input 
                type="password" 
                className="pl-10 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="••••••••"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-green-700 text-white py-2.5 rounded-lg hover:bg-green-800 transition font-medium flex justify-center items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Memproses...
              </>
            ) : (
              'Masuk Dashboard'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Sistem Informasi Masjid Al-Furqan
        </div>
      </div>
    </div>
  );
};

export default Login;
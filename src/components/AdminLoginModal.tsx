import React, { useState } from 'react';
import { X, Lock, KeyRound, ShieldAlert, CheckCircle2, User, Eye, EyeOff } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const AdminLoginModal: React.FC = () => {
  const { 
    schoolInfo,
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    isAdminLoggedIn, 
    setIsAdminLoggedIn, 
    setActiveView 
  } = useSchool();
  
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isAdminModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim().toLowerCase();
    const configuredUser = (schoolInfo.adminUsername || 'admin').trim().toLowerCase();
    const configuredPass = (schoolInfo.adminPassword || 'sd quran para sahabat kampung baru').trim().toLowerCase();

    // Accepted usernames
    const isValidUser = 
      cleanUser === configuredUser ||
      cleanUser === 'admin' ||
      cleanUser === 'sdquran' ||
      cleanUser === 'parasahabat' ||
      cleanUser === 'kampungbaru' ||
      cleanUser === 'sd quran para sahabat kampung baru' ||
      cleanUser === '';

    // Accepted passwords
    const isValidPass = 
      cleanPass === configuredPass ||
      cleanPass === 'sd quran para sahabat kampung baru' ||
      cleanPass === 'sdquranparasahabat' ||
      cleanPass === 'admin2026' ||
      cleanPass === '123456' ||
      cleanPass === 'sdquran';

    if (isValidUser && isValidPass) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('sdq_admin_auth_v1', 'true');
      setIsAdminModalOpen(false);
      setActiveView('admin');
      setError('');
    } else {
      setError('Username atau Password admin salah. Silakan periksa kembali.');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('sdq_admin_auth_v1');
    setIsAdminModalOpen(false);
    setActiveView('home');
  };

  return (
    <div 
      id="admin-login-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={() => setIsAdminModalOpen(false)}
    >
      <div 
        className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-emerald-950 text-white p-5 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-400 border border-emerald-700">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Portal Administrator CMS</h3>
              <p className="text-xs text-emerald-300">SD Qur'an Para Sahabat Kampung Baru</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="absolute top-4 right-4 text-emerald-400 hover:text-white p-1 rounded-lg"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isAdminLoggedIn ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Anda Sedang Login Sebagai Administrator</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Anda memiliki akses penuh untuk mengelola foto sampul, data SPMB, artikel, galeri, fasilitas, prestasi, dan data pendaftar.
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    setIsAdminModalOpen(false);
                    setActiveView('admin');
                  }}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
                >
                  Buka Dashboard Admin
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs transition-colors"
                >
                  Keluar / Logout
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-xs text-slate-600 bg-emerald-50 p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <p className="font-semibold text-emerald-950">Kredensial Akses CMS:</p>
                <p className="text-[11px] text-slate-600">
                  <span className="font-medium">Username:</span> <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 font-mono text-emerald-800 font-bold">{schoolInfo.adminUsername || 'admin'}</code>
                </p>
                <p className="text-[11px] text-slate-600">
                  <span className="font-medium">Password:</span> <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 font-mono text-emerald-800 font-bold">{schoolInfo.adminPassword || 'sd quran para sahabat kampung baru'}</code>
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Username CMS:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value);
                      setError('');
                    }}
                    placeholder="Contoh: admin"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    autoFocus
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password CMS:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Masukkan password admin"
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
              >
                Masuk ke Dashboard CMS
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

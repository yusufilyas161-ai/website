import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  PhoneCall, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  UserCheck, 
  Lock, 
  GraduationCap 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { SchoolLogo } from './SchoolLogo';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, schoolInfo, setIsAdminModalOpen, isAdminLoggedIn } = useSchool();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang Kami' },
    { id: 'program', label: 'Program' },
    { id: 'tahfizh', label: 'Tahfizh & Tahsin', isHighlight: true },
    { id: 'fasilitas', label: 'Fasilitas' },
    { id: 'kegiatan', label: 'Kegiatan' },
    { id: 'prestasi', label: 'Prestasi' },
    { id: 'spmb', label: 'PPDB / SPMB', isSpecial: true },
    { id: 'berita', label: 'Berita' },
    { id: 'kontak', label: 'Kontak' }
  ];

  const handleNavClick = (id: string) => {
    setActiveView(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-emerald-100' 
          : 'bg-white py-3.5 border-b border-emerald-100'
      }`}
    >
      {/* Top Bar for contact info on desktop */}
      {!isScrolled && (
        <div className="hidden lg:block border-b border-emerald-100/80 bg-[#F4F7F2] py-1.5 -mt-3.5 mb-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-emerald-800">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                {schoolInfo.village}, {schoolInfo.district}, {schoolInfo.regency}, {schoolInfo.province}
              </span>
              <span className="text-emerald-300">|</span>
              <span className="text-amber-600 font-semibold">
                Penerimaan Siswa Baru TA 2026/2027 Telah Dibuka
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href={`tel:${schoolInfo.phone}`} 
                className="flex items-center gap-1 hover:text-emerald-950 font-medium transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>{schoolInfo.phone}</span>
              </a>
              <span className="text-emerald-300">|</span>
              <button
                id="header-admin-login-btn"
                onClick={() => setIsAdminModalOpen(true)}
                className="flex items-center gap-1 text-emerald-700 hover:text-amber-600 font-medium transition-colors"
                title={isAdminLoggedIn ? "Dashboard Admin Terbuka" : "Login Admin Sekolah"}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAdminLoggedIn ? "Dashboard Admin" : "Portal Guru/Admin"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & School Name */}
          <button 
            id="brand-logo-button"
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <SchoolLogo size={isScrolled ? 'sm' : 'md'} variant="color" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-emerald-600">
                  SD Berbasis Al-Qur'an
                </span>
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-emerald-950 font-serif group-hover:text-emerald-700 transition-colors">
                SD Qur'an Para Sahabat
              </span>
              <span className="text-[10px] text-emerald-600 font-medium tracking-widest -mt-0.5 hidden sm:block">
                KAMPUNG BARU • MUARA TEMBESI
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Navigasi Utama">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-emerald-900 shadow-sm'
                      : link.isHighlight
                        ? 'text-amber-600 hover:text-emerald-900 hover:bg-emerald-50'
                        : link.isSpecial
                          ? 'text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50'
                          : 'text-slate-700 hover:text-emerald-900 hover:bg-[#F4F7F2]'
                  }`}
                >
                  {link.label}
                  {link.isHighlight && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="navbar-cta-spmb"
              onClick={() => handleNavClick('spmb')}
              className="bg-amber-400 hover:bg-amber-500 text-emerald-950 px-5 py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-950" />
              <span>DAFTAR SEKARANG</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              id="mobile-cta-spmb-mini"
              onClick={() => handleNavClick('spmb')}
              className="sm:hidden bg-amber-400 text-emerald-950 font-bold px-3 py-1.5 rounded-full text-xs shadow-sm"
            >
              DAFTAR
            </button>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-emerald-900 hover:text-emerald-950 p-2 rounded-xl bg-[#F4F7F2] border border-emerald-100 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="xl:hidden bg-white border-b border-emerald-100 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-xl"
        >
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-900 text-white font-bold'
                      : link.isHighlight
                        ? 'text-amber-600 bg-amber-50/70 hover:bg-amber-50'
                        : 'text-slate-700 hover:bg-[#F4F7F2]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.id === 'tahfizh' && <BookOpen className="w-4 h-4 text-amber-500" />}
                    {link.id === 'spmb' && <GraduationCap className="w-4 h-4 text-emerald-700" />}
                    {link.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-emerald-100 space-y-2">
            <button
              id="mobile-drawer-cta-spmb"
              onClick={() => handleNavClick('spmb')}
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-emerald-950 rounded-full font-bold text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>DAFTAR SISWA BARU (SPMB)</span>
            </button>

            <button
              id="mobile-drawer-admin-login"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAdminModalOpen(true);
              }}
              className="w-full py-2.5 bg-[#F4F7F2] hover:bg-emerald-100/60 text-emerald-900 rounded-xl text-xs flex items-center justify-center gap-2 border border-emerald-100 font-medium"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isAdminLoggedIn ? "Masuk Dashboard Administrator" : "Portal Login Guru / Admin"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

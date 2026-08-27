import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Youtube, 
  ChevronRight, 
  HeartHandshake, 
  ShieldCheck, 
  BookOpenCheck,
  Lock
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { SchoolLogo } from './SchoolLogo';
import { IslamicPattern } from './IslamicPattern';

export const Footer: React.FC = () => {
  const { schoolInfo, setActiveView, setIsAdminModalOpen, isAdminLoggedIn } = useSchool();

  const quickLinks = [
    { label: 'Beranda', id: 'home' },
    { label: 'Tentang Sekolah', id: 'tentang' },
    { label: 'Program Unggulan', id: 'program' },
    { label: 'Tahfizh & Tahsin Qur\'an', id: 'tahfizh' },
    { label: 'Fasilitas Belajar', id: 'fasilitas' },
    { label: 'Galeri Kegiatan', id: 'kegiatan' },
    { label: 'Prestasi Siswa', id: 'prestasi' },
    { label: 'Pendaftaran SPMB', id: 'spmb' },
    { label: 'Berita & Artikel', id: 'berita' },
    { label: 'Tanya Jawab (FAQ)', id: 'faq' },
    { label: 'Hubungi Kami', id: 'kontak' }
  ];

  const rawNumber = schoolInfo.whatsapp.replace(/\D/g, '');
  const cleanWaNumber = rawNumber.startsWith('0') 
    ? `62${rawNumber.slice(1)}` 
    : rawNumber.startsWith('62') 
      ? rawNumber 
      : `62${rawNumber}`;

  return (
    <footer id="main-footer" className="relative bg-emerald-950 text-emerald-100 overflow-hidden border-t-2 border-amber-500/40">
      <IslamicPattern opacity={0.04} />

      {/* Top Value Banner */}
      <div className="relative border-b border-emerald-900 bg-emerald-950/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center text-amber-400 flex-shrink-0">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm font-serif">Berbasis Al-Qur'an</h5>
                <p className="text-xs text-emerald-300">Tahfizh & Tahsin Berkelanjutan</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center text-amber-400 flex-shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm font-serif">Karakter & Adab Islami</h5>
                <p className="text-xs text-emerald-300">Meneladani Akhlak Para Sahabat</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center text-amber-400 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm font-serif">Akademik & Potensi Siswa</h5>
                <p className="text-xs text-emerald-300">Siap Prestasi Literasi & Sains</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Profile */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <SchoolLogo size="lg" variant="light" />
              <div>
                <h3 className="font-bold text-lg text-white font-serif tracking-tight">
                  {schoolInfo.name}
                </h3>
                <p className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                  {schoolInfo.subTagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-emerald-200/90 leading-relaxed">
              {schoolInfo.description}
            </p>

            <div className="pt-2">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-2.5">
                Media Sosial & Informasi Resmi
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${cleanWaNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 flex items-center justify-center text-emerald-300 hover:text-white transition-colors"
                  aria-label="WhatsApp SD Qur'an Para Sahabat"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 flex items-center justify-center text-emerald-300 hover:text-white transition-colors"
                  aria-label="Facebook SD Qur'an Para Sahabat"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 flex items-center justify-center text-emerald-300 hover:text-white transition-colors"
                  aria-label="Instagram SD Qur'an Para Sahabat"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 flex items-center justify-center text-emerald-300 hover:text-white transition-colors"
                  aria-label="YouTube SD Qur'an Para Sahabat"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-base border-b border-emerald-900 pb-2 flex items-center gap-2 font-serif">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Jelajahi Menu
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 text-sm">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => setActiveView(link.id)}
                    className="flex items-center gap-1.5 text-emerald-200 hover:text-amber-300 transition-colors py-1 text-left w-full"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: SPMB & Program */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-base border-b border-emerald-900 pb-2 flex items-center gap-2 font-serif">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              SPMB 2026/2027
            </h4>
            <div className="space-y-2 text-xs text-emerald-200/90">
              <div className="p-3.5 bg-emerald-900/60 rounded-2xl border border-emerald-800/80">
                <span className="text-amber-400 font-bold block text-sm">Penerimaan Siswa Baru</span>
                <p className="mt-1 text-emerald-100">Pendaftaran dibuka setiap hari kerja. Kuota terbatas!</p>
                <button
                  onClick={() => setActiveView('spmb')}
                  className="mt-2.5 w-full py-2 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-full text-xs transition-colors shadow-sm"
                >
                  Informasi & Biaya
                </button>
              </div>
              <p className="text-[11px] text-emerald-300/80 leading-relaxed">
                Biaya pendaftaran total Rp2.650.000 (termasuk seragam 3 stel, Iqra, SPP bulan pertama, mutaba'ah, dan pembangunan).
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Local SEO */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-base border-b border-emerald-900 pb-2 flex items-center gap-2 font-serif">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Alamat & Pelayanan
            </h4>

            <div className="space-y-2.5 text-xs text-emerald-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>SD Qur'an Para Sahabat</strong><br />
                  {schoolInfo.address}, {schoolInfo.village}, Kec. {schoolInfo.district}, Kab. {schoolInfo.regency}, Prov. {schoolInfo.province}, {schoolInfo.country}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${schoolInfo.phone}`} className="hover:text-white font-medium">
                  {schoolInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a 
                  href={`https://wa.me/${cleanWaNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:underline font-semibold"
                >
                  WhatsApp: {schoolInfo.whatsapp}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-[11px]">
                  <p><strong>Senin – Kamis:</strong> {schoolInfo.operatingHours.mondayThursday}</p>
                  <p><strong>Jum'at:</strong> {schoolInfo.operatingHours.friday}</p>
                  <p><strong>Sabtu:</strong> {schoolInfo.operatingHours.saturday}</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={schoolInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 text-white rounded-full text-xs font-medium transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Buka Lokasi di Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="mt-12 pt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-3">
          <p className="text-center sm:text-left">
            © 2026 <strong>SD Qur'an Para Sahabat Kampung Baru</strong>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveView('faq')}
              className="hover:text-emerald-200 transition-colors"
            >
              FAQ
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveView('spmb')}
              className="hover:text-emerald-200 transition-colors"
            >
              PPDB / SPMB
            </button>
            <span>•</span>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors text-[11px]"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminLoggedIn ? "Dashboard" : "Admin"}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

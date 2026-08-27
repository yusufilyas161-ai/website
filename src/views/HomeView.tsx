import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  GraduationCap, 
  Languages, 
  Trophy, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  MessageCircle, 
  Eye, 
  ChevronRight, 
  Star, 
  BookOpenCheck,
  ShieldCheck,
  Award,
  Users,
  Compass,
  FileText
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';
import { SCHOOL_PHOTOS, imgTentangSekolah } from '../data/schoolImages';

export const HomeView: React.FC = () => {
  const { 
    schoolInfo, 
    spmbConfig, 
    programs, 
    articles, 
    gallery, 
    facilities, 
    achievements, 
    faqs, 
    setActiveView, 
    setSelectedArticleSlug, 
    setLightboxImage 
  } = useSchool();

  const [activeFaq, setActiveFaq] = useState<string | null>(faqs[0]?.id || null);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<string>('Semua');

  const rawNumber = schoolInfo.whatsapp.replace(/\D/g, '');
  const cleanWaNumber = rawNumber.startsWith('0') 
    ? `62${rawNumber.slice(1)}` 
    : rawNumber.startsWith('62') 
      ? rawNumber 
      : `62${rawNumber}`;

  const defaultWaUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    "Halo SD Qur'an Para Sahabat, saya ingin mendapatkan informasi tentang pendaftaran siswa baru."
  )}`;

  const filteredGallery = activeGalleryCategory === 'Semua'
    ? gallery.slice(0, 6)
    : gallery.filter(item => item.category === activeGalleryCategory).slice(0, 6);

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpenCheck': return <BookOpenCheck className="w-6 h-6 text-emerald-700" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-emerald-700" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-emerald-700" />;
      case 'Languages': return <Languages className="w-6 h-6 text-emerald-700" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-emerald-700" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-emerald-700" />;
      default: return <BookOpen className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead />

      {/* 1. HERO SECTION - Natural Tones Emerald & Amber Canvas */}
      <section 
        id="hero-section" 
        className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b-4 border-amber-400"
      >
        <IslamicPattern opacity={0.06} />

        {/* Ambient subtle lighting orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badges */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
                <span>SEKOLAH DASAR BERBASIS AL-QUR'AN</span>
              </div>

              {/* Headlines */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-serif leading-[1.15]">
                  SD QUR'AN PARA SAHABAT
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-amber-300 font-serif">
                  Membentuk Generasi <span className="text-amber-400">Qur'ani</span>, Berilmu, & Berakhlak.
                </p>
              </div>

              {/* Subheadline & Description */}
              <p className="text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                SD Qur'an Para Sahabat Kampung Baru hadir untuk mendampingi anak tumbuh menjadi generasi yang dekat dengan Al-Qur'an, berakhlak mulia, percaya diri, dan memiliki prestasi akademik maupun nonakademik.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-cta-daftar"
                  onClick={() => setActiveView('spmb')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-full shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4 text-emerald-950" />
                  <span>DAFTAR SEKARANG</span>
                </button>

                <button
                  id="hero-cta-jelajahi"
                  onClick={() => setActiveView('program')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-emerald-50 text-emerald-900 font-bold rounded-full transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <span>Jelajahi Sekolah</span>
                  <ArrowRight className="w-4 h-4 text-emerald-800" />
                </button>
              </div>

              {/* Quick Key Highlights / Stats Bar */}
              <div className="pt-6 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="bg-emerald-900/70 p-3.5 rounded-2xl border border-emerald-700/50">
                  <span className="block text-amber-400 font-bold text-lg font-serif">Tahfizh & Tahsin</span>
                  <span className="text-[11px] text-emerald-200">Bimbingan Qur'ani</span>
                </div>
                <div className="bg-emerald-900/70 p-3.5 rounded-2xl border border-emerald-700/50">
                  <span className="block text-amber-400 font-bold text-lg font-serif">Karakter</span>
                  <span className="text-[11px] text-emerald-200">Adab Para Sahabat</span>
                </div>
                <div className="bg-emerald-900/70 p-3.5 rounded-2xl border border-emerald-700/50">
                  <span className="block text-amber-400 font-bold text-lg font-serif">Akademik</span>
                  <span className="text-[11px] text-emerald-200">Literasi & Sains</span>
                </div>
                <div className="bg-emerald-900/70 p-3.5 rounded-2xl border border-emerald-700/50">
                  <span className="block text-amber-400 font-bold text-lg font-serif">Bakat Siswa</span>
                  <span className="text-[11px] text-emerald-200">Minat & Potensi</span>
                </div>
              </div>

            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative frames */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400/30 via-emerald-500/20 to-amber-300/30 rounded-3xl blur-md"></div>
                
                {/* Main Hero Card */}
                <div className="relative rounded-2xl overflow-hidden bg-emerald-900 border-2 border-amber-400/60 shadow-2xl group">
                  <img
                    src={schoolInfo.heroImageUrl || SCHOOL_PHOTOS.classroomLearning.url}
                    alt={schoolInfo.heroImageAlt || "Suasana Belajar Aktif di Ruang Kelas SD Qur'an Para Sahabat Kampung Baru"}
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => setLightboxImage({
                      url: schoolInfo.heroImageUrl || SCHOOL_PHOTOS.classroomLearning.url,
                      title: schoolInfo.heroImageAlt || "Suasana Belajar Aktif di Ruang Kelas SD Qur'an Para Sahabat",
                      alt: schoolInfo.heroImageAlt || "SD Qur'an Para Sahabat Kampung Baru"
                    })}
                  />
                  
                  <div className="p-5 bg-gradient-to-t from-emerald-950 via-emerald-900 to-emerald-900/90 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpenCheck className="w-4 h-4" />
                        {schoolInfo.heroBadgeText || "Program Tahfizh & Tahsin"}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-emerald-950">
                        SPMB {spmbConfig.academicYear}
                      </span>
                    </div>

                    <p className="text-xs text-emerald-100 leading-relaxed">
                      "Tempat anak belajar, menghafal Al-Qur'an, membangun akhlak mulia, mengembangkan potensi, dan meraih prestasi terbaik."
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-emerald-800 text-xs text-emerald-300">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        Muara Tembesi, Batang Hari
                      </span>
                      <a 
                        href={defaultWaUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-300 hover:text-white font-medium flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Info Pendaftaran
                      </a>
                    </div>
                  </div>
                </div>

                {/* Floating pill badge */}
                <div className="absolute -bottom-4 -left-4 bg-white text-emerald-950 px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold leading-tight">SPP Mulai Rp200.000/bln</span>
                    <span className="text-[10px] text-slate-500">Pendidikan Berkualitas & Terjangkau</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SPMB 2026/2027 PROMINENT CALLOUT BANNER */}
      <section id="spmb-alert-banner" className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-emerald-950 py-3.5 shadow-sm border-b border-amber-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-950 text-amber-400 flex items-center justify-center flex-shrink-0 font-bold shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                Penerimaan Siswa Baru (SPMB) Tahun Ajaran {spmbConfig.academicYear} Telah Dibuka!
              </h3>
              <p className="text-xs font-medium text-emerald-900">
                Total Biaya Pendaftaran Lengkap: Rp2.650.000 • Baju Seragam 3 Stel • Kuota Terbatas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('spmb')}
              className="px-5 py-2 bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-bold text-xs rounded-full shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Daftar Online</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs rounded-full shadow-sm transition-colors"
            >
              Konsultasi WA
            </a>
          </div>
        </div>
      </section>

      {/* 3. SECTION TENTANG SEKOLAH (Two Columns) */}
      <section id="tentang-sekolah" className="py-16 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual with Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-emerald-100">
                <img
                  src={imgTentangSekolah}
                  alt="Kegiatan siswa dan guru SD Qur'an Para Sahabat Kampung Baru"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-3 py-1 bg-amber-400 text-emerald-950 rounded-full text-xs font-bold mb-1 shadow-sm">
                    Sekolah Berbasis Al-Qur'an
                  </span>
                  <p className="text-xs text-emerald-100">
                    Memadukan kurikulum pendidikan umum, tahfizh, tahsin, dan adab Islami.
                  </p>
                </div>
              </div>

              {/* Decorative side quote */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#F4F7F2] border border-emerald-200 p-4 rounded-2xl shadow-sm max-w-xs">
                <p className="text-xs text-emerald-950 font-medium italic">
                  "Sebaik-baik kalian adalah orang yang belajar Al-Qur'an dan mengajarkannya."
                </p>
                <span className="block text-[10px] text-emerald-700 font-bold mt-1">
                  (HR. Bukhari)
                </span>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Mengenal Lebih Dekat
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-serif">
                  Tentang SD Qur'an Para Sahabat
                </h2>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                <strong>SD Qur'an Para Sahabat Kampung Baru</strong> adalah lembaga pendidikan tingkat Sekolah Dasar di Muara Tembesi, Kabupaten Batang Hari, Provinsi Jambi yang berkomitmen menghadirkan pendidikan bermutu tinggi dengan mengintegrasikan kurikulum nasional dan kekhasan Al-Qur'an.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F4F7F2] border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-emerald-950 font-bold">Pendidikan Al-Qur'an Terpadu</strong>
                    <span className="text-slate-600">Tahfizh, Tahsin bertajwid, dan bimbingan makharijul huruf intensif.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F4F7F2] border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-emerald-950 font-bold">Pembentukan Akhlak & Adab</strong>
                    <span className="text-slate-600">Menanamkan keteladanan para Sahabat Nabi dan adab sebelum ilmu.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F4F7F2] border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-emerald-950 font-bold">Penguatan Akademik</strong>
                    <span className="text-slate-600">Literasi, numerasi, sains, dan keterampilan berpikir kritis.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F4F7F2] border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-emerald-950 font-bold">Pengembangan Potensi Siswa</strong>
                    <span className="text-slate-600">Bahasa Arab dasar, olahraga jasmani, dan kreativitas islami.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActiveView('tentang')}
                  className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-sm rounded-full transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>Profil Lengkap & Visi Misi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveView('tahfizh')}
                  className="px-6 py-2.5 bg-white hover:bg-[#F4F7F2] text-emerald-950 border border-emerald-200 font-semibold text-sm rounded-full transition-colors shadow-sm"
                >
                  Lihat Program Tahfizh
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SECTION PROGRAM UNGGULAN (6 Program Cards) */}
      <section id="program-unggulan" className="py-16 lg:py-24 bg-[#F4F7F2] relative border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-white px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
              Pendidikan Holistik Islami
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-serif">
              Program Unggulan Sekolah
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Kami menyusun program terpadu untuk mendidik akal, menyucikan jiwa, dan melatih keterampilan hidup siswa sejak dini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div 
                key={prog.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-emerald-100 flex flex-col justify-between group hover:border-emerald-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                      {getIcon(prog.iconName)}
                    </div>
                    {prog.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        {prog.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-emerald-950 mb-1 font-serif group-hover:text-emerald-800 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-amber-700 font-medium mb-3">
                    {prog.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {prog.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    {prog.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="text-emerald-600 font-bold mt-0.5">•</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => prog.id === 'tahsin-tahfizh' ? setActiveView('tahfizh') : setActiveView('program')}
                    className="text-xs font-bold text-emerald-700 group-hover:text-emerald-900 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Pelajari Selengkapnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SECTION KHUSUS TAHFIZH (The Strongest Feature Section) */}
      <section 
        id="section-khusus-tahfizh" 
        className="py-16 lg:py-24 bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white relative overflow-hidden"
      >
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-400/40">
                <BookOpenCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Pilar Utama Sekolah</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif leading-tight">
                Unggulan Kami: Tahfizh & Tahsin Al-Qur'an
              </h2>

              <p className="text-base text-emerald-100/90 leading-relaxed">
                Al-Qur'an menjadi bagian penting dalam pendidikan di <strong>SD Qur'an Para Sahabat</strong>. Melalui program Tahfizh dan Tahsin, siswa dibimbing untuk mencintai, membaca dengan tajwid yang benar, memahami kandungan dasar, dan menghafal Al-Qur'an secara bertahap sesuai kemampuan anak.
              </p>

              {/* Step Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl bg-emerald-900/80 border border-emerald-700/60">
                  <span className="text-amber-400 font-bold text-sm block">1. Target Hafalan Bertahap</span>
                  <p className="text-xs text-emerald-200 mt-1">Fokus Juz 30, Juz 29, dan surat-surat pilihan dengan target harian terukur.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-900/80 border border-emerald-700/60">
                  <span className="text-amber-400 font-bold text-sm block">2. Bimbingan Tahsin Intensif</span>
                  <p className="text-xs text-emerald-200 mt-1">Pembenaran makhraj huruf dan hukum tajwid sebelum memulai hafalan ayat.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-900/80 border border-emerald-700/60">
                  <span className="text-amber-400 font-bold text-sm block">3. Setoran & Muraja'ah Harian</span>
                  <p className="text-xs text-emerald-200 mt-1">Setoran langsung kepada Ustadz/Ustadzah dan pengulangan hafalan konsisten.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-900/80 border border-emerald-700/60">
                  <span className="text-amber-400 font-bold text-sm block">4. Mutaba'ah & Apresiasi</span>
                  <p className="text-xs text-emerald-200 mt-1">Buku kontrol hafalan bersama orang tua serta wisuda tahfizh berkala.</p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => setActiveView('tahfizh')}
                  className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold text-sm rounded-full shadow-sm transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-emerald-950" />
                  <span>Buka Halaman Khusus Tahfizh</span>
                </button>
              </div>

            </div>

            {/* Right Interactive Progress Showcase */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-emerald-900/90 rounded-2xl p-6 border border-emerald-700/80 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
                  <div>
                    <h4 className="font-bold text-white text-base">Alur Capaian Hafalan Siswa</h4>
                    <p className="text-xs text-emerald-300">Jenjang Pendidikan SD Qur'an</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-400 text-emerald-950 rounded-full text-xs font-bold">
                    Juz 30 & 29
                  </span>
                </div>

                {/* Simulated Visual Progress Level */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-emerald-100 font-medium">Tingkat 1: Tahsin & Juz 30 (Surat Pendek)</span>
                      <span className="text-amber-400 font-bold">100% Fondasi</span>
                    </div>
                    <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-emerald-100 font-medium">Tingkat 2: Kelancaran Juz 30 Lengkap (37 Surat)</span>
                      <span className="text-amber-400 font-bold">Target Inti</span>
                    </div>
                    <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-4/5"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-emerald-100 font-medium">Tingkat 3: Penguatan Juz 29 & Surat Pilihan</span>
                      <span className="text-amber-400 font-bold">Pengembangan</span>
                    </div>
                    <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-3/5"></div>
                    </div>
                  </div>
                </div>

                {/* Rating Card Example from Prompt */}
                <div className="p-4 bg-emerald-950/80 rounded-2xl border border-emerald-800 text-center space-y-2">
                  <span className="text-xs font-semibold text-emerald-300">Indikator Mutu Setoran</span>
                  <div className="flex items-center justify-center gap-1 text-amber-400 text-lg">
                    ★ ★ ★ ★ ★
                  </div>
                  <p className="text-xs text-emerald-200">
                    Tajwid Tartil • Makharijul Huruf Fasih • Hafalan Mutqin
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. KEUNGGULAN SEKOLAH (Mengapa Memilih SD Qur'an Para Sahabat?) */}
      <section id="keunggulan-sekolah" className="py-16 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
              Pilihan Terbaik Orang Tua
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-serif">
              Mengapa Memilih SD Qur'an Para Sahabat?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Enam pilar keunggulan yang menjadikan sekolah kami mitra terpercaya dalam mendidik buah hati Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2 font-serif">Berbasis Al-Qur'an</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seluruh aktivitas pendidikan dilandasi oleh nilai-nilai Al-Qur'an dan Sunnah, menumbuhkan kecintaan terhadap firman Allah sejak usia dini.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2 font-serif">Program Tahfizh & Tahsin</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Metode Talaqqi ramah anak yang terstruktur, setoran hafalan harian, dan evaluasi berkala untuk memastikan kualitas bacaan bertajwid.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2 font-serif">Pembentukan Akhlak Mulia</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menanamkan adab, kesantunan, kedisiplinan, dan tanggung jawab dengan meneladani kemuliaan karakter para Sahabat Nabi Muhammad SAW.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2 font-serif">Lingkungan Belajar Islami</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Suasana sekolah yang bersih, santun, bebas dari perundungan (bullying), membiasakan shalat dhuha, shalat berjamaah, dan doa harian.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm mb-4">
                5
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2 font-serif">Pembelajaran Akademik Kuat</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kurikulum nasional yang diajarkan secara interaktif untuk memperkuat literasi, numerasi, pemahaman sains, dan nalar kritis siswa.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm mb-4">
                6
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2 font-serif">Pengembangan Potensi Siswa</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wadah eksplorasi bakat anak melalui bahasa Arab dasar, kaligrafi, public speaking (da'i cilik), olahraga sunnah, dan kegiatan pramuka.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. KEGIATAN SEKOLAH & GALERI WITH LIGHTBOX */}
      <section id="galeri-kegiatan" className="py-16 lg:py-24 bg-[#F4F7F2] relative border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-white px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                Dokumentasi & Aktivitas
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-serif mt-2">
                Kegiatan SD Qur'an Para Sahabat
              </h2>
            </div>
            <button
              onClick={() => setActiveView('kegiatan')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Lihat Semua Galeri</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['Semua', 'Tahfizh', 'Pembelajaran', 'Kegiatan Islami', 'Upacara', 'Tahsin'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveGalleryCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeGalleryCategory === cat
                    ? 'bg-emerald-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-emerald-100 hover:bg-emerald-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-emerald-100 flex flex-col cursor-pointer"
                onClick={() => setLightboxImage({ url: item.imageUrl, title: item.title, alt: item.imageAlt })}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-2.5 rounded-full bg-white/90 text-emerald-950 shadow-lg">
                      <Eye className="w-5 h-5" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/90 text-amber-300 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-sm text-emerald-950 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <span className="text-[10px] text-slate-400 mt-3 block font-mono">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. PRESTASI SISWA */}
      <section id="prestasi-siswa" className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
              Pencapaian & Bakat
            </span>
            <h2 className="text-3xl font-extrabold text-emerald-950 font-serif">
              Prestasi Siswa
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Dokumentasi capaian dan partisipasi peserta didik dalam ajang keagamaan maupun umum.
            </p>
          </div>

          {achievements.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#F4F7F2] border border-emerald-200 text-center max-w-xl mx-auto space-y-2">
              <Trophy className="w-10 h-10 text-amber-500 mx-auto" />
              <h4 className="font-bold text-emerald-950 text-base font-serif">Prestasi Siswa</h4>
              <p className="text-xs text-slate-600">
                Prestasi siswa akan segera diperbarui secara berkala seiring berjalannya kegiatan lomba dan tahfizh.
              </p>
              <button
                onClick={() => setActiveView('prestasi')}
                className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
              >
                Lihat Info Prestasi & Pengembangan Bakat →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((ach) => (
                <div key={ach.id} className="p-5 rounded-2xl bg-[#F4F7F2] border border-emerald-100 shadow-sm">
                  <span className="text-xs font-bold text-amber-600">{ach.level}</span>
                  <h4 className="font-bold text-emerald-950 mt-1 font-serif">{ach.title}</h4>
                  <p className="text-xs text-slate-600 mt-1">{ach.competitionName} ({ach.year})</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 9. FASILITAS PREVIEW */}
      <section id="fasilitas-sekolah" className="py-16 lg:py-24 bg-[#F4F7F2] relative border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-white px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                Sarana Pembelajaran
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-serif mt-2">
                Fasilitas Penunjang Belajar
              </h2>
            </div>
            <button
              onClick={() => setActiveView('fasilitas')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Lihat Detail Semua Fasilitas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.slice(0, 3).map((fac) => (
              <div key={fac.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-100">
                <img
                  src={fac.imageUrl}
                  alt={fac.imageAlt}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h4 className="font-bold text-base text-emerald-950 font-serif">{fac.name}</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{fac.description}</p>
                  {fac.capacity && (
                    <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-800">
                      {fac.capacity}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. SECTION SPMB / PENERIMAAN SISWA BARU (Biaya Transparan & Persyaratan) */}
      <section id="spmb-section" className="py-16 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
              Penerimaan Siswa Baru
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-serif">
              SPMB 2026/2027 SD Qur'an Para Sahabat
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Bergabunglah bersama keluarga besar SD Qur'an Para Sahabat Kampung Baru. Pendaftaran terbuka bagi calon siswa baru dan pindahan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Transparent Fees Box (From Poster: Rp2.650.000) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950 to-emerald-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-amber-400/40 relative overflow-hidden">
              <IslamicPattern opacity={0.05} />

              <div className="relative">
                <div className="flex items-center justify-between border-b border-emerald-800 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Rincian Biaya Investasi Pendidikan
                    </span>
                    <h3 className="text-2xl font-bold text-white font-serif">
                      Total: Rp{spmbConfig.totalFee.toLocaleString('id-ID')}
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-amber-400 text-emerald-950 font-bold rounded-full text-xs">
                    {spmbConfig.waveName}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {spmbConfig.feeItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-900/60 border border-emerald-800/60">
                      <div>
                        <span className="font-semibold text-emerald-100 block">{item.name}</span>
                        {item.description && (
                          <span className="text-[11px] text-emerald-300/80">{item.description}</span>
                        )}
                      </div>
                      <span className="font-bold text-amber-300 text-sm whitespace-nowrap ml-3">
                        Rp{item.amount.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3.5 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-xs text-amber-200 flex items-center justify-between">
                  <span><strong>SPP Bulanan:</strong> Mulai Rp{spmbConfig.sppMonthly.toLocaleString('id-ID')}/bulan</span>
                  <span className="text-[11px] text-amber-300/90">*Dapat disesuaikan</span>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setActiveView('spmb')}
                    className="flex-1 py-3 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold text-sm rounded-full text-center shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-950" />
                    <span>DAFTAR SEKARANG</span>
                  </button>

                  <a
                    href={defaultWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm rounded-full text-center border border-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>KONSULTASI VIA WHATSAPP</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Requirements Card */}
            <div className="lg:col-span-6 bg-[#F4F7F2] rounded-2xl p-6 sm:p-8 border border-emerald-100 space-y-5">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700">
                  Berkas Pendaftaran
                </span>
                <h3 className="text-2xl font-bold text-emerald-950 font-serif mt-1">
                  Persyaratan Pendaftaran
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Siapkan dokumen fisik berikut saat melakukan pendaftaran langsung atau verifikasi berkas:
                </p>
              </div>

              <div className="space-y-2.5">
                {spmbConfig.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-emerald-100 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{req}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
                ⚠️ Catatan: Persyaratan berkas dapat diserahkan secara bertahap dan dapat berubah sesuai kebijakan sekolah.
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveView('spmb')}
                  className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-sm rounded-full transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Buka Halaman Pendaftaran Lengkap</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. BERITA & ARTIKEL TERBARU (SEO Content Hub) */}
      <section id="berita-section" className="py-16 lg:py-24 bg-[#F4F7F2] relative border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-white px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                Kabar Sekolah & Edukasi
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-serif mt-2">
                Berita & Artikel Terkini
              </h2>
            </div>
            <button
              onClick={() => setActiveView('berita')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-emerald-100 flex flex-col group cursor-pointer"
                onClick={() => {
                  setSelectedArticleSlug(art.slug);
                  setActiveView('berita-detail');
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={art.featuredImage}
                    alt={art.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900 text-amber-300">
                    {art.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1 font-mono">
                      {art.date} • {art.readTimeMinutes} menit baca
                    </span>
                    <h3 className="font-bold text-base text-emerald-950 group-hover:text-emerald-700 transition-colors line-clamp-2 font-serif">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 12. LOCAL SEO & GOOGLE MAPS / OPERATING HOURS */}
      <section id="lokasi-pelayanan" className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border-2 border-emerald-800">
            <IslamicPattern opacity={0.05} />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-400">
                  Informasi Lokasi & Pelayanan
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                  SD Qur'an Para Sahabat Kampung Baru
                </h3>
                <p className="text-sm text-emerald-200">
                  Kecamatan Muara Tembesi, Kabupaten Batang Hari, Provinsi Jambi, Indonesia.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-emerald-900/70 rounded-2xl border border-emerald-800">
                    <span className="font-bold text-amber-300 block mb-1">Senin – Kamis</span>
                    <p className="text-emerald-100">{schoolInfo.operatingHours.mondayThursday}</p>
                  </div>

                  <div className="p-3 bg-emerald-900/70 rounded-2xl border border-emerald-800">
                    <span className="font-bold text-amber-300 block mb-1">Jum'at & Sabtu</span>
                    <p className="text-emerald-100">{schoolInfo.operatingHours.friday}</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={schoolInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-full text-xs flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <MapPin className="w-4 h-4 text-emerald-950" />
                    <span>Buka Lokasi di Google Maps</span>
                  </a>

                  <a
                    href={defaultWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-full text-xs flex items-center gap-2 border border-emerald-600 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>Chat WhatsApp ({schoolInfo.whatsapp})</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-emerald-900/80 p-6 rounded-2xl border border-emerald-700/70 text-xs space-y-3">
                <h4 className="font-bold text-amber-300 text-sm">Sekretariat SPMB SD Qur'an</h4>
                <p className="text-emerald-100 leading-relaxed">
                  Para orang tua dapat berkonsultasi mengenai kurikulum, program hafalan Al-Qur'an, dan melakukan pendaftaran langsung di kantor sekolah.
                </p>
                <div className="pt-2 border-t border-emerald-800 space-y-1.5 text-emerald-200">
                  <p><strong>Kontak Telepon:</strong> {schoolInfo.phone}</p>
                  <p><strong>Email Resmi:</strong> {schoolInfo.email}</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 13. FAQ SECTION */}
      <section id="faq-section" className="py-16 lg:py-24 bg-[#F4F7F2] relative border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-white px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
              Tanya Jawab
            </span>
            <h2 className="text-3xl font-extrabold text-emerald-950 font-serif">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Informasi lengkap seputar program Tahfizh, SPMB, dan kegiatan sekolah.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-emerald-50/50 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-emerald-950 font-serif">
                      {faq.question}
                    </span>
                    <span className={`w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      ↓
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-emerald-50 pt-3 bg-emerald-50/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setActiveView('faq')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline"
            >
              Lihat Seluruh Tanya Jawab (FAQ Lengkap) →
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

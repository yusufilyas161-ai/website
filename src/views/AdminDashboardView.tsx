import React, { useState, useRef } from 'react';
import { 
  Settings, 
  FileText, 
  Users, 
  DollarSign, 
  Image as ImageIcon, 
  Building2, 
  HelpCircle, 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Download,
  RotateCcw,
  Eye,
  Trophy,
  Upload,
  Sparkles,
  KeyRound,
  User,
  ShieldCheck,
  EyeOff,
  ImageIcon as ImageLucide,
  Layers,
  Copy,
  Maximize2,
  X,
  Camera,
  FolderHeart
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { Article, FacilityItem, GalleryItem, FaqItem, FeeItem, Applicant, AchievementItem } from '../types';
import { SCHOOL_PHOTOS } from '../data/schoolImages';
import { ImageUploader } from '../components/ImageUploader';
import { SchoolLogo } from '../components/SchoolLogo';

export const AdminDashboardView: React.FC = () => {
  const { 
    schoolInfo, updateSchoolInfo,
    spmbConfig, updateSpmbConfig,
    articles, addArticle, updateArticle, deleteArticle,
    gallery, addGalleryItem, deleteGalleryItem,
    facilities, addFacility, deleteFacility,
    achievements, addAchievement, updateAchievement, deleteAchievement,
    faqs, addFaq, deleteFaq,
    applicants, updateApplicantStatus, deleteApplicant,
    resetToDefaults,
    setIsAdminLoggedIn,
    setActiveView
  } = useSchool();

  const [activeTab, setActiveTab] = useState<
    'media' | 'info' | 'spmb' | 'applicants' | 'articles' | 'gallery' | 'facilities' | 'achievements' | 'faqs'
  >('media');

  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Lightbox preview state
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; desc?: string } | null>(null);

  // Quick media upload state in Media Tab
  const [quickMediaSection, setQuickMediaSection] = useState<'gallery' | 'facility' | 'achievement'>('gallery');
  const [quickMediaTitle, setQuickMediaTitle] = useState('');
  const [quickMediaCategory, setQuickMediaCategory] = useState('Tahfizh');
  const [quickMediaDesc, setQuickMediaDesc] = useState('');
  const [quickMediaImage, setQuickMediaImage] = useState(SCHOOL_PHOTOS.classroomLearning.url);
  const [quickMediaExtra, setQuickMediaExtra] = useState(''); // capacity for facility / winner for achievement

  // Local state for school info editing
  const [localInfo, setLocalInfo] = useState({
    ...schoolInfo,
    logoUrl: schoolInfo.logoUrl || '',
    logoAlt: schoolInfo.logoAlt || "Logo SD Qur'an Para Sahabat Kampung Baru",
    heroImageUrl: schoolInfo.heroImageUrl || SCHOOL_PHOTOS.classroomLearning.url,
    heroImageAlt: schoolInfo.heroImageAlt || "Suasana Belajar Aktif di Ruang Kelas SD Qur'an Para Sahabat Kampung Baru",
    heroBadgeText: schoolInfo.heroBadgeText || "Program Tahfizh & Tahsin",
    adminUsername: schoolInfo.adminUsername || "admin",
    adminPassword: schoolInfo.adminPassword || "sd quran para sahabat kampung baru"
  });

  // Local state for SPMB editing
  const [localSpmb, setLocalSpmb] = useState({
    ...spmbConfig,
    brochureUrl: spmbConfig.brochureUrl || SCHOOL_PHOTOS.spmbFlyer.url
  });

  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // New Article Form Modal
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    slug: '',
    category: 'Berita Sekolah',
    author: 'Admin SD Qur\'an Para Sahabat',
    authorRole: 'Humas Sekolah',
    date: new Date().toISOString().split('T')[0],
    readTimeMinutes: 3,
    summary: '',
    content: '',
    featuredImage: SCHOOL_PHOTOS.classroomLearning.url,
    imageAlt: 'Kegiatan SD Quran Para Sahabat',
    tags: ['SD Quran', 'Pendidikan', 'Tahfizh']
  });

  // New Gallery Form
  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Tahfizh',
    imageUrl: SCHOOL_PHOTOS.classroomLearning.url,
    imageAlt: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  // New Facility Form
  const [newFacility, setNewFacility] = useState<Partial<FacilityItem>>({
    name: '',
    description: '',
    imageUrl: SCHOOL_PHOTOS.classroomLearning.url,
    imageAlt: '',
    capacity: ''
  });

  // New Achievement Form
  const [newAchievement, setNewAchievement] = useState<Partial<AchievementItem>>({
    title: '',
    category: 'Tahfizh & PAI',
    year: '2026',
    winnerName: '',
    competitionLevel: 'Kecamatan',
    description: '',
    imageUrl: SCHOOL_PHOTOS.pentasPaiTrophy.url
  });
  const [achievementInlineError, setAchievementInlineError] = useState<string | null>(null);

  // Achievement Modal (Add & Edit)
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<AchievementItem | null>(null);
  const [achievementModalData, setAchievementModalData] = useState<Partial<AchievementItem>>({
    title: '',
    category: 'Tahfizh & PAI',
    year: '2026',
    winnerName: '',
    competitionLevel: 'Kecamatan',
    description: '',
    imageUrl: SCHOOL_PHOTOS.pentasPaiTrophy.url
  });
  const [achievementModalError, setAchievementModalError] = useState<string | null>(null);

  // New FAQ Form
  const [newFaq, setNewFaq] = useState<Partial<FaqItem>>({
    question: '',
    answer: '',
    category: 'Tahfizh'
  });

  const showNotification = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 3500);
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolInfo(localInfo);
    showNotification('Foto Sampul Hero, Profil & Kredensial Admin CMS berhasil disimpan!');
  };

  const handleSaveSpmb = (e: React.FormEvent) => {
    e.preventDefault();
    updateSpmbConfig(localSpmb);
    showNotification('Pengaturan SPMB, Brosur & Rincian Biaya berhasil disimpan!');
  };

  // Helper for file upload conversion to Data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSuccess(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeeItem = () => {
    const newItem: FeeItem = {
      id: `fee-${Date.now()}`,
      name: 'Komponen Baru',
      amount: 50000,
      description: 'Deskripsi komponen'
    };
    const updatedFees = [...localSpmb.feeItems, newItem];
    const total = updatedFees.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    setLocalSpmb({
      ...localSpmb,
      feeItems: updatedFees,
      totalFee: total
    });
  };

  const handleRemoveFeeItem = (id: string) => {
    const updatedFees = localSpmb.feeItems.filter(f => f.id !== id);
    const total = updatedFees.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    setLocalSpmb({
      ...localSpmb,
      feeItems: updatedFees,
      totalFee: total
    });
  };

  const handleUpdateFeeItem = (id: string, field: keyof FeeItem, value: any) => {
    const updatedFees = localSpmb.feeItems.map(f => {
      if (f.id === id) {
        return { ...f, [field]: value };
      }
      return f;
    });
    const total = updatedFees.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    setLocalSpmb({
      ...localSpmb,
      feeItems: updatedFees,
      totalFee: total
    });
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.content) {
      alert('Judul dan Isi Konten wajib diisi');
      return;
    }

    const autoSlug = newArticle.slug || newArticle.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (editingArticle) {
      updateArticle(editingArticle.id, {
        ...newArticle,
        slug: autoSlug
      } as Article);
      showNotification('Artikel berhasil diperbarui!');
    } else {
      addArticle({
        title: newArticle.title || '',
        slug: autoSlug,
        category: newArticle.category || 'Berita Sekolah',
        author: newArticle.author || 'Admin',
        authorRole: newArticle.authorRole || 'Humas',
        date: newArticle.date || new Date().toISOString().split('T')[0],
        readTimeMinutes: Number(newArticle.readTimeMinutes) || 3,
        summary: newArticle.summary || '',
        content: newArticle.content || '',
        featuredImage: newArticle.featuredImage || SCHOOL_PHOTOS.classroomLearning.url,
        imageAlt: newArticle.imageAlt || newArticle.title || '',
        tags: Array.isArray(newArticle.tags) ? newArticle.tags : ['SD Quran']
      });
      showNotification('Artikel baru berhasil dipublikasikan!');
    }

    setIsArticleModalOpen(false);
    setEditingArticle(null);
  };

  const handleExportApplicantsCsv = () => {
    if (applicants.length === 0) {
      alert('Belum ada data pendaftar.');
      return;
    }
    const headers = ['No', 'ID Registrasi', 'Tanggal', 'Nama Calon Siswa', 'Panggilan', 'Gender', 'TTL', 'Nama Orang Tua', 'No WA', 'Status', 'Alamat', 'KIP/KKS'];
    const rows = applicants.map((app, idx) => [
      idx + 1,
      app.id,
      app.createdAt,
      `"${app.fullName}"`,
      `"${app.nickname || ''}"`,
      app.gender,
      `"${app.birthPlace || ''}, ${app.birthDate || ''}"`,
      `"${app.parentName}"`,
      `"${app.parentPhone}"`,
      app.status,
      `"${app.parentAddress || ''}"`,
      app.hasKipKks ? 'Ya' : 'Tidak'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Pendaftar_SPMB_SD_Quran_Para_Sahabat_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const presetPhotos = Object.values(SCHOOL_PHOTOS);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24">
      
      {/* Top Admin Bar */}
      <header className="bg-emerald-950 border-b border-emerald-800 sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold text-sm shadow">
            CMS
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-white">
              Panel Pengelola Konten (CMS)
            </h1>
            <p className="text-[11px] text-emerald-300">
              SD Qur'an Para Sahabat Kampung Baru, Muara Tembesi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('home')}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-700 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Website</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin keluar dari mode admin?')) {
                setIsAdminLoggedIn(false);
                sessionStorage.removeItem('sdq_admin_auth_v1');
                setActiveView('home');
              }
            }}
            className="px-3.5 py-1.5 rounded-xl bg-red-950 hover:bg-red-900 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-red-800 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Save Success Alert Banner */}
      {saveSuccessMessage && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs text-center font-bold flex items-center justify-center gap-2 animate-in fade-in sticky top-14 z-30 shadow-lg">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ring-1 ${
              activeTab === 'media' 
                ? 'bg-amber-400 text-emerald-950 shadow-md ring-amber-300 font-extrabold' 
                : 'bg-emerald-950/70 text-emerald-300 hover:bg-emerald-900 ring-emerald-700/50'
            }`}
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Pusat Media & Upload Foto</span>
            <span className="px-1.5 py-0.2 text-[9px] rounded-md bg-emerald-800 text-emerald-100 font-mono">UTAMA</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'info' 
                ? 'bg-amber-400 text-emerald-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profil Sekolah & Akun</span>
          </button>

          <button
            onClick={() => setActiveTab('spmb')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'spmb' 
                ? 'bg-amber-400 text-emerald-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>SPMB & Biaya</span>
          </button>

          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all relative ${
              activeTab === 'applicants' 
                ? 'bg-amber-400 text-emerald-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Data Pendaftar ({applicants.length})</span>
            {applicants.some(a => a.status === 'Menunggu') && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'achievements' 
                ? 'bg-amber-400 text-emerald-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Prestasi ({achievements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'articles' 
                ? 'bg-amber-400 text-emerald-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Berita & Artikel ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'gallery' 
                ? 'bg-amber-400 text-emerald-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Galeri Foto ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'facilities' 
                ? 'bg-amber-400 text-emerald-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Fasilitas ({facilities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === 'faqs' 
                ? 'bg-amber-400 text-emerald-950 shadow-md' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Tanya Jawab (FAQ)</span>
          </button>
        </div>

        {/* TAB 0: MEDIA & PHOTO UPLOAD CENTER (NEW ALL-IN-ONE CMS STUDIO) */}
        {activeTab === 'media' && (
          <div className="space-y-8 max-w-6xl">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/40 shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pusat Manajemen Foto & Media Sekolah</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Unggah Logo Profil, Foto Sampul & Galeri
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
                    Kelola seluruh visual website dalam satu tempat. Unggah langsung dari Galeri HP/Laptop dengan <strong className="text-amber-300">kompresi otomatis pintar</strong> agar loading website tetap super cepat & hemat kuota.
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      updateSchoolInfo(localInfo);
                      updateSpmbConfig(localSpmb);
                      showNotification('Semua perubahan media (Logo, Sampul, Brosur) berhasil disimpan!');
                    }}
                    className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-amber-400/20 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Semua Media</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView('home')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Lihat Hasil di Website</span>
                  </button>
                </div>
              </div>

              {/* Status Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Status Logo</span>
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    {localInfo.logoUrl ? 'Logo Kustom Terpasang' : 'Lambang Default Aktif'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Sampul Depan (Hero)</span>
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                    Aktif di Beranda
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Total Foto Galeri</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{gallery.length} Dokumentasi</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Total Foto Fasilitas</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{facilities.length} Sarana</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: LOGO PROFIL & HERO BANNER (SIDE BY SIDE ON DESKTOP) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card 1: Logo Profil Sekolah */}
              <div className="bg-slate-800 p-6 rounded-3xl border-2 border-emerald-500/40 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-white text-base">1. Logo Profil Sekolah</h3>
                        <p className="text-[11px] text-slate-400">Tampil di Navbar, Footer, & Kartu Beranda</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-900/80 text-emerald-300 text-[10px] font-bold border border-emerald-700">
                      {localInfo.logoUrl ? 'Kustom' : 'Default'}
                    </span>
                  </div>

                  {/* Live Mockup Preview */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700/80 space-y-2.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Pratinjau Nyata di Header:
                    </span>
                    <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-1 rounded-xl bg-emerald-900 border border-emerald-700 shadow">
                          <SchoolLogo size="md" customLogoUrl={localInfo.logoUrl} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white leading-tight">SD QUR'AN PARA SAHABAT</div>
                          <div className="text-[10px] text-amber-400 font-medium">Kampung Baru, Muara Tembesi</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-800 text-emerald-200">Navbar</span>
                    </div>
                  </div>

                  <ImageUploader
                    label="Unggah File Foto Logo"
                    subLabel="Pilih gambar logo format PNG, JPG, atau WebP (disarankan latar transparan)"
                    currentValue={localInfo.logoUrl || ''}
                    onChange={(newUrl) => {
                      setLocalInfo({ ...localInfo, logoUrl: newUrl });
                      showNotification('Logo sekolah diperbarui! Klik "Simpan Logo Profil" di bawah.');
                    }}
                    aspectRatio="square"
                    compressionOptions={{ maxWidth: 500, maxHeight: 500, quality: 0.85 }}
                    showPresets={false}
                    placeholderText="Upload file gambar logo atau tempel tautan URL logo..."
                  />
                </div>

                <div className="pt-2 border-t border-slate-700 flex items-center justify-between gap-2">
                  {localInfo.logoUrl ? (
                    <button
                      type="button"
                      onClick={() => {
                        setLocalInfo({ ...localInfo, logoUrl: '' });
                        showNotification('Logo direset ke Lambang Al-Qur\'an default!');
                      }}
                      className="text-xs text-amber-300 hover:text-amber-200 underline underline-offset-2"
                    >
                      Reset ke Lambang Default
                    </button>
                  ) : <span className="text-xs text-slate-500">Menggunakan lambang resmi</span>}

                  <button
                    type="button"
                    onClick={() => {
                      updateSchoolInfo(localInfo);
                      showNotification('Logo Profil Sekolah berhasil disimpan!');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Logo Profil</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Foto Sampul Depan (Hero Cover Banner) */}
              <div className="bg-slate-800 p-6 rounded-3xl border-2 border-amber-400/40 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-600 text-amber-400">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-white text-base">2. Foto Sampul Depan (Hero)</h3>
                        <p className="text-[11px] text-slate-400">Kartu utama Beranda "Sekolah Berbasis Al-Qur'an"</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-900/80 text-amber-300 text-[10px] font-bold border border-amber-700">
                      Tampil di Beranda
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Label Badge Teks Foto Sampul:
                    </label>
                    <input
                      type="text"
                      value={localInfo.heroBadgeText || ''}
                      onChange={e => setLocalInfo({ ...localInfo, heroBadgeText: e.target.value })}
                      placeholder="Contoh: Program Tahfizh & Tahsin"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>

                  <ImageUploader
                    label="Unggah Foto Sampul Utama"
                    subLabel="Disarankan foto landscape aktivitas belajar santri atau gedung sekolah"
                    currentValue={localInfo.heroImageUrl}
                    onChange={(newUrl) => {
                      setLocalInfo({ ...localInfo, heroImageUrl: newUrl });
                      showNotification('Foto sampul hero diperbarui! Klik "Simpan Foto Sampul" di bawah.');
                    }}
                    aspectRatio="banner"
                    compressionOptions={{ maxWidth: 1280, maxHeight: 800, quality: 0.82 }}
                    showPresets={true}
                    placeholderText="Upload file gambar sampul atau pilih salah satu dokumentasi resmi sekolah..."
                  />
                </div>

                <div className="pt-2 border-t border-slate-700 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      updateSchoolInfo(localInfo);
                      showNotification('Foto Sampul Utama berhasil disimpan!');
                    }}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Foto Sampul</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 2: BROSUR SPMB */}
            <div className="bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-amber-400" />
                    <span>3. Foto Brosur / Flyer Resmi SPMB</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Brosur digital ini ditampilkan di halaman Pendaftaran SPMB dan dapat diunduh langsung oleh calon wali santri.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLocalSpmb({ ...localSpmb, brochureUrl: SCHOOL_PHOTOS.spmbFlyer.url });
                      showNotification('Brosur diatur ke Flyer Resmi SPMB!');
                    }}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-750 text-amber-300 rounded-xl text-xs font-medium border border-slate-700"
                  >
                    Gunakan Brosur Standar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateSpmbConfig(localSpmb);
                      showNotification('Brosur SPMB berhasil disimpan!');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Brosur</span>
                  </button>
                </div>
              </div>

              <ImageUploader
                label="Unggah File Brosur SPMB Terbaru"
                subLabel="Format portrait/landscape info pendaftaran santri baru tahun ajaran 2026/2027"
                currentValue={localSpmb.brochureUrl || ''}
                onChange={(newUrl) => {
                  setLocalSpmb({ ...localSpmb, brochureUrl: newUrl });
                  showNotification('Brosur SPMB diperbarui! Klik "Simpan Brosur" untuk menetapkan.');
                }}
                aspectRatio="auto"
                compressionOptions={{ maxWidth: 1200, maxHeight: 1600, quality: 0.82 }}
                showPresets={true}
                placeholderText="Upload brosur dari galeri/folder atau tempel tautan gambar..."
              />
            </div>

            {/* SECTION 3: QUICK UPLOAD TO GALLERY / FACILITIES / ACHIEVEMENTS */}
            <div className="bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald-400" />
                    <span>4. Unggah Cepat Foto ke Halaman Website</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tambahkan foto kegiatan, ruang kelas baru, atau dokumentasi piala santri tanpa berpindah menu.
                  </p>
                </div>

                {/* Section Selector */}
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setQuickMediaSection('gallery')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      quickMediaSection === 'gallery'
                        ? 'bg-amber-400 text-emerald-950 shadow'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Ke Galeri Kegiatan
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickMediaSection('facility')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      quickMediaSection === 'facility'
                        ? 'bg-amber-400 text-emerald-950 shadow'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Ke Fasilitas
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickMediaSection('achievement')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      quickMediaSection === 'achievement'
                        ? 'bg-amber-400 text-emerald-950 shadow'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Ke Prestasi
                  </button>
                </div>
              </div>

              {/* Quick Upload Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-700/80">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {quickMediaSection === 'gallery' ? 'Judul Kegiatan:' : quickMediaSection === 'facility' ? 'Nama Fasilitas:' : 'Nama Prestasi / Juara:'} *
                  </label>
                  <input
                    type="text"
                    value={quickMediaTitle}
                    onChange={e => setQuickMediaTitle(e.target.value)}
                    placeholder={
                      quickMediaSection === 'gallery' 
                        ? "Contoh: Setoran Hafalan Surat An-Naba' Santri Kelas 2" 
                        : quickMediaSection === 'facility' 
                        ? "Contoh: Laboratorium Komputer & Bahasa" 
                        : "Contoh: Juara 1 Tahfizh 2 Juz Tingkat Kabupaten"
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {quickMediaSection === 'gallery' ? 'Kategori Foto:' : quickMediaSection === 'facility' ? 'Kapasitas Ruang:' : 'Nama Santri Juara:'}
                  </label>
                  {quickMediaSection === 'gallery' ? (
                    <select
                      value={quickMediaCategory}
                      onChange={e => setQuickMediaCategory(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="Tahfizh">Tahfizh</option>
                      <option value="Pembelajaran">Pembelajaran</option>
                      <option value="Kegiatan Islami">Kegiatan Islami</option>
                      <option value="Upacara">Upacara</option>
                      <option value="Kegiatan Siswa">Kegiatan Siswa</option>
                      <option value="Prestasi">Prestasi</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={quickMediaExtra}
                      onChange={e => setQuickMediaExtra(e.target.value)}
                      placeholder={quickMediaSection === 'facility' ? "Contoh: 28 Siswa" : "Contoh: Muhammad Ilyas (Kelas 4)"}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    />
                  )}
                </div>

                <div className="sm:col-span-2">
                  <ImageUploader
                    label={`Unggah Foto untuk ${quickMediaSection === 'gallery' ? 'Galeri' : quickMediaSection === 'facility' ? 'Fasilitas' : 'Prestasi'}`}
                    subLabel="Pilih foto dari galeri HP, kamera, atau file komputer"
                    currentValue={quickMediaImage}
                    onChange={(newUrl) => setQuickMediaImage(newUrl)}
                    aspectRatio="video"
                    compressionOptions={{ maxWidth: 1200, maxHeight: 900, quality: 0.82 }}
                    showPresets={true}
                    placeholderText="Pilih foto dari perangkat atau gunakan salah satu dokumentasi resmi..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Keterangan Singkat (Opsional):
                  </label>
                  <textarea
                    rows={2}
                    value={quickMediaDesc}
                    onChange={e => setQuickMediaDesc(e.target.value)}
                    placeholder="Tuliskan cerita singkat atau penjelasan foto..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!quickMediaTitle || !quickMediaImage) {
                        alert('Judul dan Foto wajib diisi.');
                        return;
                      }

                      if (quickMediaSection === 'gallery') {
                        addGalleryItem({
                          title: quickMediaTitle,
                          category: quickMediaCategory as any,
                          imageUrl: quickMediaImage,
                          imageAlt: quickMediaTitle,
                          description: quickMediaDesc,
                          date: new Date().toISOString().split('T')[0]
                        });
                        showNotification(`Foto "${quickMediaTitle}" berhasil ditambahkan ke Galeri!`);
                      } else if (quickMediaSection === 'facility') {
                        addFacility({
                          name: quickMediaTitle,
                          description: quickMediaDesc,
                          imageUrl: quickMediaImage,
                          imageAlt: quickMediaTitle,
                          capacity: quickMediaExtra
                        });
                        showNotification(`Fasilitas "${quickMediaTitle}" berhasil ditambahkan!`);
                      } else {
                        addAchievement({
                          title: quickMediaTitle,
                          category: 'Tahfizh & PAI',
                          year: '2026',
                          winnerName: quickMediaExtra,
                          competitionLevel: 'Kecamatan',
                          description: quickMediaDesc,
                          imageUrl: quickMediaImage
                        });
                        showNotification(`Prestasi "${quickMediaTitle}" berhasil ditambahkan!`);
                      }

                      // Reset form
                      setQuickMediaTitle('');
                      setQuickMediaDesc('');
                      setQuickMediaExtra('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambahkan ke {quickMediaSection === 'gallery' ? 'Galeri Foto' : quickMediaSection === 'facility' ? 'Fasilitas' : 'Prestasi'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 4: MASTER ACTIVE MEDIA LIBRARY / ARCHIVE */}
            <div className="bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FolderHeart className="w-5 h-5 text-amber-400" />
                    <span>5. Arsip Seluruh Foto Aktif di Website</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Koleksi semua foto yang sedang digunakan di website. Anda dapat mengalihkan foto apapun menjadi Foto Sampul atau Logo dengan 1 klik.
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {1 + 1 + 1 + gallery.length + facilities.length + achievements.length} Media Terpasang
                </span>
              </div>

              {/* Grid of all active photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* 1. School Logo */}
                <div className="bg-slate-900 rounded-2xl overflow-hidden border border-emerald-500/40 p-3 space-y-2 relative group">
                  <div className="h-36 rounded-xl bg-emerald-950 flex items-center justify-center p-2 border border-slate-800">
                    <SchoolLogo size="xl" customLogoUrl={localInfo.logoUrl} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 text-[10px] font-bold">
                      Logo Profil
                    </span>
                    <span className="text-[10px] text-slate-400">Navbar & Kop</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">Logo SD Qur'an Para Sahabat</h4>
                </div>

                {/* 2. Hero Cover Photo */}
                <div className="bg-slate-900 rounded-2xl overflow-hidden border border-amber-400/40 p-3 space-y-2 relative group">
                  <div className="h-36 rounded-xl overflow-hidden bg-slate-950 relative">
                    <img src={localInfo.heroImageUrl} alt="Hero Cover" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setLightboxImage({ url: localInfo.heroImageUrl, title: 'Foto Sampul Utama Beranda', desc: localInfo.heroBadgeText })}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-amber-900 text-amber-300 text-[10px] font-bold">
                      Sampul Beranda
                    </span>
                    <span className="text-[10px] text-slate-400 truncate max-w-[100px]">{localInfo.heroBadgeText}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">Foto Kartu Hero Utama</h4>
                </div>

                {/* 3. SPMB Flyer */}
                {localSpmb.brochureUrl && (
                  <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 p-3 space-y-2 relative group">
                    <div className="h-36 rounded-xl overflow-hidden bg-slate-950 relative">
                      <img src={localSpmb.brochureUrl} alt="Brosur SPMB" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setLightboxImage({ url: localSpmb.brochureUrl, title: 'Brosur Resmi SPMB 2026/2027' })}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-blue-900 text-blue-300 text-[10px] font-bold">
                        Brosur SPMB
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate">Flyer Brosur Pendaftaran</h4>
                  </div>
                )}

                {/* 4. Gallery Photos */}
                {gallery.map(item => (
                  <div key={item.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 p-3 space-y-2 relative group">
                    <div className="h-36 rounded-xl overflow-hidden bg-slate-950 relative">
                      <img src={item.imageUrl} alt={item.imageAlt || item.title} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setLightboxImage({ url: item.imageUrl, title: item.title, desc: item.description })}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 text-[10px] font-bold border border-slate-700">
                        Galeri • {item.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setLocalInfo({ ...localInfo, heroImageUrl: item.imageUrl });
                          showNotification(`Foto "${item.title}" dijadikan Sampul Beranda!`);
                        }}
                        className="flex-1 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-medium border border-slate-700 truncate"
                        title="Jadikan Sampul Hero"
                      >
                        Jadikan Sampul
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(item.imageUrl);
                          showNotification('URL Foto disalin ke clipboard!');
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                        title="Salin URL"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* 5. Facility Photos */}
                {facilities.map(item => (
                  <div key={item.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 p-3 space-y-2 relative group">
                    <div className="h-36 rounded-xl overflow-hidden bg-slate-950 relative">
                      <img src={item.imageUrl} alt={item.imageAlt || item.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setLightboxImage({ url: item.imageUrl, title: item.name, desc: item.description })}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-emerald-300 text-[10px] font-bold border border-slate-700">
                        Fasilitas
                      </span>
                      {item.capacity && <span className="text-[10px] text-slate-400">{item.capacity}</span>}
                    </div>
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setLocalInfo({ ...localInfo, heroImageUrl: item.imageUrl });
                          showNotification(`Foto Fasilitas "${item.name}" dijadikan Sampul Beranda!`);
                        }}
                        className="flex-1 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-medium border border-slate-700 truncate"
                      >
                        Jadikan Sampul
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: SCHOOL INFO & HERO PHOTO & SECURITY */}
        {activeTab === 'info' && (
          <form onSubmit={handleSaveInfo} className="space-y-8 max-w-4xl bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Foto Sampul Utama & Profil Lembaga</h2>
                <p className="text-xs text-slate-400">Atur foto kartu hero depan "Sekolah Berbasis Al-Qur'an", profil sekolah, dan password CMS</p>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Semua</span>
              </button>
            </div>

            {/* 1. SCHOOL PROFILE LOGO MANAGEMENT */}
            <div className="p-5 bg-slate-900 rounded-2xl border-2 border-emerald-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Logo Profil & Lambang Resmi Sekolah</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Logo ini tampil di Navbar, Footer, Kop SPMB, dan seluruh kartu identitas website.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-xl bg-emerald-950 border border-emerald-700">
                    <SchoolLogo size="sm" customLogoUrl={localInfo.logoUrl} />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-200 text-[10px] font-bold border border-emerald-700">
                    {localInfo.logoUrl ? 'Logo Kustom' : 'Lambang Default'}
                  </span>
                </div>
              </div>

              <ImageUploader
                label="Unggah Foto Profil Logo Sekolah"
                subLabel="Format JPG, PNG, atau WebP (disarankan logo berlatar transparan atau lingkaran/persegi)"
                currentValue={localInfo.logoUrl || ''}
                onChange={(newUrl) => {
                  setLocalInfo({ ...localInfo, logoUrl: newUrl });
                  showNotification('Logo sekolah diperbarui! Klik "Simpan Semua" untuk menerapkan.');
                }}
                aspectRatio="square"
                compressionOptions={{ maxWidth: 500, maxHeight: 500, quality: 0.85 }}
                showPresets={false}
                placeholderText="Upload file gambar logo atau tempel URL logo..."
              />

              {localInfo.logoUrl && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setLocalInfo({ ...localInfo, logoUrl: '' });
                      showNotification('Logo direset ke Lambang Al-Qur\'an default!');
                    }}
                    className="px-3 py-1.5 text-xs text-amber-300 hover:text-amber-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700"
                  >
                    Gunakan Kembali Lambang Al-Qur'an Default
                  </button>
                </div>
              )}
            </div>

            {/* 2. HERO COVER PHOTO MANAGEMENT */}
            <div className="p-5 bg-slate-900 rounded-2xl border-2 border-amber-400/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Foto Sampul Utama (Hero Card / Sekolah Berbasis Al-Qur'an)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Foto ini tampil di sisi kanan atas Beranda depan. Anda bisa memilih dari galeri resmi sekolah atau mengunggah foto baru dari galeri HP/laptop.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-900 text-emerald-200 text-[10px] font-bold border border-emerald-700">
                  Aktif Ditampilkan
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Label Badge Teks Foto Sampul:
                </label>
                <input
                  type="text"
                  value={localInfo.heroBadgeText || ''}
                  onChange={e => setLocalInfo({ ...localInfo, heroBadgeText: e.target.value })}
                  placeholder="Contoh: Program Tahfizh & Tahsin"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <ImageUploader
                label="Unggah Foto Sampul Utama"
                subLabel="Foto akan otomatis dikompresi agar loading website tetap super cepat & hemat memori."
                currentValue={localInfo.heroImageUrl}
                onChange={(newUrl) => {
                  setLocalInfo({ ...localInfo, heroImageUrl: newUrl });
                  showNotification('Foto sampul hero diperbarui! Klik "Simpan Semua" untuk menerapkan.');
                }}
                aspectRatio="banner"
                compressionOptions={{ maxWidth: 1280, maxHeight: 800, quality: 0.82 }}
                showPresets={true}
                placeholderText="Upload file gambar sampul atau pilih salah satu dokumentasi resmi sekolah..."
              />
            </div>

            {/* CMS ACCOUNT & PASSWORD SECTION */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-emerald-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Akun & Password Administrator CMS</span>
                </h3>
                <span className="text-xs text-emerald-400 font-medium">Akses Login Terlindungi</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Username Login CMS:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={localInfo.adminUsername || ''}
                      onChange={e => setLocalInfo({ ...localInfo, adminUsername: e.target.value })}
                      placeholder="Contoh: admin"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white"
                    />
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Password CMS:
                  </label>
                  <div className="relative">
                    <input
                      type={showAdminPassword ? 'text' : 'password'}
                      value={localInfo.adminPassword || ''}
                      onChange={e => setLocalInfo({ ...localInfo, adminPassword: e.target.value })}
                      placeholder="Masukkan password admin"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white font-mono"
                    />
                    <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 p-0.5"
                    >
                      {showAdminPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 pt-1 border-t border-slate-800">
                <span>Password saat ini: <code className="text-amber-300 font-mono bg-slate-800 px-2 py-0.5 rounded">{localInfo.adminPassword || 'sd quran para sahabat kampung baru'}</code></span>
                <button
                  type="button"
                  onClick={() => {
                    setLocalInfo({
                      ...localInfo,
                      adminUsername: 'admin',
                      adminPassword: 'sd quran para sahabat kampung baru'
                    });
                    showNotification('Kredensial diatur ke: admin / sd quran para sahabat kampung baru');
                  }}
                  className="text-amber-400 hover:underline text-[11px]"
                >
                  Set ke Password Default
                </button>
              </div>
            </div>

            {/* GENERAL SCHOOL INFO FIELDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Resmi Sekolah</label>
                <input
                  type="text"
                  value={localInfo.name}
                  onChange={e => setLocalInfo({ ...localInfo, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline Sekolah</label>
                <input
                  type="text"
                  value={localInfo.tagline}
                  onChange={e => setLocalInfo({ ...localInfo, tagline: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor WhatsApp Resmi</label>
                <input
                  type="text"
                  value={localInfo.whatsapp}
                  onChange={e => setLocalInfo({ ...localInfo, whatsapp: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Resmi</label>
                <input
                  type="email"
                  value={localInfo.email}
                  onChange={e => setLocalInfo({ ...localInfo, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Dusun / Kampung & Kecamatan</label>
                <input
                  type="text"
                  value={localInfo.village}
                  onChange={e => setLocalInfo({ ...localInfo, village: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Alamat Lengkap</label>
                <textarea
                  rows={2}
                  value={localInfo.address}
                  onChange={e => setLocalInfo({ ...localInfo, address: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Singkat Sekolah</label>
                <textarea
                  rows={3}
                  value={localInfo.description}
                  onChange={e => setLocalInfo({ ...localInfo, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-700">
              <button
                type="submit"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Informasi</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: SPMB & FEES */}
        {activeTab === 'spmb' && (
          <form onSubmit={handleSaveSpmb} className="space-y-6 max-w-4xl bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Pengaturan SPMB & Rincian Biaya</h2>
                <p className="text-xs text-slate-400">Kelola komponen biaya pendaftaran Rp2.650.000, SPP, brosur SPMB, dan rekening</p>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Simpan SPMB</span>
              </button>
            </div>

            {/* SPMB Flyer / Brochure Setting */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Foto Brosur / Flyer Resmi SPMB</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setLocalSpmb({ ...localSpmb, brochureUrl: SCHOOL_PHOTOS.spmbFlyer.url });
                    showNotification('Brosur diatur ke Flyer Resmi SPMB!');
                  }}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-[11px] font-medium border border-slate-700"
                >
                  Gunakan Flyer Brosur Resmi
                </button>
              </div>

              <ImageUploader
                label="Unggah File Foto Brosur SPMB"
                subLabel="Foto brosur akan ditampilkan di Halaman Pendaftaran SPMB, dapat diunduh orang tua santri."
                currentValue={localSpmb.brochureUrl || ''}
                onChange={(newUrl) => {
                  setLocalSpmb({ ...localSpmb, brochureUrl: newUrl });
                  showNotification('Brosur SPMB diperbarui! Klik "Simpan SPMB" untuk menyimpan.');
                }}
                aspectRatio="auto"
                compressionOptions={{ maxWidth: 1200, maxHeight: 1600, quality: 0.82 }}
                showPresets={true}
                placeholderText="Upload brosur dari perangkat atau masukkan link brosur..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tahun Ajaran</label>
                <input
                  type="text"
                  value={localSpmb.academicYear}
                  onChange={e => setLocalSpmb({ ...localSpmb, academicYear: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Status Pendaftaran</label>
                <select
                  value={localSpmb.isOpen ? 'open' : 'closed'}
                  onChange={e => setLocalSpmb({ ...localSpmb, isOpen: e.target.value === 'open' })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                >
                  <option value="open">Sedang Dibuka</option>
                  <option value="closed">Ditutup Sementara</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Iuran SPP Bulanan (Mulai)</label>
                <input
                  type="number"
                  value={localSpmb.sppMonthly}
                  onChange={e => setLocalSpmb({ ...localSpmb, sppMonthly: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Total Biaya Masuk (Otomatis)</label>
                <input
                  type="text"
                  readOnly
                  value={`Rp ${localSpmb.totalFee.toLocaleString('id-ID')}`}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-amber-300 font-bold font-mono"
                />
              </div>
            </div>

            {/* Bank Account Settings */}
            <div className="border-t border-slate-700 pt-6 space-y-4">
              <h3 className="text-sm font-bold text-amber-300">Rekening Resmi Pembayaran SPMB</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Bank</label>
                  <input
                    type="text"
                    value={localSpmb.bankAccount?.bankName || ''}
                    onChange={e => setLocalSpmb({
                      ...localSpmb,
                      bankAccount: { ...localSpmb.bankAccount, bankName: e.target.value }
                    })}
                    placeholder="Contoh: Bank Syariah Indonesia (BSI)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor Rekening</label>
                  <input
                    type="text"
                    value={localSpmb.bankAccount?.accountNumber || ''}
                    onChange={e => setLocalSpmb({
                      ...localSpmb,
                      bankAccount: { ...localSpmb.bankAccount, accountNumber: e.target.value }
                    })}
                    placeholder="Contoh: 7312217408"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono font-bold text-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Atas Nama (a.n)</label>
                  <input
                    type="text"
                    value={localSpmb.bankAccount?.accountHolder || ''}
                    onChange={e => setLocalSpmb({
                      ...localSpmb,
                      bankAccount: { ...localSpmb.bankAccount, accountHolder: e.target.value }
                    })}
                    placeholder="Contoh: Ilyas Hasim Yusuf"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Fee Items Table */}
            <div className="border-t border-slate-700 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-300">Rincian Komponen Biaya</h3>
                <button
                  type="button"
                  onClick={handleAddFeeItem}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Komponen</span>
                </button>
              </div>

              <div className="space-y-3">
                {localSpmb.feeItems.map((item, idx) => (
                  <div key={item.id} className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 w-6 text-center">{idx + 1}.</span>
                    <input
                      type="text"
                      value={item.name}
                      onChange={e => handleUpdateFeeItem(item.id, 'name', e.target.value)}
                      placeholder="Nama Biaya (misal: Pendaftaran)"
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                    <input
                      type="number"
                      value={item.amount}
                      onChange={e => handleUpdateFeeItem(item.id, 'amount', e.target.value)}
                      placeholder="Nominal (Rp)"
                      className="w-full sm:w-36 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeeItem(item.id)}
                      className="p-2 rounded-lg bg-red-950 hover:bg-red-900 text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-700">
              <button
                type="submit"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan SPMB</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: APPLICANTS */}
        {activeTab === 'applicants' && (
          <div className="space-y-6 bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Data Calon Siswa Baru ({applicants.length})</h2>
                <p className="text-xs text-slate-400">Pendaftar formulir online SD Qur'an Para Sahabat</p>
              </div>
              <button
                onClick={handleExportApplicantsCsv}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow self-start sm:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>Export Data (Excel/CSV)</span>
              </button>
            </div>

            {applicants.length === 0 ? (
              <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-700 text-slate-400 text-xs">
                Belum ada data pendaftar baru masuk.
              </div>
            ) : (
              <div className="space-y-3">
                {applicants.map((app) => (
                  <div key={app.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{app.fullName}</span>
                        {app.nickname && <span className="text-xs text-emerald-400">({app.nickname})</span>}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          app.status === 'Diterima' ? 'bg-emerald-900 text-emerald-300' :
                          app.status === 'Diproses' ? 'bg-amber-900 text-amber-300' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Wali: <span className="text-slate-200">{app.parentName}</span> • WA: <span className="text-amber-300 font-mono">{app.parentPhone}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <select
                        value={app.status}
                        onChange={e => updateApplicantStatus(app.id, e.target.value as any)}
                        className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                      </select>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus data pendaftar "${app.fullName}"?`)) {
                            deleteApplicant(app.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-red-950 hover:bg-red-900 text-red-300"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ACHIEVEMENTS / PRESTASI */}
        {activeTab === 'achievements' && (
          <div className="space-y-6 bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>Kelola Prestasi Santri & Guru</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">Total {achievements.length} penghargaan & kejuaraan terdaftar di website</p>
              </div>
              <button
                type="button"
                id="btn-tambah-prestasi-modal"
                onClick={() => {
                  setEditingAchievement(null);
                  setAchievementModalData({
                    title: '',
                    category: 'Tahfizh & PAI',
                    year: '2026',
                    winnerName: '',
                    competitionLevel: 'Kecamatan',
                    description: '',
                    imageUrl: SCHOOL_PHOTOS.pentasPaiTrophy.url
                  });
                  setAchievementModalError(null);
                  setIsAchievementModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all self-start sm:self-auto cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4 text-emerald-950 stroke-[3]" />
                <span>+ Tambah Prestasi Baru</span>
              </button>
            </div>

            {/* Inline Add Achievement Form */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Formulir Cepat Tambah Prestasi Baru</span>
                </h3>
              </div>

              {achievementInlineError && (
                <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{achievementInlineError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Judul Kejuaraan / Prestasi *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Juara 1 Pentas PAI Tingkat Kecamatan"
                    value={newAchievement.title || ''}
                    onChange={e => {
                      setNewAchievement({ ...newAchievement, title: e.target.value });
                      if (achievementInlineError) setAchievementInlineError(null);
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Tingkat Lomba</label>
                  <select
                    value={newAchievement.competitionLevel || 'Kecamatan'}
                    onChange={e => setNewAchievement({ ...newAchievement, competitionLevel: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    <option value="Kecamatan">Kecamatan</option>
                    <option value="Kabupaten">Kabupaten</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Internal">Internal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Nama Pemenang / Santri</label>
                  <input
                    type="text"
                    placeholder="Contoh: Muhammad Ilyas (Kelas 4)"
                    value={newAchievement.winnerName || ''}
                    onChange={e => setNewAchievement({ ...newAchievement, winnerName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Tahun Prestasi</label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={newAchievement.year || '2026'}
                    onChange={e => setNewAchievement({ ...newAchievement, year: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Kategori Prestasi</label>
                  <input
                    type="text"
                    placeholder="Tahfizh / Tartil / PAI / Sains"
                    value={newAchievement.category || 'Tahfizh & PAI'}
                    onChange={e => setNewAchievement({ ...newAchievement, category: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <ImageUploader
                    label="Unggah Foto Prestasi / Penyerahan Piala"
                    subLabel="Format foto dokumentasi piala, medali, atau piagam penghargaan santri"
                    currentValue={newAchievement.imageUrl || ''}
                    onChange={(newUrl) => setNewAchievement({ ...newAchievement, imageUrl: newUrl })}
                    aspectRatio="video"
                    compressionOptions={{ maxWidth: 1000, maxHeight: 1000, quality: 0.82 }}
                    showPresets={true}
                    placeholderText="Pilih foto dokumentasi lomba dari galeri HP / laptop..."
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Deskripsi Singkat (Opsional)</label>
                  <textarea
                    rows={2}
                    placeholder="Keterangan perolehan piala, nama pembimbing, atau detail kejuaraan..."
                    value={newAchievement.description || ''}
                    onChange={e => setNewAchievement({ ...newAchievement, description: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  id="btn-tambah-prestasi-submit"
                  onClick={() => {
                    if (!newAchievement.title || !newAchievement.title.trim()) {
                      setAchievementInlineError('Judul prestasi / kejuaraan wajib diisi terlebih dahulu.');
                      return;
                    }
                    setAchievementInlineError(null);
                    addAchievement({
                      title: newAchievement.title.trim(),
                      category: newAchievement.category || 'Tahfizh & PAI',
                      year: newAchievement.year || '2026',
                      competitionLevel: newAchievement.competitionLevel || 'Kecamatan',
                      level: newAchievement.competitionLevel || 'Kecamatan',
                      winnerName: newAchievement.winnerName || '',
                      description: newAchievement.description || '',
                      imageUrl: newAchievement.imageUrl || SCHOOL_PHOTOS.pentasPaiTrophy.url
                    });
                    setNewAchievement({
                      title: '',
                      category: 'Tahfizh & PAI',
                      year: '2026',
                      winnerName: '',
                      competitionLevel: 'Kecamatan',
                      description: '',
                      imageUrl: SCHOOL_PHOTOS.pentasPaiTrophy.url
                    });
                    showNotification('Prestasi baru berhasil ditambahkan dan langsung tampil di website!');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Tambahkan Prestasi Sekarang</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Daftar Prestasi Terdaftar ({achievements.length})
                </h3>
              </div>

              {achievements.length === 0 ? (
                <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-700 text-slate-400 text-xs">
                  Belum ada prestasi yang ditambahkan. Gunakan tombol di atas untuk menambah prestasi pertama.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map(ach => (
                    <div key={ach.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-700 flex flex-col sm:flex-row gap-4 justify-between hover:border-slate-600 transition-colors">
                      <div className="flex gap-4">
                        {ach.imageUrl && (
                          <img 
                            src={ach.imageUrl} 
                            alt={ach.title} 
                            onClick={() => setLightboxImage({ url: ach.imageUrl || '', title: ach.title, desc: ach.description })}
                            className="w-24 h-24 object-cover rounded-xl border border-slate-700 flex-shrink-0 cursor-pointer hover:opacity-90" 
                          />
                        )}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-emerald-950 uppercase">
                              Tingkat {ach.competitionLevel || ach.level || 'Kabupaten'}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Tahun {ach.year}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-white">{ach.title}</h4>
                          {ach.winnerName && (
                            <p className="text-xs text-emerald-400 flex items-center gap-1">
                              <User className="w-3 h-3 text-amber-400" />
                              <span>Pemenang: {ach.winnerName}</span>
                            </p>
                          )}
                          {ach.description && (
                            <p className="text-[11px] text-slate-400 line-clamp-2">{ach.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-start">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAchievement(ach);
                            setAchievementModalData({ ...ach });
                            setAchievementModalError(null);
                            setIsAchievementModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700"
                          title="Edit Prestasi"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Hapus prestasi "${ach.title}"?`)) {
                              deleteAchievement(ach.id);
                              showNotification(`Prestasi "${ach.title}" berhasil dihapus.`);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/80 text-red-200 hover:bg-red-800 border border-red-900/50"
                          title="Hapus Prestasi"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-6 bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Kelola Berita & Artikel</h2>
                <p className="text-xs text-slate-400">Total {articles.length} artikel terbit</p>
              </div>
              <button
                onClick={() => {
                  setEditingArticle(null);
                  setNewArticle({
                    title: '',
                    slug: '',
                    category: 'Berita Sekolah',
                    author: 'Admin SD Qur\'an Para Sahabat',
                    authorRole: 'Humas',
                    date: new Date().toISOString().split('T')[0],
                    readTimeMinutes: 3,
                    summary: '',
                    content: '',
                    featuredImage: SCHOOL_PHOTOS.classroomLearning.url,
                    imageAlt: 'Kegiatan SD Quran Para Sahabat',
                    tags: ['SD Quran', 'Pendidikan', 'Tahfizh']
                  });
                  setIsArticleModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Tulis Artikel Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((art) => (
                <div key={art.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={art.featuredImage}
                      alt={art.imageAlt}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <span className="px-2 py-0.5 rounded bg-emerald-900/80 text-amber-300 text-[10px] font-bold">
                        {art.category}
                      </span>
                      <h4 className="font-bold text-sm text-white mt-1 line-clamp-2">{art.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{art.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-500 font-mono text-[10px]">{art.date}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingArticle(art);
                          setNewArticle(art);
                          setIsArticleModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus artikel "${art.title}"?`)) {
                            deleteArticle(art.id);
                          }
                        }}
                        className="p-1.5 rounded bg-red-950 hover:bg-red-900 text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Kelola Foto Galeri</h2>
                <p className="text-xs text-slate-400">Total {gallery.length} foto dokumentasi kegiatan santri & sekolah</p>
              </div>
            </div>

            {/* Add Gallery Item Form */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700 space-y-4">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Tambah Foto Baru ke Galeri</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Judul Foto Kegiatan (misal: Setoran Hafalan Santri)"
                  value={newGalleryItem.title || ''}
                  onChange={e => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />

                <select
                  value={newGalleryItem.category || 'Tahfizh'}
                  onChange={e => setNewGalleryItem({ ...newGalleryItem, category: e.target.value as any })}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                >
                  <option value="Tahfizh">Tahfizh</option>
                  <option value="Tahsin">Tahsin</option>
                  <option value="Pembelajaran">Pembelajaran</option>
                  <option value="Kegiatan Islami">Kegiatan Islami</option>
                  <option value="Upacara">Upacara</option>
                  <option value="Kegiatan Siswa">Kegiatan Siswa</option>
                  <option value="Prestasi">Prestasi</option>
                </select>

                <div className="sm:col-span-2">
                  <ImageUploader
                    label="Unggah Foto Galeri Dokumentasi"
                    subLabel="Pilih foto dari galeri HP/laptop atau tautan gambar"
                    currentValue={newGalleryItem.imageUrl || ''}
                    onChange={(newUrl) => setNewGalleryItem({ ...newGalleryItem, imageUrl: newUrl })}
                    aspectRatio="video"
                    compressionOptions={{ maxWidth: 1200, maxHeight: 900, quality: 0.82 }}
                    showPresets={true}
                    placeholderText="Pilih foto kegiatan dari perangkat atau pilih dokumentasi resmi..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <textarea
                    rows={2}
                    placeholder="Deskripsi singkat kegiatan foto (opsional)..."
                    value={newGalleryItem.description || ''}
                    onChange={e => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!newGalleryItem.title || !newGalleryItem.imageUrl) {
                      alert('Judul dan Foto wajib diisi');
                      return;
                    }
                    addGalleryItem({
                      title: newGalleryItem.title,
                      category: newGalleryItem.category || 'Tahfizh',
                      imageUrl: newGalleryItem.imageUrl,
                      imageAlt: newGalleryItem.title,
                      description: newGalleryItem.description || '',
                      date: newGalleryItem.date || new Date().toISOString().split('T')[0]
                    });
                    setNewGalleryItem({ title: '', category: 'Tahfizh', imageUrl: SCHOOL_PHOTOS.classroomLearning.url, description: '' });
                    showNotification('Foto galeri berhasil ditambahkan!');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambahkan Foto ke Galeri</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gallery.map(item => (
                <div key={item.id} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 relative group">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2.5">
                    <span className="text-[9px] text-amber-400 font-bold block">{item.category}</span>
                    <h5 className="font-bold text-xs text-white truncate">{item.title}</h5>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus foto "${item.title}"?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-950/80 text-red-200 hover:bg-red-800"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: FACILITIES */}
        {activeTab === 'facilities' && (
          <div className="space-y-6 bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Kelola Fasilitas Sekolah</h2>
                <p className="text-xs text-slate-400">Total {facilities.length} fasilitas terdaftar</p>
              </div>
            </div>

            {/* Add Facility Form */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700 space-y-4">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Tambah Fasilitas Baru</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nama Fasilitas (misal: Ruang Kelas Tahfizh)"
                  value={newFacility.name || ''}
                  onChange={e => setNewFacility({ ...newFacility, name: e.target.value })}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />

                <input
                  type="text"
                  placeholder="Kapasitas (misal: 25 Siswa/Kelas)"
                  value={newFacility.capacity || ''}
                  onChange={e => setNewFacility({ ...newFacility, capacity: e.target.value })}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />

                <div className="sm:col-span-2">
                  <ImageUploader
                    label="Unggah Foto Fasilitas Sekolah"
                    subLabel="Format gambar ruang kelas, musholla, lapangan, dsb."
                    currentValue={newFacility.imageUrl || ''}
                    onChange={(newUrl) => setNewFacility({ ...newFacility, imageUrl: newUrl })}
                    aspectRatio="video"
                    compressionOptions={{ maxWidth: 1200, maxHeight: 800, quality: 0.82 }}
                    showPresets={true}
                    placeholderText="Pilih foto fasilitas dari perangkat atau dokumentasi resmi..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <textarea
                    rows={2}
                    placeholder="Deskripsi fasilitas sekolah..."
                    value={newFacility.description || ''}
                    onChange={e => setNewFacility({ ...newFacility, description: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!newFacility.name || !newFacility.imageUrl) {
                      alert('Nama dan Foto Fasilitas wajib diisi');
                      return;
                    }
                    addFacility({
                      name: newFacility.name,
                      description: newFacility.description || '',
                      imageUrl: newFacility.imageUrl,
                      imageAlt: newFacility.name,
                      capacity: newFacility.capacity
                    });
                    setNewFacility({ name: '', description: '', imageUrl: SCHOOL_PHOTOS.classroomLearning.url, capacity: '' });
                    showNotification('Fasilitas baru berhasil ditambahkan!');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambahkan Fasilitas</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {facilities.map(fac => (
                <div key={fac.id} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 relative">
                  <img
                    src={fac.imageUrl}
                    alt={fac.imageAlt}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3 space-y-1">
                    <h5 className="font-bold text-xs text-white">{fac.name}</h5>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{fac.description}</p>
                    {fac.capacity && (
                      <span className="inline-block text-[10px] text-amber-300 font-mono">{fac.capacity}</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus fasilitas "${fac.name}"?`)) {
                        deleteFacility(fac.id);
                      }
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-950/80 text-red-200 hover:bg-red-800"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6 bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Kelola Tanya Jawab (FAQ)</h2>
                <p className="text-xs text-slate-400">Total {faqs.length} pertanyaan terdaftar</p>
              </div>
            </div>

            {/* Add FAQ Form */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Tambah Tanya Jawab Baru</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Pertanyaan (misal: Apakah ada antar jemput?)"
                  value={newFaq.question || ''}
                  onChange={e => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="sm:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
                <select
                  value={newFaq.category || 'Tahfizh'}
                  onChange={e => setNewFaq({ ...newFaq, category: e.target.value })}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                >
                  <option value="Tahfizh">Tahfizh</option>
                  <option value="SPMB">SPMB</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Umum">Umum</option>
                  <option value="Fasilitas">Fasilitas</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="Jawaban resmi dari pihak sekolah"
                  value={newFaq.answer || ''}
                  onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="sm:col-span-3 bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!newFaq.question || !newFaq.answer) {
                      alert('Pertanyaan dan Jawaban wajib diisi');
                      return;
                    }
                    addFaq({
                      question: newFaq.question,
                      answer: newFaq.answer,
                      category: newFaq.category || 'Tahfizh'
                    });
                    setNewFaq({ question: '', answer: '', category: 'Tahfizh' });
                    showNotification('FAQ baru berhasil ditambahkan!');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambahkan FAQ</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="p-4 bg-slate-900 rounded-xl border border-slate-700 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-300 uppercase">{faq.category}</span>
                    <h5 className="font-bold text-xs text-white">{faq.question}</h5>
                    <p className="text-[11px] text-slate-400">{faq.answer}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus pertanyaan "${faq.question}"?`)) {
                        deleteFaq(faq.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-950/80 text-red-200 hover:bg-red-800 flex-shrink-0"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Reset Option */}
        <div className="mt-12 p-6 bg-slate-950 rounded-2xl border border-red-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data ke Pengaturan Awal (Default)</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Jika Anda ingin mengembalikan data ke format default awal sekolah (biaya Rp2.650.000, 10 foto resmi sekolah, artikel default).
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm('PERINGATAN: Semua perubahan lokal yang Anda buat akan dikembalikan ke data default awal. Lanjutkan?')) {
                resetToDefaults();
                showNotification('Data telah berhasil direset ke pengaturan awal!');
                setLocalInfo({
                  ...schoolInfo,
                  heroImageUrl: SCHOOL_PHOTOS.classroomLearning.url,
                  heroImageAlt: "Suasana Belajar Aktif di Ruang Kelas SD Qur'an Para Sahabat Kampung Baru",
                  heroBadgeText: "Program Tahfizh & Tahsin",
                  adminUsername: "admin",
                  adminPassword: "sd quran para sahabat kampung baru"
                });
                setLocalSpmb({
                  ...spmbConfig,
                  brochureUrl: SCHOOL_PHOTOS.spmbFlyer.url
                });
              }
            }}
            className="px-4 py-2 rounded-xl bg-red-950 hover:bg-red-900 text-red-200 text-xs font-bold whitespace-nowrap border border-red-800 shadow"
          >
            Reset ke Default
          </button>
        </div>

      </div>

      {/* ARTICLE CREATE / EDIT MODAL */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-800 rounded-3xl border border-slate-700 max-w-3xl w-full p-6 sm:p-8 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="font-bold text-base text-white">
                {editingArticle ? 'Edit Artikel' : 'Tulis Artikel Baru'}
              </h3>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={newArticle.title || ''}
                  onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
                  placeholder="Contoh: Keutamaan Menghafal Al-Qur'an Sejak Dini"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
                  <select
                    value={newArticle.category || 'Berita Sekolah'}
                    onChange={e => setNewArticle({ ...newArticle, category: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value="Berita Sekolah">Berita Sekolah</option>
                    <option value="Tahfizh">Tahfizh</option>
                    <option value="Kegiatan Siswa">Kegiatan Siswa</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Informasi SPMB">Informasi SPMB</option>
                    <option value="Artikel Pendidikan">Artikel Pendidikan</option>
                    <option value="Artikel Islami">Artikel Islami</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Penulis</label>
                  <input
                    type="text"
                    value={newArticle.author || ''}
                    onChange={e => setNewArticle({ ...newArticle, author: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estimasi Baca (Menit)</label>
                  <input
                    type="number"
                    value={newArticle.readTimeMinutes || 3}
                    onChange={e => setNewArticle({ ...newArticle, readTimeMinutes: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <ImageUploader
                  label="Foto Utama / Sampul Artikel"
                  subLabel="Foto ini akan tampil sebagai thumbnail dan header artikel berita"
                  currentValue={newArticle.featuredImage || ''}
                  onChange={(newUrl) => setNewArticle({ ...newArticle, featuredImage: newUrl })}
                  aspectRatio="banner"
                  compressionOptions={{ maxWidth: 1200, maxHeight: 800, quality: 0.82 }}
                  showPresets={true}
                  placeholderText="Upload foto dari perangkat atau pilih salah satu dokumentasi resmi..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ringkasan / Summary</label>
                <textarea
                  rows={2}
                  value={newArticle.summary || ''}
                  onChange={e => setNewArticle({ ...newArticle, summary: e.target.value })}
                  placeholder="Ringkasan singkat yang menarik pembaca..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Isi Lengkap Konten Artikel *</label>
                <textarea
                  rows={8}
                  required
                  value={newArticle.content || ''}
                  onChange={e => setNewArticle({ ...newArticle, content: e.target.value })}
                  placeholder="Tuliskan isi artikel selengkapnya di sini..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow"
                >
                  Publikasikan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACHIEVEMENT MODAL (TAMBAH / EDIT PRESTASI) */}
      {isAchievementModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsAchievementModalOpen(false)}
        >
          <div 
            className="bg-slate-800 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 my-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingAchievement ? 'Edit Data Prestasi' : 'Tambah Prestasi / Juara Baru'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {editingAchievement ? 'Perbarui informasi dan dokumentasi prestasi santri' : 'Dokumentasikan kejuaraan santri & guru ke website'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAchievementModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {achievementModalError && (
              <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{achievementModalError}</span>
              </div>
            )}

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!achievementModalData.title || !achievementModalData.title.trim()) {
                  setAchievementModalError('Judul kejuaraan / prestasi wajib diisi.');
                  return;
                }

                if (editingAchievement) {
                  updateAchievement(editingAchievement.id, {
                    title: achievementModalData.title.trim(),
                    category: achievementModalData.category || 'Tahfizh & PAI',
                    year: achievementModalData.year || '2026',
                    competitionLevel: achievementModalData.competitionLevel || 'Kecamatan',
                    level: achievementModalData.competitionLevel || 'Kecamatan',
                    winnerName: achievementModalData.winnerName || '',
                    description: achievementModalData.description || '',
                    imageUrl: achievementModalData.imageUrl || SCHOOL_PHOTOS.pentasPaiTrophy.url
                  });
                  showNotification(`Prestasi "${achievementModalData.title}" berhasil diperbarui!`);
                } else {
                  addAchievement({
                    title: achievementModalData.title.trim(),
                    category: achievementModalData.category || 'Tahfizh & PAI',
                    year: achievementModalData.year || '2026',
                    competitionLevel: achievementModalData.competitionLevel || 'Kecamatan',
                    level: achievementModalData.competitionLevel || 'Kecamatan',
                    winnerName: achievementModalData.winnerName || '',
                    description: achievementModalData.description || '',
                    imageUrl: achievementModalData.imageUrl || SCHOOL_PHOTOS.pentasPaiTrophy.url
                  });
                  showNotification(`Prestasi "${achievementModalData.title}" berhasil ditambahkan!`);
                }

                setIsAchievementModalOpen(false);
                setEditingAchievement(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Judul Kejuaraan / Prestasi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Juara 1 Tahfizh Al-Qur'an Juz 30 Tingkat Kabupaten"
                  value={achievementModalData.title || ''}
                  onChange={e => {
                    setAchievementModalData({ ...achievementModalData, title: e.target.value });
                    if (achievementModalError) setAchievementModalError(null);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tingkat Lomba
                  </label>
                  <select
                    value={achievementModalData.competitionLevel || 'Kecamatan'}
                    onChange={e => setAchievementModalData({ ...achievementModalData, competitionLevel: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    <option value="Kecamatan">Kecamatan</option>
                    <option value="Kabupaten">Kabupaten</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Internal">Internal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nama Pemenang / Santri
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Muhammad Ilyas (Kelas 4)"
                    value={achievementModalData.winnerName || ''}
                    onChange={e => setAchievementModalData({ ...achievementModalData, winnerName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tahun Prestasi
                  </label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={achievementModalData.year || '2026'}
                    onChange={e => setAchievementModalData({ ...achievementModalData, year: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kategori Prestasi
                </label>
                <input
                  type="text"
                  placeholder="Tahfizh & PAI / Tartil / Sains / Olahraga"
                  value={achievementModalData.category || 'Tahfizh & PAI'}
                  onChange={e => setAchievementModalData({ ...achievementModalData, category: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <ImageUploader
                  label="Foto Dokumentasi Piala / Sertifikat"
                  subLabel="Unggah foto piagam, trofi lomba, atau penyerahan piala di sekolah"
                  currentValue={achievementModalData.imageUrl || ''}
                  onChange={(newUrl) => setAchievementModalData({ ...achievementModalData, imageUrl: newUrl })}
                  aspectRatio="video"
                  compressionOptions={{ maxWidth: 1200, maxHeight: 900, quality: 0.82 }}
                  showPresets={true}
                  placeholderText="Pilih foto dokumentasi lomba dari galeri..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deskripsi / Keterangan Tambahan (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={achievementModalData.description || ''}
                  onChange={e => setAchievementModalData({ ...achievementModalData, description: e.target.value })}
                  placeholder="Tuliskan keterangan detail kejuaraan, nama pembimbing, atau penyelenggara..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsAchievementModalOpen(false);
                    setEditingAchievement(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-emerald-950 font-bold text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  {editingAchievement ? 'Simpan Perubahan Prestasi' : 'Tambahkan Prestasi Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULLSIZE IMAGE LIGHTBOX MODAL */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">{lightboxImage.title}</h4>
                {lightboxImage.desc && (
                  <p className="text-xs text-slate-400 mt-0.5">{lightboxImage.desc}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-black/60 p-4 flex items-center justify-center overflow-auto max-h-[60vh]">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[55vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLocalInfo({ ...localInfo, heroImageUrl: lightboxImage.url });
                    updateSchoolInfo({ ...localInfo, heroImageUrl: lightboxImage.url });
                    showNotification('Foto ini berhasil dijadikan Sampul Utama Beranda!');
                    setLightboxImage(null);
                  }}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Jadikan Sampul Utama</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLocalInfo({ ...localInfo, logoUrl: lightboxImage.url });
                    updateSchoolInfo({ ...localInfo, logoUrl: lightboxImage.url });
                    showNotification('Foto ini berhasil dijadikan Logo Profil Sekolah!');
                    setLightboxImage(null);
                  }}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Jadikan Logo Profil</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(lightboxImage.url);
                    showNotification('Link URL foto disalin!');
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl flex items-center gap-1.5 border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin URL</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

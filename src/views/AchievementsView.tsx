import React, { useState } from 'react';
import { Trophy, Award, Sparkles, Star, User, Calendar, MapPin, ExternalLink, Plus, Edit3, Trash2, X, AlertCircle } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';
import { ImageUploader } from '../components/ImageUploader';
import { AchievementItem } from '../types';
import { SCHOOL_PHOTOS } from '../data/schoolImages';

export const AchievementsView: React.FC = () => {
  const { 
    achievements, 
    addAchievement, 
    updateAchievement, 
    deleteAchievement, 
    setActiveView, 
    setLightboxImage,
    isAdminLoggedIn,
    setIsAdminModalOpen
  } = useSchool();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);
  const [formData, setFormData] = useState<Partial<AchievementItem>>({
    title: '',
    category: 'Tahfizh & PAI',
    year: '2026',
    winnerName: '',
    competitionLevel: 'Kecamatan',
    description: '',
    imageUrl: SCHOOL_PHOTOS.pentasPaiTrophy.url
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Tahfizh & PAI',
      year: '2026',
      winnerName: '',
      competitionLevel: 'Kecamatan',
      description: '',
      imageUrl: SCHOOL_PHOTOS.pentasPaiTrophy.url
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (ach: AchievementItem) => {
    setEditingItem(ach);
    setFormData({ ...ach });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.title.trim()) {
      setFormError('Judul kejuaraan / prestasi wajib diisi.');
      return;
    }

    if (editingItem) {
      updateAchievement(editingItem.id, {
        title: formData.title.trim(),
        category: formData.category || 'Tahfizh & PAI',
        year: formData.year || '2026',
        competitionLevel: formData.competitionLevel || 'Kecamatan',
        level: formData.competitionLevel || 'Kecamatan',
        winnerName: formData.winnerName || '',
        description: formData.description || '',
        imageUrl: formData.imageUrl || SCHOOL_PHOTOS.pentasPaiTrophy.url
      });
      setSuccessToast(`Prestasi "${formData.title}" berhasil diperbarui!`);
    } else {
      addAchievement({
        title: formData.title.trim(),
        category: formData.category || 'Tahfizh & PAI',
        year: formData.year || '2026',
        competitionLevel: formData.competitionLevel || 'Kecamatan',
        level: formData.competitionLevel || 'Kecamatan',
        winnerName: formData.winnerName || '',
        description: formData.description || '',
        imageUrl: formData.imageUrl || SCHOOL_PHOTOS.pentasPaiTrophy.url
      });
      setSuccessToast(`Prestasi "${formData.title}" berhasil ditambahkan!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead 
        title="Prestasi Siswa SD Qur'an Para Sahabat"
        description="Dokumentasi dan daftar pencapaian prestasi akademik, tahfizh Al-Qur'an, dan perlombaan siswa SD Qur'an Para Sahabat Kampung Baru Muara Tembesi."
        slug="prestasi"
      />

      {/* Success Notification Toast */}
      {successToast && (
        <div className="fixed top-24 right-4 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{successToast}</span>
        </div>
      )}

      {/* Header */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white py-14 lg:py-20 border-b-4 border-amber-400">
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-emerald-950" />
            <span>Pencapaian & Kebanggaan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            Prestasi Peserta Didik & Guru
          </h1>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Apresiasi dedikasi, kerja keras, dan prestasi gemilang santri SD Qur'an Para Sahabat Kampung Baru pada berbagai ajang kompetisi keislaman, tahfizh, dan akademik.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              id="btn-tambah-prestasi-public"
              onClick={handleOpenAddModal}
              className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-emerald-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer transform active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Tambah Prestasi Baru</span>
            </button>

            {isAdminLoggedIn ? (
              <button
                type="button"
                onClick={() => setActiveView('admin')}
                className="px-5 py-3 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2 border border-emerald-600/60"
              >
                <span>Buka Panel Admin CMS</span>
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-emerald-950 font-serif">
                Daftar Penghargaan & Trofi Kejuaraan
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Menampilkan total {achievements.length} pencapaian prestasi santri & guru
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400 stroke-[3]" />
              <span>Tambah Prestasi</span>
            </button>
          </div>

          {achievements.length === 0 ? (
            <div className="max-w-xl mx-auto p-10 bg-[#F4F7F2] rounded-3xl border border-emerald-100 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-white text-amber-500 flex items-center justify-center mx-auto shadow-sm border border-emerald-100">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950 font-serif">
                Belum ada data prestasi yang ditampilkan.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Silakan klik tombol di bawah untuk menambahkan dokumentasi piala atau kejuaraan santri.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs rounded-full shadow-md transition-colors"
                >
                  + Tambah Prestasi Sekarang
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((ach) => (
                <div 
                  key={ach.id} 
                  className="group rounded-3xl bg-[#F4F7F2] border border-emerald-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {ach.imageUrl && (
                      <div className="relative h-56 overflow-hidden bg-emerald-950">
                        <img 
                          src={ach.imageUrl} 
                          alt={ach.imageAlt || ach.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => setLightboxImage({
                            url: ach.imageUrl || '',
                            title: ach.title,
                            alt: ach.imageAlt || ach.title
                          })}
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-emerald-950 shadow">
                            Tingkat {ach.competitionLevel || ach.level || 'Kabupaten'}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                            Tahun {ach.year}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      {!ach.imageUrl && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-emerald-950">
                            Tingkat {ach.competitionLevel || ach.level || 'Kabupaten'}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            Tahun {ach.year}
                          </span>
                        </div>
                      )}

                      <h3 className="font-bold text-lg text-emerald-950 font-serif leading-snug">
                        {ach.title}
                      </h3>

                      {(ach.winnerName || ach.studentName) && (
                        <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-amber-500" />
                          <span>Pemenang: {ach.winnerName || ach.studentName}</span>
                        </p>
                      )}

                      {ach.description && (
                        <p className="text-xs text-slate-600 leading-relaxed pt-1">
                          {ach.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-medium">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        {ach.category || 'Prestasi Santri'}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {isAdminLoggedIn && (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(ach)}
                              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700"
                              title="Edit Prestasi"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Hapus prestasi "${ach.title}"?`)) {
                                  deleteAchievement(ach.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                              title="Hapus Prestasi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {ach.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setLightboxImage({
                              url: ach.imageUrl || '',
                              title: ach.title,
                              alt: ach.imageAlt || ach.title
                            })}
                            className="text-[11px] text-amber-600 hover:text-amber-700 font-bold"
                          >
                            Lihat Foto
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* POPUP MODAL TAMBAH / EDIT PRESTASI */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 my-8 border border-emerald-100"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800">
                  <Trophy className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-950 font-serif">
                    {editingItem ? 'Edit Data Prestasi' : 'Tambah Prestasi Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dokumentasikan kejuaraan santri atau guru SD Qur'an Para Sahabat
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Kejuaraan / Prestasi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Juara 1 Pentas PAI Tingkat Kecamatan Muara Tembesi"
                  value={formData.title || ''}
                  onChange={e => {
                    setFormData({ ...formData, title: e.target.value });
                    if (formError) setFormError(null);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tingkat Lomba
                  </label>
                  <select
                    value={formData.competitionLevel || 'Kecamatan'}
                    onChange={e => setFormData({ ...formData, competitionLevel: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    <option value="Kecamatan">Kecamatan</option>
                    <option value="Kabupaten">Kabupaten</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Internal">Internal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Pemenang / Santri
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Muhammad Ilyas (Kelas 4)"
                    value={formData.winnerName || ''}
                    onChange={e => setFormData({ ...formData, winnerName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tahun Prestasi
                  </label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={formData.year || '2026'}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kategori Prestasi
                </label>
                <input
                  type="text"
                  placeholder="Tahfizh & PAI / Tartil / Sains / Olahraga"
                  value={formData.category || 'Tahfizh & PAI'}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <ImageUploader
                  label="Foto Dokumentasi Piala / Sertifikat"
                  subLabel="Unggah foto piagam atau dokumentasi piala dari perangkat Anda"
                  currentValue={formData.imageUrl || ''}
                  onChange={(newUrl) => setFormData({ ...formData, imageUrl: newUrl })}
                  aspectRatio="video"
                  compressionOptions={{ maxWidth: 1200, maxHeight: 900, quality: 0.82 }}
                  showPresets={true}
                  placeholderText="Pilih foto dokumentasi dari perangkat..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deskripsi / Keterangan Tambahan (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tuliskan keterangan detail kejuaraan atau nama pembimbing..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-emerald-950 font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  {editingItem ? 'Simpan Perubahan' : 'Tambahkan Prestasi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

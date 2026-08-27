import React, { useState } from 'react';
import { Sparkles, Eye, Camera, Filter } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';

export const GalleryView: React.FC = () => {
  const { gallery, setLightboxImage } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Tahfizh',
    'Tahsin',
    'Pembelajaran',
    'Kegiatan Islami',
    'Upacara',
    'Kegiatan Siswa',
    'Outing',
    'Perlombaan',
    'SPMB/PPDB'
  ];

  const filtered = selectedCategory === 'Semua'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead 
        title="Galeri Dokumentasi & Kegiatan SD Qur'an Para Sahabat"
        description="Dokumentasi aktivitas tahfizh, upacara, pembelajaran di kelas, dan kegiatan Islami siswa SD Qur'an Para Sahabat Kampung Baru Muara Tembesi."
        slug="kegiatan"
      />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white py-14 lg:py-20 border-b-4 border-amber-400">
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-emerald-950" />
            <span>Dokumentasi Sekolah</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            Galeri Kegiatan Siswa
          </h1>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Merekam jejak kebersamaan, semangat menghafal Al-Qur'an, dan keceriaan proses belajar mengajar.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Bar */}
          <div className="flex items-center gap-2 flex-wrap mb-10 pb-4 border-b border-emerald-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Kategori:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-900 text-white shadow-sm'
                    : 'bg-[#F4F7F2] text-slate-700 hover:bg-emerald-100 hover:text-emerald-900 border border-emerald-100/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-[#F4F7F2] rounded-3xl border border-emerald-100 max-w-lg mx-auto p-8">
              <Camera className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-bold text-emerald-950 font-serif">Belum ada foto untuk kategori ini</h3>
              <p className="text-xs text-slate-500 mt-1">Dokumentasi baru akan ditambahkan oleh administrator secara berkala.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-3xl overflow-hidden bg-[#F4F7F2] shadow-sm hover:shadow-md transition-all duration-300 border border-emerald-100 flex flex-col cursor-pointer"
                  onClick={() => setLightboxImage({ url: item.imageUrl, title: item.title, alt: item.imageAlt })}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="p-3 rounded-full bg-white/95 text-emerald-950 shadow-md">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-emerald-950 shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-emerald-950 group-hover:text-emerald-800 transition-colors font-serif">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-4 block font-mono">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

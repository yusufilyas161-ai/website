import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  FileText, 
  Tag, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';

export const NewsView: React.FC = () => {
  const { articles, setSelectedArticleSlug, setActiveView } = useSchool();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Berita Sekolah',
    'Tahfizh',
    'Kegiatan Siswa',
    'Prestasi',
    'Informasi SPMB',
    'Pengumuman',
    'Artikel Pendidikan',
    'Artikel Islami'
  ];

  const filteredArticles = articles.filter(art => {
    const matchCat = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead 
        title="Berita & Artikel Pendidikan Al-Qur'an SD Para Sahabat"
        description="Pusat informasi resmi, tips parenting islami, artikel tahfizh anak, dan kabar kegiatan SD Qur'an Para Sahabat Kampung Baru Muara Tembesi."
        slug="berita"
      />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white py-14 lg:py-20 border-b-4 border-amber-400">
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <FileText className="w-3.5 h-3.5 text-emerald-950" />
            <span>Kabar & Wawasan Qur'ani</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            Berita & Artikel Sekolah
          </h1>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Menyajikan informasi kegiatan sekolah, panduan mendidik anak Qur'ani, dan pengumuman resmi.
          </p>

          {/* Search Box in Header */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari judul artikel, topik tahfizh, SPMB..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-slate-900 text-xs shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400 border border-emerald-100"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
          </div>
        </div>
      </section>

      {/* Category Pills & Article List */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter */}
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

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-[#F4F7F2] rounded-3xl border border-emerald-100 max-w-lg mx-auto p-8">
              <FileText className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-bold text-emerald-950 font-serif">Tidak ada artikel yang sesuai</h3>
              <p className="text-xs text-slate-500 mt-1">Coba kata kunci lain atau pilih kategori Semua.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-[#F4F7F2] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-emerald-100 flex flex-col group cursor-pointer"
                  onClick={() => {
                    setSelectedArticleSlug(art.slug);
                    setActiveView('berita-detail');
                  }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={art.featuredImage}
                      alt={art.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-emerald-950 shadow-sm">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                          {art.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-700" />
                          {art.readTimeMinutes} menit baca
                        </span>
                      </div>

                      <h2 className="font-bold text-base sm:text-lg text-emerald-950 font-serif group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                        {art.title}
                      </h2>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <User className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="line-clamp-1">{art.author}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-900 group-hover:text-emerald-950 flex items-center gap-1">
                        Baca <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

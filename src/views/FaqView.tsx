import React, { useState } from 'react';
import { HelpCircle, Search, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';

export const FaqView: React.FC = () => {
  const { faqs, schoolInfo, setActiveView } = useSchool();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-5': true
  });

  const categories = ['Semua', 'Tahfizh', 'SPMB', 'Akademik', 'Umum', 'Fasilitas'];

  const toggleFaq = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchCat = selectedCategory === 'Semua' || faq.category === selectedCategory;
    const matchSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const rawNumber = schoolInfo.whatsapp.replace(/\D/g, '');
  const cleanWaNumber = rawNumber.startsWith('0') 
    ? `62${rawNumber.slice(1)}` 
    : rawNumber.startsWith('62') 
      ? rawNumber 
      : `62${rawNumber}`;

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead 
        title="Tanya Jawab (FAQ) SD Qur'an Para Sahabat"
        description="Pertanyaan yang sering diajukan mengenai program Tahfizh, pendaftaran SPMB, biaya sekolah, kurikulum, dan jam belajar SD Qur'an Para Sahabat Kampung Baru."
        slug="faq"
      />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white py-14 lg:py-20 border-b-4 border-amber-400">
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-950" />
            <span>Pusat Bantuan & Informasi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h1>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Temukan jawaban resmi seputar pendaftaran siswa baru, tahfizh Al-Qur'an, rincian biaya, dan keseharian siswa.
          </p>

          <div className="mt-8 max-w-lg mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Ketik pertanyaan atau kata kunci..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-slate-900 text-xs shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400 border border-emerald-100"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap mb-8 pb-4 border-b border-emerald-100">
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

          {/* List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-[#F4F7F2] rounded-2xl border border-emerald-100 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-emerald-50/50 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-emerald-950 font-serif">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-white border border-emerald-200 text-emerald-800 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-emerald-100/60 pt-3 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still Have Questions Box */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-emerald-950 text-white text-center space-y-4 shadow-sm border border-emerald-900">
            <h3 className="text-2xl font-bold font-serif text-white">Punya Pertanyaan Lain yang Belum Terjawab?</h3>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-md mx-auto">
              Admin dan Panitia SPMB SD Qur'an Para Sahabat siap melayani dan memberikan penjelasan secara ramah.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                  "Halo SD Qur'an Para Sahabat, saya memiliki pertanyaan mengenai sekolah."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-full text-xs flex items-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-950" />
                <span>Chat Langsung via WhatsApp</span>
              </a>
              <button
                onClick={() => setActiveView('kontak')}
                className="px-6 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-medium rounded-full text-xs border border-emerald-700 transition-colors"
              >
                Lihat Kontak & Lokasi
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  HeartHandshake, 
  GraduationCap, 
  Languages, 
  Trophy, 
  ArrowRight,
  BookOpenCheck
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';

export const ProgramView: React.FC = () => {
  const { programs, setActiveView } = useSchool();

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpenCheck': return <BookOpenCheck className="w-5 h-5 text-emerald-700" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-emerald-700" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald-700" />;
      case 'Languages': return <Languages className="w-5 h-5 text-emerald-700" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-emerald-700" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-emerald-700" />;
      default: return <BookOpen className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead 
        title="Program Unggulan Pendidikan SD Qur'an Para Sahabat"
        description="Kurikulum terpadu SD Qur'an Para Sahabat Kampung Baru: Tahsin, Tahfizh, Pendidikan Karakter Islami, Akademik, Bahasa Arab, Ibadah Praktis, dan Pengembangan Bakat."
        slug="program"
      />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white py-14 lg:py-20 border-b-4 border-amber-400">
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
            <span>Kurikulum Holistik Terpadu</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            Program Pendidikan Unggulan
          </h1>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Memadukan kurikulum Al-Qur'an dan pendidikan nasional secara harmonis untuk mencetak generasi berkarakter unggul, cerdas, dan bertakwa.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {programs.map((prog, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div 
                key={prog.id}
                id={`program-${prog.id}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-[#F4F7F2] border border-emerald-100 shadow-sm ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-emerald-200 flex items-center justify-center shadow-sm">
                      {getIcon(prog.iconName)}
                    </div>
                    {prog.badge && (
                      <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-emerald-950 shadow-sm">
                        {prog.badge}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-emerald-950 font-serif">
                    {prog.title}
                  </h2>
                  <p className="text-xs font-semibold text-emerald-800">
                    {prog.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {prog.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {prog.id === 'tahsin-tahfizh' && (
                    <div className="pt-3">
                      <button
                        onClick={() => setActiveView('tahfizh')}
                        className="px-6 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-xs rounded-full transition-colors shadow-sm flex items-center gap-2"
                      >
                        <span>Buka Detail Lengkap Program Tahfizh</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-emerald-100">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-72 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="pt-8 text-center bg-emerald-950 text-white p-8 sm:p-10 rounded-3xl space-y-4 border border-emerald-900 shadow-sm">
            <h3 className="text-2xl font-bold font-serif text-white">Ingin Mengetahui Lebih Lanjut?</h3>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-xl mx-auto">
              Panitia SPMB dan tim pengajar kami siap berdiskusi mengenai kurikulum dan rencana pembelajaran ananda.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('spmb')}
                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-full text-xs shadow-sm transition-colors"
              >
                Daftar Siswa Baru Sekarang
              </button>
              <button
                onClick={() => setActiveView('kontak')}
                className="px-6 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-medium rounded-full text-xs border border-emerald-700 transition-colors"
              >
                Hubungi Panitia SPMB
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

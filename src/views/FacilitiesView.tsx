import React from 'react';
import { Sparkles, CheckCircle2, Eye, Building2 } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';

export const FacilitiesView: React.FC = () => {
  const { facilities, setLightboxImage, setActiveView } = useSchool();

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead 
        title="Fasilitas Sekolah SD Qur'an Para Sahabat"
        description="Fasilitas pembelajaran, ruang kelas nyaman, area tahfizh, musholla, dan sarana bermain di SD Qur'an Para Sahabat Kampung Baru Muara Tembesi."
        slug="fasilitas"
      />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white py-14 lg:py-20 border-b-4 border-amber-400">
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-emerald-950" />
            <span>Sarana & Prasarana</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            Fasilitas Pembelajaran
          </h1>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Menyediakan lingkungan yang aman, bersih, dan mendukung proses menghafal Al-Qur'an serta eksplorasi akademik anak.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac) => (
              <div 
                key={fac.id}
                className="bg-[#F4F7F2] rounded-3xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col justify-between"
                onClick={() => setLightboxImage({ url: fac.imageUrl, title: fac.name, alt: fac.imageAlt })}
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={fac.imageUrl}
                      alt={fac.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="p-3 rounded-full bg-white/95 text-emerald-950 shadow-md">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-bold text-lg text-emerald-950 font-serif group-hover:text-emerald-800 transition-colors">
                      {fac.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                </div>

                {fac.capacity && (
                  <div className="px-6 pb-6 pt-2">
                    <span className="inline-block px-3 py-1 bg-white rounded-full border border-emerald-200 text-[11px] font-semibold text-emerald-900 shadow-sm">
                      {fac.capacity}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 p-8 bg-emerald-950 text-white rounded-3xl text-center space-y-3 max-w-2xl mx-auto border border-emerald-900 shadow-sm">
            <h4 className="font-bold text-xl font-serif text-white">Kunjungan Sekolah & Survei Fasilitas</h4>
            <p className="text-xs sm:text-sm text-emerald-200">
              Orang tua dipersilakan melakukan kunjungan langsung untuk melihat suasana kelas dan lingkungan belajar di SD Qur'an Para Sahabat Kampung Baru.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveView('kontak')}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold text-xs rounded-full shadow-sm transition-colors"
              >
                Jadwalkan Kunjungan Sekolah
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

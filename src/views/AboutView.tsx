import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Target, 
  Compass, 
  CheckCircle2, 
  HeartHandshake, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  MapPin 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';
import { imgTentangSekolah } from '../data/schoolImages';

export const AboutView: React.FC = () => {
  const { schoolInfo, setActiveView } = useSchool();

  const values = [
    {
      title: "Al-Qur'an Sebagai Pedoman",
      desc: "Menjadikan Al-Qur'an dan Sunnah sebagai fondasi utama dalam berpikir, bersikap, dan berperilaku.",
      icon: BookOpen
    },
    {
      title: "Adab Sebelum Ilmu",
      desc: "Memprioritaskan penanaman akhlakul karimah, ketakziman kepada guru, dan rasa hormat kepada orang tua.",
      icon: HeartHandshake
    },
    {
      title: "Semangat Menuntut Ilmu",
      desc: "Mendorong kecintaan membaca, rasa ingin tahu positif, dan kemampuan eksplorasi sains serta literasi.",
      icon: GraduationCap
    },
    {
      title: "Keteladanan Para Sahabat",
      desc: "Mengambil inspirasi dari keteguhan iman, keberanian, kedermawanan, dan ketulusan para Sahabat Nabi SAW.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead 
        title="Tentang SD Qur'an Para Sahabat Kampung Baru"
        description="Profil resmi, visi misi, dan nilai pendidikan SD Qur'an Para Sahabat Kampung Baru Muara Tembesi Batang Hari Jambi."
        slug="tentang"
      />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white py-14 lg:py-20 border-b-4 border-amber-400">
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
            <span>Profil Lembaga</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            Tentang SD Qur'an Para Sahabat
          </h1>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            {schoolInfo.description}
          </p>
        </div>
      </section>

      {/* Profile Overview */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                Sejarah & Komitmen
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-serif leading-tight">
                Membangun Generasi Emas dari Kampung Baru, Muara Tembesi
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>SD Qur'an Para Sahabat Kampung Baru</strong> didirikan atas dasar kepedulian mendalam terhadap pentingnya pendidikan karakter berbasis Al-Qur'an sejak usia dini. Di tengah tantangan era digital dan perubahan zaman, kami hadir memberikan lingkungan yang kondusif, mendidik akhlak, dan memperkuat fondasi keimanan anak.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Nama <em>"Para Sahabat"</em> diambil dari keteladanan generasi terbaik umat Islam (Shahabat Nabi Muhammad SAW) yang memadukan keilmuan, keberanian, adab luhur, dan ketakwaan yang murni kepada Allah SWT.
              </p>
              <div className="p-4 rounded-2xl bg-[#F4F7F2] border border-emerald-100 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong className="block text-emerald-950 font-bold">Lokasi Sekolah:</strong>
                  <span>{schoolInfo.address}, {schoolInfo.village}, Kec. {schoolInfo.district}, Kab. {schoolInfo.regency}, Jambi.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-emerald-100">
                <img
                  src={imgTentangSekolah}
                  alt="Aktivitas pembelajaran SD Qur'an Para Sahabat"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-14 lg:py-20 bg-[#F4F7F2] border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Visi */}
            <div className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950 font-serif">Visi Sekolah</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium bg-[#F4F7F2] p-4 rounded-2xl border border-emerald-100">
                "Terwujudnya Generasi Qur'ani yang Berilmu Amaliah, Berakhlakul Karimah, Percaya Diri, dan Unggul dalam Prestasi."
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950 font-serif">Misi Sekolah</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Menyelenggarakan pembelajaran Al-Qur'an (Tahsin & Tahfizh) yang tartil dan mutqin.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Membiasakan penanaman adab dan ibadah harian sesuai tuntunan Rasulullah SAW.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Memberikan pendidikan akademik kurikulum nasional yang bermutu dan inovatif.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Mengembangkan potensi minat dan bakat setiap anak secara optimal dan menyenangkan.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Nilai-Nilai Utama */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
              Karakter Utama
            </span>
            <h2 className="text-3xl font-extrabold text-emerald-950 font-serif">
              Nilai-Nilai Dasar Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-emerald-950 font-serif">{v.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setActiveView('spmb')}
              className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-full text-sm shadow-sm transition-colors"
            >
              Daftar Sebagai Siswa Baru (SPMB 2026/2027)
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

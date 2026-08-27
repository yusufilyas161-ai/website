import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  Award, 
  HeartHandshake, 
  Clock, 
  Users, 
  ArrowRight,
  BookOpenCheck,
  Play,
  Pause,
  Star,
  Compass,
  FileCheck
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';

export const TahfizhView: React.FC = () => {
  const { setActiveView, schoolInfo } = useSchool();
  const [activeSurahTab, setActiveSurahTab] = useState<'juz30' | 'juz29' | 'metode'>('juz30');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeAudioIndex, setActiveAudioIndex] = useState<number>(0);

  const sampleSurahsJuz30 = [
    { no: 1, name: "An-Naba'", verses: 40, meaning: "Berita Besar", target: "Kelas 3-4" },
    { no: 2, name: "An-Nazi'at", verses: 46, meaning: "Malaikat yang Mencabut", target: "Kelas 3-4" },
    { no: 3, name: "'Abasa", verses: 42, meaning: "Ia Bermuka Masam", target: "Kelas 3" },
    { no: 4, name: "At-Takwir", verses: 29, meaning: "Menggulung", target: "Kelas 2-3" },
    { no: 5, name: "Al-Infithar", verses: 19, meaning: "Terbelah", target: "Kelas 2" },
    { no: 6, name: "Al-Muthaffifin", verses: 36, meaning: "Orang yang Curang", target: "Kelas 2" },
    { no: 7, name: "Al-Insyiqaq", verses: 25, meaning: "Terbelah", target: "Kelas 2" },
    { no: 8, name: "Al-Buruj", verses: 22, meaning: "Gugusan Bintang", target: "Kelas 2" },
    { no: 9, name: "At-Thariq s/d An-Nas", verses: 177, meaning: "Surat-Surat Pendek", target: "Kelas 1 (Fondasi Awal)" }
  ];

  const audioRecitations = [
    { title: "Surah An-Naba' (Ayat 1-10)", reciter: "Mishari Rashid Al-Afasy", url: "https://server8.mp3quran.net/afs/078.mp3" },
    { title: "Surah Al-Fatihah & Ayat Kursi", reciter: "Lantunan Murottal Standar Tartil", url: "https://server8.mp3quran.net/afs/001.mp3" },
    { title: "Surah Ad-Dhuha s/d An-Nas", reciter: "Panduan Talaqqi Anak", url: "https://server8.mp3quran.net/afs/093.mp3" }
  ];

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead 
        title="Program Unggulan Tahfizh & Tahsin Al-Qur'an"
        description="Program Tahfizh dan Tahsin Al-Qur'an di SD Qur'an Para Sahabat Kampung Baru Muara Tembesi. Metode Talaqqi, target berjenjang Juz 30 & 29, dan pembiasaan muraja'ah."
        slug="program/tahfizh"
      />

      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white py-14 lg:py-20 border-b-4 border-amber-400">
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <BookOpenCheck className="w-3.5 h-3.5 text-emerald-950" />
            <span>Pilar Utama Pendidikan Qur'ani</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            Program Tahfizh & Tahsin Al-Qur'an
          </h1>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Menumbuhkan cinta Al-Qur'an sejak dini dengan metode membaca yang tartil (Tahsin) dan hafalan yang melekat kuat (Tahfizh Mutqin).
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveView('spmb')}
              className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-full text-sm shadow-sm transition-colors"
            >
              Daftar Siswa Baru (SPMB)
            </button>
            <button
              onClick={() => setActiveView('program')}
              className="px-6 py-3.5 bg-emerald-900/80 hover:bg-emerald-900 text-white rounded-full text-sm font-semibold border border-emerald-700 transition-colors"
            >
              Lihat Seluruh Program
            </button>
          </div>
        </div>
      </section>

      {/* Main Philosophy & Definition */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                Konsep & Tujuan
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-serif leading-tight">
                Membangun Generasi Penghafal Al-Qur'an yang Beradab
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Di <strong>SD Qur'an Para Sahabat Kampung Baru</strong>, pendidikan Al-Qur'an bukan sekadar target kuantitas hafalan, melainkan proses pembentukan karakter (tarbiyah khuluqiyah) dan penanaman kecintaan mendalam terhadap kalamullah.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#F4F7F2] border border-emerald-100">
                  <strong className="text-sm font-bold text-emerald-950 block font-serif">Tahsin Al-Qur'an (Membaguskan Bacaan)</strong>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Setiap anak diajarkan pengucapan huruf dari makhrajnya yang tepat (Makharijul Huruf) dan hukum-hukum tajwid seperti mad, ikhfa, idgham, dan ghunnah sebelum menghafal lebih jauh.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F7F2] border border-emerald-100">
                  <strong className="text-sm font-bold text-emerald-950 block font-serif">Tahfizh Al-Qur'an (Menghafal & Menjaga)</strong>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Bimbingan menghafal surat-surat dalam Juz 30, Juz 29, dan surat pilihan dengan pendampingan Asatidz secara intensif melalui metode Talaqqi dan Tasmi'.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-emerald-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80"
                  alt="Kegiatan Tahfizh SD Qur'an Para Sahabat"
                  className="w-full h-80 object-cover"
                />
                <div className="p-5 bg-emerald-950 text-white space-y-2">
                  <h4 className="font-bold text-amber-300 text-sm font-serif">Target Mutu Lulusan SD Qur'an:</h4>
                  <ul className="text-xs text-emerald-100 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>Mampu membaca Al-Qur'an dengan tartil sesuai kaidah tajwid standar.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>Memiliki hafalan Juz 30 dan Juz 29 yang mutqin (lancar dan kuat).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>Hafal doa-doa harian, hadits pilihan, dan dzikir ba'da shalat.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5 Metode Pembelajaran Tahfizh */}
      <section className="py-14 lg:py-20 bg-[#F4F7F2] border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-white px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
              Sistematika Belajar
            </span>
            <h2 className="text-3xl font-extrabold text-emerald-950 font-serif">
              5 Tahapan Pembelajaran Tahfizh
            </h2>
            <p className="text-sm text-slate-600">
              Metodologi teruji yang membuat anak menghafal dengan senang, terarah, dan tanpa rasa tertekan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold mx-auto flex items-center justify-center text-sm font-serif">
                1
              </div>
              <h4 className="font-bold text-sm text-emerald-950 font-serif">Talaqqi</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guru membacakan ayat dengan tajwid sempurna, lalu siswa menirukan hingga intonasi tepat.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold mx-auto flex items-center justify-center text-sm font-serif">
                2
              </div>
              <h4 className="font-bold text-sm text-emerald-950 font-serif">Tikrar</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengulangan mandiri di bawah pengawasan ustadz untuk mengunci memori ayat baru.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold mx-auto flex items-center justify-center text-sm font-serif">
                3
              </div>
              <h4 className="font-bold text-sm text-emerald-950 font-serif">Tasmi' / Setoran</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Siswa memperdengarkan hafalan ayat baru secara langsung kepada guru pembimbing.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold mx-auto flex items-center justify-center text-sm font-serif">
                4
              </div>
              <h4 className="font-bold text-sm text-emerald-950 font-serif">Muraja'ah</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mengulang hafalan lama setiap hari agar tidak terlupakan seiring bertambahnya ayat baru.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold mx-auto flex items-center justify-center text-sm font-serif">
                5
              </div>
              <h4 className="font-bold text-sm text-emerald-950 font-serif">Ujian Kenaikan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluasi kelulusan satu juz penuh di depan tim penguji tahfizh sebelum melangkah ke juz berikutnya.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Target Hafalan Juz 30 Breakdown Table */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
              Peta Target
            </span>
            <h2 className="text-3xl font-extrabold text-emerald-950 font-serif">
              Struktur Target Hafalan Juz 30
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Disusun secara bertahap dan proporsional untuk siswa sekolah dasar.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-emerald-100 shadow-sm bg-white">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-emerald-950 text-white font-serif">
                <tr>
                  <th className="p-3.5">Urutan</th>
                  <th className="p-3.5">Nama Surat</th>
                  <th className="p-3.5">Jumlah Ayat</th>
                  <th className="p-3.5">Arti Nama</th>
                  <th className="p-3.5">Jenjang Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100 text-slate-700">
                {sampleSurahsJuz30.map((s, idx) => (
                  <tr key={idx} className="hover:bg-[#F4F7F2] transition-colors">
                    <td className="p-3.5 font-bold text-emerald-800">{idx + 1}</td>
                    <td className="p-3.5 font-semibold text-emerald-950">{s.name}</td>
                    <td className="p-3.5">{s.verses} Ayat</td>
                    <td className="p-3.5 italic text-slate-500">{s.meaning}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium text-xs">
                        {s.target}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Parents Guide Callout */}
          <div className="mt-8 p-6 bg-[#F4F7F2] rounded-2xl border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-emerald-950 text-base font-serif">Buku Mutaba'ah & Sinergi Orang Tua</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                Setiap siswa dibekali buku kontrol hafalan harian. Guru mencatat capaian di sekolah, dan orang tua memverifikasi muraja'ah di rumah, menciptakan ekosistem belajar yang erat.
              </p>
            </div>
            <button
              onClick={() => setActiveView('kontak')}
              className="px-6 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-xs rounded-full transition-colors shadow-sm whitespace-nowrap"
            >
              Konsultasi Program Tahfizh
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  Share2,
  Navigation
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';

export const ContactView: React.FC = () => {
  const { schoolInfo } = useSchool();
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const rawNumber = schoolInfo.whatsapp.replace(/\D/g, '');
  const cleanWaNumber = rawNumber.startsWith('0') 
    ? `62${rawNumber.slice(1)}` 
    : rawNumber.startsWith('62') 
      ? rawNumber 
      : `62${rawNumber}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formMessage) {
      alert("Mohon lengkapi nama, nomor telepon, dan pesan Anda.");
      return;
    }

    const text = `*PESAN DARI WEBSITE SD QUR'AN PARA SAHABAT*\n\n` +
      `Nama Pengirim: ${formName}\n` +
      `No. Kontak/WA: ${formPhone}\n\n` +
      `Pesan:\n${formMessage}`;

    const waLink = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(text)}`;
    setSentSuccess(true);
    window.open(waLink, '_blank');
  };

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead 
        title="Kontak & Lokasi SD Qur'an Para Sahabat Kampung Baru"
        description="Alamat lengkap, peta lokasi Google Maps, nomor telepon, WhatsApp resmi, dan jam operasional SD Qur'an Para Sahabat Kampung Baru Muara Tembesi Batang Hari Jambi."
        slug="kontak"
      />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white py-14 lg:py-20 border-b-4 border-amber-400">
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Phone className="w-3.5 h-3.5 text-emerald-950" />
            <span>Layanan Informasi & Lokasi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            Hubungi & Kunjungi Kami
          </h1>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Kami menyambut hangat kedatangan dan komunikasi dari Bapak/Ibu calon wali santri dan masyarakat luas.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Contact Details & Info */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-[#F4F7F2] rounded-3xl p-6 sm:p-8 border border-emerald-100 space-y-5">
                <h3 className="font-bold text-xl text-emerald-950 font-serif">
                  Informasi Kontak Resmi
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-800">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-emerald-950 font-bold text-[11px] uppercase tracking-wider">Alamat Sekolah:</strong>
                      <p className="mt-0.5 leading-relaxed">
                        {schoolInfo.address}, {schoolInfo.village}, Kec. {schoolInfo.district}, Kab. {schoolInfo.regency}, Prov. {schoolInfo.province}, Indonesia ({schoolInfo.postalCode}).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-800">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-emerald-950 font-bold text-[11px] uppercase tracking-wider">WhatsApp Panitia:</strong>
                      <a 
                        href={`https://wa.me/${cleanWaNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-800 font-bold hover:underline"
                      >
                        {schoolInfo.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-800">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-emerald-950 font-bold text-[11px] uppercase tracking-wider">Email Resmi:</strong>
                      <a href={`mailto:${schoolInfo.email}`} className="text-emerald-800 font-bold hover:underline">
                        {schoolInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-800">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-emerald-950 font-bold text-[11px] uppercase tracking-wider">Jam Pelayanan Kantor:</strong>
                      <div className="mt-1 space-y-1 text-slate-600 text-xs">
                        <p>Senin – Kamis: {schoolInfo.operatingHours.mondayThursday}</p>
                        <p>Jum'at: {schoolInfo.operatingHours.friday}</p>
                        <p>Sabtu: {schoolInfo.operatingHours.saturday}</p>
                        <p className="text-amber-800 font-semibold">Ahad & Libur Nasional: Tutup</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-emerald-200">
                  <a
                    href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent("Halo, saya ingin bertanya tentang SD Qur'an Para Sahabat Kampung Baru.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-full text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim Pesan WhatsApp Langsung</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-[#F4F7F2] rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-5">
                <div>
                  <h3 className="font-bold text-xl text-emerald-950 font-serif">
                    Kirim Pesan atau Pertanyaan
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Silakan isi pesan Anda. Sistem akan menghubungkan Anda langsung ke WhatsApp resmi sekolah.
                  </p>
                </div>

                {sentSuccess && (
                  <div className="p-4 bg-white border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-2 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Pesan telah disiapkan! Jendela WhatsApp telah dibuka untuk mengirimkan pesan Anda.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap Anda <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      placeholder="Nama Bapak / Ibu"
                      className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp / HP Aktif <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={e => setFormPhone(e.target.value)}
                      placeholder="Contoh: 081274xxxxxx"
                      className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pesan atau Pertanyaan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formMessage}
                      onChange={e => setFormMessage(e.target.value)}
                      placeholder="Tuliskan pertanyaan Anda mengenai SPMB, biaya, jadwal tahfizh, atau informasi lainnya..."
                      className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-full text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan ke Admin WhatsApp</span>
                  </button>
                </form>
              </div>

            </div>

          </div>

          {/* Google Maps Interactive Card */}
          <div className="mt-12 rounded-3xl overflow-hidden shadow-sm border border-emerald-100 bg-[#F4F7F2]">
            <div className="p-6 bg-emerald-950 text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base text-amber-300 font-serif">Peta Lokasi Sekolah</h4>
                <p className="text-xs text-emerald-200">
                  Kampung Baru, Kec. Muara Tembesi, Kab. Batang Hari, Jambi.
                </p>
              </div>
              <a
                href={schoolInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold text-xs rounded-full shadow-sm transition-colors flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Buka Petunjuk Arah Google Maps</span>
              </a>
            </div>

            <div className="w-full h-80 sm:h-96 relative bg-slate-100">
              <iframe
                title="Peta Lokasi SD Qur'an Para Sahabat Kampung Baru"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(schoolInfo.mapsEmbedQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

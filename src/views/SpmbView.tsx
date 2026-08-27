import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  MessageCircle, 
  Download, 
  Send, 
  Calendar, 
  CreditCard, 
  UserCheck, 
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Building,
  Copy,
  Check
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { IslamicPattern } from '../components/IslamicPattern';
import { SEOHead } from '../components/SEOHead';

export const SpmbView: React.FC = () => {
  const { spmbConfig, schoolInfo, addApplicant } = useSchool();

  const [formData, setFormData] = useState({
    fullName: '',
    nickname: '',
    gender: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    birthPlace: '',
    birthDate: '',
    nik: '',
    previousSchool: '',
    parentName: '',
    parentPhone: '',
    parentJob: '',
    parentAddress: '',
    hasKipKks: false,
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedApplicantId, setSubmittedApplicantId] = useState<string | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const rawNumber = schoolInfo.whatsapp.replace(/\D/g, '');
  const cleanWaNumber = rawNumber.startsWith('0') 
    ? `62${rawNumber.slice(1)}` 
    : rawNumber.startsWith('62') 
      ? rawNumber 
      : `62${rawNumber}`;

  const defaultWaUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    "Halo SD Qur'an Para Sahabat, saya ingin konsultasi pendaftaran siswa baru (SPMB 2026/2027)."
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.parentPhone || !formData.parentName) {
      alert("Mohon lengkapi Nama Calon Siswa, Nama Orang Tua, dan Nomor WhatsApp aktif.");
      return;
    }

    const created = addApplicant({
      fullName: formData.fullName,
      nickname: formData.nickname,
      gender: formData.gender,
      birthPlace: formData.birthPlace,
      birthDate: formData.birthDate,
      nik: formData.nik,
      previousSchool: formData.previousSchool,
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
      parentJob: formData.parentJob,
      parentAddress: formData.parentAddress,
      hasKipKks: formData.hasKipKks,
      notes: formData.notes
    });

    setSubmittedApplicantId(created.id);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // Compose auto WA message
    const message = `*PENDAFTARAN SPMB ONLINE SD QUR'AN PARA SAHABAT*\n\n` +
      `No. Registrasi: ${created.id}\n` +
      `Nama Calon Siswa: ${formData.fullName} (${formData.nickname || '-'})\n` +
      `Jenis Kelamin: ${formData.gender}\n` +
      `TTL: ${formData.birthPlace || '-'}, ${formData.birthDate || '-'}\n` +
      `Nama Orang Tua/Wali: ${formData.parentName}\n` +
      `No. WhatsApp: ${formData.parentPhone}\n` +
      `Alamat: ${formData.parentAddress || '-'}\n` +
      `Asal TK/RA: ${formData.previousSchool || '-'}\n` +
      `Status KIP/KKS: ${formData.hasKipKks ? 'Ada' : 'Tidak Ada'}\n\n` +
      `Mohon petunjuk untuk jadwal verifikasi berkas dan pembayaran administrasi. Terima kasih.`;

    const encoded = encodeURIComponent(message);
    const waLink = `https://wa.me/${cleanWaNumber}?text=${encoded}`;
    
    // Automatically offer to open WhatsApp
    setTimeout(() => {
      window.open(waLink, '_blank');
    }, 1200);
  };

  return (
    <div className="w-full bg-[#F9FAF8] text-slate-800">
      <SEOHead 
        title={`SPMB ${spmbConfig.academicYear} | Penerimaan Siswa Baru SD Qur'an Para Sahabat`}
        description={`Penerimaan Siswa Baru (SPMB) SD Qur'an Para Sahabat Kampung Baru Muara Tembesi. Biaya pendaftaran Rp2.650.000, SPP Rp200.000/bln, kuota terbatas. Daftar online sekarang!`}
        slug="spmb"
      />

      {/* Header */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#022c22] text-white py-14 lg:py-20 border-b-4 border-amber-400">
        <IslamicPattern opacity={0.06} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
            <span>Tahun Ajaran {spmbConfig.academicYear}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            Penerimaan Siswa Baru (SPMB)
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-amber-300 mt-2 font-serif">
            SD Qur'an Para Sahabat Kampung Baru
          </p>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Membuka kesempatan bagi putra-putri Anda untuk menjadi bagian dari generasi penghafal Al-Qur'an yang cerdas dan berakhlak mulia.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#form-pendaftaran"
              className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-full text-sm shadow-sm transition-colors"
            >
              Isi Formulir Online
            </a>
            <a
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-900/80 hover:bg-emerald-900 text-white font-semibold rounded-full text-sm border border-emerald-700 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-amber-300" />
              <span>Konsultasi via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Alur Pendaftaran */}
      <section className="py-14 bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
              Tahapan Mudah
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-serif">
              Alur Pendaftaran Siswa Baru
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto text-sm font-serif">
                1
              </div>
              <h4 className="font-bold text-emerald-950 text-sm font-serif">Pendaftaran Online/Offline</h4>
              <p className="text-xs text-slate-600">Mengisi formulir di website atau hadir ke kantor sekretariat sekolah.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto text-sm font-serif">
                2
              </div>
              <h4 className="font-bold text-emerald-950 text-sm font-serif">Penyerahan Berkas</h4>
              <p className="text-xs text-slate-600">Menyerahkan fotokopi KK, KTP orang tua, Akta Kelahiran, dan Pas Foto.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto text-sm font-serif">
                3
              </div>
              <h4 className="font-bold text-emerald-950 text-sm font-serif">Pemetaan Awal & Observasi</h4>
              <p className="text-xs text-slate-600">Melihat kesiapan bacaan hijaiyah dan adaptasi anak dengan asatidz.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4F7F2] border border-emerald-100 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto text-sm font-serif">
                4
              </div>
              <h4 className="font-bold text-emerald-950 text-sm font-serif">Daftar Ulang & Seragam</h4>
              <p className="text-xs text-slate-600">Pelunasan administrasi dan pengambilan 3 stel seragam serta modul Iqra.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Rincian Biaya & Persyaratan Box */}
      <section className="py-14 lg:py-20 bg-[#F4F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Fee Table Box */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 space-y-5">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3 py-1 rounded-full border border-emerald-100">
                    Transparansi Pembiayaan
                  </span>
                  <h3 className="text-2xl font-bold text-emerald-950 font-serif mt-2">
                    Rincian Biaya Pendaftaran
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Total Investasi Awal</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-900 font-serif">
                    Rp{spmbConfig.totalFee.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                {spmbConfig.feeItems.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-[#F4F7F2] border border-emerald-100">
                    <div>
                      <strong className="block text-emerald-950 font-bold">{idx + 1}. {item.name}</strong>
                      {item.description && (
                        <span className="text-[11px] text-slate-500">{item.description}</span>
                      )}
                    </div>
                    <span className="font-bold text-emerald-900 whitespace-nowrap ml-3">
                      Rp{item.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>Iuran SPP Bulanan:</span>
                  <span className="text-emerald-900 font-black">Mulai Rp{spmbConfig.sppMonthly.toLocaleString('id-ID')}/bulan</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  *Semua informasi biaya pendaftaran dapat diperbarui atau disesuaikan melalui panitia SPMB.
                </p>
              </div>

              <div className="p-5 bg-emerald-950 text-white rounded-2xl text-xs space-y-2 border border-emerald-900 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 block text-xs font-serif">Rekening Resmi Pembayaran:</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(spmbConfig.bankAccount.accountNumber);
                      setCopiedAccount(true);
                      setTimeout(() => setCopiedAccount(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-[11px] font-semibold transition-colors border border-emerald-800"
                    title="Salin Nomor Rekening"
                  >
                    {copiedAccount ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-300" />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-bold text-sm text-emerald-100">{spmbConfig.bankAccount.bankName}</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-lg font-extrabold text-amber-300 tracking-wider select-all">{spmbConfig.bankAccount.accountNumber}</p>
                </div>
                <p className="text-xs text-emerald-200">a.n. <span className="font-semibold text-white">{spmbConfig.bankAccount.accountHolder}</span></p>
              </div>
            </div>

            {/* Requirements Box */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 space-y-4">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3 py-1 rounded-full border border-emerald-100">
                  Berkas & Syarat
                </span>
                <h3 className="text-2xl font-bold text-emerald-950 font-serif">
                  Persyaratan Dokumen
                </h3>
                <p className="text-xs text-slate-600">
                  Berikut kelengkapan berkas fisik yang dibutuhkan saat verifikasi pendaftaran:
                </p>

                <div className="space-y-2 text-xs text-slate-700">
                  {spmbConfig.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#F4F7F2] border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-900 italic">
                  "Persyaratan dapat berubah sesuai kebijakan sekolah."
                </div>
              </div>

              {/* Service Hours Card */}
              <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-900 space-y-3">
                <h4 className="font-bold text-base text-amber-300 font-serif">Waktu & Jam Pelayanan Pendaftaran</h4>
                <div className="text-xs space-y-1.5 text-emerald-100">
                  <p><strong>Senin – Kamis:</strong> {schoolInfo.operatingHours.mondayThursday}</p>
                  <p><strong>Jum'at:</strong> {schoolInfo.operatingHours.friday}</p>
                  <p><strong>Sabtu:</strong> {schoolInfo.operatingHours.saturday}</p>
                </div>
                <div className="pt-3">
                  <a
                    href={defaultWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-emerald-950 rounded-full text-xs font-bold hover:bg-amber-500 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konfirmasi via WhatsApp ({schoolInfo.whatsapp})</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Online Registration Form */}
      <section id="form-pendaftaran" className="py-14 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 bg-[#F4F7F2] px-3.5 py-1 rounded-full border border-emerald-100 shadow-sm">
              Formulir Digital
            </span>
            <h2 className="text-3xl font-extrabold text-emerald-950 font-serif">
              Formulir Pendaftaran Siswa Baru
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Isi data calon siswa secara lengkap. Data akan tersimpan di sistem sekolah dan langsung terhubung ke WhatsApp Admin SPMB.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-[#F4F7F2] border border-emerald-200 rounded-3xl p-8 text-center space-y-4 shadow-sm animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-950 font-serif">
                Alhamdulillah! Pendaftaran Berhasil Terkirim
              </h3>
              <p className="text-sm text-slate-700 max-w-md mx-auto">
                Terima kasih telah mendaftarkan ananda <strong>{formData.fullName}</strong>. Data telah dicatat dengan No. Registrasi: <code className="bg-white px-2.5 py-1 rounded-full border border-emerald-200 font-mono font-bold text-emerald-800">{submittedApplicantId}</code>.
              </p>
              <div className="p-5 bg-white rounded-2xl border border-emerald-100 text-xs text-slate-600 max-w-lg mx-auto space-y-3">
                <p>Silakan lanjutkan konfirmasi melalui WhatsApp ke Admin SPMB jika jendela WhatsApp belum terbuka otomatis.</p>
                <a
                  href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                    `Halo SD Qur'an Para Sahabat, saya telah mengisi formulir online atas nama ${formData.fullName} (No: ${submittedApplicantId}). Mohon informasi jadwal verifikasi.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-full text-xs shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-amber-300" />
                  <span>Kirim Konfirmasi WhatsApp Sekarang</span>
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-emerald-800 hover:underline font-semibold"
                >
                  Daftarkan Calon Siswa Lainnya
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#F4F7F2] rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
              
              <div className="border-b border-emerald-100 pb-4">
                <h4 className="font-bold text-emerald-950 text-base font-serif">A. Data Calon Siswa</h4>
                <p className="text-xs text-slate-500">Informasi identitas anak sesuai Akta Kelahiran</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap Anak <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Contoh: Muhammad Farhan Al-Fatih"
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Panggilan
                  </label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={e => setFormData({ ...formData, nickname: e.target.value })}
                    placeholder="Contoh: Farhan"
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Laki-laki">Laki-laki (Ikhwan)</option>
                    <option value="Perempuan">Perempuan (Akhwat)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={e => setFormData({ ...formData, birthPlace: e.target.value })}
                    placeholder="Contoh: Muara Tembesi"
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NIK Anak (Sesuai KK)
                  </label>
                  <input
                    type="text"
                    value={formData.nik}
                    onChange={e => setFormData({ ...formData, nik: e.target.value })}
                    placeholder="16 Digit NIK"
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Asal Sekolah TK / RA / PAUD
                  </label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={e => setFormData({ ...formData, previousSchool: e.target.value })}
                    placeholder="Contoh: TK Islam Terpadu Muara Tembesi"
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="border-b border-emerald-100 pb-4 pt-4">
                <h4 className="font-bold text-emerald-950 text-base font-serif">B. Data Orang Tua / Wali</h4>
                <p className="text-xs text-slate-500">Kontak aktif untuk pemberitahuan jadwal dan verifikasi berkas</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Orang Tua / Wali <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Nama Ayah / Ibu"
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.parentPhone}
                    onChange={e => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="Contoh: 081274xxxxxx"
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pekerjaan Orang Tua
                  </label>
                  <input
                    type="text"
                    value={formData.parentJob}
                    onChange={e => setFormData({ ...formData, parentJob: e.target.value })}
                    placeholder="PNS / Swasta / Wiraswasta / Petani / Lainnya"
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kepemilikan KIP / KKS / KIS
                  </label>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasKipKks}
                        onChange={e => setFormData({ ...formData, hasKipKks: e.target.checked })}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Memiliki Kartu KIP / KKS / KIS</span>
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat Domisili Lengkap
                  </label>
                  <textarea
                    rows={2}
                    value={formData.parentAddress}
                    onChange={e => setFormData({ ...formData, parentAddress: e.target.value })}
                    placeholder="RT/RW, Dusun, Desa/Kelurahan, Kecamatan"
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Catatan / Riwayat Hafalan Awal (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Contoh: Sudah hafal Surat An-Nas s/d Al-Ikhlas"
                    className="w-full text-xs p-3.5 rounded-2xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>KIRIM FORMULIR PENDAFTARAN & KONFIRMASI WHATSAPP</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  Data Anda aman dan hanya digunakan untuk keperluan administrasi SD Qur'an Para Sahabat.
                </p>
              </div>

            </form>
          )}

        </div>
      </section>

    </div>
  );
};

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const FloatingWhatsApp: React.FC = () => {
  const { schoolInfo } = useSchool();
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(
    "Halo SD Qur'an Para Sahabat, saya ingin mendapatkan informasi tentang pendaftaran siswa baru."
  );

  // Normalize WA number
  const rawNumber = schoolInfo.whatsapp.replace(/\D/g, '');
  const cleanWaNumber = rawNumber.startsWith('0') 
    ? `62${rawNumber.slice(1)}` 
    : rawNumber.startsWith('62') 
      ? rawNumber 
      : `62${rawNumber}`;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const encoded = encodeURIComponent(customMessage);
    window.open(`https://wa.me/${cleanWaNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div 
          id="whatsapp-chat-popup"
          className="mb-3 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-emerald-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="bg-emerald-900 text-white p-4 relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-amber-400 font-bold border border-emerald-500">
                SD
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight text-white">SD Qur'an Para Sahabat</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[11px] text-emerald-200">Layanan SPMB & Informasi</span>
                </div>
              </div>
            </div>
            <button
              id="whatsapp-popup-close"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-emerald-300 hover:text-white p-1 rounded-lg"
              aria-label="Tutup pesan WhatsApp"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-emerald-50/40 text-xs text-slate-700 space-y-3">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm border border-emerald-100/80">
              <p className="font-medium text-emerald-950">
                Assalamu'alaikum Warahmatullahi Wabarakatuh! 🌿
              </p>
              <p className="mt-1 text-slate-600">
                Ada yang bisa kami bantu seputar program Tahfizh, kurikulum, atau pendaftaran siswa baru (SPMB)?
              </p>
              <span className="block text-[10px] text-slate-400 text-right mt-1 font-mono">
                {schoolInfo.operatingHours.mondayThursday}
              </span>
            </div>

            <form onSubmit={handleSend} className="space-y-2 pt-1">
              <label htmlFor="wa-custom-msg" className="block text-[11px] font-medium text-slate-600">
                Tulis pesan Anda:
              </label>
              <textarea
                id="wa-custom-msg"
                rows={3}
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-900"
              />
              <button
                type="submit"
                id="whatsapp-submit-send"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Mulai Chat via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Hubungi WhatsApp SD Qur'an Para Sahabat"
        className="group relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-emerald-400/40"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
        </span>
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="hidden sm:inline font-semibold text-sm tracking-wide">
          Tanya Kami (WhatsApp)
        </span>
      </button>
    </div>
  );
};

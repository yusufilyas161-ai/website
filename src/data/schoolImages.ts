/**
 * Koleksi Aset Foto Resmi SD Qur'an Para Sahabat Kampung Baru, Muara Tembesi
 * Foto asli kegiatan, santri, dewan asatidz, prestasi lomba, fasilitas, dan flyer SPMB.
 */

import imgKarakterIslami from '../assets/images/regenerated_image_1787817513679.jpg';
import imgAkademikTerpadu from '../assets/images/regenerated_image_1787817517804.jpg';
import imgBahasaArab from '../assets/images/regenerated_image_1787817519644.jpg';
import imgShalatIbadah from '../assets/images/regenerated_image_1787817521044.jpg';
import imgPengembanganBakat from '../assets/images/regenerated_image_1787817522761.jpg';

import imgTentangSekolah from '../assets/images/regenerated_image_1787819460668.jpg';
import imgGaleri1 from '../assets/images/regenerated_image_1787819462113.jpg';
import imgGaleri2 from '../assets/images/regenerated_image_1787819463774.jpg';
import imgGaleri3 from '../assets/images/regenerated_image_1787819465242.jpg';
import imgGaleri4 from '../assets/images/regenerated_image_1787819467089.jpg';
import imgGaleri5 from '../assets/images/regenerated_image_1787819468735.jpg';
import imgGaleri6 from '../assets/images/regenerated_image_1787819469977.jpg';
import imgBerita2 from '../assets/images/regenerated_image_1787819471726.jpg';
import imgBerita3 from '../assets/images/regenerated_image_1787819473342.jpg';
import imgFasilitas1 from '../assets/images/regenerated_image_1787819475464.jpg';
import imgFasilitas3 from '../assets/images/regenerated_image_1787819476846.jpg';

export {
  imgKarakterIslami,
  imgAkademikTerpadu,
  imgBahasaArab,
  imgShalatIbadah,
  imgPengembanganBakat,
  imgTentangSekolah,
  imgGaleri1,
  imgGaleri2,
  imgGaleri3,
  imgGaleri4,
  imgGaleri5,
  imgGaleri6,
  imgBerita2,
  imgBerita3,
  imgFasilitas1,
  imgFasilitas3
};

// Helper to generate styled SVG illustration data URI if local image is loaded
const createPhotoDataUri = (title: string, subtitle: string, category: string, primaryColor = '#064e3b', accentColor = '#f59e0b') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primaryColor}" />
        <stop offset="50%" stop-color="#022c22" />
        <stop offset="100%" stop-color="#064e3b" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#fbbf24" />
      </linearGradient>
      <pattern id="islamic-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="rgba(245, 158, 11, 0.08)" stroke-width="1.5" />
        <circle cx="20" cy="20" r="4" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />
      </pattern>
    </defs>
    <rect width="1200" height="800" fill="url(#bg)" />
    <rect width="1200" height="800" fill="url(#islamic-grid)" />
    
    <!-- Decorative Frame -->
    <rect x="30" y="30" width="1140" height="740" rx="16" fill="none" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="2" />
    <rect x="40" y="40" width="1120" height="720" rx="12" fill="none" stroke="white" stroke-opacity="0.08" stroke-width="1" />
    
    <!-- Content Badge -->
    <rect x="80" y="90" width="220" height="38" rx="19" fill="url(#gold)" />
    <text x="190" y="115" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="#022c22" text-anchor="middle" letter-spacing="1.5">${category.toUpperCase()}</text>
    
    <!-- Header Text -->
    <text x="80" y="240" font-family="'Georgia', serif" font-size="44" font-weight="bold" fill="#ffffff">${title}</text>
    <text x="80" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#a7f3d0">${subtitle}</text>
    <text x="80" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#cbd5e1">SD Qur'an Para Sahabat • Kampung Baru, Muara Tembesi, Batang Hari</text>
    
    <!-- Bottom Card Strip -->
    <rect x="80" y="650" width="1040" height="70" rx="10" fill="rgba(0, 0, 0, 0.4)" stroke="rgba(255, 255, 255, 0.1)" />
    <circle cx="120" cy="685" r="16" fill="${accentColor}" />
    <text x="120" y="691" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#022c22" text-anchor="middle">✓</text>
    <text x="155" y="691" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#ffffff">Dokumentasi Resmi Kegiatan & Prestasi Santri</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export interface SchoolPhoto {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  tag: string;
}

export const SCHOOL_PHOTOS: Record<string, SchoolPhoto> = {
  // 1. Suasana Kelas Belajar Santri (Foto Utama / Sampul Hero)
  classroomLearning: {
    id: 'photo-classroom',
    title: 'Suasana Belajar Aktif di Ruang Kelas SD Qur\'an Para Sahabat',
    category: 'Pembelajaran',
    description: 'Santri-santriwati berbusana muslim rapi dan berhijab putih tekun menyimak dan belajar di ruang kelas ceria dengan Pojok Baca dan modul hafalan.',
    url: imgGaleri1,
    tag: 'Kelas & Akademik'
  },

  // 2. Juara Pentas PAI Kecamatan Muara Tembesi
  pentasPaiTrophy: {
    id: 'photo-pentas-pai',
    title: 'Prestasi Juara Pentas PAI Tingkat Kecamatan Muara Tembesi',
    category: 'Prestasi',
    description: 'Ustadz pembimbing bersama dua santri putra-putri berprestasi membanggakan meraih piala kejuaraan pada ajang bergengsi Pentas PAI Muara Tembesi.',
    url: imgGaleri2,
    tag: 'Juara Pentas PAI'
  },

  // 3. Juara I, II, & III Ash-Shiddiqi Competition IV (Ash-Co)
  ashShiddiqiWinners: {
    id: 'photo-ash-co-group',
    title: 'Juara I, II, & III Ash-Shiddiqi Competition IV',
    category: 'Prestasi',
    description: 'Santri dan santriwati didampingi Ustadzah pembimbing memborong prestasi Juara I, Juara II, dan Juara III pada Ash-Shiddiqi Competition IV.',
    url: imgGaleri5,
    tag: 'Juara Ash-Co IV'
  },

  // 4. Penyerahan Piagam Juara II Ash-Co Santri Ikhwan
  ashShiddiqiMaleAward: {
    id: 'photo-ash-co-ikhwan',
    title: 'Penyerahan Piagam & Plakat Juara II Ash-Shiddiqi Competition',
    category: 'Prestasi',
    description: 'Penyerahan penghargaan dan piala Juara II kepada santriwan berprestasi oleh Ustadz guru di SD Qur\'an Para Sahabat.',
    url: imgGaleri5,
    tag: 'Juara II Ash-Co'
  },

  // 5. Penyerahan Piagam Juara III Ash-Co Santri Akhwat
  ashShiddiqiFemaleAward: {
    id: 'photo-ash-co-akhwat',
    title: 'Penyerahan Piagam & Plakat Juara III Ash-Shiddiqi Competition',
    category: 'Prestasi',
    description: 'Penyerahan penghargaan dan piala Juara III kepada santriwati berprestasi dengan penuh rasa bangga dan syukur.',
    url: imgGaleri5,
    tag: 'Juara III Ash-Co'
  },

  // 6. Dewan Asatidz Para Sahabat Competition (PASCO) 1
  teachersPasco: {
    id: 'photo-teachers-pasco',
    title: 'Dewan Asatidz Yayasan Lembaga Para Sahabat - PASCO 1',
    category: 'Kegiatan',
    description: 'Barisan Dewan Guru dan Asatidz SD Qur\'an Para Sahabat mengenakan busana gamis hijau seragam pada perhelatan Para Sahabat Competition 1.',
    url: imgGaleri3,
    tag: 'Dewan Guru'
  },

  // 7. Upacara Bendera di Lapangan Terbuka
  flagCeremonyField: {
    id: 'photo-ceremony-field',
    title: 'Upacara Bendera Bersama Seluruh Santri & Dewan Guru',
    category: 'Upacara',
    description: 'Upacara bendera Merah Putih bersama santri ikhwan-akhwat dan asatidz di lapangan terbuka untuk memupuk jiwa nasionalisme dan adab Islami.',
    url: imgGaleri4,
    tag: 'Upacara & Karakter'
  },

  // 8. Kolase Fasilitas & Halaqah Tahfizh
  facilitiesCollage: {
    id: 'photo-facilities-collage',
    title: 'Fasilitas Kelas Pagi Iqro, Halaqah Tahfizh Ikhwan & Akhowat',
    category: 'Fasilitas',
    description: 'Dokumentasi ruang belajar Kelas Pagi Iqro 1 & 2, Halaqah Tahfizh Ikhwan, Halaqah Tahfizh Akhowat, serta lorong sekolah yang tertib dan asri.',
    url: imgGaleri6,
    tag: 'Halaqah & Gedung'
  },

  // 9. Kolase Santri Biru, Asatidz & Petugas Upacara
  studentActivitiesCollage: {
    id: 'photo-activities-collage',
    title: 'Aktivitas Santri: Barisan Seragam Biru, Asatidz & Petugas Upacara',
    category: 'Kegiatan',
    description: 'Kompak dalam berbagai momen: barisan santri berseragam rompi biru, asatidz PASCO 1, dan santri petugas upacara dengan selempang kepemimpinan.',
    url: imgGaleri4,
    tag: 'Kegiatan Santri'
  },

  // 10. Flyer Resmi SPMB 2026/2027
  spmbFlyer: {
    id: 'photo-spmb-flyer',
    title: 'Brosur Resmi Penerimaan Siswa Baru (SPMB) TA 2026/2027',
    category: 'SPMB',
    description: 'Brosur lengkap informasi pendaftaran, rincian biaya Rp 2.650.000, persyaratan berkas, program unggulan, dan lokasi 3 gedung SD Qur\'an Para Sahabat.',
    url: imgBerita3,
    tag: 'Flyer SPMB'
  }
};

export const defaultHeroImage = SCHOOL_PHOTOS.classroomLearning.url;

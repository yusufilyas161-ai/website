export interface SchoolInfo {
  name: string;
  tagline: string;
  subTagline: string;
  description: string;
  address: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  country: string;
  whatsapp: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
  googleMapsUrl: string;
  operatingHours: {
    mondayThursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  seoTitle: string;
  seoDescription: string;
  googleAnalyticsId: string;
  searchConsoleVerification: string;
  logoUrl?: string;
  logoAlt?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroBadgeText?: string;
  adminUsername?: string;
  adminPassword?: string;
}

export interface FeeItem {
  id: string;
  name: string;
  amount: number;
  description?: string;
  isOptional?: boolean;
}

export interface SpmbConfig {
  academicYear: string;
  isOpen: boolean;
  waveName: string;
  deadlineText: string;
  totalFee: number;
  sppMonthly: number;
  feeItems: FeeItem[];
  requirements: string[];
  bankAccount: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  contactPerson: {
    name: string;
    whatsapp: string;
  };
  brochureUrl?: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge?: string;
  features: string[];
  image: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: 'Berita Sekolah' | 'Tahfizh' | 'Kegiatan Siswa' | 'Prestasi' | 'Informasi SPMB' | 'Pengumuman' | 'Artikel Pendidikan' | 'Artikel Islami';
  author: string;
  authorRole: string;
  date: string;
  featuredImage: string;
  imageAlt: string;
  seoTitle: string;
  metaDescription: string;
  tags: string[];
  readTimeMinutes: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Tahfizh' | 'Tahsin' | 'Pembelajaran' | 'Upacara' | 'Kegiatan Islami' | 'Outing' | 'Perlombaan' | 'Kegiatan Siswa' | 'Kegiatan Guru' | 'SPMB/PPDB' | 'Prestasi' | string;
  imageUrl: string;
  imageAlt: string;
  date: string;
  description?: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  capacity?: string;
}

export type Facility = FacilityItem;

export interface AchievementItem {
  id: string;
  title: string;
  category?: string;
  competitionName?: string;
  competitionLevel?: string;
  year: string;
  level?: 'Kecamatan' | 'Kabupaten' | 'Provinsi' | 'Nasional' | 'Internal' | string;
  winnerName?: string;
  studentName?: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Tahfizh' | 'SPMB' | 'Akademik' | 'Umum' | 'Fasilitas';
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface Applicant {
  id: string;
  fullName: string;
  nickname: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthPlace: string;
  birthDate: string;
  nik: string;
  previousSchool: string;
  parentName: string;
  parentPhone: string;
  parentJob: string;
  parentAddress: string;
  hasKipKks: boolean;
  registrationDate: string;
  createdAt?: string;
  status: 'Menunggu Konfirmasi' | 'Terverifikasi' | 'Diterima' | 'Berkas Belum Lengkap' | 'Menunggu' | 'Diverifikasi' | 'Ditolak';
  notes?: string;
}

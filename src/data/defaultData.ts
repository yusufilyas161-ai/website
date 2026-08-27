import { SchoolInfo, SpmbConfig, ProgramItem, Article, GalleryItem, FacilityItem, AchievementItem, FaqItem } from '../types';
import { 
  SCHOOL_PHOTOS, 
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
} from './schoolImages';

export const initialSchoolInfo: SchoolInfo = {
  name: "SD Qur'an Para Sahabat Kampung Baru",
  tagline: "Membentuk Generasi Qur'ani, Berilmu, Berakhlak, dan Berprestasi",
  subTagline: "Sekolah Dasar Berbasis Al-Qur'an dengan Program Unggulan Tahfizh & Tahsin",
  description: "SD Qur'an Para Sahabat Kampung Baru hadir untuk mendampingi anak tumbuh menjadi generasi yang dekat dengan Al-Qur'an, berakhlak mulia, percaya diri, dan memiliki prestasi akademik maupun nonakademik.",
  address: "Jl. Lintas Jambi - Muara Tembesi, Kampung Baru",
  village: "Kampung Baru",
  district: "Muara Tembesi",
  regency: "Kabupaten Batang Hari",
  province: "Jambi",
  country: "Indonesia",
  whatsapp: "085840829386",
  phone: "0858-4082-9386",
  email: "sdquranparasahabat@gmail.com",
  facebook: "SD Qur'an Para Sahabat Muara Tembesi",
  instagram: "@sdquran_parasahabat",
  youtube: "SD Qur'an Para Sahabat Official",
  googleMapsUrl: "https://maps.google.com/?q=Muara+Tembesi+Batang+Hari+Jambi",
  operatingHours: {
    mondayThursday: "07.30 – 14.00 WIB",
    friday: "07.30 – 11.00 WIB",
    saturday: "07.30 – 11.00 WIB",
    sunday: "Libur (Layanan Online)"
  },
  seoTitle: "SD Qur'an Para Sahabat Kampung Baru | SD Tahfizh Muara Tembesi Batang Hari",
  seoDescription: "SD Qur'an Para Sahabat Kampung Baru adalah sekolah dasar berbasis Al-Qur'an di Muara Tembesi, Batang Hari, Jambi dengan program unggulan Tahfizh, Tahsin, pendidikan karakter Islami, dan pembelajaran akademik.",
  googleAnalyticsId: "",
  searchConsoleVerification: "",
  heroImageUrl: SCHOOL_PHOTOS.classroomLearning.url,
  heroImageAlt: "Suasana Belajar Aktif di Ruang Kelas SD Qur'an Para Sahabat Kampung Baru",
  heroBadgeText: "SEKOLAH DASAR BERBASIS AL-QUR'AN",
  adminUsername: "admin",
  adminPassword: "sd quran para sahabat kampung baru"
};

export const initialSpmbConfig: SpmbConfig = {
  academicYear: "2026/2027",
  isOpen: true,
  waveName: "Gelombang 1",
  deadlineText: "Pendaftaran Dibuka Setiap Hari Kerja",
  totalFee: 2650000,
  sppMonthly: 200000,
  feeItems: [
    {
      id: "fee-1",
      name: "Uang Pendaftaran & Formulir",
      amount: 100000,
      description: "Administrasi pendaftaran & tes pemetaan bacaan awal"
    },
    {
      id: "fee-2",
      name: "Baju Seragam (3 Stel)",
      amount: 700000,
      description: "Seragam Muslim khas, seragam Olahraga, dan seragam Batik/Batik Hijau"
    },
    {
      id: "fee-3",
      name: "Buku Iqra / Tilawati Standar",
      amount: 30000,
      description: "Modul panduan tahsin dan tajwid dasar"
    },
    {
      id: "fee-4",
      name: "SPP Bulan Pertama",
      amount: 200000,
      description: "Iuran operasional pendidikan bulan pertama"
    },
    {
      id: "fee-5",
      name: "Buku Mutaba'ah & Setoran Hafalan",
      amount: 20000,
      description: "Buku kontrol hafalan harian antara ustadz/ustadzah dan orang tua"
    },
    {
      id: "fee-6",
      name: "Uang Pembangunan & Sarana Prasarana",
      amount: 1600000,
      description: "Pengembangan ruang kelas nyaman dan fasilitas pembelajaran Al-Qur'an"
    }
  ],
  requirements: [
    "Fotokopi Kartu Keluarga (KK) 2 Lembar",
    "Fotokopi KTP Kedua Orang Tua / Wali 2 Lembar",
    "Pas Foto Anak Berbusana Muslim ukuran 3x4 (4 lembar)",
    "Map Kertas (Warna Hijau untuk Putra, Kuning untuk Putri)",
    "Fotokopi Akta Kelahiran Anak 2 Lembar",
    "Fotokopi Kartu Indonesia Pintar (KIP) jika ada",
    "Fotokopi Kartu Keluarga Sejahtera (KKS) jika ada",
    "Fotokopi Kartu Indonesia Sehat (KIS) jika ada"
  ],
  bankAccount: {
    bankName: "Bank Syariah Indonesia (BSI)",
    accountNumber: "7312217408",
    accountHolder: "Ilyas Hasim Yusuf"
  },
  contactPerson: {
    name: "Ustadz Admin SPMB",
    whatsapp: "085840829386"
  },
  brochureUrl: SCHOOL_PHOTOS.spmbFlyer.url
};

export const initialPrograms: ProgramItem[] = [
  {
    id: "tahsin-tahfizh",
    title: "Tahsin & Tahfizh Al-Qur'an",
    subtitle: "Program Inti Pembentukan Karakter Qur'ani",
    description: "Program pembelajaran membaca Al-Qur'an bertajwid makharijul huruf (Tahsin) dan bimbingan menghafal Al-Qur'an (Tahfizh) secara bertahap, terukur, dan menyenangkan sesuai kesiapan siswa.",
    iconName: "BookOpenCheck",
    badge: "Program Utama",
    features: [
      "Metode Talaqqi & Tasmi' langsung dengan Asatidz kompeten",
      "Target bertahap Juz 30, Juz 29, dan surat-surat pilihan",
      "Buku Mutaba'ah kontrol hafalan harian dengan orang tua",
      "Ujian Kenaikan Juz dan Wisuda Tahfizh berkala"
    ],
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "karakter-islami",
    title: "Pendidikan Karakter Islami",
    subtitle: "Adab Sebelum Ilmu, Akhlak Mulia",
    description: "Membiasakan siswa memiliki adab Islami, sopan santun kepada orang tua dan guru, kejujuran, kedisiplinan, tanggung jawab, serta rasa kepedulian sosial yang tinggi.",
    iconName: "HeartHandshake",
    badge: "Pembiasaan Adab",
    features: [
      "Pembiasaan 5S (Senyum, Salam, Sapa, Sopan, Santun)",
      "Kisah Teladan Para Sahabat Nabi Muhammad SAW",
      "Infaq & Sedekah Jum'at Berkah melatih kedermawanan",
      "Pendidikan anti-bullying dan saling menyayangi sesama"
    ],
    image: imgKarakterIslami
  },
  {
    id: "akademik-terpadu",
    title: "Pembelajaran Akademik Terpadu",
    subtitle: "Literasi, Numerasi, Sains & IPTEK",
    description: "Kurikulum nasional yang dipadukan secara harmonis dengan nilai-nilai Qur'ani. Menstimulasi nalar kritis, kemampuan literasi, numerasi, serta eksplorasi sains yang aplikatif.",
    iconName: "GraduationCap",
    badge: "Kurikulum Terpadu",
    features: [
      "Penguatan Literasi Bahasa Indonesia & Numerasi Dasar",
      "Sains Eksploratif dan Pengenalan Teknologi Informasi",
      "Pendekatan Active Learning ramah anak & komunikatif",
      "Pemetaan gaya belajar dan pendampingan remedial/pengayaan"
    ],
    image: imgAkademikTerpadu
  },
  {
    id: "bahasa-arab",
    title: "Bahasa Arab Dasar",
    subtitle: "Mengenal Bahasa Al-Qur'an Sejak Dini",
    description: "Pengenalan kosakata, percakapan harian, dan pemahaman dasar bahasa Arab untuk memudahkan siswa memahami makna ayat-ayat suci Al-Qur'an dan doa harian.",
    iconName: "Languages",
    badge: "Bahasa Qur'an",
    features: [
      "Mufrodat (kosakata) tematik harian benda di sekitar",
      "Lagu-lagu edukatif bahasa Arab & flashcard visual",
      "Percakapan ringkas dan doa-doa ma'tsurat",
      "Menumbuhkan kecintaan terhadap bahasa Rasulullah SAW"
    ],
    image: imgBahasaArab
  },
  {
    id: "shalat-ibadah",
    title: "Shalat & Pembiasaan Ibadah",
    subtitle: "Praktik Fiqih Ibadah Sehari-hari",
    description: "Membiasakan siswa melaksanakan wudhu tertib, shalat dhuha bersama, shalat zhuhur berjamaah, dzikir setelah shalat, dan adab berdoa dalam keseharian.",
    iconName: "Sparkles",
    badge: "Amaliyah Harian",
    features: [
      "Bimbingan tata cara wudhu sempurna sesuai Sunnah",
      "Shalat Dhuha rutin dan Shalat Berjamaah",
      "Hafalan doa-doa harian dan dzikir pagi-petang",
      "Praktik adab makan, minum, berpakaian, dan belajar"
    ],
    image: imgShalatIbadah
  },
  {
    id: "pengembangan-bakat",
    title: "Pengembangan Bakat & Minat",
    subtitle: "Kreativitas, Olahraga & Kepercayaan Diri",
    description: "Memberikan ruang luas bagi siswa untuk mengeksplorasi potensi non-akademik melalui kegiatan seni kaligrafi Islam, pidato (da'i cilik), olahraga sunnah, dan kepanduan.",
    iconName: "Trophy",
    badge: "Eksplorasi Potensi",
    features: [
      "Khat & Kaligrafi Arab tingkat dasar",
      "Pelatihan Da'i Cilik (Muhadharah / Public Speaking)",
      "Olahraga Jasmani, Panahan dasar & Futsal",
      "Pramuka Penggalang Islami & Outing Edukatif"
    ],
    image: imgPengembanganBakat
  }
];

export const initialArticles: Article[] = [
  {
    id: "art-1",
    slug: "keunggulan-sekolah-dasar-berbasis-al-quran-sd-quran-para-sahabat",
    title: "Keunggulan Sekolah Dasar Berbasis Al-Qur'an untuk Tumbuh Kembang Karakter Anak",
    summary: "Mengapa pendidikan berbasis Al-Qur'an sejak usia dini menjadi fondasi terbaik bagi kecerdasan intelektual, emosional, dan spiritual generasi masa depan.",
    content: `Memilih sekolah dasar merupakan salah satu keputusan paling krusial bagi orang tua. Pada rentang usia 6 hingga 12 tahun, anak berada pada masa emas (*golden age*) pembentukan karakter, pola pikir, serta daya ingat.

Di **SD Qur'an Para Sahabat Kampung Baru, Muara Tembesi**, kami meyakini bahwa Al-Qur'an bukan sekadar bacaan ritual, melainkan kurikulum kehidupan yang menumbuhkan kecerdasan komprehensif.

### 1. Fondasi Akhlak dan Adab Sejak Dini
Sebelum anak menyerap berbagai cabang ilmu pengetahuan umum, adab dan akhlakul karimah ditanamkan terlebih dahulu. Anak dibiasakan menghormati orang tua, menyayangi teman, jujur dalam perkataan, dan disiplin dalam waktu.

### 2. Stimulasi Daya Ingat Melalui Tahfizh
Aktivitas menghafal Al-Qur'an secara ilmiah terbukti melatih plastisitas otak, memperkuat fokus, dan mengasah memori jangka panjang. Siswa yang terbiasa menghafal ayat-ayat suci memiliki daya konsentrasi lebih tinggi saat mempelajari matematika, sains, dan literasi.

### 3. Keseimbangan Akademik dan Ruhiyah
Kurikulum nasional tetap diberikan secara terstruktur dengan pendekatan menyenangkan, memastikan siswa siap bersaing dan berprestasi pada jenjang pendidikan selanjutnya.

Dengan lingkungan yang mendukung dan asatidz yang mendampingi penuh kehangatan, SD Qur'an Para Sahabat menjadi rumah kedua bagi ananda tercinta.`,
    category: "Artikel Pendidikan",
    author: "Tim Akademik SD Qur'an Para Sahabat",
    authorRole: "Divisi Kurikulum",
    date: "2026-08-20",
    featuredImage: imgGaleri6,
    imageAlt: "Peserta didik SD Qur'an Para Sahabat mengikuti kegiatan tahfizh Al-Qur'an",
    seoTitle: "Keunggulan Sekolah Dasar Berbasis Al-Qur'an | SD Qur'an Para Sahabat",
    metaDescription: "Pelajari bagaimana SD Qur'an Para Sahabat Kampung Baru Muara Tembesi memadukan pendidikan Al-Qur'an, tahfizh, tahsin, dan akademik untuk anak usia SD.",
    tags: ["Tahfizh Anak", "Pendidikan Islami", "SD Muara Tembesi", "Sekolah Al-Qur'an"],
    readTimeMinutes: 4
  },
  {
    id: "art-2",
    slug: "tips-mendampingi-anak-menghafal-al-quran-di-rumah",
    title: "Tips Efektif Mendampingi Anak Menghafal Al-Qur'an di Rumah tanpa Beban",
    summary: "Panduan praktis bagi orang tua dalam membangun suasana muraja'ah yang asyik, penuh kasih sayang, dan konsisten di rumah.",
    content: `Keberhasilan program tahfizh anak adalah hasil kolaborasi erat antara bimbingan guru di sekolah dan pendampingan orang tua di rumah. Berikut adalah beberapa tips praktis:

### 1. Tetapkan Waktu Emas (Golden Hour)
Pilihlah waktu tetap yang tenang, misalnya 15-20 menit ba'da Maghrib atau setelah Shalat Subuh. Durasi singkat yang rutin jauh lebih efektif daripada belajar berjam-jam tapi membosankan.

### 2. Putar Murottal di Rumah
Jadikan lantunan ayat suci Al-Qur'an sebagai suara latar di ruang keluarga. Anak memiliki daya tangkap auditori yang luar biasa, sehingga ayat akan terasa familiar sebelum dihafal.

### 3. Berikan Apresiasi dan Pelukan
Setiap kali ananda menyelesaikan satu ayat atau satu surat, berikan pujian tulus. Hindari membandingkan kecepatan hafalan ananda dengan anak lain.

Melalui **Buku Mutaba'ah Harian SD Qur'an Para Sahabat**, orang tua dapat memantau capaian ayat dan berkoordinasi langsung dengan wali kelas/guru tahfizh.`,
    category: "Tahfizh",
    author: "Ustadzah Pembimbing Tahfizh",
    authorRole: "Koordinator Tahfizh",
    date: "2026-08-15",
    featuredImage: imgBerita2,
    imageAlt: "Anak membaca Al-Qur'an bersama orang tua di rumah",
    seoTitle: "Tips Mendampingi Anak Menghafal Al-Qur'an di Rumah | SD Qur'an",
    metaDescription: "Tips mendampingi anak menghafal Al-Qur'an di rumah secara menyenangkan dan konsisten dari guru Tahfizh SD Qur'an Para Sahabat Muara Tembesi.",
    tags: ["Tips Parenting", "Tahfizh Anak", "Muraja'ah", "Keluarga Qur'ani"],
    readTimeMinutes: 3
  },
  {
    id: "art-3",
    slug: "informasi-penerimaan-siswa-baru-spmb-2026-2027",
    title: "Penerimaan Siswa Baru (SPMB) SD Qur'an Para Sahabat Tahun Ajaran 2026/2027",
    summary: "Informasi lengkap jadwal pendaftaran, rincian biaya transparan, persyaratan berkas, dan tata cara pendaftaran online maupun langsung.",
    content: `Penerimaan Siswa Baru (SPMB) SD Qur'an Para Sahabat Kampung Baru, Muara Tembesi, Kabupaten Batang Hari untuk Tahun Ajaran 2026/2027 resmi dibuka!

Kami mengundang para orang tua yang menghendaki putra-putrinya mendapatkan pendidikan berkualitas yang mengakar pada nilai-nilai Al-Qur'an, adab Islami, dan keunggulan akademik.

### Rincian Biaya Pendaftaran:
- **Uang Pendaftaran & Formulir:** Rp100.000
- **Baju Seragam (3 Stel):** Rp700.000
- **Buku Iqra / Tilawati:** Rp30.000
- **SPP Bulan Pertama:** Rp200.000 (SPP bulanan mulai Rp200.000)
- **Buku Mutaba'ah & Setoran:** Rp20.000
- **Uang Pembangunan & Sarana:** Rp1.600.000
- **Total Investasi Awal:** **Rp2.650.000**

### Persyaratan Pendaftaran:
1. Fotokopi Kartu Keluarga (KK) 2 lembar
2. Fotokopi KTP kedua orang tua 2 lembar
3. Pas foto 3x4 busana muslim 4 lembar
4. Map kertas
5. Fotokopi Akta Kelahiran 2 lembar
6. Fotokopi KIP/KKS/KIS jika ada

Pendaftaran dapat dilakukan secara online melalui website ini atau hadir langsung ke kantor sekolah pada jam pelayanan.`,
    category: "Informasi SPMB",
    author: "Panitia SPMB 2026/2027",
    authorRole: "Sekretariat Pendaftaran",
    date: "2026-08-10",
    featuredImage: imgBerita3,
    imageAlt: "Penerimaan Siswa Baru SPMB SD Qur'an Para Sahabat Muara Tembesi",
    seoTitle: "SPMB SD Qur'an Para Sahabat 2026/2027 | Pendaftaran Siswa Baru Muara Tembesi",
    metaDescription: "Daftar sekarang di SPMB SD Qur'an Para Sahabat Kampung Baru Muara Tembesi. Kuota terbatas, biaya transparan Rp2.650.000, SPP Rp200.000/bln.",
    tags: ["SPMB 2026", "Pendaftaran Siswa Baru", "SD Muara Tembesi", "Biaya Sekolah"],
    readTimeMinutes: 3
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Suasana Belajar Aktif & Interaktif di Ruang Kelas",
    category: "Pembelajaran",
    imageUrl: imgGaleri1,
    imageAlt: "Santri SD Qur'an Para Sahabat belajar aktif di ruang kelas",
    date: "2026-08-20",
    description: "Kegiatan belajar mengajar di ruang kelas ceria dengan Pojok Baca, buku hafalan Al-Qur'an, dan bimbingan asatidz ramah anak."
  },
  {
    id: "gal-2",
    title: "Prestasi Juara Pentas PAI Tingkat Kecamatan Muara Tembesi",
    category: "Prestasi",
    imageUrl: imgGaleri2,
    imageAlt: "Ustadz dan santri berprestasi memegang piala Pentas PAI",
    date: "2026-08-15",
    description: "Raihan piala kejuaraan membanggakan oleh santri SD Qur'an Para Sahabat pada ajang Pentas PAI Kecamatan Muara Tembesi."
  },
  {
    id: "gal-3",
    title: "Dewan Asatidz & Panitia Para Sahabat Competition (PASCO) 1",
    category: "Kegiatan Islami",
    imageUrl: imgGaleri3,
    imageAlt: "Dewan Guru dan Asatidz SD Qur'an Para Sahabat berseragam hijau",
    date: "2026-08-10",
    description: "Kebersamaan dan kekompakan dewan asatidz Yayasan Lembaga Para Sahabat dalam membina dan mendidik generasi Qur'ani."
  },
  {
    id: "gal-4",
    title: "Upacara Bendera & Pembinaan Karakter Santri di Lapangan",
    category: "Upacara",
    imageUrl: imgGaleri4,
    imageAlt: "Upacara bendera santri dan dewan guru di lapangan terbuka",
    date: "2026-08-17",
    description: "Upacara bendera bersama di lapangan terbuka untuk menanamkan kedisiplinan, cinta tanah air, dan adab Islami."
  },
  {
    id: "gal-5",
    title: "Juara I, II, & III Ash-Shiddiqi Competition (Ash-Co) IV",
    category: "Prestasi",
    imageUrl: imgGaleri5,
    imageAlt: "Santriwati dan santriwan memegang piala dan piagam kejuaraan",
    date: "2026-08-05",
    description: "Para santri berprestasi didampingi Ustadzah pembimbing sukses menyabet gelar juara pada kompetisi tingkat regional."
  },
  {
    id: "gal-6",
    title: "Dokumentasi Kelas Tahfizh Ikhwan, Akhowat & Iqro",
    category: "Tahfizh",
    imageUrl: imgGaleri6,
    imageAlt: "Dokumentasi kelas Iqro dan halaqah tahfizh SD Qur'an Para Sahabat",
    date: "2026-08-01",
    description: "Fasilitas kelas pagi Iqro, halaqah tahfizh ikhwan & akhowat, serta lorong sekolah yang rapi dan tertib."
  },
  {
    id: "gal-7",
    title: "Aktivitas Santri Berseragam Biru & Petugas Upacara",
    category: "Kegiatan Siswa",
    imageUrl: imgGaleri4,
    imageAlt: "Santri rompi biru dan petugas upacara selempang merah putih",
    date: "2026-07-28",
    description: "Santri barisan rompi biru dan petugas upacara bendera siap mengemban amanah dengan percaya diri."
  }
];

export const initialFacilities: FacilityItem[] = [
  {
    id: "fac-1",
    name: "Ruang Kelas Belajar Interaktif & Nyaman",
    description: "Ruang belajar tematik dengan pencahayaan alami, kursi meja ergonomis, Pojok Baca, dan sarana multimedia Islami.",
    imageUrl: imgFasilitas1,
    imageAlt: "Ruang kelas SD Qur'an Para Sahabat Kampung Baru",
    capacity: "Kapasitas 20-25 Siswa/Kelas"
  },
  {
    id: "fac-2",
    name: "Halaqah Tahfizh Ikhwan & Akhowat Terpisah",
    description: "Ruang halaqah khusus terpisah yang kondusif dan tenang untuk setoran hafalan, talaqqi, dan muroja'ah santri.",
    imageUrl: imgGaleri6,
    imageAlt: "Halaqah Tahfizh Ikhwan dan Akhowat",
    capacity: "Kelompok Halaqah Mandiri"
  },
  {
    id: "fac-3",
    name: "Lapangan Terbuka Upacara & Olahraga",
    description: "Halaman terbuka yang asri dan luas untuk upacara bendera, senam santri, olahraga jasmani, dan kegiatan kepanduan.",
    imageUrl: imgFasilitas3,
    imageAlt: "Lapangan upacara dan olahraga SD Qur'an Para Sahabat",
    capacity: "Kapasitas Ratusan Siswa"
  },
  {
    id: "fac-4",
    name: "Lorong Gedung Tertib & Rak Sepatu Rapi",
    description: "Area koridor yang bersih dan tertib dengan rak sepatu kayu, membiasakan adab kerapihan dan kebersihan sejak dini.",
    imageUrl: imgGaleri6,
    imageAlt: "Lorong gedung sekolah dan rak sepatu rapi",
    capacity: "Akses Seluruh Kelas"
  },
  {
    id: "fac-5",
    name: "Pojok Baca & Literasi Qur'ani",
    description: "Pojok baca di setiap ruang kelas dengan koleksi buku cerita nabi & sahabat, ensiklopedia sains, dan modul tahsin.",
    imageUrl: imgFasilitas1,
    imageAlt: "Pojok baca dan modul literasi kelas",
    capacity: "Koleksi Lengkap & Ramah Anak"
  },
  {
    id: "fac-6",
    name: "Sekretariat & Gedung Pelayanan SPMB",
    description: "Pusat informasi pendaftaran siswa baru, konsultasi perkembangan hafalan, dan administrasi sekolah.",
    imageUrl: imgBerita3,
    imageAlt: "Informasi sekretariat SPMB SD Qur'an Para Sahabat",
    capacity: "Layanan 3 Gedung Sekolah"
  }
];

export const initialAchievements: AchievementItem[] = [
  {
    id: "ach-1",
    title: "Juara Pentas PAI Tingkat Kecamatan Muara Tembesi",
    category: "Tahfizh & PAI",
    year: "2026",
    winnerName: "Santri Ikhwan & Akhwat Berprestasi",
    competitionLevel: "Kecamatan",
    description: "Meraih trofi kejuaraan pada Pekan Keterampilan & Seni Pendidikan Agama Islam (Pentas PAI) Tingkat Kecamatan Muara Tembesi didampingi Ustadz pembimbing.",
    imageUrl: SCHOOL_PHOTOS.pentasPaiTrophy.url
  },
  {
    id: "ach-2",
    title: "Juara I Ash-Shiddiqi Competition (Ash-Co) IV",
    category: "Tahfizh",
    year: "2026",
    winnerName: "Zerina Badriyah Shalihah",
    competitionLevel: "Kabupaten",
    description: "Meraih Juara 1 Kategori Tahfizh Al-Qur'an pada ajang Ash-Shiddiqi Competition IV Pemayung dengan sertifikat penghargaan dan hadiah pembinaan.",
    imageUrl: SCHOOL_PHOTOS.ashShiddiqiWinners.url
  },
  {
    id: "ach-3",
    title: "Juara II Ash-Shiddiqi Competition (Ash-Co) IV",
    category: "Tahfizh & Da'i",
    year: "2026",
    winnerName: "Santriwan SD Qur'an Para Sahabat",
    competitionLevel: "Kabupaten",
    description: "Meraih Juara 2 dengan penyerahan plakat dan sertifikat kejuaraan pada ajang kompetisi keislaman antar sekolah.",
    imageUrl: SCHOOL_PHOTOS.ashShiddiqiMaleAward.url
  },
  {
    id: "ach-4",
    title: "Juara III Ash-Shiddiqi Competition (Ash-Co) IV",
    category: "Tahsin & Tartil",
    year: "2026",
    winnerName: "Santriwati SD Qur'an Para Sahabat",
    competitionLevel: "Kabupaten",
    description: "Meraih Juara 3 dengan performa bacaan Al-Qur'an bertajwid makharijul huruf yang fasih dan penuh percaya diri.",
    imageUrl: SCHOOL_PHOTOS.ashShiddiqiFemaleAward.url
  },
  {
    id: "ach-5",
    title: "Kegiatan Agama & Ceramah Bersama Santri",
    category: "Kegiatan Islami",
    year: "2026",
    winnerName: "Dewan Asatidz & Santri SD Qur'an Para Sahabat",
    competitionLevel: "Sekolah & Komunitas",
    description: "Kegiatan keagamaan, tausiyah, dan ceramah inspiratif bersama anak-anak untuk menanamkan pemahaman aqidah, adab Islami, cinta Al-Qur'an, dan pembiasaan shalat sejak dini.",
    imageUrl: SCHOOL_PHOTOS.teachersPasco.url
  }
];

export const initialFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "Apakah SD Qur'an Para Sahabat memiliki program Tahfizh Al-Qur'an?",
    answer: "Ya, Tahfizh dan Tahsin Al-Qur'an merupakan program unggulan utama di SD Qur'an Para Sahabat Kampung Baru. Siswa dibimbing dengan metode Talaqqi dan Tasmi' secara bertahap mulai dari Juz 30, Juz 29, dan surat-surat pilihan, disesuaikan dengan kesiapan masing-masing anak.",
    category: "Tahfizh"
  },
  {
    id: "faq-2",
    question: "Di mana lokasi SD Qur'an Para Sahabat Kampung Baru?",
    answer: "Sekolah kami berlokasi di Kampung Baru, Kecamatan Muara Tembesi, Kabupaten Batang Hari, Provinsi Jambi, Indonesia. Lokasi mudah dijangkau dan memiliki lingkungan yang aman serta kondusif bagi anak-anak.",
    category: "Umum"
  },
  {
    id: "faq-3",
    question: "Apa saja keunggulan SD Qur'an Para Sahabat dibanding sekolah lainnya?",
    answer: "Keunggulan kami meliputi: (1) Kurikulum terpadu berbasis Al-Qur'an, (2) Program Tahsin & Tahfizh berkesinambungan, (3) Pembentukan adab dan karakter Islami sejak dini, (4) Pembelajaran akademik literasi & numerasi yang kuat, (5) Pembiasaan ibadah harian (shalat berjamaah & dhuha), serta (6) Pengembangan bakat, bahasa Arab dasar, dan kegiatan positif ramah anak.",
    category: "Umum"
  },
  {
    id: "faq-4",
    question: "Bagaimana cara mendaftar sebagai calon siswa baru (SPMB)?",
    answer: "Pendaftaran dapat dilakukan secara mudah melalui 2 cara: (1) Mengisi formulir online melalui website ini dan konfirmasi via WhatsApp ke 0858-4082-9386, atau (2) Datang langsung ke kantor sekretariat SPMB SD Qur'an Para Sahabat Kampung Baru pada jam pelayanan sekolah.",
    category: "SPMB"
  },
  {
    id: "faq-5",
    question: "Berapa rincian biaya pendaftaran di SD Qur'an Para Sahabat?",
    answer: "Total biaya pendaftaran awal adalah Rp2.650.000, dengan rincian: Uang pendaftaran Rp100.000, Baju seragam 3 stel Rp700.000, Buku Iqra Rp30.000, SPP bulan pertama Rp200.000, Buku hafalan/mutaba'ah Rp20.000, dan Uang pembangunan Rp1.600.000. SPP bulanan mulai Rp200.000/bulan. Informasi biaya dapat diperbarui berkala.",
    category: "SPMB"
  },
  {
    id: "faq-6",
    question: "Apa saja persyaratan berkas yang perlu disiapkan orang tua?",
    answer: "Persyaratan berkas meliputi: Fotokopi Kartu Keluarga (2 lembar), Fotokopi KTP kedua orang tua (2 lembar), Pas foto busana muslim 3x4 (4 lembar), Map kertas, Fotokopi Akta Kelahiran (2 lembar), serta Fotokopi KIP/KKS/KIS jika ada.",
    category: "SPMB"
  },
  {
    id: "faq-7",
    question: "Bagaimana jika anak belum lancar membaca huruf hijaiyah saat masuk kelas 1?",
    answer: "Jangan khawatir. Di SD Qur'an Para Sahabat, kami menerapkan metode Tahsin ramah anak dari tingkat dasar. Setiap siswa akan dipetakan kemampuannya dan dibimbing dengan sabar oleh ustadz dan ustadzah hingga lancar membaca Al-Qur'an secara bertajwid.",
    category: "Tahfizh"
  },
  {
    id: "faq-8",
    question: "Bagaimana jam kegiatan belajar mengajar dan layanan kantor?",
    answer: "Jadwal kegiatan: Senin – Kamis pukul 07.30 – 14.00 WIB, Jum'at pukul 07.30 – 11.00 WIB, dan Sabtu pukul 07.30 – 11.00 WIB.",
    category: "Akademik"
  }
];

export const initialApplicants: any[] = [
  {
    id: "app-demo-1",
    fullName: "Ahmad Farhan Al-Ghifari",
    nickname: "Farhan",
    gender: "Laki-laki",
    birthPlace: "Muara Tembesi",
    birthDate: "2019-05-12",
    nik: "1504011205190001",
    previousSchool: "TK Islam Terpadu Muara Tembesi",
    parentName: "Hendra Gunawan",
    parentPhone: "081274567890",
    parentJob: "Wiraswasta",
    parentAddress: "Kampung Baru, Muara Tembesi",
    hasKipKks: false,
    registrationDate: "2026-08-22",
    status: "Terverifikasi",
    notes: "Sudah hafal Surat An-Nas sampai Al-Ikhlas"
  }
];

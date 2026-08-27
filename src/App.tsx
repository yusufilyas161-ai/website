import React, { useEffect } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LightboxModal } from './components/LightboxModal';
import { AdminLoginModal } from './components/AdminLoginModal';

// Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProgramView } from './views/ProgramView';
import { TahfizhView } from './views/TahfizhView';
import { FacilitiesView } from './views/FacilitiesView';
import { GalleryView } from './views/GalleryView';
import { AchievementsView } from './views/AchievementsView';
import { SpmbView } from './views/SpmbView';
import { NewsView } from './views/NewsView';
import { NewsDetailView } from './views/NewsDetailView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';
import { AdminDashboardView } from './views/AdminDashboardView';

const MainApp: React.FC = () => {
  const { activeView, setActiveView, isAdminLoggedIn } = useSchool();

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView]);

  // Handle URL hash navigation (e.g., #spmb, #tahfizh, #tentang)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (hash === 'admin' && !isAdminLoggedIn) {
          // Keep on current, trigger admin login
        } else if (
          ['home', 'tentang', 'program', 'tahfizh', 'fasilitas', 'kegiatan', 'prestasi', 'spmb', 'berita', 'faq', 'kontak', 'admin'].includes(hash)
        ) {
          setActiveView(hash as any);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isAdminLoggedIn, setActiveView]);

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'tentang':
        return <AboutView />;
      case 'program':
        return <ProgramView />;
      case 'tahfizh':
        return <TahfizhView />;
      case 'fasilitas':
        return <FacilitiesView />;
      case 'kegiatan':
        return <GalleryView />;
      case 'prestasi':
        return <AchievementsView />;
      case 'spmb':
        return <SpmbView />;
      case 'berita':
        return <NewsView />;
      case 'berita-detail':
        return <NewsDetailView />;
      case 'faq':
        return <FaqView />;
      case 'kontak':
        return <ContactView />;
      case 'admin':
        return isAdminLoggedIn ? <AdminDashboardView /> : <HomeView />;
      default:
        return <HomeView />;
    }
  };

  const isAdminView = activeView === 'admin' && isAdminLoggedIn;

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcf9] text-slate-800 selection:bg-emerald-800 selection:text-amber-300 font-sans">
      {!isAdminView && <Navbar />}

      <main className="flex-1 w-full">
        {renderActiveView()}
      </main>

      {!isAdminView && <Footer />}
      {!isAdminView && <FloatingWhatsApp />}
      <LightboxModal />
      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <MainApp />
    </SchoolProvider>
  );
}

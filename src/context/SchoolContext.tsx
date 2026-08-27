import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SchoolInfo, 
  SpmbConfig, 
  ProgramItem, 
  Article, 
  GalleryItem, 
  FacilityItem, 
  AchievementItem, 
  FaqItem, 
  Applicant 
} from '../types';
import {
  initialSchoolInfo,
  initialSpmbConfig,
  initialPrograms,
  initialArticles,
  initialGallery,
  initialFacilities,
  initialAchievements,
  initialFaqs,
  initialApplicants
} from '../data/defaultData';

interface SchoolContextType {
  schoolInfo: SchoolInfo;
  setSchoolInfo: (info: SchoolInfo) => void;
  updateSchoolInfo: (updates: Partial<SchoolInfo>) => void;
  
  spmbConfig: SpmbConfig;
  setSpmbConfig: (config: SpmbConfig) => void;
  updateSpmbConfig: (updates: Partial<SpmbConfig>) => void;
  
  programs: ProgramItem[];
  setPrograms: (programs: ProgramItem[]) => void;
  
  articles: Article[];
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  
  facilities: FacilityItem[];
  addFacility: (facility: Omit<FacilityItem, 'id'>) => void;
  updateFacility: (id: string, updates: Partial<FacilityItem>) => void;
  deleteFacility: (id: string) => void;
  
  achievements: AchievementItem[];
  addAchievement: (achievement: Omit<AchievementItem, 'id'>) => void;
  updateAchievement: (id: string, updates: Partial<AchievementItem>) => void;
  deleteAchievement: (id: string) => void;
  
  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  updateFaq: (id: string, updates: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  
  applicants: Applicant[];
  addApplicant: (applicant: Omit<Applicant, 'id' | 'registrationDate' | 'status'>) => Applicant;
  updateApplicantStatus: (id: string, status: Applicant['status'], notes?: string) => void;
  deleteApplicant: (id: string) => void;
  
  activeView: string;
  setActiveView: (view: string) => void;
  selectedArticleSlug: string | null;
  setSelectedArticleSlug: (slug: string | null) => void;
  
  lightboxImage: { url: string; title: string; alt: string } | null;
  setLightboxImage: (img: { url: string; title: string; alt: string } | null) => void;
  
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (logged: boolean) => void;
  
  resetToDefaults: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SCHOOL_INFO: 'sdq_school_info_v1',
  SPMB_CONFIG: 'sdq_spmb_config_v1',
  PROGRAMS: 'sdq_programs_v1',
  ARTICLES: 'sdq_articles_v1',
  GALLERY: 'sdq_gallery_v1',
  FACILITIES: 'sdq_facilities_v1',
  ACHIEVEMENTS: 'sdq_achievements_v1',
  FAQS: 'sdq_faqs_v1',
  APPLICANTS: 'sdq_applicants_v1',
  ADMIN_SESSION: 'sdq_admin_auth_v1'
};

const safeSetItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.warn(`[Storage Warning] Tidak dapat menyimpan ${key} ke LocalStorage (kuota penuh). Data tetap aktif di sesi ini.`, err);
  }
};

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage or defaults, merging initial fields
  const [schoolInfo, setSchoolInfoState] = useState<SchoolInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCHOOL_INFO);
      if (saved) {
        const parsed: SchoolInfo = JSON.parse(saved);
        const isUnsplash = parsed.heroImageUrl && parsed.heroImageUrl.includes('images.unsplash.com');
        return {
          ...initialSchoolInfo,
          ...parsed,
          heroImageUrl: isUnsplash ? initialSchoolInfo.heroImageUrl : (parsed.heroImageUrl || initialSchoolInfo.heroImageUrl)
        };
      }
      return initialSchoolInfo;
    } catch {
      return initialSchoolInfo;
    }
  });

  const [spmbConfig, setSpmbConfigState] = useState<SpmbConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SPMB_CONFIG);
      if (saved) {
        const parsed: SpmbConfig = JSON.parse(saved);
        const isOldBank = !parsed.bankAccount || 
          (parsed.bankAccount.bankName && (parsed.bankAccount.bankName.includes('Bank Jambi') || parsed.bankAccount.bankName.includes('BJS'))) ||
          parsed.bankAccount.accountNumber === '7189-0123-4567-89' ||
          parsed.bankAccount.accountHolder === "SD Qur'an Para Sahabat";
        return {
          ...initialSpmbConfig,
          ...parsed,
          bankAccount: isOldBank ? initialSpmbConfig.bankAccount : (parsed.bankAccount || initialSpmbConfig.bankAccount)
        };
      }
      return initialSpmbConfig;
    } catch {
      return initialSpmbConfig;
    }
  });

  const [programs, setProgramsState] = useState<ProgramItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
      if (saved) {
        const parsed: ProgramItem[] = JSON.parse(saved);
        return initialPrograms.map(initProg => {
          const matched = parsed.find(p => p.id === initProg.id);
          if (!matched) return initProg;
          const isUnsplash = matched.image && matched.image.includes('images.unsplash.com');
          return {
            ...initProg,
            ...matched,
            image: isUnsplash ? initProg.image : (matched.image || initProg.image)
          };
        });
      }
      return initialPrograms;
    } catch {
      return initialPrograms;
    }
  });

  const [articles, setArticlesState] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (saved) {
        const parsed: Article[] = JSON.parse(saved);
        return initialArticles.map(initArt => {
          const matched = parsed.find(a => a.id === initArt.id);
          if (!matched) return initArt;
          const isUnsplash = matched.featuredImage && matched.featuredImage.includes('images.unsplash.com');
          return {
            ...initArt,
            ...matched,
            featuredImage: isUnsplash ? initArt.featuredImage : (matched.featuredImage || initArt.featuredImage)
          };
        });
      }
      return initialArticles;
    } catch {
      return initialArticles;
    }
  });

  const [gallery, setGalleryState] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (saved) {
        const parsed: GalleryItem[] = JSON.parse(saved);
        return initialGallery.map(initGal => {
          const matched = parsed.find(g => g.id === initGal.id);
          if (!matched) return initGal;
          const isUnsplash = matched.imageUrl && matched.imageUrl.includes('images.unsplash.com');
          return {
            ...initGal,
            ...matched,
            imageUrl: isUnsplash ? initGal.imageUrl : (matched.imageUrl || initGal.imageUrl)
          };
        });
      }
      return initialGallery;
    } catch {
      return initialGallery;
    }
  });

  const [facilities, setFacilitiesState] = useState<FacilityItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      if (saved) {
        const parsed: FacilityItem[] = JSON.parse(saved);
        return initialFacilities.map(initFac => {
          const matched = parsed.find(f => f.id === initFac.id);
          if (!matched) return initFac;
          const isUnsplash = matched.imageUrl && matched.imageUrl.includes('images.unsplash.com');
          return {
            ...initFac,
            ...matched,
            imageUrl: isUnsplash ? initFac.imageUrl : (matched.imageUrl || initFac.imageUrl)
          };
        });
      }
      return initialFacilities;
    } catch {
      return initialFacilities;
    }
  });

  const [achievements, setAchievementsState] = useState<AchievementItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (saved) {
        const parsed: AchievementItem[] = JSON.parse(saved);
        return initialAchievements.map(initAch => {
          const matched = parsed.find(a => a.id === initAch.id);
          if (!matched) return initAch;
          const isUnsplash = matched.imageUrl && matched.imageUrl.includes('images.unsplash.com');
          return {
            ...initAch,
            ...matched,
            imageUrl: isUnsplash ? initAch.imageUrl : (matched.imageUrl || initAch.imageUrl)
          };
        });
      }
      return initialAchievements;
    } catch {
      return initialAchievements;
    }
  });

  const [faqs, setFaqsState] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : initialFaqs;
    } catch {
      return initialFaqs;
    }
  });

  const [applicants, setApplicantsState] = useState<Applicant[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICANTS);
      return saved ? JSON.parse(saved) : initialApplicants;
    } catch {
      return initialApplicants;
    }
  });

  // UI Navigation states
  const [activeView, setActiveViewState] = useState<string>('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; alt: string } | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
    } catch {
      return false;
    }
  });

  // Update URL hash / path state safely
  const setActiveView = (view: string) => {
    setActiveViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({}, '', `#${view}`);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('berita/')) {
        const slug = hash.replace('berita/', '');
        setSelectedArticleSlug(slug);
        setActiveViewState('berita-detail');
      } else if (hash) {
        setActiveViewState(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save changes to localStorage helper
  const setSchoolInfo = (info: SchoolInfo) => {
    setSchoolInfoState(info);
    safeSetItem(STORAGE_KEYS.SCHOOL_INFO, JSON.stringify(info));
  };

  const updateSchoolInfo = (updates: Partial<SchoolInfo>) => {
    setSchoolInfoState(prev => {
      const updated = { ...prev, ...updates };
      safeSetItem(STORAGE_KEYS.SCHOOL_INFO, JSON.stringify(updated));
      return updated;
    });
  };

  const setSpmbConfig = (config: SpmbConfig) => {
    setSpmbConfigState(config);
    safeSetItem(STORAGE_KEYS.SPMB_CONFIG, JSON.stringify(config));
  };

  const updateSpmbConfig = (updates: Partial<SpmbConfig>) => {
    setSpmbConfigState(prev => {
      const updated = { ...prev, ...updates };
      safeSetItem(STORAGE_KEYS.SPMB_CONFIG, JSON.stringify(updated));
      return updated;
    });
  };

  const setPrograms = (newPrograms: ProgramItem[]) => {
    setProgramsState(newPrograms);
    safeSetItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(newPrograms));
  };

  const addArticle = (articleData: Omit<Article, 'id'>) => {
    const newArticle: Article = {
      ...articleData,
      id: `art-${Date.now()}`
    };
    setArticlesState(prev => {
      const updated = [newArticle, ...prev];
      safeSetItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));
      return updated;
    });
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticlesState(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...updates } : a);
      safeSetItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteArticle = (id: string) => {
    setArticlesState(prev => {
      const updated = prev.filter(a => a.id !== id);
      safeSetItem(STORAGE_KEYS.ARTICLES, JSON.stringify(updated));
      return updated;
    });
  };

  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`
    };
    setGalleryState(prev => {
      const updated = [newItem, ...prev];
      safeSetItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryState(prev => {
      const updated = prev.filter(item => item.id !== id);
      safeSetItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
      return updated;
    });
  };

  const addFacility = (facData: Omit<FacilityItem, 'id'>) => {
    const newFac: FacilityItem = {
      ...facData,
      id: `fac-${Date.now()}`
    };
    setFacilitiesState(prev => {
      const updated = [...prev, newFac];
      safeSetItem(STORAGE_KEYS.FACILITIES, JSON.stringify(updated));
      return updated;
    });
  };

  const updateFacility = (id: string, updates: Partial<FacilityItem>) => {
    setFacilitiesState(prev => {
      const updated = prev.map(f => f.id === id ? { ...f, ...updates } : f);
      safeSetItem(STORAGE_KEYS.FACILITIES, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteFacility = (id: string) => {
    setFacilitiesState(prev => {
      const updated = prev.filter(f => f.id !== id);
      safeSetItem(STORAGE_KEYS.FACILITIES, JSON.stringify(updated));
      return updated;
    });
  };

  const addAchievement = (achData: Omit<AchievementItem, 'id'>) => {
    const newAch: AchievementItem = {
      ...achData,
      id: `ach-${Date.now()}`
    };
    setAchievementsState(prev => {
      const updated = [newAch, ...prev];
      safeSetItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateAchievement = (id: string, updates: Partial<AchievementItem>) => {
    setAchievementsState(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...updates } : a);
      safeSetItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteAchievement = (id: string) => {
    setAchievementsState(prev => {
      const updated = prev.filter(a => a.id !== id);
      safeSetItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(updated));
      return updated;
    });
  };

  const addFaq = (faqData: Omit<FaqItem, 'id'>) => {
    const newFaq: FaqItem = {
      ...faqData,
      id: `faq-${Date.now()}`
    };
    setFaqsState(prev => {
      const updated = [...prev, newFaq];
      safeSetItem(STORAGE_KEYS.FAQS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateFaq = (id: string, updates: Partial<FaqItem>) => {
    setFaqsState(prev => {
      const updated = prev.map(f => f.id === id ? { ...f, ...updates } : f);
      safeSetItem(STORAGE_KEYS.FAQS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteFaq = (id: string) => {
    setFaqsState(prev => {
      const updated = prev.filter(f => f.id !== id);
      safeSetItem(STORAGE_KEYS.FAQS, JSON.stringify(updated));
      return updated;
    });
  };

  const addApplicant = (applicantData: Omit<Applicant, 'id' | 'registrationDate' | 'status'>): Applicant => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const newApplicant: Applicant = {
      ...applicantData,
      id: `app-${Date.now()}`,
      registrationDate: dateStr,
      status: 'Menunggu Konfirmasi'
    };
    setApplicantsState(prev => {
      const updated = [newApplicant, ...prev];
      safeSetItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(updated));
      return updated;
    });
    return newApplicant;
  };

  const updateApplicantStatus = (id: string, status: Applicant['status'], notes?: string) => {
    setApplicantsState(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, status, ...(notes !== undefined ? { notes } : {}) } : a);
      safeSetItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteApplicant = (id: string) => {
    setApplicantsState(prev => {
      const updated = prev.filter(a => a.id !== id);
      safeSetItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(updated));
      return updated;
    });
  };

  const resetToDefaults = () => {
    setSchoolInfoState(initialSchoolInfo);
    setSpmbConfigState(initialSpmbConfig);
    setProgramsState(initialPrograms);
    setArticlesState(initialArticles);
    setGalleryState(initialGallery);
    setFacilitiesState(initialFacilities);
    setAchievementsState(initialAchievements);
    setFaqsState(initialFaqs);
    setApplicantsState(initialApplicants);

    localStorage.removeItem(STORAGE_KEYS.SCHOOL_INFO);
    localStorage.removeItem(STORAGE_KEYS.SPMB_CONFIG);
    localStorage.removeItem(STORAGE_KEYS.PROGRAMS);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.FACILITIES);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    localStorage.removeItem(STORAGE_KEYS.APPLICANTS);
  };

  return (
    <SchoolContext.Provider
      value={{
        schoolInfo,
        setSchoolInfo,
        updateSchoolInfo,
        spmbConfig,
        setSpmbConfig,
        updateSpmbConfig,
        programs,
        setPrograms,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        facilities,
        addFacility,
        updateFacility,
        deleteFacility,
        achievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        applicants,
        addApplicant,
        updateApplicantStatus,
        deleteApplicant,
        activeView,
        setActiveView,
        selectedArticleSlug,
        setSelectedArticleSlug,
        lightboxImage,
        setLightboxImage,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        resetToDefaults
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};

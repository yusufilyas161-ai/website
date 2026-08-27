import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Check, 
  Tag,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { SEOHead } from '../components/SEOHead';
import { IslamicPattern } from '../components/IslamicPattern';

export const NewsDetailView: React.FC = () => {
  const { articles, selectedArticleSlug, setSelectedArticleSlug, setActiveView, schoolInfo } = useSchool();
  const [copied, setCopied] = useState(false);

  // Find article by slug or fallback to first article
  const article = articles.find(a => a.slug === selectedArticleSlug) || articles[0];

  if (!article) {
    return (
      <div className="py-20 text-center">
        <p>Artikel tidak ditemukan.</p>
        <button onClick={() => setActiveView('berita')} className="mt-4 text-emerald-700 font-bold">
          Kembali ke Berita
        </button>
      </div>
    );
  }

  const currentUrl = `https://sdquranparasahabat.sch.id/#berita/${article.slug}`;

  const handleShareWa = () => {
    const text = encodeURIComponent(`*${article.title}*\n\nBaca selengkapnya di Website SD Qur'an Para Sahabat:\n${currentUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareFb = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedArticles = articles
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="w-full bg-[#fbfcf9] text-slate-800">
      <SEOHead 
        title={article.seoTitle || article.title}
        description={article.metaDescription || article.summary}
        slug={`berita/${article.slug}`}
        image={article.featuredImage}
        article={{
          datePublished: article.date,
          author: article.author,
          category: article.category
        }}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-emerald-950 text-emerald-100 py-4 border-b border-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <button
            onClick={() => setActiveView('berita')}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Berita</span>
          </button>
          <span className="px-3 py-1 rounded-full bg-amber-400 text-emerald-950 font-bold text-[10px] uppercase tracking-wider shadow-sm">
            {article.category}
          </span>
        </div>
      </div>

      {/* Main Article Container */}
      <main className="py-10 lg:py-16 bg-[#F9FAF8]">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Info */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-950 font-serif leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-100 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <User className="w-4 h-4 text-emerald-700" />
                  {article.author} ({article.authorRole})
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  {article.date}
                </span>
                <span className="hidden sm:flex items-center gap-1.5 font-mono">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  {article.readTimeMinutes} menit baca
                </span>
              </div>

              {/* Share actions */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 mr-1">Bagikan:</span>
                <button
                  onClick={handleShareWa}
                  className="p-2 rounded-full bg-[#F4F7F2] hover:bg-emerald-100 text-emerald-800 transition-colors border border-emerald-100"
                  title="Bagikan ke WhatsApp"
                  aria-label="Bagikan ke WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShareFb}
                  className="p-2 rounded-full bg-[#F4F7F2] hover:bg-emerald-100 text-emerald-800 transition-colors border border-emerald-100"
                  title="Bagikan ke Facebook"
                  aria-label="Bagikan ke Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="p-2 rounded-full bg-[#F4F7F2] hover:bg-emerald-100 text-emerald-800 transition-colors border border-emerald-100"
                  title="Bagikan ke Twitter / X"
                  aria-label="Bagikan ke Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-full bg-[#F4F7F2] hover:bg-emerald-100 text-emerald-800 transition-colors flex items-center gap-1 text-[11px] border border-emerald-100"
                  title="Salin tautan"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-sm border border-emerald-100 bg-[#F4F7F2]">
            <img
              src={article.featuredImage}
              alt={article.imageAlt || article.title}
              className="w-full h-80 sm:h-96 object-cover"
            />
            {article.imageAlt && (
              <p className="p-3 bg-[#F4F7F2] text-[11px] text-slate-500 italic text-center border-t border-emerald-100">
                {article.imageAlt}
              </p>
            )}
          </div>

          {/* Article Summary Lead */}
          <div className="p-6 rounded-2xl bg-[#F4F7F2] border-l-4 border-amber-400 text-sm sm:text-base text-emerald-950 font-medium leading-relaxed shadow-sm">
            {article.summary}
          </div>

          {/* Body Content */}
          <div className="prose prose-emerald max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="pt-6 border-t border-emerald-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Topik Terkait:
              </span>
              {article.tags.map((t, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#F4F7F2] text-emerald-900 border border-emerald-100 text-xs rounded-full">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Author Box */}
          <div className="p-6 rounded-3xl bg-emerald-950 text-white flex items-center gap-4 border border-emerald-900 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-800 text-amber-300 font-bold flex items-center justify-center flex-shrink-0 text-base font-serif border border-emerald-700">
              SD
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-serif">{article.author}</h4>
              <p className="text-xs text-amber-300">{article.authorRole} • SD Qur'an Para Sahabat Kampung Baru</p>
              <p className="text-[11px] text-emerald-200 mt-1">
                Berkomitmen menghadirkan informasi edukatif seputar tahfizh dan pendidikan karakter islami.
              </p>
            </div>
          </div>

        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-emerald-100 bg-[#F4F7F2] py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="font-bold text-xl text-emerald-950 font-serif mb-6">
                Artikel Terkait Lainnya
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    className="bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    onClick={() => {
                      setSelectedArticleSlug(rel.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <img
                      src={rel.featuredImage}
                      alt={rel.imageAlt}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">{rel.category}</span>
                      <h4 className="font-bold text-xs text-emerald-950 mt-1 line-clamp-2 hover:text-emerald-700">
                        {rel.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 mt-2 block font-mono">{rel.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

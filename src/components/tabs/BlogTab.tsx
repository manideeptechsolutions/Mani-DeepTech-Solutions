import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  X, 
  ArrowRight,
  Sparkles,
  Calendar,
  User,
  Image as ImageIcon,
  RefreshCw
} from 'lucide-react';
import { TabType, BlogPost } from '../../types';
import { COMPANY_INFO } from '../../data/websiteData';
import { WhatsAppIcon } from '../SocialIcons';

interface BlogTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const BlogTab: React.FC<BlogTabProps> = () => {
  const [insights, setInsights] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  // Fetch real insights from MongoDB
  const fetchInsights = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setInsights(data.data);
      }
    } catch (err) {
      console.error('Failed to load insights from API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="space-y-20 md:space-y-28 pb-28 pt-36 md:pt-44">
      
      {/* 1. SECTION HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-700 tracking-wider uppercase shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          TECHNICAL JOURNAL & CASE STUDIES
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight uppercase">
          INSIGHTS OF <span className="text-gradient-multi">MANI DEEPTECH SOLUTIONS</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-xl font-medium italic max-w-2xl mx-auto">
          "Production milestones, system architectures, and technical achievements delivered by Manideep Juvvala & engineering staff."
        </p>
      </section>

      {/* 2. ARTICLES & INSIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isLoading ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
            <div className="text-sm font-bold text-slate-600">Loading company insights...</div>
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200 p-8 sm:p-12 space-y-4 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Insights of Mani DeepTech Solutions
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              All previous sample articles have been cleared. New verified case studies, architectures, and client project breakdowns will appear here once published.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {insights.map((item, idx) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 shadow-lg hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
                onClick={() => setActiveArticle(item)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {item.date}
                    </span>
                  </div>

                  {item.imageUrl && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-52 bg-slate-50">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                      {item.excerpt}
                    </p>
                  </div>

                  {item.imageDescription && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item.imageDescription}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                  <span className="text-xs font-bold text-slate-600">
                    By <strong className="text-slate-900">{item.author}</strong>
                  </span>

                  <button
                    type="button"
                    className="btn-blue inline-flex items-center gap-1.5 px-5 py-2 text-xs font-black uppercase tracking-wider group-hover:shadow-md cursor-pointer"
                  >
                    <span>READ INSIGHT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </section>

      {/* 3. CLEAN ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-slate-200 p-8 sm:p-12 space-y-8 relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-2">
                <span className="text-[11px] font-black px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500 pt-1">
                  <span className="text-slate-900">By {activeArticle.author}</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0 cursor-pointer"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Optional Image */}
            {activeArticle.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-72">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Image Description Card */}
            {activeArticle.imageDescription && (
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-900 flex items-start gap-2.5 font-medium">
                <ImageIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Architecture / Visual Breakdown:</strong>
                  {activeArticle.imageDescription}
                </div>
              </div>
            )}

            {/* Modal Article Content (Clean Prose) */}
            <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Modal Footer Call To Action */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl">
              <div className="text-xs sm:text-sm font-bold text-slate-800 text-center sm:text-left flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 hidden sm:block" />
                <span>Want to build or implement this architecture?</span>
              </div>
              <a
                href={`https://wa.me/919381088104?text=Hi%20Mani%2C%20I%20read%20your%20company%20insight%20%22${encodeURIComponent(activeArticle.title)}%22%20and%20would%20like%20to%20discuss%20it.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green inline-flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>DISCUSS ON WHATSAPP</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

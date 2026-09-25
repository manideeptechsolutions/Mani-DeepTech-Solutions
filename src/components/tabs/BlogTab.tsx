import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { TabType, BlogPost } from '../../types';
import { BLOG_POSTS, COMPANY_INFO } from '../../data/websiteData';
import { WhatsAppIcon } from '../SocialIcons';

interface BlogTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const BlogTab: React.FC<BlogTabProps> = () => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <div className="space-y-20 md:space-y-28 pb-28 pt-36 md:pt-44">
      
      {/* 1. SECTION HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-700 tracking-wider uppercase shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          ENGINEERING BLOG & INSIGHTS
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          DEEPTECH <span className="text-gradient-multi">ARTICLES & ARCHITECTURES</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-xl font-medium italic max-w-2xl mx-auto">
          "Practical insights on Agentic AI workflows, enterprise RAG, full-stack systems, and IEEE engineering capstones."
        </p>
      </section>

      {/* 2. ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {BLOG_POSTS.map((post, idx) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 shadow-lg hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setActiveArticle(post)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
                    {post.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    ARTICLE 0{idx + 1}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                <span className="text-xs font-bold text-slate-500">
                  By {COMPANY_INFO.founder}
                </span>

                <button
                  type="button"
                  className="btn-blue inline-flex items-center gap-1.5 px-5 py-2 text-xs font-black uppercase tracking-wider group-hover:shadow-md cursor-pointer"
                >
                  <span>READ ARTICLE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
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
                <p className="text-xs font-bold text-slate-500">
                  By {COMPANY_INFO.founder} • {COMPANY_INFO.name}
                </p>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0 cursor-pointer"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

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
                href={`https://wa.me/919381088104?text=Hi%20Mani%2C%20I%20read%20your%20blog%20article%20%22${encodeURIComponent(activeArticle.title)}%22%20and%20would%20like%20to%20discuss%20it.`}
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

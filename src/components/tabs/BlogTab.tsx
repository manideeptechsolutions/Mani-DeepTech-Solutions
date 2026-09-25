import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  X, 
  ChevronRight
} from 'lucide-react';
import { TabType, BlogPost } from '../../types';
import { BLOG_POSTS, COMPANY_INFO } from '../../data/websiteData';
import { WhatsAppIcon } from '../SocialIcons';

interface BlogTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const BlogTab: React.FC<BlogTabProps> = ({ setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'AI & ML', 'Web Development', 'Career & Projects'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-28 md:space-y-36 pb-28 pt-36 md:pt-44">
      
      {/* 1. SECTION HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-700 tracking-wider uppercase shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          DEEPTECH ENGINEERING JOURNAL
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          INSIGHTS ON <span className="text-gradient-multi">AGENTIC AI & ENGINEERING</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-xl font-medium italic max-w-3xl mx-auto">
          "Architectural breakdowns, enterprise RAG tutorials, and final year project strategies by Manideep Juvvala."
        </p>
      </section>

      {/* 2. SEARCH & CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles, keywords, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'btn-blue'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. ARTICLES LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-200 space-y-4">
            <div className="text-base font-bold text-slate-500">No articles found matching your query.</div>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="btn-blue inline-flex items-center px-6 py-2.5 text-xs font-black uppercase cursor-pointer"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {filteredPosts.map((post) => (
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
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-medium line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-100 text-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-6">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>{post.author}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-400">{post.date}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-blue-600 font-black group-hover:translate-x-1 transition-transform">
                    <span>READ ARTICLE</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-slate-200 p-8 sm:p-12 space-y-8 relative">
            
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-2">
                <span className="text-[11px] font-black px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                  {activeArticle.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500 pt-1">
                  <span className="text-slate-900">{activeArticle.author}</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
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

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl">
              <div className="text-xs font-bold text-slate-700 text-center sm:text-left">
                Want to implement or learn this technology? Contact our team directly!
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

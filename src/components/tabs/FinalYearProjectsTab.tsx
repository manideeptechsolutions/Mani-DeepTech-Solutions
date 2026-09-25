import React, { useState } from 'react';
import { 
  FolderGit2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Presentation, 
  Award, 
  Code2, 
  Database, 
  ChevronRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { TabType } from '../../types';
import { FINAL_YEAR_DOMAINS, COMPANY_INFO } from '../../data/websiteData';
import { WhatsAppIcon } from '../SocialIcons';

interface FinalYearProjectsTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const FinalYearProjectsTab: React.FC<FinalYearProjectsTabProps> = ({ setActiveTab }) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>(FINAL_YEAR_DOMAINS[0].id);

  const activeDomain = FINAL_YEAR_DOMAINS.find(d => d.id === selectedDomainId) || FINAL_YEAR_DOMAINS[0];

  return (
    <div className="space-y-28 md:space-y-36 pb-28 pt-36 md:pt-44">
      
      {/* 1. SECTION HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-black text-orange-700 tracking-wider uppercase shadow-sm">
          <FolderGit2 className="w-3.5 h-3.5 text-orange-600" />
          ENGINEERING CAPSTONES & IEEE PAPERS
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          IEEE-STANDARD <span className="text-gradient-multi">FINAL YEAR PROJECTS</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-xl font-medium italic max-w-3xl mx-auto">
          "100% bug-free source code, 60-80 page IEEE documentation report, and 1-on-1 viva coaching."
        </p>
      </section>

      {/* 2. SPLIT DOMAIN BROWSER (Matching AI Battlepass Screenshot Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Domain Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-2 mb-3">
              SELECT ENGINEERING DOMAIN (01 - 04)
            </div>

            {FINAL_YEAR_DOMAINS.map((domain, idx) => {
              const isSelected = domain.id === selectedDomainId;
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomainId(domain.id)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-white border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-black px-3 py-1.5 rounded-lg ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-500 via-blue-600 to-orange-500 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                      }`}
                    >
                      DOMAIN 0{idx + 1}
                    </span>
                    <div>
                      <h4 className={`text-sm sm:text-base font-black transition-colors ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                        {domain.domain.split('(')[0]}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 font-medium mt-0.5">IEEE 2025/2026 Standards</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Active Domain Detail Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 border-2 border-slate-200 shadow-xl relative space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700">
                  IEEE 2025 / 2026 ACCREDITED
                </span>
                <span className="text-3xl font-black text-slate-300 font-mono">
                  DOMAIN 0{FINAL_YEAR_DOMAINS.findIndex(d => d.id === selectedDomainId) + 1}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {activeDomain.domain}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">
                  {activeDomain.description}
                </p>
              </div>

              {/* Trending IEEE Topics */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>TRENDING IEEE CONFERENCE & JOURNAL TOPICS</span>
                </div>
                <div className="space-y-2.5">
                  {activeDomain.popularTopics.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium bg-white p-3.5 rounded-xl border border-slate-200/80">
                      <span className="w-5 h-5 rounded-md bg-orange-100 text-orange-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-xs font-black uppercase text-slate-800">Technologies Used</div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeDomain.techStack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-white text-slate-800 border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-xs font-black uppercase text-slate-800">Guaranteed Package</div>
                  <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {activeDomain.deliverables.map((del, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Strictly Orange, Green */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/919381088104?text=Hi%20Mani%2C%20I%20want%20to%20implement%20a%20Final%20Year%20Project%20in%20${encodeURIComponent(activeDomain.domain)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green inline-flex items-center gap-2 px-7 py-3.5 text-xs font-black uppercase tracking-wider"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>INQUIRE VIA WHATSAPP</span>
                </a>

                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-orange inline-flex items-center gap-2 px-7 py-3.5 text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  <span>REQUEST TOPIC SCOPING</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. ALL-INCLUSIVE PACKAGE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-700 tracking-wider uppercase shadow-sm">
            COMPLETE STUDENT SUPPORT
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            EVERYTHING YOU NEED TO <span className="text-gradient-multi">ACE YOUR REVIEWS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '100% Tested Source Code',
              desc: 'Clean, modular, well-commented source code with zero errors. Tested on your laptop via remote support or step-by-step setup guides.',
              icon: Code2,
              badge: 'Bug-Free'
            },
            {
              title: 'IEEE Format Project Report',
              desc: 'Comprehensive 50-80 page documentation formatted strictly to IEEE standards, including abstract, literature survey, DFD/UML diagrams, and results.',
              icon: FileText,
              badge: 'Plagiarism-Free'
            },
            {
              title: 'Review Presentation (PPT)',
              desc: 'Professional PowerPoint decks designed for Phase 1, Phase 2, and Final Review presentations with high-resolution system architectures.',
              icon: Presentation,
              badge: 'Presentation Ready'
            },
            {
              title: 'Clean Datasets & Weights',
              desc: 'Trained deep learning model checkpoints (.pth, .h5, ONNX) and preprocessed real-world Kaggle/IEEE datasets.',
              icon: Database,
              badge: 'Verified Data'
            },
            {
              title: '1-on-1 Code Explanation',
              desc: 'Dedicated session with founder Manideep Juvvala explaining every algorithm, mathematical formula, and line of code.',
              icon: Award,
              badge: 'Mentorship'
            },
            {
              title: 'Mock Viva Voce Preparation',
              desc: 'Comprehensive list of potential external examiner questions, algorithm comparisons, and trade-off explanations.',
              icon: HelpCircle,
              badge: '100% Confidence'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-black px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-lg">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

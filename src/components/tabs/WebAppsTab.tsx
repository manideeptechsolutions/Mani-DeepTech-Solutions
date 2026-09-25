import React, { useState } from 'react';
import { 
  Globe, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layout, 
  Server, 
  Database,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { TabType } from '../../types';
import { WEB_PROJECTS, COMPANY_INFO } from '../../data/websiteData';
import { WhatsAppIcon } from '../SocialIcons';

interface WebAppsTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const WebAppsTab: React.FC<WebAppsTabProps> = ({ setActiveTab }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(WEB_PROJECTS[0].id);

  const selectedProject = WEB_PROJECTS.find(p => p.id === selectedProjectId) || WEB_PROJECTS[0];

  return (
    <div className="space-y-28 md:space-y-36 pb-28 pt-36 md:pt-44">
      
      {/* 1. SECTION HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-blue-700 tracking-wider uppercase shadow-sm">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          FULL-STACK WEB ENGINEERING
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          HIGH-PERFORMANCE <span className="text-gradient-multi">SAAS & WEB APPS</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-xl font-medium italic max-w-3xl mx-auto">
          "From modern React 19 dashboards and cloud telemetry SaaS to real-time collaborative workspaces."
        </p>
      </section>

      {/* 2. SPLIT INTERACTIVE WEB APP BROWSER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Web App Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-2 mb-3">
              SELECT WEB APPLICATION (01 - 03)
            </div>

            {WEB_PROJECTS.map((proj, idx) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
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
                      APP 0{idx + 1}
                    </span>
                    <div>
                      <h4 className={`text-sm sm:text-base font-black transition-colors ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 font-medium mt-0.5">{proj.subtitle}</p>
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

          {/* Right Active Web App Detail Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 border-2 border-slate-200 shadow-xl relative space-y-6">
              
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                  FULL-STACK SAAS & WEB PORTAL
                </span>
                <span className="text-3xl font-black text-slate-300 font-mono">
                  APP 0{WEB_PROJECTS.findIndex(p => p.id === selectedProjectId) + 1}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-blue-600 mt-1 italic">
                  "{selectedProject.subtitle}"
                </p>
                <div className="mt-2 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block font-mono">
                  Performance: {selectedProject.metrics}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {selectedProject.description}
              </p>

              {/* Architecture Innovations */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>KEY ARCHITECTURAL INNOVATIONS</span>
                </div>
                <div className="space-y-2">
                  {selectedProject.architecture?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium bg-white p-3 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>INCLUDED DELIVERABLES</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.deliverables?.map((del, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-bold text-slate-500 mr-1">Technologies:</span>
                {selectedProject.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-white text-slate-800 border border-slate-200 shadow-2xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Strictly Orange, Green */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/919381088104?text=Hi%20Mani%2C%20I%20am%20interested%20in%20a%20web%20application%20similar%20to%20${encodeURIComponent(selectedProject.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green inline-flex items-center gap-2 px-7 py-3.5 text-xs font-black uppercase tracking-wider"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>DISCUSS ON WHATSAPP</span>
                </a>

                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-orange inline-flex items-center gap-2 px-7 py-3.5 text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  <span>REQUEST WEB PROPOSAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. CAPABILITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Modern Frontend Architecture',
              desc: 'React 19, Next.js 15, and Tailwind CSS v4 ensuring sub-second page loads, exceptional Lighthouse performance scores, and fluid micro-interactions.',
              icon: Layout,
              tags: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS']
            },
            {
              title: 'Scalable Microservices Backends',
              desc: 'High-throughput Node.js Express and Python FastAPI backends with asynchronous job queues, WebSocket streaming, and containerized Docker setups.',
              icon: Server,
              tags: ['Node.js', 'FastAPI', 'Redis', 'Docker', 'WebSockets']
            },
            {
              title: 'Resilient Cloud & Database Systems',
              desc: 'Relational PostgreSQL with Prisma ORM, time-series ClickHouse analytics, and MongoDB document stores with automated backups and encryption.',
              icon: Database,
              tags: ['PostgreSQL', 'Prisma', 'MongoDB', 'ClickHouse', 'AWS']
            }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-md space-y-4">
                <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 w-fit">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-100 text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

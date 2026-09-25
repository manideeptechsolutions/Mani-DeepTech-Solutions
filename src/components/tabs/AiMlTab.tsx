import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Database, 
  Terminal, 
  Workflow, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { TabType } from '../../types';
import { AI_ML_PROJECTS, COMPANY_INFO } from '../../data/websiteData';
import { WhatsAppIcon } from '../SocialIcons';

interface AiMlTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const AiMlTab: React.FC<AiMlTabProps> = ({ setActiveTab }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(AI_ML_PROJECTS[0].id);

  const selectedProject = AI_ML_PROJECTS.find(p => p.id === selectedProjectId) || AI_ML_PROJECTS[0];

  return (
    <div className="space-y-28 md:space-y-36 pb-28 pt-36 md:pt-44">
      
      {/* 1. SECTION HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-700 tracking-wider uppercase shadow-sm">
          <Bot className="w-3.5 h-3.5 text-emerald-600" />
          APPLIED AI & MACHINE LEARNING ENGINEERING
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          AUTONOMOUS <span className="text-gradient-multi">AGENTIC AI</span> & ENTERPRISE ML
        </h1>

        <p className="text-slate-600 text-base sm:text-xl font-medium italic max-w-3xl mx-auto">
          "From autonomous multi-agent swarms to enterprise hybrid RAG and real-time edge computer vision."
        </p>
      </section>

      {/* 2. SPLIT INTERACTIVE PROJECT BROWSER (Matching AI Battlepass Screenshot Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Project Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-2 mb-3">
              SELECT AI / ML SOLUTION (01 - 04)
            </div>

            {AI_ML_PROJECTS.map((proj, idx) => {
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
                      SOL 0{idx + 1}
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

          {/* Right Active Project Detailed View Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 border-2 border-slate-200 shadow-xl relative space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                  PRODUCTION AI ARCHITECTURE
                </span>
                <span className="text-3xl font-black text-slate-300 font-mono">
                  SOL 0{AI_ML_PROJECTS.findIndex(p => p.id === selectedProjectId) + 1}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-blue-600 mt-1 italic">
                  "{selectedProject.subtitle}"
                </p>
                {selectedProject.techHighlight && (
                  <div className="mt-2 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                    ⚡ {selectedProject.techHighlight}
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {selectedProject.description}
              </p>

              {/* Architecture Blueprint List */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-blue-600" />
                  <span>SYSTEM ARCHITECTURE BLUEPRINT</span>
                </div>
                <div className="space-y-2">
                  {selectedProject.architecture?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium bg-white p-3 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>PRODUCTION DELIVERABLES</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.deliverables?.map((del, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Tags */}
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
                  href={`https://wa.me/919381088104?text=Hi%20Mani%2C%20I%20am%20interested%20in%20an%20AI%20solution%20similar%20to%20${encodeURIComponent(selectedProject.title)}.`}
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
                  <span>REQUEST ARCHITECTURE QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. COMPLETE TECH STACK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-lg text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-blue-700 uppercase">
            FRAMEWORKS & INFRASTRUCTURE
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
            OUR AI & MACHINE LEARNING ENGINEERING STACK
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto pt-2">
            {[
              'Python 3.12', 'PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'LlamaIndex', 
              'HuggingFace Transformers', 'ChromaDB', 'Qdrant', 'Cohere Rerank', 'Ollama', 
              'vLLM', 'YOLOv11', 'OpenCV', 'TensorRT', 'FastAPI', 'Docker', 'CUDA'
            ].map((tech, idx) => (
              <span key={idx} className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-blue-400 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

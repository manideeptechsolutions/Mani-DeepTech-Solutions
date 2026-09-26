import React, { useState } from 'react';
import { 
  Bot, 
  Globe, 
  Smartphone, 
  GraduationCap, 
  FolderGit2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  ChevronDown, 
  ChevronUp, 
  Phone,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import { TabType } from '../../types';
import { COMPANY_INFO, FAQS } from '../../data/websiteData';
import { WhatsAppIcon } from '../SocialIcons';

interface HomeTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ setActiveTab }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = tab;
  };

  const coreServices = [
    {
      id: 'ai-ml' as TabType,
      title: 'AI & Machine Learning Solutions',
      buttonText: 'EXPLORE AI & ML HUB',
      icon: Bot,
      color: 'orange' as const,
      badge: 'STATE OF THE ART',
      description: 'Autonomous multi-agent swarms, enterprise RAG pipelines, fine-tuned LLMs, real-time edge computer vision, and predictive modeling for business acceleration.',
      points: [
        'Multi-Agent Workflows (LangGraph, LangChain)',
        'Enterprise RAG & Hybrid Vector Retrieval',
        'Custom Computer Vision (YOLOv11 & TensorRT)',
        'Local LLM Inferences & Model Optimization'
      ]
    },
    {
      id: 'web-apps' as TabType,
      title: 'Full-Stack Web Applications',
      buttonText: 'EXPLORE FULL-STACK HUB',
      icon: Globe,
      color: 'blue' as const,
      badge: 'SCALABLE CLOUD',
      description: 'End-to-end modern web applications, high-converting SaaS platforms, internal operations dashboards, and real-time collaborative workspaces.',
      points: [
        'Next.js 15, React 19, TypeScript & Tailwind v4',
        'High-Throughput Node.js & Python FastAPI Backends',
        'PostgreSQL, MongoDB, Redis & Columnar Storage',
        'Secure Auth, Payment Gateways & Microservices'
      ]
    },
    {
      id: 'mobile-apps' as TabType,
      title: 'Mobile Applications (iOS & Android)',
      buttonText: 'EXPLORE MOBILE HUB',
      icon: Smartphone,
      color: 'green' as const,
      badge: 'CROSS-PLATFORM',
      description: 'High-performance native-feel mobile apps built with React Native and Flutter, featuring on-device mobile AI, offline-first sync, and sleek animations.',
      points: [
        'React Native & Flutter Cross-Platform Architecture',
        'On-Device Edge ML & OCR Document Scanners',
        'Bluetooth LE Sensor & Smart Hardware Sync',
        'Background Geolocation & Push Notifications'
      ]
    },
    {
      id: 'training' as TabType,
      title: 'Teaching & Developer Training',
      buttonText: 'EXPLORE TRAINING HUB',
      icon: GraduationCap,
      color: 'orange' as const,
      badge: 'LIVE INTERACTIVE',
      description: 'Comprehensive developer training on modern programming languages (Python, JavaScript/TypeScript, Java, C++) and applied AI/ML with our flagship 3-month AI Battlepass.',
      points: [
        'Flagship AI BATTLEPASS: Python to Agentic AI (₹1,200)',
        'Core Programming: Python, C++ & DSA, Java, Web Dev',
        '50% Intuitive Theory + 50% Live Hands-on Coding',
        '20+ Real-World Projects, LMS Access & Mentorship'
      ]
    },
    {
      id: 'final-year-projects' as TabType,
      title: 'Final Year Engineering Projects',
      buttonText: 'EXPLORE IEEE PROJECTS',
      icon: FolderGit2,
      color: 'blue' as const,
      badge: 'IEEE STANDARDS',
      description: 'Complete capstone project support for B.Tech, M.Tech, MCA, and MSc students with working code, IEEE-format reports, presentation slides, and 1-on-1 viva guidance.',
      points: [
        '100% Working, Bug-Free Codebase with Deployment',
        'IEEE Format Complete Report (50-80 Pages) & PPT',
        'Domains: AI/ML, GenAI, Cloud Web, IoT & Cyber',
        '1-on-1 Code Walkthrough & Mock Viva Preparation'
      ]
    }
  ];

  return (
    <div className="space-y-28 md:space-y-36 pb-28">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-mesh-grid">
        {/* Soft Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-orange-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            
            {/* Top Company Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border-2 border-slate-200 shadow-sm backdrop-blur-md">
              <img
                src="/Logo.jpeg"
                alt="Mani DeepTech Solutions Logo"
                className="w-6 h-6 rounded-md object-cover"
              />
              <span className="text-xs sm:text-sm font-black text-slate-800 tracking-wide">
                {COMPANY_INFO.name}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-black tracking-wider text-emerald-700 uppercase">
                Enterprise AI & Software Engineering
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.06]">
                BUILDING THE FUTURE WITH <br />
                <span className="text-gradient-multi">
                  AI, SOFTWARE & DEEPTECH
                </span>
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed italic">
                "From autonomous multi-agent AI systems to high-performance web/mobile apps, elite live cohorts, and IEEE engineering capstones."
              </p>
            </div>

            {/* AI Battlepass Spotlight Pill */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <div className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white border-2 border-emerald-300 shadow-md">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Flagship Program:</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600">AI BATTLEPASS</span>
                <span className="text-xs font-black text-orange-600 font-mono bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                  ₹1,200 Only
                </span>
              </div>

              <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border-2 border-blue-200 text-blue-800 text-xs sm:text-sm font-black tracking-wide shadow-sm">
                ⚡ 3-MONTH PRACTICAL ONLINE TRAINING
              </div>
            </div>

            {/* Action Buttons: Strictly Orange, Blue, Green on White */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {/* 1. Vibrant Orange Button */}
              <button
                onClick={() => handleTabChange('ai-ml')}
                className="btn-orange inline-flex items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-wider cursor-pointer"
              >
                <Bot className="w-5 h-5 text-white" />
                <span>EXPLORE AI / ML PROJECTS</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {/* 2. Blue Button for Training */}
              <button
                onClick={() => handleTabChange('training')}
                className="btn-blue inline-flex items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-wider cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span>AI BATTLEPASS TRAINING (₹1,200)</span>
              </button>

              {/* 3. Green Button for Final Year Projects */}
              <button
                onClick={() => handleTabChange('final-year-projects')}
                className="btn-green inline-flex items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-wider cursor-pointer"
              >
                <FolderGit2 className="w-5 h-5 text-white" />
                <span>FINAL YEAR PROJECTS (IEEE)</span>
              </button>

              {/* White Outline Button */}
              <button
                onClick={() => handleTabChange('contact')}
                className="btn-white-outline inline-flex items-center gap-2 px-7 py-4 text-sm font-black uppercase tracking-wider cursor-pointer"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>CONSULT WITH MANIDEEP</span>
              </button>
            </div>

            {/* Key Metrics Bar */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { label: 'Flagship Training Duration', value: '3 Months' },
                { label: 'Hands-On Projects Built', value: '20+' },
                { label: 'Theory & Hands-On Balance', value: '50 / 50' },
                { label: 'Special Cohort Fee', value: '₹1,200' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-md text-center">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono text-gradient-multi">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE PILLARS SECTION - RHYTHMIC ORANGE, BLUE, GREEN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-700 tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            CORE ENGINEERING PILLARS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            WHAT WE DO AT <span className="text-gradient-multi">{COMPANY_INFO.name.toUpperCase()}</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-xl font-medium italic">
            "End-to-end technology solutions built with deep engineering rigor and modern AI."
          </p>
        </div>

        {/* Big Generous White Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {coreServices.map((service) => {
            const Icon = service.icon;
            const isOrange = service.color === 'orange';
            const isBlue = service.color === 'blue';
            const isGreen = service.color === 'green';

            return (
              <div
                key={service.id}
                className={`bg-white rounded-3xl p-8 sm:p-10 border-2 shadow-lg shadow-slate-200/50 transition-all flex flex-col justify-between group ${
                  isOrange
                    ? 'border-slate-200 hover:border-orange-500 hover:shadow-orange-500/10'
                    : isBlue
                    ? 'border-slate-200 hover:border-blue-500 hover:shadow-blue-500/10'
                    : 'border-slate-200 hover:border-emerald-500 hover:shadow-emerald-500/10'
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    {/* Icon container themed by color */}
                    <div
                      className={`p-3.5 rounded-2xl border-2 transition-colors ${
                        isOrange
                          ? 'bg-orange-50 text-orange-600 border-orange-200 group-hover:bg-orange-500 group-hover:text-white'
                          : isBlue
                          ? 'bg-blue-50 text-blue-600 border-blue-200 group-hover:bg-blue-600 group-hover:text-white'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Badge themed by color */}
                    <span
                      className={`text-[11px] font-black px-3.5 py-1 rounded-full border tracking-wider uppercase ${
                        isOrange
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : isBlue
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-2xl font-black text-slate-900 transition-colors ${
                        isOrange
                          ? 'group-hover:text-orange-600'
                          : isBlue
                          ? 'group-hover:text-blue-600'
                          : 'group-hover:text-emerald-600'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    {service.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isOrange
                              ? 'text-orange-500'
                              : isBlue
                              ? 'text-blue-500'
                              : 'text-emerald-500'
                          }`}
                        />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button themed by color: Orange, Blue, Green */}
                <div className="pt-8">
                  {isOrange ? (
                    <button
                      onClick={() => handleTabChange(service.id)}
                      className="btn-orange w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-black uppercase tracking-wider cursor-pointer"
                    >
                      <span>{service.buttonText}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  ) : isBlue ? (
                    <button
                      onClick={() => handleTabChange(service.id)}
                      className="btn-blue w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-black uppercase tracking-wider cursor-pointer"
                    >
                      <span>{service.buttonText}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleTabChange(service.id)}
                      className="btn-green w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-black uppercase tracking-wider cursor-pointer"
                    >
                      <span>{service.buttonText}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Card 6: Quick Consultation White Card - Green Theme */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-300 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500 transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 border-2 border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-black px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 tracking-wider uppercase">
                  CUSTOM SCOPING
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                  Have a Custom Engineering or AI Need?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                  Talk directly with Manideep Juvvala. We scope architectures, estimate development timelines, and build production MVPs.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Initial Technical Scoping Call</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Code Ownership & Documentation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct WhatsApp Engineering Support</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => handleTabChange('contact')}
                className="btn-green w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                <span>INITIATE PROJECT DISCUSSION</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* 3. FLAGSHIP SPOTLIGHT: AI BATTLEPASS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 border-2 border-emerald-300 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-700 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>PREMIER 3-MONTH COHORT</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                AI <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">BATTLEPASS</span>
              </h2>

              <p className="text-lg sm:text-2xl font-black text-blue-600">
                Level Up from Python to Autonomous Agentic AI
              </p>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                A rigorous, practical 3-month live online training program by Mani DeepTech Solutions. Master Python, Machine Learning, Deep Learning, NLP, LLMs, Generative AI, RAG, and Agentic AI with 20+ real-world projects and personal mentorship.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase">Duration</div>
                  <div className="text-base font-black text-slate-900 mt-1">3 Full Months</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase">Live Projects</div>
                  <div className="text-base font-black text-emerald-600 mt-1">20+ AI Projects</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center col-span-2 sm:col-span-1">
                  <div className="text-xs font-bold text-slate-500 uppercase">Cohort Fee</div>
                  <div className="text-base font-black text-orange-600 font-mono mt-1">₹1,200 Only</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="https://forms.gle/5Ax5qbXBpUDozCRN7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange inline-flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider"
                >
                  <span>ENROLL NOW — ₹1,200</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>

                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green inline-flex items-center gap-2 px-7 py-4 text-xs font-black uppercase tracking-wider"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>INQUIRE ON WHATSAPP</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600" />
                  <span>Tools You Will Master:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python 3', 'OOP', 'Scikit-Learn', 'PyTorch', 'YOLO', 'Whisper', 'LangChain', 'LangGraph', 'RAG', 'ChromaDB', 'Ollama', 'FastAPI', 'Docker'].map((tech, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white text-slate-800 border border-slate-200 shadow-2xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-slate-500 font-bold pt-2 border-t border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Live online weekend classes with recorded LMS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. METHODOLOGY WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-extrabold text-blue-700 tracking-wider uppercase shadow-sm">
            <Workflow className="w-3.5 h-3.5 text-blue-600" />
            ENGINEERING METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            HOW WE DELIVER <span className="text-gradient-multi">EXCELLENCE</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-xl font-medium italic">
            "A systematic engineering and educational lifecycle ensuring transparent communication and robust software."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Requirement & Architecture Design',
              desc: 'We analyze your business problem, research paper topic, or learning goal, selecting the optimal tech stack, database schemas, and AI models.'
            },
            {
              step: '02',
              title: 'Iterative Sprint Development',
              desc: 'We build in transparent, rapid milestones with clean modular code, version-controlled GitHub repositories, and regular progress updates.'
            },
            {
              step: '03',
              title: 'Rigorous Testing & Benchmarking',
              desc: 'Every endpoint, UI component, and machine learning model undergoes validation, latency profiling, and edge-case handling.'
            },
            {
              step: '04',
              title: 'Production Deployment & Cloud Setup',
              desc: 'We deploy to reliable cloud infrastructures (Vercel, AWS, Railway, Docker) with domain mapping, SSL certificates, and CI/CD pipelines.'
            },
            {
              step: '05',
              title: 'Documentation & Knowledge Transfer',
              desc: 'For businesses, we provide comprehensive API docs and handover. For students, we provide full IEEE reports, PPTs, and viva coaching.'
            },
            {
              step: '06',
              title: 'Ongoing Support & Mentorship',
              desc: 'Direct communication line with founder Manideep Juvvala for questions, bug fixes, feature expansion, or interview coaching.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-md">
              <div className="text-4xl font-black font-mono text-blue-600/40 mb-3">
                {item.step}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-extrabold text-blue-700 tracking-wider uppercase shadow-sm">
            ANSWERS & CLARITY
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <span className="font-black text-xs sm:text-base text-slate-900">
                  {faq.question}
                </span>
                <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                  {openFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {openFaq === index && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-medium">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. HIGH-IMPACT BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-10 sm:p-16 text-center space-y-8 border-2 border-blue-200 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-blue-700">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>READY TO LEVEL UP YOUR TECHNOLOGY?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto">
            LET'S BUILD YOUR NEXT <span className="text-gradient-multi">DEEPTECH PROJECT</span> TOGETHER
          </h2>

          <p className="text-sm sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Whether you need custom AI software, full-stack SaaS apps, hands-on training in Python & Agentic AI, or an IEEE final year capstone project — we're here to help.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green inline-flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>CHAT ON WHATSAPP: {COMPANY_INFO.phone}</span>
            </a>

            <button
              onClick={() => handleTabChange('contact')}
              className="btn-orange inline-flex items-center gap-2 px-8 py-4 text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              <span>SUBMIT PROJECT INQUIRY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-500 font-bold pt-2">
            Led by {COMPANY_INFO.founder} ({COMPANY_INFO.founderRole}) • Serving Clients & Students Globally
          </div>
        </div>
      </section>

    </div>
  );
};

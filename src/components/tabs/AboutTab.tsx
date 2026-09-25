import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  GraduationCap
} from 'lucide-react';
import { TabType } from '../../types';
import { COMPANY_INFO, COMPANY_VALUES } from '../../data/websiteData';
import { WhatsAppIcon, InstagramIcon } from '../SocialIcons';

interface AboutTabProps {
  setActiveTab: (tab: TabType) => void;
}

export const AboutTab: React.FC<AboutTabProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-28 md:space-y-36 pb-28 pt-36 md:pt-44">
      
      {/* 1. SECTION HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-700 tracking-wider uppercase shadow-sm">
          <User className="w-3.5 h-3.5 text-emerald-600" />
          FOUNDER & MISSION
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          ABOUT <span className="text-gradient-multi">{COMPANY_INFO.name.toUpperCase()}</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-xl font-medium italic max-w-3xl mx-auto">
          "Bridging advanced deeptech engineering with practical, career-defining software education."
        </p>
      </section>

      {/* 2. FOUNDER PROFILE CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 border-2 border-slate-200 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-4 text-center lg:text-left space-y-5">
              <div className="relative inline-block">
                <img
                  src="/Logo.jpeg"
                  alt="Mani DeepTech Solutions Founder"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl object-cover border-2 border-slate-200 shadow-xl mx-auto lg:mx-0"
                />
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-black shadow-md">
                  Active Engineer
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-black text-slate-900">
                  {COMPANY_INFO.founder}
                </h3>
                <p className="text-xs font-black text-blue-600 uppercase tracking-wider mt-1">
                  {COMPANY_INFO.founderRole}
                </p>
                <p className="text-xs text-slate-500 font-bold mt-1">
                  Founder & Technical Lead at Mani DeepTech Solutions
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>

                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-pink-50 text-pink-800 border-2 border-pink-200 text-xs font-black hover:bg-pink-100 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                  <span>{COMPANY_INFO.instagramHandle}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6 text-slate-600 font-medium leading-relaxed">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-blue-700">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>OUR STORY & PHILOSOPHY</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                "We don't teach from outdated slides. We build production systems and teach the exact workflows we use daily."
              </h2>

              <p className="text-xs sm:text-base leading-relaxed">
                Mani DeepTech Solutions was founded with a singular conviction: the modern software industry is evolving at breakneck speed, driven by Artificial Intelligence, Large Language Models, and autonomous agent swarms. Yet, traditional engineering curricula and generic online tutorials remain disconnected from real-world production engineering.
              </p>

              <p className="text-xs sm:text-base leading-relaxed">
                As an AI/ML Engineer and Product Builder, Manideep Juvvala established Mani DeepTech Solutions to serve two interconnected missions:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 space-y-2">
                  <div className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span>For Businesses & Startups</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Architecting custom AI models, agentic orchestrators, responsive full-stack web platforms, and mobile apps with end-to-end reliability.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 space-y-2">
                  <div className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span>For Students & Engineers</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Delivering practical live cohorts like AI Battlepass and guiding final year students to build and defend IEEE-standard capstone projects.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE PRINCIPLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-700 tracking-wider uppercase shadow-sm">
            OUR CORE VALUES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            THE VALUES THAT GUIDE <span className="text-gradient-multi">EVERY LINE OF CODE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COMPANY_VALUES.map((val, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-md space-y-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">{val.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DIRECT CONTACT CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
          Ready to Collaborate on Your Next Project?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium">
          Whether you need enterprise AI software or live mentorship, talk directly with Manideep Juvvala.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green inline-flex items-center gap-2 px-7 py-3.5 text-xs font-black uppercase tracking-wider"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Chat on WhatsApp</span>
          </a>
          <button
            onClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-orange inline-flex items-center gap-2 px-7 py-3.5 text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            <span>Open Contact Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};

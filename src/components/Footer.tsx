import React from 'react';
import { Phone, Mail, User, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { TabType } from '../types';
import { COMPANY_INFO } from '../data/websiteData';
import { WhatsAppIcon, InstagramIcon } from './SocialIcons';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = tab;
  };

  return (
    <footer className="bg-white border-t-2 border-slate-200 pt-20 pb-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b-2 border-slate-100">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src="/Logo.jpeg"
                alt="Mani DeepTech Solutions"
                className="h-12 w-12 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
              />
              <div>
                <h3 className="font-black text-xl text-slate-900 leading-tight">
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-xs font-black text-emerald-700 tracking-wider uppercase">
                  AI • DeepTech • Web & Mobile • Training
                </p>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md font-medium">
              <strong>Mani DeepTech Solutions</strong> delivers production-grade Artificial Intelligence and Machine Learning solutions, enterprise full-stack web and mobile apps, practical developer education, and IEEE-standard engineering final year projects.
            </p>

            {/* Social Connect Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-2 border-emerald-200 text-xs font-black transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: {COMPANY_INFO.phone}</span>
              </a>

              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-800 border-2 border-pink-200 text-xs font-black transition-all"
              >
                <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                <span>{COMPANY_INFO.instagramHandle}</span>
              </a>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-2 pt-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified Engineering Deliverables & 100% Tested Codebases</span>
            </div>
          </div>

          {/* Quick Tab Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Solutions & Navigation</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-slate-600">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ai-ml')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  AI & ML Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('web-apps')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Web Applications
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('mobile-apps')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Mobile Applications
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('training')} className="hover:text-emerald-700 transition-colors text-emerald-700 font-black cursor-pointer">
                  AI Battlepass Training (₹1,200)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('final-year-projects')} className="hover:text-orange-600 transition-colors text-orange-600 font-black cursor-pointer">
                  Final Year Projects (IEEE)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Insights of Mani DeepTech
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  About Us & Founder
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Direct Contact</h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium">
              
              <div className="flex items-center gap-2 text-slate-900 font-black">
                <User className="w-4 h-4 text-emerald-600" />
                <span>{COMPANY_INFO.founder} ({COMPANY_INFO.founderRole})</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-blue-600 transition-colors font-mono font-black text-slate-900">
                  {COMPANY_INFO.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-blue-600 transition-colors font-mono font-bold text-slate-800">
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1 text-xs text-slate-500 font-bold">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => handleNav('contact')}
                  className="btn-orange w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  <span>OPEN CONSULTATION FORM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-bold">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </div>
          <div className="text-xs text-slate-600 font-black flex items-center gap-2">
            <span>Powered by Modern DeepTech Engineering</span>
            <span>•</span>
            <span className="text-blue-600">AI Battlepass Partner</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

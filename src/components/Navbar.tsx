import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { TabType } from '../types';
import { COMPANY_INFO } from '../data/websiteData';
import { WhatsAppIcon, InstagramIcon } from './SocialIcons';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'ai-ml', label: 'AI/ML' },
    { id: 'web-apps', label: 'Web Apps' },
    { id: 'mobile-apps', label: 'Mobile Apps' },
    { id: 'training', label: 'Training' },
    { id: 'final-year-projects', label: 'Final Year Projects' },
    { id: 'blog', label: 'Insights' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = tab;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 py-3 shadow-md shadow-slate-200/50'
          : 'bg-white/80 backdrop-blur-md py-4 border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo Section */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none shrink-0"
          >
            <img
              src="/Logo.jpeg"
              alt="Mani DeepTech Solutions"
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-cover border border-slate-200 shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                Mani DeepTech
              </span>
              <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase">
                SOLUTIONS
              </span>
            </div>
          </button>

          {/* Desktop Navigation Capsule Pill */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-slate-100/90 p-1 rounded-full border border-slate-200/80 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold transition-all rounded-full ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/80'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-white/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Vibrant Orange Button */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* WhatsApp Circle */}
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp 9381088104"
              className="p-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#25D366] border border-emerald-200 transition-all hover:scale-105 shadow-sm"
              title="Chat on WhatsApp: 9381088104"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            {/* Instagram Circle */}
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @manideeptechsolutions"
              className="p-2.5 rounded-full bg-pink-50 hover:bg-pink-100 text-[#E1306C] border border-pink-200 transition-all hover:scale-105 shadow-sm"
              title="Follow on Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* Vibrant Orange Pill Button */}
            <button
              onClick={() => handleTabClick('contact')}
              className="relative group overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-600 to-orange-500 group-hover:opacity-90 transition-opacity" />
              <span className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-xs font-black tracking-wider text-white uppercase shadow-md group-hover:shadow-orange-500/25">
                GET IN TOUCH
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-blue-300 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <button
              onClick={() => handleTabClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white font-black text-xs uppercase shadow-md tracking-wider"
            >
              <span>GET IN TOUCH WITH MANIDEEP</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { WhatsAppIcon, InstagramIcon } from './SocialIcons';
import { COMPANY_INFO } from '../data/websiteData';

export const FloatingConnect: React.FC = () => {
  return (
    <aside aria-label="Social Quick Connect" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Instagram Button */}
      <a
        href={COMPANY_INFO.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect on Instagram"
        className="group flex items-center gap-2 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white p-3 rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300"
      >
        <InstagramIcon className="w-5 h-5 text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pr-0 group-hover:pr-1">
          Instagram {COMPANY_INFO.instagramHandle}
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp with ${COMPANY_INFO.phone}`}
        className="group flex items-center gap-2 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 transition-all duration-300"
      >
        <WhatsAppIcon className="w-6 h-6 text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-extrabold pr-0 group-hover:pr-1">
          WhatsApp {COMPANY_INFO.phone}
        </span>
      </a>
    </aside>
  );
};

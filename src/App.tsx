import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingConnect } from './components/FloatingWhatsApp';

import { HomeTab } from './components/tabs/HomeTab';
import { AiMlTab } from './components/tabs/AiMlTab';
import { WebAppsTab } from './components/tabs/WebAppsTab';
import { MobileAppsTab } from './components/tabs/MobileAppsTab';
import { TrainingTab } from './components/tabs/TrainingTab';
import { FinalYearProjectsTab } from './components/tabs/FinalYearProjectsTab';
import { BlogTab } from './components/tabs/BlogTab';
import { AboutTab } from './components/tabs/AboutTab';
import { ContactTab } from './components/tabs/ContactTab';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Sync with URL Hash on load & on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabType;
      const validTabs: TabType[] = [
        'home', 
        'ai-ml', 
        'web-apps', 
        'mobile-apps', 
        'training', 
        'final-year-projects', 
        'blog', 
        'about', 
        'contact'
      ];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab setActiveTab={setActiveTab} />;
      case 'ai-ml':
        return <AiMlTab setActiveTab={setActiveTab} />;
      case 'web-apps':
        return <WebAppsTab setActiveTab={setActiveTab} />;
      case 'mobile-apps':
        return <MobileAppsTab setActiveTab={setActiveTab} />;
      case 'training':
        return <TrainingTab setActiveTab={setActiveTab} />;
      case 'final-year-projects':
        return <FinalYearProjectsTab setActiveTab={setActiveTab} />;
      case 'blog':
        return <BlogTab setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutTab setActiveTab={setActiveTab} />;
      case 'contact':
        return <ContactTab />;
      default:
        return <HomeTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative flex flex-col justify-between">
      {/* Sticky Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Social Quick Connect Floating Bubble */}
      <FloatingConnect />

      {/* Main Tab Content */}
      <main className="flex-grow">
        {renderActiveTab()}
      </main>

      {/* Comprehensive Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;

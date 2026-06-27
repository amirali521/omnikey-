import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Playground from './components/Playground';
import Features from './components/Features';
import ActivationHub from './components/ActivationHub';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import { Sparkles, X, Check } from 'lucide-react';

export default function App() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'download' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Synchronize path and hash changes for SPA routing
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setCurrentHash('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Auto-dismiss Toast alert
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const triggerToastNotification = (message: string) => {
    setToastMessage(message);
  };

  const handleDownloadClick = () => {
    setActiveModal('download');
    triggerToastNotification("📥 Download started: OmniKeyboard.apk is saving locally.");
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (currentPath !== '/') {
      navigateTo('/');
      // Allow DOM rendering before scrolling
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const isPrivacyPage = currentPath === '/privacy' || currentHash === '#/privacy' || currentHash === '#privacy';

  if (isPrivacyPage) {
    return (
      <PrivacyPolicyPage 
        onBackToHome={() => navigateTo('/')}
        onNavigateToSection={handleNavigateToSection}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30 selection:text-white">
      
      {/* Premium FIXED header nav bar */}
      <Header 
        onDownloadClick={handleDownloadClick}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Main Single Page vertical flow layout */}
      <main>
        
        {/* Section 1: Hero Section */}
        <Hero 
          onDownloadClick={handleDownloadClick}
          onNavigateToSection={handleNavigateToSection}
        />

        {/* Section 2: Live Interactive Playground Sandbox */}
        <Playground 
          onSuccessNotification={triggerToastNotification}
        />

        {/* Section 3: Core Features Grid list */}
        <Features />

        {/* Section 4: Interactive Activation Hub Setup Step-by-Step */}
        <ActivationHub 
          onSuccessNotification={triggerToastNotification}
        />

        {/* Section 5: Collapsible FAQs Support accordions */}
        <FAQ />

      </main>

      {/* Section 6: Footer & Legal links */}
      <Footer 
        onNavigateToSection={handleNavigateToSection}
        onOpenModal={(type) => {
          if (type === 'privacy') {
            navigateTo('/privacy');
          } else {
            setActiveModal(type);
          }
        }}
      />

      {/* Dynamic Legal and Action Modal popup dialogs */}
      <LegalModal 
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Elegant, high-contrast, glowing Toast Notification banner */}
      {toastMessage && (
        <div 
          id="system-toast"
          className="fixed bottom-6 right-6 z-50 animate-scaleUp p-4 rounded-xl border border-indigo-500 bg-slate-900 shadow-[0_4px_30px_rgba(79,70,229,0.3)] max-w-sm flex items-start gap-3 text-left"
        >
          <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 space-y-0.5">
            <span className="font-mono text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
              Omni System Alert
            </span>
            <p className="font-sans text-xs text-slate-200">
              {toastMessage}
            </p>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-500 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}

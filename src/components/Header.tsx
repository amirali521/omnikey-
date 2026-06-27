import React, { useState, useEffect } from 'react';
import { Keyboard, Download, Menu, X, Shield, Globe } from 'lucide-react';

interface HeaderProps {
  onDownloadClick: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Header({ onDownloadClick, onNavigateToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Playground', id: 'playground' },
    { name: 'Features', id: 'features' },
    { name: 'Setup Guide', id: 'setup-guide' },
    { name: 'FAQ', id: 'faq' }
  ];

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          id="logo-button"
          onClick={() => onNavigateToSection('hero')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#818CF8] flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:scale-105 transition-transform duration-300">
            <Keyboard className="w-5.5 h-5.5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-sans font-bold text-lg tracking-tight text-white block">
              Omni<span className="text-[#818CF8]">Keyboard</span>
            </span>
            <span className="font-mono text-[10px] text-[#818CF8] block tracking-wider uppercase font-medium">
              Android IME
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavigateToSection(item.id)}
              className="px-4 py-2 rounded-lg font-sans text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all duration-200"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-mono">
            <Shield className="w-3.5 h-3.5" />
            <span>100% Offline & Private</span>
          </div>
          <button
            id="download-apk-btn-header"
            onClick={onDownloadClick}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#4F46E5] hover:bg-[#5a51ed] text-white font-sans font-bold text-sm shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span>Download APK</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#020617] border-b border-slate-800 p-5 flex flex-col gap-4 animate-fadeIn shadow-2xl">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  onNavigateToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg font-sans text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-all duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="h-px bg-slate-800 w-full my-1"></div>

          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
              <Shield className="w-4 h-4" />
              <span>Offline predicton enabled</span>
            </div>
          </div>

          <button
            id="mobile-download-apk-btn"
            onClick={() => {
              onDownloadClick();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-[#4F46E5] text-white font-sans font-bold text-sm shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Download APK</span>
          </button>
        </div>
      )}
    </header>
  );
}

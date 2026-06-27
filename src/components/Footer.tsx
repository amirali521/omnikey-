import React from 'react';
import { Keyboard, Github, Twitter, MessageSquare, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenModal: (type: 'privacy' | 'terms') => void;
}

export default function Footer({ onNavigateToSection, onOpenModal }: FooterProps) {
  return (
    <footer className="bg-[#020617] border-t border-slate-900 py-16 text-slate-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-slate-900">
          
          {/* Logo & Description */}
          <div className="md:col-span-5 flex flex-col items-start gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#818CF8] flex items-center justify-center">
                <Keyboard className="w-5 h-5 text-white" />
              </div>
              <span className="font-sans font-bold text-lg text-white">Omni<span className="text-[#818CF8]">Keyboard</span></span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
              Premium bilingual keyboard input method customizer for Android systems. Designed local predictions first to ensure zero trace telemetry data footprint.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 flex flex-col items-start gap-3 text-left">
            <span className="text-white text-xs font-mono font-bold uppercase tracking-wider">
              Sections
            </span>
            <div className="flex flex-col gap-2 text-xs">
              <button 
                onClick={() => onNavigateToSection('hero')} 
                className="text-left hover:text-white transition duration-150 focus:outline-none"
              >
                Top Hero
              </button>
              <button 
                onClick={() => onNavigateToSection('playground')} 
                className="text-left hover:text-white transition duration-150 focus:outline-none"
              >
                Sandbox Simulator
              </button>
              <button 
                onClick={() => onNavigateToSection('features')} 
                className="text-left hover:text-white transition duration-150 focus:outline-none"
              >
                Core Features
              </button>
              <button 
                onClick={() => onNavigateToSection('setup-guide')} 
                className="text-left hover:text-white transition duration-150 focus:outline-none"
              >
                Android Setup Guide
              </button>
            </div>
          </div>

          {/* Legal / Contact links */}
          <div className="md:col-span-4 flex flex-col items-start gap-4 text-left">
            <span className="text-white text-xs font-mono font-bold uppercase tracking-wider">
              Legal & Support
            </span>
            <div className="flex flex-col gap-2 text-xs">
              <button 
                onClick={() => onOpenModal('privacy')} 
                className="text-left hover:text-white text-[#818CF8] hover:underline font-semibold focus:outline-none"
              >
                Privacy Policy (Offline Promise)
              </button>
              <button 
                onClick={() => onOpenModal('terms')} 
                className="text-left hover:text-white transition duration-150 focus:outline-none"
              >
                Terms of Service
              </button>
              <a 
                href="mailto:developer@omnikeyboard.com" 
                className="hover:text-white transition duration-150"
              >
                Developer contact: developer@omnikeyboard.com
              </a>
            </div>

            {/* Social row */}
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                title="Discord Support"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p className="font-sans">
            © 2026 Omni Keyboard. Built with privacy and personalization at the core.
          </p>
          <div className="flex items-center gap-1">
            <span>Made for Android with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}

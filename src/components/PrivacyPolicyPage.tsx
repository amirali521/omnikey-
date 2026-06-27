import React from 'react';
import { ShieldCheck, ArrowLeft, Keyboard, Mail, CheckCircle, FileText, Lock, EyeOff } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function PrivacyPolicyPage({ onBackToHome, onNavigateToSection }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 selection:text-white">
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#4F46E5]/10 blur-[150px]"></div>
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-[#818CF8]/5 blur-[120px]"></div>
      </div>

      {/* Header bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-3 group focus:outline-none text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#818CF8] flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:scale-105 transition-transform duration-300">
              <Keyboard className="w-5.5 h-5.5 text-white" />
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-tight text-white block">
                Omni<span className="text-[#818CF8]">Keyboard</span>
              </span>
              <span className="font-mono text-[10px] text-[#818CF8] block tracking-wider uppercase font-medium">
                Android IME
              </span>
            </div>
          </button>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold tracking-wide transition duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Content area */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-left">
        <div className="space-y-12">
          
          {/* Main Title Banner */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Offline-First Promise Verified</span>
            </div>
            
            <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#818CF8]">Policy</span>
            </h1>
            
            <p className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Last updated: June 26, 2026. This policy establishes the strict local data collection rules enforced on the Omni Keyboard software.
            </p>
          </div>

          {/* Core values block cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0B1120] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#818CF8]">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-base text-white">No Tracking</h3>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Zero telemetry, zero cookies, zero device fingerprinting, and zero remote servers.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0B1120] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#818CF8]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-base text-white">Encrypted Local Storage</h3>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Custom dictionaries remain on your device in a private encrypted folder.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0B1120] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#818CF8]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-base text-white">100% Offline IME</h3>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Compiled without network permissions to guarantee system-level sandbox security.
              </p>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="prose prose-invert max-w-none space-y-8 bg-[#0B1120]/60 p-6 sm:p-10 border border-slate-800 rounded-3xl backdrop-blur-md">
            
            <div className="space-y-3">
              <h2 className="font-sans font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
                <span className="text-[#818CF8] font-mono font-medium">01.</span>
                <span>Zero Internet Transmission</span>
              </h2>
              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                Unlike standard default keyboards, Omni Keyboard is compiled <strong>without any network permission declarations</strong> (no <code>android.permission.INTERNET</code> is specified in the app's manifest file). This guarantees at the Android sandbox architecture level that no typing metrics, custom dictionary contents, or clipboard entries can ever be sent over the internet to our developers or third parties.
              </p>
            </div>

            <hr className="border-slate-800/80 my-6" />

            <div className="space-y-3">
              <h2 className="font-sans font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
                <span className="text-[#818CF8] font-mono font-medium">02.</span>
                <span>Local Storage Encryption</span>
              </h2>
              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                Custom dictionary words that you add or save while typing are compiled and stored within the application's secure private sandbox directory. This database remains encrypted and inaccessible to other applications installed on your mobile phone.
              </p>
            </div>

            <hr className="border-slate-800/80 my-6" />

            <div className="space-y-3">
              <h2 className="font-sans font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
                <span className="text-[#818CF8] font-mono font-medium">03.</span>
                <span>Clipboard Security</span>
              </h2>
              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                The integrated Clipboard Manager (Clip history tool) is stored entirely in temporary memory (volatile cache). This clipboard history is cleared automatically upon locking the device screen or after 15 minutes of inactivity to prevent accidental credential leakage.
              </p>
            </div>

            <hr className="border-slate-800/80 my-6" />

            <div className="space-y-3">
              <h2 className="font-sans font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
                <span className="text-[#818CF8] font-mono font-medium">04.</span>
                <span>Bilingual Predictions & AI Suggestion Processing</span>
              </h2>
              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                All bilingual word predictions and auto-suggestions are computed locally on your device's CPU/GPU using pre-compiled local language modules. No servers or remote AI API calls are used to compute predictions, assuring that your content is private and processed locally in real-time.
              </p>
            </div>

            <div className="p-4 sm:p-5 mt-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 font-semibold flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 shrink-0" />
              <span className="text-sm">We do not, and physically cannot, log, collect, or sell your keystrokes. This is our offline system promise.</span>
            </div>

          </div>

          {/* Help & Contact box */}
          <div className="p-6 bg-[#0B1120] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="font-sans font-bold text-base text-white flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-5 h-5 text-[#818CF8]" />
                <span>Need Additional Support or Audit?</span>
              </h3>
              <p className="font-sans text-xs text-slate-400">
                Contact our privacy compliance developer desk directly.
              </p>
            </div>
            <a 
              href="mailto:support@omnikeyboard.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white font-sans text-xs font-semibold tracking-wide transition duration-150"
            >
              <span>support@omnikeyboard.com</span>
            </a>
          </div>

          {/* Action Back To Home Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#5a51ed] text-white font-sans font-bold text-sm shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:scale-[1.03] transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Application Home</span>
            </button>
          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="bg-[#020617] border-t border-slate-900 py-12 text-slate-500 text-xs text-center relative z-10">
        <p>© 2026 Omni Keyboard. All rights reserved. Locally compiled open source project.</p>
      </footer>
    </div>
  );
}

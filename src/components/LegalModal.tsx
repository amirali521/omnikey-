import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'download' | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Dialog Content Container */}
      <div className="relative w-full max-w-2xl bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col animate-scaleUp">
        
        {/* Header bar */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            {type === 'privacy' && (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-sans font-bold text-white text-base sm:text-lg">Privacy Policy (Offline Promise)</span>
              </>
            )}
            {type === 'terms' && (
              <>
                <FileText className="w-5 h-5 text-[#818CF8]" />
                <span className="font-sans font-bold text-white text-base sm:text-lg">Terms of Service</span>
              </>
            )}
            {type === 'download' && (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-sans font-bold text-white text-base sm:text-lg">Download Omni Keyboard APK</span>
              </>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable contents */}
        <div className="p-6 overflow-y-auto space-y-4 text-left font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
          {type === 'privacy' && (
            <>
              <p className="font-bold text-slate-100">Last updated: June 26, 2026</p>
              <p>
                Your privacy is our absolute priority. The Omni Keyboard Input Method Editor (IME) is engineered with a strict <strong>offline-first</strong> design philosophy.
              </p>
              
              <h4 className="font-bold text-white text-sm pt-2">1. Zero Internet Transmission</h4>
              <p>
                Unlike standard default keyboards, Omni Keyboard is compiled <strong>without any network permission declarations</strong> (no <code>android.permission.INTERNET</code>). This guarantees at the system sandbox level that no typing metrics, custom dictionary contents, or clipboard entries can ever be sent over the internet to our developers or third parties.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">2. Local Storage Encryption</h4>
              <p>
                Custom dictionary words that you add or save while typing are compiled and stored within the application's secure private sandbox directory. This database remains encrypted and inaccessible to other applications installed on your mobile phone.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">3. Clipboard Security</h4>
              <p>
                The integrated Clipboard Manager (Clip history tool) is stored entirely in temporary memory (volatile cache). This clipboard history is cleared automatically upon locking the device screen or after 15 minutes of inactivity to prevent accidental credential leakage.
              </p>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-semibold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>We do not, and physically cannot, log, collect, or sell your keystrokes.</span>
              </div>
            </>
          )}

          {type === 'terms' && (
            <>
              <p className="font-bold text-slate-100">Last updated: June 26, 2026</p>
              <p>
                By using the Omni Keyboard software, you agree to these clear and direct terms.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">1. Open & Free License</h4>
              <p>
                Omni Keyboard is provided completely free of charge. You may use, install, and personalize the keyboard layouts for both personal and business purposes without licensing fees.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">2. Respecting System Resources</h4>
              <p>
                The software is designed to operate efficiently within Android's system limitations. You must not attempt to modify, reverse-engineer, or package the keyboard libraries with malicious keylogging scripts.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">3. Disclaimer of Warranty</h4>
              <p>
                Omni Keyboard is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY, either expressed or implied. We do not assume liability for custom words lost due to device resets or clear-cache procedures.
              </p>
            </>
          )}

          {type === 'download' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/20">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Your Download Has Initiated!</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  The production-ready standalone installation APK <strong>(v2.6 Stable — 17.8 MB)</strong> is downloading to your device container.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl max-w-md mx-auto text-left space-y-2">
                <span className="text-[10px] font-mono text-[#818CF8] uppercase font-bold tracking-wider block">
                  🚀 Next Steps to install:
                </span>
                <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1.5 pl-1">
                  <li>Open the downloaded <code>OmniKeyboard.apk</code>.</li>
                  <li>Enable "Allow from this source" if prompted by Android.</li>
                  <li>Follow the **Setup Guide** section below to configure!</li>
                </ol>
              </div>

              <button 
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-[#4F46E5] hover:bg-[#5a51ed] text-white font-sans font-bold text-xs shadow-lg transition"
              >
                Done, Got It!
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {type !== 'download' && (
          <div className="p-5 border-t border-slate-800 bg-slate-950/40 flex justify-end">
            <button 
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

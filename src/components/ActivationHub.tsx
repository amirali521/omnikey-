import React, { useState } from 'react';
import { 
  Settings, CheckCircle, Smartphone, Sliders, Globe, Image as ImageIcon, 
  ChevronRight, ToggleLeft, ToggleRight, Radio, RefreshCw 
} from 'lucide-react';

interface ActivationHubProps {
  onSuccessNotification: (message: string) => void;
}

export default function ActivationHub({ onSuccessNotification }: ActivationHubProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  
  // Interactive Step 1 Sandbox state
  const [omniToggled, setOmniToggled] = useState(false);
  
  // Interactive Step 2 Sandbox state
  const [selectedIME, setSelectedIME] = useState<'gboard' | 'omni' | null>(null);

  // Interactive Step 3 Sandbox state
  const [selectedSecLang, setSelectedSecLang] = useState<'Urdu' | 'Arabic' | 'Persian' | null>(null);
  const [customPhotoApplied, setCustomPhotoApplied] = useState(false);

  const stepsInfo = [
    {
      id: 1,
      title: "1. Enable Omni Keyboard",
      short: "Settings Setup",
      instruction: "Navigate to Android Settings ➜ Languages & Input ➜ On-screen Keyboard ➜ Manage Keyboards. Toggle on 'Omni Keyboard' to authorize local predictions."
    },
    {
      id: 2,
      title: "2. Select Active Input",
      short: "Choose IME",
      instruction: "Tap on any text input field to open your keyboard, pull down your notification tray, or click the keyboard switcher icon in the corner, and choose 'Omni Keyboard'."
    },
    {
      id: 3,
      title: "3. Choose Personalization",
      short: "Customize Setup",
      instruction: "Open the launcher dashboard, select your primary bilingual keyboard layout (such as Urdu or Arabic), and upload a gorgeous frosted glass wallpaper."
    }
  ];

  const handleToggleOmniInSettings = () => {
    const nextState = !omniToggled;
    setOmniToggled(nextState);
    if (nextState) {
      onSuccessNotification("🎉 Step 1 Complete: You've authorized Omni Keyboard in simulated Android settings!");
      // auto progress with slight delay
      setTimeout(() => setActiveStep(2), 1200);
    }
  };

  const handleSelectActiveIME = (ime: 'gboard' | 'omni') => {
    setSelectedIME(ime);
    if (ime === 'omni') {
      onSuccessNotification("🚀 Step 2 Complete: Omni Keyboard is now set as your primary system input method!");
      setTimeout(() => setActiveStep(3), 1200);
    }
  };

  return (
    <section id="setup-guide" className="py-24 bg-[#020617] border-t border-slate-800 relative">
      <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[600px] h-[300px] bg-[#4F46E5]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#818CF8] text-xs font-mono font-bold tracking-wider uppercase">
            Interactive Activation Hub
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            How to Activate on Android
          </h2>
          <p className="font-sans text-slate-400 text-sm leading-relaxed">
            Follow our clean interactive setup simulator below to configure the IME input settings and personalize your multilingual typing flow.
          </p>
        </div>

        {/* Core Stepper Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B1120] border border-slate-800 p-6 sm:p-8 rounded-3xl backdrop-blur-md">
          
          {/* LEFT: Stepper Switcher details (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Step selection list */}
            <div className="flex flex-col gap-3">
              {stepsInfo.map((step) => (
                <button
                  key={step.id}
                  id={`activation-step-tab-${step.id}`}
                  onClick={() => setActiveStep(step.id as any)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex gap-4 ${
                    activeStep === step.id
                      ? 'bg-slate-900 border-[#818CF8] shadow-md'
                      : 'bg-transparent border-slate-800/60 hover:bg-slate-900/40 hover:border-slate-800'
                  }`}
                >
                  {/* Number indicator */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-colors ${
                    activeStep === step.id
                      ? 'bg-[#4F46E5] text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-500'
                  }`}>
                    {step.id}
                  </div>
                  
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold block ${
                      activeStep === step.id ? 'text-[#818CF8]' : 'text-slate-500'
                    }`}>
                      {step.short}
                    </span>
                    <h3 className="font-sans font-bold text-sm sm:text-base text-white">
                      {step.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Instruction description detail box */}
            <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-800 text-left space-y-3">
              <span className="text-[#818CF8] font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                <span>Active Setup Instruction</span>
              </span>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {stepsInfo[activeStep - 1].instruction}
              </p>
            </div>

          </div>

          {/* RIGHT: Live Interactive Setting Simulator (Col span 7) */}
          <div className="lg:col-span-7 flex justify-center items-center">
            
            {/* Simulated Android Screen viewport */}
            <div className="relative w-[300px] h-[520px] bg-slate-950 rounded-[36px] p-3 border-4 border-slate-800 shadow-2xl flex flex-col justify-between select-none">
              
              {/* Inner screen glass accent */}
              <div className="absolute inset-[1px] border border-slate-800/60 rounded-[34px] pointer-events-none"></div>

              {/* Top Notch representation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-b-xl z-20"></div>

              {/* Simulated Screen Body */}
              <div className="w-full h-full bg-slate-900 rounded-[24px] overflow-hidden flex flex-col justify-between p-4 pt-6">
                
                {/* Simulated Android Status bar */}
                <div className="flex items-center justify-between border-b border-slate-800/50 pb-2 mb-3 text-[10px] font-mono text-slate-500">
                  <span>Omni-OS v14</span>
                  <div className="flex items-center gap-1">
                    <span>98%</span>
                    <div className="w-4 h-2 bg-slate-700 rounded-sm"></div>
                  </div>
                </div>

                {/* STEP 1 SCREEN INTERACTION: Manage Keyboards */}
                {activeStep === 1 && (
                  <div className="flex-1 flex flex-col gap-4 text-left animate-fadeIn">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-bold text-white">Manage Keyboards</span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {/* Gboard Row */}
                      <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between opacity-65">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">Gboard</span>
                          <span className="text-[9px] text-slate-500">Google Multilingual Input</span>
                        </div>
                        <ToggleRight className="w-7 h-7 text-[#818CF8] cursor-not-allowed" />
                      </div>

                      {/* Omni Keyboard Row */}
                      <div 
                        onClick={handleToggleOmniInSettings}
                        className={`p-3 border rounded-xl flex items-center justify-between transition cursor-pointer hover:border-[#818CF8]/40 ${
                          omniToggled 
                            ? 'bg-[#4F46E5]/10 border-[#818CF8] shadow-[0_0_15px_rgba(79,70,229,0.15)]' 
                            : 'bg-slate-950 border-slate-800/80'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className={`text-xs font-bold ${omniToggled ? 'text-[#818CF8]' : 'text-slate-300'}`}>
                            Omni Keyboard
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">Bilingual adaptive predictions</span>
                        </div>
                        {omniToggled ? (
                          <ToggleRight className="w-7 h-7 text-[#818CF8] transition-all scale-110" />
                        ) : (
                          <ToggleLeft className="w-7 h-7 text-slate-600 hover:text-slate-500 transition-all" />
                        )}
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500 italic text-center mt-auto">
                      💡 Click the Omni Keyboard toggle switch above to simulate authorizing it on your Android system!
                    </p>
                  </div>
                )}

                {/* STEP 2 SCREEN INTERACTION: Choose IME Keyboard Selector popup */}
                {activeStep === 2 && (
                  <div className="flex-1 flex flex-col gap-4 text-left animate-fadeIn justify-between">
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-400">Active Keyboard Switcher</span>
                      
                      <div className="bg-slate-950 p-4 border border-slate-800 rounded-2xl flex flex-col gap-3">
                        <span className="text-[10px] font-mono font-bold text-[#818CF8] uppercase tracking-wider block">
                          Select Input Method
                        </span>

                        {/* Gboard Option */}
                        <div 
                          onClick={() => handleSelectActiveIME('gboard')}
                          className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                            selectedIME === 'gboard' 
                              ? 'bg-slate-900 border-slate-700' 
                              : 'bg-slate-950 border-slate-900/50'
                          }`}
                        >
                          <span className="text-[11px] font-sans text-slate-300">Gboard (Standard)</span>
                          <input 
                            type="radio" 
                            checked={selectedIME === 'gboard'} 
                            onChange={() => {}}
                            className="w-3.5 h-3.5 accent-[#4F46E5]"
                          />
                        </div>

                        {/* Omni Keyboard Option */}
                        <div 
                          onClick={() => handleSelectActiveIME('omni')}
                          className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                            selectedIME === 'omni' 
                              ? 'bg-[#4F46E5]/10 border-[#818CF8]' 
                              : 'bg-slate-950 border-slate-900/50 hover:border-slate-800'
                          }`}
                        >
                          <span className={`text-[11px] font-sans font-bold ${
                            selectedIME === 'omni' ? 'text-[#818CF8]' : 'text-slate-300'
                          }`}>
                            Omni Keyboard
                          </span>
                          <input 
                            type="radio" 
                            checked={selectedIME === 'omni'} 
                            onChange={() => {}}
                            className="w-3.5 h-3.5 accent-[#4F46E5]"
                          />
                        </div>

                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500 italic text-center mt-auto">
                      💡 Choose the radio button for Omni Keyboard above to set it as your active typing keyboard!
                    </p>
                  </div>
                )}

                {/* STEP 3 SCREEN INTERACTION: App launcher layout options */}
                {activeStep === 3 && (
                  <div className="flex-1 flex flex-col gap-4 text-left animate-fadeIn">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
                      <Sliders className="w-4 h-4 text-[#818CF8]" />
                      <span>Omni Settings Companion</span>
                    </span>

                    <div className="flex flex-col gap-3">
                      {/* Bilingual Toggle option */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Set Secondary Layout:</span>
                        <div className="flex gap-1">
                          {['Urdu', 'Arabic', 'Persian'].map((langName) => (
                            <button
                              key={langName}
                              onClick={() => {
                                setSelectedSecLang(langName as any);
                                onSuccessNotification(`Selected ${langName} as your bilingual input!`);
                              }}
                              className={`flex-1 py-1.5 rounded text-[10px] font-semibold border transition ${
                                selectedSecLang === langName 
                                  ? 'bg-[#4F46E5]/15 border-[#818CF8] text-white' 
                                  : 'bg-slate-950 border-slate-800 text-slate-400'
                              }`}
                            >
                              {langName}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Photo Upload Wallpaper Toggle mockup */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Theme Personalization:</span>
                        <button
                          onClick={() => {
                            const state = !customPhotoApplied;
                            setCustomPhotoApplied(state);
                            onSuccessNotification(state ? "Applied custom photo wallpaper to mobile!" : "Reset background wallpaper!");
                          }}
                          className={`w-full p-3 rounded-xl border flex items-center justify-between transition ${
                            customPhotoApplied 
                              ? 'bg-emerald-950/15 border-emerald-500 text-white' 
                              : 'bg-slate-950 border-slate-850 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-[#818CF8]" />
                            <span className="text-[10px] font-semibold">Frosted Wallpaper</span>
                          </div>
                          <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${
                            customPhotoApplied ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-500'
                          }`}>
                            {customPhotoApplied ? 'ON' : 'OFF'}
                          </span>
                        </button>
                      </div>

                      {/* Success completion state banner */}
                      {selectedSecLang && customPhotoApplied && (
                        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center text-emerald-400 text-[10px] font-semibold animate-pulse">
                          ✨ Custom configuration is set up! Enjoy typing offline securely.
                        </div>
                      )}
                    </div>

                    <p className="text-[10px] text-slate-500 italic text-center mt-auto">
                      💡 Set your language and toggle the frosted glass wallpaper switch above to practice personalized customization!
                    </p>
                  </div>
                )}

                {/* Device Home Indicator representation */}
                <div className="w-20 h-1 bg-slate-700 rounded-full mx-auto mt-2"></div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { Download, Play, Shield, Sparkles, CheckCircle, Smartphone, ArrowRight } from 'lucide-react';

interface HeroProps {
  onDownloadClick: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Hero({ onDownloadClick, onNavigateToSection }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'en' | 'ur' | 'ar'>('en');
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const sentences = [
    { text: "Type beyond boundaries...", lang: "en" },
    { text: "امنی کیبورڈ: حدوں سے آگے لکھیں!", lang: "ur" },
    { text: "لوحة مفاتيح ذكية بلا حدود!", lang: "ar" }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentSentenceObj = sentences[loopNum % sentences.length];
    const fullText = currentSentenceObj.text;
    const currentLang = currentSentenceObj.lang as 'en' | 'ur' | 'ar';
    
    setActiveTab(currentLang);

    const handleTyping = () => {
      if (!isDeleting) {
        setTypingText(fullText.substring(0, typingText.length + 1));
        
        if (typingText === fullText) {
          // Pause at full text
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        setTypingText(fullText.substring(0, typingText.length - 1));
        
        if (typingText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          return;
        }
      }

      const typingSpeed = isDeleting ? 30 : 70;
      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, 100);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, loopNum]);

  // Keys to show in the hero mockup depending on active language
  const enKeys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']
  ];

  const urKeys = [
    ['ق', 'و', 'ع', 'ر', 'ت', 'ے', 'ء', 'ی', 'ہ', 'پ'],
    ['ا', 'س', 'د', 'ف', 'گ', 'ھ', 'ج', 'ک', 'ل'],
    ['⇧', 'ز', 'ش', 'چ', 'خ', 'ب', 'ن', 'م', '⌫']
  ];

  const arKeys = [
    ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'],
    ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك'],
    ['⇧', 'ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', '⌫']
  ];

  const getActiveKeys = () => {
    if (activeTab === 'ur') return urKeys;
    if (activeTab === 'ar') return arKeys;
    return enKeys;
  };

  const getActiveSuggestions = () => {
    if (activeTab === 'ur') return ['امنی', 'کیبورڈ', 'پاکستان', 'سلام', 'تحریر'];
    if (activeTab === 'ar') return ['مرحبا', 'كيف', 'لوحة', 'المفاتيح', 'العربية'];
    return ['omnikey', 'keyboard', 'beautiful', 'smart', 'typing'];
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen pt-32 pb-24 md:pb-32 overflow-hidden flex items-center bg-[#020617] text-slate-200"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#4F46E5]/10 blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-[#818CF8]/10 blur-[120px] pointer-events-none"></div>
        
        {/* Subtle decorative mesh grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 max-w-2xl">
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-inner">
              <Sparkles className="w-4 h-4 text-[#818CF8] animate-pulse" />
              <span className="font-mono text-xs font-semibold text-[#818CF8] tracking-wider uppercase">
                v2.6 Stable • Android 8.0+
              </span>
            </div>

            {/* Display Heading */}
            <h1 className="font-sans font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-tight mb-4 italic">
              Type Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#818CF8]">Boundaries.</span>
            </h1>

            {/* Subheading Description */}
            <p className="font-sans text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
              The ultimately customizable multi-language Android keyboard with smart local dictionaries, fancy Unicode styling, and premium frosted glass themes.
            </p>

            {/* Trust highlights */}
            <div className="grid grid-cols-2 gap-4 w-full pt-1">
              <div className="flex items-center gap-2.5 text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-sans text-sm font-medium">Privacy-First (Strictly Offline)</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-sans text-sm font-medium">Fancy Fonts & Unicode Styles</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-sans text-sm font-medium">Translucent Glass Themes</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-sans text-sm font-medium">Smart Adaptive Predictions</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <button
                id="download-apk-btn-hero"
                onClick={onDownloadClick}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#4F46E5] hover:bg-[#5a51ed] text-white font-sans font-bold text-base shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <span>Download APK</span>
              </button>
              
              <button
                id="view-setup-btn-hero"
                onClick={() => onNavigateToSection('setup-guide')}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-slate-750 bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white font-sans font-semibold text-base hover:scale-[1.02] transition-all duration-200"
              >
                <span>Setup Guide</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Right Mockup Column */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Glowing background halo around device */}
            <div className="absolute w-[340px] h-[340px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-5"></div>

            {/* Smart Phone Container */}
            <div 
              id="hero-phone-mockup"
              className="relative w-[320px] h-[640px] bg-slate-900 rounded-[44px] p-3.5 border-4 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] select-none animate-float"
            >
              {/* Inner phone border accent */}
              <div className="absolute inset-[1px] border border-slate-800/80 rounded-[42px] pointer-events-none"></div>

              {/* Dynamic Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-indigo-600"></div>
                </div>
                <div className="w-10 h-1 bg-slate-900 rounded-full ml-3"></div>
              </div>

              {/* Phone Display Screen */}
              <div className="relative w-full h-full bg-slate-950 rounded-[30px] overflow-hidden flex flex-col justify-between p-4 pt-10">
                
                {/* Chat Simulation Area */}
                <div className="flex-1 flex flex-col gap-3 py-2 overflow-y-auto">
                  {/* Partner Bubble */}
                  <div className="flex items-start gap-2 max-w-[85%] self-start animate-fadeIn">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <span className="text-[10px] font-bold text-indigo-400">AI</span>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl rounded-tl-none shadow-sm">
                      <p className="font-sans text-[11px] text-slate-300">
                        Hey there! Can you type in Urdu, English and Arabic on the go?
                      </p>
                    </div>
                  </div>

                  {/* My Simulated Typing Bubble */}
                  <div className="max-w-[85%] self-end flex flex-col items-end gap-1">
                    <div className="bg-[#4F46E5] p-3 rounded-2xl rounded-tr-none shadow-md shadow-indigo-900/20">
                      <p 
                        id="hero-typing-bubble"
                        className="font-sans text-xs text-white min-h-[16px] flex items-center"
                        dir={activeTab === 'en' ? 'ltr' : 'rtl'}
                      >
                        {typingText}
                        <span className="inline-block w-1 h-3.5 bg-white ml-0.5 animate-pulse"></span>
                      </p>
                    </div>
                    <span className="font-mono text-[9px] text-slate-500 mr-1 uppercase">
                      via OmniKeyboard • {activeTab === 'en' ? 'English' : activeTab === 'ur' ? 'Urdu' : 'Arabic'}
                    </span>
                  </div>
                </div>

                {/* Simulated Adaptive Keyboard Preview */}
                <div className="w-full bg-[#0B1120] border border-slate-800 rounded-2xl p-2 flex flex-col gap-1.5 shadow-2xl relative z-10 overflow-hidden">
                  
                  {/* Translucent glass wallpaper backdrop simulation */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#4F46E5]/10 to-[#818CF8]/10 -z-10"></div>
                  
                  {/* Top Bar suggestion row */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 mb-1">
                    <div className="flex gap-2 text-[10px] font-mono text-slate-400">
                      <span className="text-[#818CF8] font-bold uppercase">{activeTab} Layout</span>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-[8px] font-mono text-emerald-400 uppercase">A.I. Predictive</span>
                    </div>
                  </div>

                  {/* Words prediction bar */}
                  <div className="flex items-center justify-around gap-1.5 py-0.5 px-1 bg-slate-950/40 rounded-lg min-h-[22px]">
                    {getActiveSuggestions().map((word, i) => (
                      <span 
                        key={i} 
                        className={`text-[9px] font-sans px-1.5 py-0.5 rounded cursor-pointer transition ${
                          i === 0 
                            ? 'text-[#818CF8] font-semibold bg-[#818CF8]/10' 
                            : 'text-slate-400'
                        }`}
                      >
                        {word}
                      </span>
                    ))}
                  </div>

                  {/* Keyboard Alphabet Keys layout */}
                  <div className="flex flex-col gap-1 pt-1">
                    {getActiveKeys().map((row, rowIdx) => (
                      <div key={rowIdx} className="flex justify-center gap-1">
                        {row.map((key, keyIdx) => {
                          const isSpecial = key === '⇧' || key === '⌫';
                          return (
                            <span
                              key={keyIdx}
                              className={`flex items-center justify-center rounded text-[10px] shadow-sm select-none transition-all ${
                                isSpecial 
                                  ? 'bg-slate-800 text-[#818CF8] font-bold w-7 h-6 border border-slate-700' 
                                  : 'bg-slate-850 text-slate-200 hover:bg-slate-800 w-5.5 h-6 border border-slate-750'
                              }`}
                            >
                              {key}
                            </span>
                          );
                        })}
                      </div>
                    ))}

                    {/* Bottom Row space key */}
                    <div className="flex justify-center gap-1 mt-0.5">
                      <span className="flex items-center justify-center rounded bg-slate-800 text-slate-300 text-[9px] w-8 h-6 border border-slate-700">
                        ?123
                      </span>
                      <span className="flex items-center justify-center rounded bg-slate-800 text-slate-300 text-[9px] w-6 h-6 border border-slate-700">
                        🌐
                      </span>
                      <span className="flex-1 flex items-center justify-center rounded bg-slate-850 text-slate-400 text-[9px] h-6 font-mono font-medium tracking-wide border border-slate-750">
                        {activeTab === 'en' ? 'Space' : activeTab === 'ur' ? 'فاصلہ' : 'مسافة'}
                      </span>
                      <span className="flex items-center justify-center rounded bg-slate-850 text-slate-300 text-[9px] w-6 h-6 border border-slate-750">
                        .
                      </span>
                      <span className="flex items-center justify-center rounded bg-[#4F46E5] text-white text-[9px] font-bold w-10 h-6">
                        Enter
                      </span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

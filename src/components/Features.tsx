import React, { useState } from 'react';
import { 
  Cpu, Type, Sparkles, ShieldCheck, ArrowRight, Smartphone, Lock, EyeOff 
} from 'lucide-react';

export default function Features() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [unicodeDemoText, setUnicodeDemoText] = useState('OmniKey');
  const [activeThemePreview, setActiveThemePreview] = useState<'pink' | 'emerald' | 'gold'>('pink');

  const featuresList = [
    {
      icon: Cpu,
      title: "Smart Word Suggestions",
      description: "Responsive offline dictionaries that learn your unique typing style as you press keys or space. No active internet required; everything is stored locally.",
      badge: "Local AI Predictor",
      color: "from-indigo-500 to-cyan-500",
      glowColor: "rgba(99,102,241,0.15)",
      renderDemo: () => (
        <div className="mt-4 p-3.5 bg-slate-900 rounded-xl border border-slate-800/80 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>PREDICTIVE DICTIONARY</span>
            <span className="text-cyan-400">99.4% ACCURACY</span>
          </div>
          <div className="flex gap-2 justify-center">
            {["omn", "omni", "omnikeyboard", "omnipotent"].map((word, idx) => (
              <span 
                key={idx} 
                className={`text-[10px] font-sans px-2.5 py-1 rounded-md transition-all duration-300 ${
                  idx === 1 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 scale-105 font-bold' 
                    : 'bg-slate-950 text-slate-500'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      icon: Type,
      title: "Fancy Unicode Fonts",
      description: "Turn regular text into bold, italic, or aesthetic gothic and cursive styles instantly. Compatible across social apps like WhatsApp, Instagram, and Telegram.",
      badge: "Cross-App Fonts",
      color: "from-purple-500 to-pink-500",
      glowColor: "rgba(168,85,247,0.15)",
      renderDemo: () => (
        <div className="mt-4 p-3.5 bg-slate-900 rounded-xl border border-slate-800/80 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <input 
              type="text" 
              value={unicodeDemoText}
              onChange={(e) => setUnicodeDemoText(e.target.value.slice(0, 15))}
              className="bg-slate-950 border border-slate-800/80 rounded px-2 py-1 text-[11px] text-indigo-300 focus:outline-none w-24"
              title="Input Text"
            />
            <span className="text-[9px] font-mono text-pink-400 font-bold uppercase">Live Preview</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <div className="bg-slate-950 p-1.5 rounded text-[10px] font-bold text-slate-300">
              𝖡𝗈𝗅𝖽: <span className="text-white">𝐐𝐮𝐢𝐜𝐤</span>
            </div>
            <div className="bg-slate-950 p-1.5 rounded text-[10px] text-slate-300">
              𝘚𝘤𝘳𝘪𝘱𝘵: <span className="text-white">𝒬𝓊𝒾𝒸𝓀</span>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Sparkles,
      title: "Glassy & Cosmic Themes",
      description: "Immersive layout styling. Support for rich gradient wallpapers, neon borders, and frosted glass themes with translucent custom backgrounds.",
      badge: "Ultra-Personalized",
      color: "from-pink-500 to-amber-500",
      glowColor: "rgba(236,72,153,0.15)",
      renderDemo: () => (
        <div className="mt-4 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex flex-col gap-2.5 relative overflow-hidden">
          {/* Glass theme preview representation */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${
            activeThemePreview === 'pink' 
              ? 'from-purple-950/40 to-pink-950/40' 
              : activeThemePreview === 'emerald'
              ? 'from-emerald-950/40 to-indigo-950/40'
              : 'from-amber-950/40 to-orange-950/40'
          } -z-10 transition-all duration-300`}></div>
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans text-slate-300 font-medium">Themes Preview</span>
            <div className="flex gap-1">
              {['pink', 'emerald', 'gold'].map((themeName) => (
                <button
                  key={themeName}
                  onClick={() => setActiveThemePreview(themeName as any)}
                  className={`w-3 h-3 rounded-full border transition-all ${
                    themeName === 'pink' ? 'bg-pink-500' : themeName === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'
                  } ${activeThemePreview === themeName ? 'scale-125 border-white' : 'border-transparent opacity-60'}`}
                  title={`${themeName} preview`}
                />
              ))}
            </div>
          </div>

          <div className="backdrop-blur-md bg-slate-950/60 border border-white/10 p-2 rounded-lg flex justify-around gap-1">
            {[1, 2, 3, 4].map(key => (
              <span key={key} className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                A
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      icon: ShieldCheck,
      title: "Privacy-First Offline Design",
      description: "No remote databases, no logging, and zero telemetry analytics. All word prediction database updates happen safely and locally on your phone storage.",
      badge: "Zero Key-Logging",
      color: "from-emerald-500 to-indigo-500",
      glowColor: "rgba(16,185,129,0.15)",
      renderDemo: () => (
        <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800/80 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Local Security Shield</span>
          </div>
          <div className="flex flex-col gap-1 text-[10px] text-slate-400 font-sans">
            <div className="flex justify-between border-b border-slate-950 pb-1">
              <span>Internet Authorization:</span>
              <span className="text-red-400 font-bold">DISABLED (0%)</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span>Keystroke Database:</span>
              <span className="text-emerald-400 font-bold">LOCAL ENCRYPTED</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#020617] relative overflow-hidden border-t border-slate-900">
      
      {/* Visual background pattern */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#4F46E5]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl text-left space-y-3">
            <span className="text-[#818CF8] text-xs font-mono font-bold tracking-wider uppercase">
              Engineered with Precision
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Premium Capabilities <br />
              Without Compromises.
            </h2>
          </div>
          <p className="font-sans text-slate-400 max-w-md text-left text-sm leading-relaxed md:mb-1">
            Omni Keyboard delivers the visual customization of modern desktop workspaces, combined with high-performance local AI layout tools on Android.
          </p>
        </div>

        {/* Features Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresList.map((feature, i) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredCard === i;

            return (
              <div
                key={i}
                id={`feature-card-${i}`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  boxShadow: isHovered ? `0 10px 30px -5px ${feature.glowColor}` : 'none'
                }}
                className={`relative bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                  isHovered 
                    ? 'border-[#818CF8] bg-slate-900 shadow-2xl shadow-[#4F46E5]/5' 
                    : 'border-slate-800'
                }`}
              >
                {/* Decorative colored glow bar at the top */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${feature.color}`}></div>

                <div className="space-y-4">
                  
                  {/* Icon & Badge Container */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-inner">
                      <IconComponent className="w-5 h-5 text-[#818CF8]" />
                    </div>
                    <span className="text-[10px] font-mono bg-slate-950 border border-slate-800/60 px-2 py-0.5 rounded-full text-slate-400 uppercase font-semibold">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 text-left">
                    <h3 className="font-sans font-bold text-base text-white">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>

                </div>

                {/* Simulated interactive live demo container */}
                {feature.renderDemo && feature.renderDemo()}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

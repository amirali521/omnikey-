import React, { useState, useRef, useEffect } from 'react';
import { 
  Keyboard as KeyboardIcon, Globe, Palette, Image as ImageIcon, 
  Sparkles, Check, Copy, Clipboard, RotateCcw, Upload, FileImage, 
  Volume2, VolumeX, Eye, ArrowUp, CornerDownLeft, Space
} from 'lucide-react';
import { 
  LanguageType, ThemeType, WallpaperType, WORD_LISTS, DEFAULT_SUGGESTIONS 
} from '../types';
import { convertToUnicode } from '../utils/unicode';

interface PlaygroundProps {
  onSuccessNotification: (message: string) => void;
}

export default function Playground({ onSuccessNotification }: PlaygroundProps) {
  // Simulator State
  const [inputText, setInputText] = useState('');
  const [activeLanguage, setActiveLanguage] = useState<LanguageType>('en');
  const [theme, setTheme] = useState<ThemeType>('carbon');
  const [wallpaper, setWallpaper] = useState<WallpaperType>('solid');
  const [customWallpaperUrl, setCustomWallpaperUrl] = useState<string | null>(null);
  const [unicodeStyle, setUnicodeStyle] = useState<'normal' | 'bold' | 'italic' | 'cursive' | 'gothic'>('normal');
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activePressedKey, setActivePressedKey] = useState<string | null>(null);
  const [clipboardHistory, setClipboardHistory] = useState<string[]>([
    "Omni Keyboard is amazing! 🚀",
    "Type Beyond Boundaries. 🌐"
  ]);
  const [showClipboardView, setShowClipboardView] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play click sound using Web Audio API (creates a retro typing click!)
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Simple click synth: short high-pass/band-pass noise click or double beep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      // Audio not supported or blocked
    }
  };

  // Keyboard layout definitions
  const layouts: Record<LanguageType, string[][]> = {
    en: [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']
    ],
    ur: [
      ['ق', 'و', 'ع', 'ر', 'ت', 'ے', 'ء', 'ی', 'ہ', 'پ'],
      ['ا', 'س', 'د', 'ف', 'گ', 'ھ', 'ج', 'ک', 'ل'],
      ['⇧', 'ز', 'ش', 'چ', 'خ', 'ب', 'ن', 'م', '⌫']
    ],
    ar: [
      ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'],
      ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك'],
      ['⇧', 'ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', '⌫']
    ],
    fa: [
      ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'],
      ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک'],
      ['⇧', 'پ', 'چ', 'ژ', 'گ', 'ر', 'ذ', 'د', 'و', '⌫']
    ]
  };

  // Extract the last word to perform predictions
  const getLastWord = (text: string) => {
    const tokens = text.split(/\s+/);
    return tokens[tokens.length - 1] || '';
  };

  // Dynamic Word Suggestions logic
  const getSuggestions = () => {
    const lastWord = getLastWord(inputText).toLowerCase();
    
    // Example list as requested in prompt: 
    // ["suggest", "suggestion", "keyboard", "omnikey", "beautiful", "technology", "development", "interface", "application"]
    const baseList = activeLanguage === 'en' 
      ? ["suggest", "suggestion", "keyboard", "omnikey", "beautiful", "technology", "development", "interface", "application", ...WORD_LISTS.en]
      : WORD_LISTS[activeLanguage];

    if (!lastWord) {
      return DEFAULT_SUGGESTIONS[activeLanguage];
    }

    // Filter list based on characters typed
    const filtered = baseList.filter(word => 
      word.toLowerCase().startsWith(lastWord) && word.toLowerCase() !== lastWord
    );

    // fallback to contains if startsWith is empty
    if (filtered.length === 0) {
      const containsFilter = baseList.filter(word => 
        word.toLowerCase().includes(lastWord) && word.toLowerCase() !== lastWord
      );
      return containsFilter.slice(0, 5);
    }

    return filtered.slice(0, 5);
  };

  // Handle Virtual Key Presses
  const handleKeyPress = (key: string) => {
    playClickSound();
    setActivePressedKey(key);
    setTimeout(() => setActivePressedKey(null), 150);

    if (key === '⌫') {
      setInputText(prev => prev.slice(0, -1));
    } else if (key === '⇧') {
      setIsShiftActive(!isShiftActive);
    } else if (key === 'Space' || key === ' ') {
      setInputText(prev => prev + ' ');
    } else if (key === 'Enter') {
      setInputText(prev => prev + '\n');
    } else {
      let charToAppend = key;
      if (activeLanguage === 'en') {
        charToAppend = isShiftActive ? key.toUpperCase() : key.toLowerCase();
      }
      setInputText(prev => prev + charToAppend);
      // turn off shift after typing letter
      if (isShiftActive) setIsShiftActive(false);
    }
  };

  // Apply Word Suggestion Completion
  const selectSuggestion = (suggestion: string) => {
    playClickSound();
    const words = inputText.split(/\s+/);
    words.pop(); // remove last typed fragment
    const newText = [...words, suggestion].join(' ') + ' ';
    setInputText(newText);
  };

  // Copy simulated text to actual device clipboard
  const handleCopyText = () => {
    const formatted = convertToUnicode(inputText, unicodeStyle);
    navigator.clipboard.writeText(formatted || inputText);
    
    // Add to simulated clip history
    if (formatted && !clipboardHistory.includes(formatted)) {
      setClipboardHistory(prev => [formatted, ...prev.slice(0, 4)]);
    }

    onSuccessNotification('✨ Coordinated text copied to device clipboard successfully!');
  };

  // Clipboard Manager integration (allows clicking and pasting)
  const handlePasteFromHistory = (text: string) => {
    playClickSound();
    setInputText(prev => prev + text);
    setShowClipboardView(false);
  };

  const handleCustomWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomWallpaperUrl(url);
      setWallpaper('custom');
      onSuccessNotification('📸 Custom keyboard wallpaper applied successfully!');
    }
  };

  // Trigger file dialog
  const triggerWallpaperUpload = () => {
    fileInputRef.current?.click();
  };

  // Style Class Mapping for Keyboard Aesthetics
  const themeStyles = {
    carbon: {
      wrapper: 'bg-[#0B1120] border-slate-800 text-slate-100',
      key: 'bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-white border-slate-700 shadow-slate-900/50',
      specialKey: 'bg-slate-800 text-[#818CF8] hover:bg-slate-700 border-slate-700',
      suggestionBar: 'bg-slate-950/40 border-slate-800/80',
      suggestionWord: 'text-[#818CF8] hover:text-white hover:bg-slate-800/50',
      highlightBorder: 'border-slate-800 shadow-[0_4px_30px_rgba(79,70,229,0.15)]',
      spaceKey: 'bg-[#818CF8]/10 text-[#818CF8] border-[#818CF8]/30 hover:bg-[#818CF8]/20',
      enterKey: 'bg-[#4F46E5] text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:opacity-90'
    },
    gold: {
      wrapper: 'bg-zinc-900 border-amber-900/40 text-amber-100',
      key: 'bg-zinc-950/90 hover:bg-zinc-800/80 active:bg-amber-950/50 text-amber-200 border-zinc-950 shadow-black',
      specialKey: 'bg-zinc-800/90 text-amber-500 hover:bg-amber-950/30 border-zinc-800',
      suggestionBar: 'bg-zinc-950/40 border-amber-900/20',
      suggestionWord: 'text-amber-300 hover:text-white hover:bg-amber-950/40',
      highlightBorder: 'border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      spaceKey: 'bg-zinc-950/90 text-amber-400 border-zinc-950 hover:bg-zinc-900/80',
      enterKey: 'bg-[#4F46E5] text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:opacity-90'
    },
    cosmic: {
      wrapper: 'bg-indigo-950/90 border-purple-800/40 text-purple-100',
      key: 'bg-slate-950/70 hover:bg-indigo-900/40 active:bg-purple-900/50 text-purple-200 border-purple-950/30 shadow-indigo-950/40',
      specialKey: 'bg-indigo-900/40 text-pink-400 hover:bg-purple-950/50 border-purple-900/30',
      suggestionBar: 'bg-slate-950/40 border-purple-950/50',
      suggestionWord: 'text-purple-300 hover:text-white hover:bg-indigo-950/60',
      highlightBorder: 'border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.25)]',
      spaceKey: 'bg-slate-950/80 text-purple-400 border-purple-950/20 hover:bg-slate-900/80',
      enterKey: 'bg-[#4F46E5] text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:opacity-90'
    }
  };

  const currentStyle = themeStyles[theme];

  // Map Wallpaper Background properties
  const getWallpaperStyle = () => {
    if (wallpaper === 'cosmic_purple') {
      return {
        backgroundImage: 'linear-gradient(135deg, #1e1b4b 0%, #311042 50%, #090514 100%)',
        backgroundSize: 'cover'
      };
    }
    if (wallpaper === 'custom' && customWallpaperUrl) {
      return {
        backgroundImage: `url(${customWallpaperUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    return {};
  };

  return (
    <section 
      id="playground" 
      className="py-24 bg-[#020617] relative border-t border-slate-800/80 overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-[#818CF8]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-[#4F46E5]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4F46E5]/10 rounded-full border border-[#818CF8]/20 text-[#818CF8] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Sandbox Simulator</span>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Try Omni Keyboard Live
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed">
            Test the physical layout mechanics, smart local word dictionary completions, and real-time custom decorative glass aesthetics directly from your browser!
          </p>
        </div>

        {/* Dashboard Grid Controller */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Customizer Settings (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#0B1120] border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
            
            <h3 className="font-sans font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#818CF8]" />
              <span>Keyboard Customizer</span>
            </h3>

            {/* 1. Choose Secondary Language */}
            <div className="space-y-2.5">
              <label className="font-sans text-xs font-bold text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#818CF8]" />
                <span>1. Choose Active Layout Language</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'English (US)', id: 'en' },
                  { name: 'Urdu (اردو)', id: 'ur' },
                  { name: 'Arabic (العربية)', id: 'ar' },
                  { name: 'Persian (فارسی)', id: 'fa' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    id={`customizer-lang-${lang.id}`}
                    onClick={() => {
                      setActiveLanguage(lang.id as LanguageType);
                      setInputText(''); // reset text to match language demo
                    }}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-medium font-sans flex items-center justify-between transition ${
                      activeLanguage === lang.id
                        ? 'bg-[#4F46E5]/10 border-[#818CF8] text-white'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <span>{lang.name}</span>
                    {activeLanguage === lang.id && <Check className="w-3.5 h-3.5 text-[#818CF8]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Keyboard Aesthetics */}
            <div className="space-y-2.5">
              <label className="font-sans text-xs font-bold text-slate-300 flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#818CF8]" />
                <span>2. Keyboard Base Theme Aesthetics</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Carbon Dark', id: 'carbon', color: 'bg-slate-900' },
                  { name: 'Golden Luxury', id: 'gold', color: 'bg-zinc-800 border-amber-500' },
                  { name: 'Cosmic Neon', id: 'cosmic', color: 'bg-indigo-950 border-purple-500' }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`customizer-theme-${item.id}`}
                    onClick={() => setTheme(item.id as ThemeType)}
                    className={`px-2.5 py-2 rounded-lg border text-[11px] font-sans font-medium flex flex-col items-center gap-1.5 transition ${
                      theme === item.id
                        ? 'border-[#818CF8] text-white bg-[#4F46E5]/10'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${item.color} border border-slate-700/50 shadow-inner`}></div>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Wallpaper Background Selector */}
            <div className="space-y-2.5">
              <label className="font-sans text-xs font-bold text-slate-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#818CF8]" />
                <span>3. Keyboard Background Wallpaper</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="wp-solid"
                  onClick={() => setWallpaper('solid')}
                  className={`px-3 py-2 rounded-lg border text-[11px] font-sans font-medium transition ${
                    wallpaper === 'solid'
                      ? 'border-[#818CF8] text-white bg-[#4F46E5]/10'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400'
                  }`}
                >
                  Solid Color
                </button>
                <button
                  id="wp-cosmic"
                  onClick={() => setWallpaper('cosmic_purple')}
                  className={`px-3 py-2 rounded-lg border text-[11px] font-sans font-medium transition ${
                    wallpaper === 'cosmic_purple'
                      ? 'border-[#818CF8] text-white bg-[#4F46E5]/10'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400'
                  }`}
                >
                  Cosmic Purple 🌌
                </button>
                <button
                  id="wp-custom"
                  onClick={() => {
                    if (customWallpaperUrl) {
                      setWallpaper('custom');
                    } else {
                      triggerWallpaperUpload();
                    }
                  }}
                  className={`px-3 py-2 rounded-lg border text-[11px] font-sans font-medium transition ${
                    wallpaper === 'custom'
                      ? 'border-[#818CF8] text-white bg-[#4F46E5]/10'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {customWallpaperUrl ? 'Custom Image' : 'Upload Photo 📸'}
                </button>
              </div>

              {/* Hidden file input for custom photo upload */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleCustomWallpaperUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Upload drag drop helper area if custom wallpaper is active or has custom link */}
              {customWallpaperUrl && (
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileImage className="w-4 h-4 text-[#818CF8] shrink-0" />
                    <span className="text-[10px] text-slate-400 truncate">Custom Wallpaper Loaded</span>
                  </div>
                  <button 
                    onClick={triggerWallpaperUpload}
                    className="text-[10px] text-[#818CF8] hover:text-[#939cf5] font-bold underline"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            {/* 4. Sound & Feedback */}
            <div className="space-y-2.5">
              <label className="font-sans text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Sound Feedback Settings</span>
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="text-[10px] text-[#818CF8] hover:text-[#939cf5] font-bold flex items-center gap-1"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{soundEnabled ? "Sound Enabled" : "Sound Muted"}</span>
                </button>
              </label>
              <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed font-sans">
                💡 Clicking the virtual keyboard keys outputs an authentic haptic audio trigger. Go ahead, type a message!
              </div>
            </div>

          </div>

          {/* RIGHT: Live Sandbox and Simulator (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Real-time Translated Preview Canvas */}
            <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
              
              {/* Box Top Header */}
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wide">
                    Live Sandbox Screen
                  </span>
                </div>
                
                {/* Reset button */}
                <button
                  id="reset-sandbox-text"
                  onClick={() => {
                    setInputText('');
                    onSuccessNotification('Cleared sandbox input field!');
                  }}
                  className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition"
                  title="Reset Simulator Output"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Text display screen */}
              <div className="min-h-[120px] bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 relative flex flex-col justify-between">
                
                {/* Simulated message input box */}
                <div className="w-full">
                  {inputText ? (
                    <p 
                      id="simulated-text-box"
                      className="font-sans text-lg text-white leading-relaxed whitespace-pre-wrap select-text break-words"
                      dir={activeLanguage === 'en' ? 'ltr' : 'rtl'}
                    >
                      {convertToUnicode(inputText, unicodeStyle)}
                    </p>
                  ) : (
                    <span className="font-sans text-slate-500 text-sm italic">
                      {activeLanguage === 'en' 
                        ? 'Click the keys on the virtual keyboard below to test prediction & styling...' 
                        : activeLanguage === 'ur' 
                        ? 'کیبورڈ کے بٹن دبا کر اردو کی بورڈ کا جادو دیکھیں...' 
                        : activeLanguage === 'fa'
                        ? 'برای تست پیش‌بینی و قالب‌بندی روی کلیدها کلیک کنید...'
                        : 'انقر فوق المفاتيح لتجربة التنبؤ والتنسيق باللغة العربية...'}
                    </span>
                  )}
                </div>

                {/* Info and helper badge row */}
                <div className="flex items-center justify-between border-t border-slate-800/50 pt-2.5 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-[#818CF8]/10 text-[#818CF8] px-2 py-0.5 rounded uppercase">
                      {activeLanguage} Layout
                    </span>
                    <span className="font-mono text-[10px] bg-[#4F46E5]/10 text-[#818CF8] px-2 py-0.5 rounded uppercase">
                      Fonts: {unicodeStyle}
                    </span>
                  </div>

                  {inputText && (
                    <button
                      id="sandbox-copy-text"
                      onClick={handleCopyText}
                      className="flex items-center gap-1.5 text-xs text-[#818CF8] hover:text-[#939cf5] hover:underline font-semibold font-sans"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Special Unicode Styles controls right inside the sandbox wrapper */}
              <div className="space-y-2">
                <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  ✍️ Special Unicode Font Transformer
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'normal', label: 'Normal (abc)', preview: 'abc' },
                    { id: 'bold', label: 'Bold (abc)', preview: '𝐚𝐛𝐜' },
                    { id: 'italic', label: 'Italic (abc)', preview: '𝘢𝘣𝘤' },
                    { id: 'cursive', label: 'Cursive (abc)', preview: '𝒶𝓅𝒸' },
                    { id: 'gothic', label: 'Gothic (abc)', preview: '𝔞𝔟𝔠' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      id={`unicode-btn-${style.id}`}
                      onClick={() => setUnicodeStyle(style.id as any)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-sans font-medium transition flex items-center gap-1 ${
                        unicodeStyle === style.id
                          ? 'bg-[#4F46E5] border-[#818CF8] text-white shadow-lg shadow-indigo-950/40'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="font-semibold">{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* HIGH FIDELITY VIRTUAL KEYBOARD SIMULATOR */}
            <div 
              id="virtual-keyboard-simulator"
              style={getWallpaperStyle()}
              className={`relative border-2 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 overflow-hidden transition-all duration-300 ${
                currentStyle.wrapper
              } ${currentStyle.highlightBorder}`}
            >
              
              {/* Frosted overlay if wallpaper is custom or cosmic purple */}
              {wallpaper !== 'solid' && (
                <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[6px] -z-10 pointer-events-none"></div>
              )}

              {/* Keyboard Top Status and Action Row */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-1.5 z-10 relative">
                <div className="flex items-center gap-2">
                  <KeyboardIcon className="w-4 h-4 text-[#818CF8]" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-300">
                    OmniKey - {activeLanguage === 'en' ? 'English' : activeLanguage === 'ur' ? 'Urdu' : activeLanguage === 'ar' ? 'Arabic' : 'Persian'}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setShowClipboardView(!showClipboardView)}
                    className={`px-2 py-1 rounded text-[10px] font-sans flex items-center gap-1 border transition ${
                      showClipboardView 
                        ? 'bg-[#4F46E5]/20 border-[#818CF8] text-[#818CF8] font-bold' 
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Clipboard className="w-3 h-3" />
                    <span>Clip ({clipboardHistory.length})</span>
                  </button>
                  <button 
                    onClick={() => setInputText('')}
                    className="px-2 py-1 rounded text-[10px] font-sans bg-slate-950/40 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Clipboard Manager Panel Overlay */}
              {showClipboardView && (
                <div className="p-3 bg-slate-950/95 border border-slate-800 rounded-xl mb-2 flex flex-col gap-2 max-h-[140px] overflow-y-auto z-20 relative animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                      Saved Clipboard Clipboard History
                    </span>
                    <button 
                      onClick={() => setShowClipboardView(false)}
                      className="text-[10px] text-slate-500 hover:text-white"
                    >
                      Close [x]
                    </button>
                  </div>
                  {clipboardHistory.length === 0 ? (
                    <span className="text-[10px] text-slate-600 italic">No copied items found.</span>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {clipboardHistory.map((clip, i) => (
                        <button
                          key={i}
                          onClick={() => handlePasteFromHistory(clip)}
                          className="text-left text-[11px] text-slate-300 bg-slate-900 hover:bg-slate-800/80 p-2 rounded border border-slate-800 hover:border-[#818CF8]/50 transition truncate w-full"
                        >
                          {clip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Live A.I. Word Prediction Bar */}
              <div className={`flex items-center justify-around gap-1.5 py-1 px-1.5 rounded-xl min-h-[34px] transition ${
                currentStyle.suggestionBar
              }`}>
                {getSuggestions().length === 0 ? (
                  <span className="text-[10px] text-slate-500 italic font-sans">
                    Type characters to see smart prediction...
                  </span>
                ) : (
                  getSuggestions().map((word, i) => (
                    <button
                      key={i}
                      onClick={() => selectSuggestion(word)}
                      className={`text-xs font-sans font-medium px-2.5 py-1 rounded-lg transition duration-150 ${
                        currentStyle.suggestionWord
                      }`}
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>

              {/* Virtual Keyboard Keys Rows */}
              <div className="flex flex-col gap-1.5 pt-1.5 relative z-10" dir="ltr">
                {layouts[activeLanguage].map((row, rowIdx) => (
                  <div key={rowIdx} className="flex justify-center gap-1 sm:gap-1.5">
                    {row.map((key, keyIdx) => {
                      const isSpecial = key === '⇧' || key === '⌫';
                      const isPressed = activePressedKey === key;
                      
                      return (
                        <button
                          key={keyIdx}
                          id={`vkey-${activeLanguage}-${rowIdx}-${keyIdx}`}
                          onClick={() => handleKeyPress(key)}
                          className={`flex items-center justify-center rounded-lg font-sans text-sm font-semibold select-none transition-all duration-75 active:scale-95 ${
                            isSpecial 
                              ? `w-11 sm:w-14 h-11 border-b-2 shadow-sm ${currentStyle.specialKey}` 
                              : `flex-1 h-11 border-b-2 shadow-sm ${currentStyle.key}`
                          } ${isPressed ? 'scale-95 bg-[#4F46E5]/40 border-[#818CF8] text-white' : ''}`}
                        >
                          {key === '⇧' && isShiftActive ? <ArrowUp className="w-4 h-4 text-[#818CF8] font-extrabold" /> : key}
                        </button>
                      );
                    })}
                  </div>
                ))}

                {/* Bottom function key row */}
                <div className="flex justify-center gap-1.5 mt-0.5">
                  <button
                    id="vkey-symbols"
                    onClick={() => {
                      playClickSound();
                      onSuccessNotification("Symbols layout is coming soon! Using modern predictive layouts.");
                    }}
                    className={`w-12 sm:w-16 h-11 rounded-lg text-xs font-semibold ${currentStyle.specialKey}`}
                  >
                    ?123
                  </button>
                  
                  {/* Language switch globe */}
                  <button
                    id="vkey-lang-switch"
                    onClick={() => {
                      playClickSound();
                      const order: LanguageType[] = ['en', 'ur', 'ar', 'fa'];
                      const nextIdx = (order.indexOf(activeLanguage) + 1) % order.length;
                      setActiveLanguage(order[nextIdx]);
                    }}
                    className={`w-10 sm:w-12 h-11 rounded-lg flex items-center justify-center ${currentStyle.specialKey}`}
                    title="Toggle Layout Language"
                  >
                    <Globe className="w-4.5 h-4.5" />
                  </button>

                  {/* Space key */}
                  <button
                    id="vkey-space"
                    onClick={() => handleKeyPress(' ')}
                    className={`flex-1 h-11 rounded-lg text-xs font-semibold shadow-sm border-b-2 ${currentStyle.spaceKey}`}
                  >
                    {activeLanguage === 'en' ? 'Space' : activeLanguage === 'ur' ? 'فاصلہ' : activeLanguage === 'fa' ? 'فاصله' : 'مسافة'}
                  </button>

                  <button
                    id="vkey-period"
                    onClick={() => handleKeyPress('.')}
                    className={`w-10 h-11 rounded-lg text-sm font-semibold border-b-2 shadow-sm ${currentStyle.key}`}
                  >
                    .
                  </button>

                  <button
                    id="vkey-enter"
                    onClick={() => handleKeyPress('Enter')}
                    className={`w-14 sm:w-20 h-11 rounded-lg text-xs font-bold flex items-center justify-center border-b-2 ${currentStyle.enterKey}`}
                  >
                    <CornerDownLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

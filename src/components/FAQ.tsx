import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, MessageSquare, ExternalLink } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      question: "Does Omni Keyboard collect my typing data or passwords?",
      answer: "Absolutely not. Omni Keyboard is built with privacy at the core. The application operates entirely offline (requiring no internet permissions on Android) and stores all custom dictionary additions on your local device. No keystrokes are logged, tracked, or sent to cloud servers."
    },
    {
      question: "How do I change my custom background wallpaper?",
      answer: "Open the Omni Keyboard companion app dashboard on your phone. Tap on the 'Theme Aesthetics' menu, select 'Custom background photo wallpaper', and upload any image from your gallery. You can then configure the level of background frost blur and key transparency."
    },
    {
      question: "Are the extra emojis, fancy fonts, and unicode styles free?",
      answer: "Yes, fully available out-of-the-box! There are no paid expansions, subscription fees, or hidden paywalls. You get complete access to standard emojis, customizable cursive, bold, and italic unicode text font styles immediately."
    },
    {
      question: "Does it support predictive dictionaries for other languages?",
      answer: "Currently, Omni Keyboard has native offline prediction libraries for English (US/UK), Urdu (اردو), Arabic (العربية), and Persian (فارسی). We are actively training local dictionary maps for Spanish, French, and Hindi which will launch in our next stable patch."
    },
    {
      question: "How lightweight is the application APK?",
      answer: "Omni Keyboard is optimized to run smoothly on devices with low RAM. The complete offline package — including the full Urdu and Arabic predictive dictionaries and all font libraries — is under 18 MB in total."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#020617] relative border-t border-slate-900 overflow-hidden">
      <div className="absolute right-10 bottom-10 w-[300px] h-[300px] bg-[#818CF8]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#818CF8] text-xs font-mono font-bold tracking-wider uppercase">
            Have Questions?
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-slate-400 text-sm text-center">
            Here are the details about our architecture, offline privacy database design, and visual personalization.
          </p>
        </div>

        {/* Collapsible Accordions */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                id={`faq-item-${index}`}
                className={`bg-slate-900 rounded-xl border transition-all duration-300 ${
                  isOpen 
                    ? 'border-[#818CF8] bg-slate-900 shadow-[0_4px_20px_rgba(79,70,229,0.05)]' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header Switch */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-sans font-bold text-sm sm:text-base text-white focus:outline-none"
                >
                  <span className="pr-4">{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#818CF8] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-5 pb-5 animate-slideDown">
                    <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout Box */}
        <div className="mt-16 p-6 bg-[#0B1120] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-sans font-bold text-base text-white flex items-center justify-center sm:justify-start gap-2">
              <MessageSquare className="w-5 h-5 text-[#818CF8]" />
              <span>Need Additional Support?</span>
            </h3>
            <p className="font-sans text-xs text-slate-400">
              Can't find what you're looking for? Reach out directly to our developers at any time.
            </p>
          </div>
          
          <a
            id="support-contact-link"
            href="mailto:support@omnikeyboard.com"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white font-sans text-xs font-semibold tracking-wide transition duration-150"
          >
            <Mail className="w-4 h-4 text-[#818CF8]" />
            <span>Developer Support Contact</span>
          </a>
        </div>

      </div>
    </section>
  );
}

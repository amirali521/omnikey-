export type LanguageType = 'en' | 'ur' | 'ar' | 'fa';

export type ThemeType = 'carbon' | 'gold' | 'cosmic';

export type WallpaperType = 'solid' | 'cosmic_purple' | 'custom';

export interface KeyboardState {
  inputText: string;
  activeLanguage: LanguageType;
  theme: ThemeType;
  wallpaper: WallpaperType;
  customWallpaperUrl: string | null;
  unicodeStyle: 'normal' | 'bold' | 'italic' | 'cursive' | 'gothic';
  isShiftActive: boolean;
  isSymbolsActive: boolean;
}

export const WORD_LISTS: Record<LanguageType, string[]> = {
  en: [
    "omnikey", "keyboard", "beautiful", "technology", "smart", "typing", 
    "private", "aesthetic", "custom", "premium", "android", "language", "offline",
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at"
  ],
  ur: [
    "امنی", "کیبورڈ", "سلام", "کیسے", "خوبصورت", "ٹیکنالوجی", "اردو", "موبائل", 
    "پاکستان", "تحریر", "معلومات", "سادہ", "پیارا", "دوست", "طریقہ", "ترتیب"
  ],
  ar: [
    "مرحبا", "كيف", "لوحة", "المفاتيح", "جميل", "تقنية", "العربية", "هاتف", 
    "أمن", "كتابة", "سرية", "سهل", "صديق", "مرحبا_بكم", "طريقة", "شاشة"
  ],
  fa: [
    "سلام", "چطور", "صفحه", "کلید", "زیبا", "تکنولوژی", "فارسی", "گوشی", 
    "امنیت", "نوشتن", "خصوصی", "ساده", "دوست", "کاربر", "برنامه", "تنظیمات"
  ]
};

export const DEFAULT_SUGGESTIONS: Record<LanguageType, string[]> = {
  en: ["omni", "keyboard", "the", "be", "to", "of"],
  ur: ["امنی", "کیبورڈ", "سلام", "اور", "ہے", "کیا"],
  ar: ["لوحة", "مرحبا", "هذا", "من", "في", "إلى"],
  fa: ["صفحه", "سلام", "این", "از", "در", "به"]
};

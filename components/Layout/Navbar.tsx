
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Menu, X, Globe, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface NavbarProps {
  logoUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ logoUrl }) => {
  const { t, toggleLanguage, language, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const MotionAny = motion as any;

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'news', href: '#news' },
    { key: 'prices', href: '#prices' },
    { key: 'library', href: '#library' },
  ];

  return (
    <nav className="glass-nav sticky top-0 z-[60] border-b border-gray-100 font-cairo shadow-sm" dir={dir}>
      <div className="container mx-auto px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
        {/* Brand */}
        <a 
          href="#home" 
          className="flex items-center gap-3 md:gap-4 group"
        >
          <div className="p-2 md:p-3 bg-primary rounded-xl md:rounded-2xl shadow-lg shadow-primary/20 transform group-hover:rotate-12 transition-all duration-500 flex items-center justify-center min-w-[44px] min-h-[44px] md:min-w-[52px] md:min-h-[52px]">
             {logoUrl ? (
               <img src={logoUrl} alt="Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain brightness-0 invert" />
             ) : (
               <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
             )}
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-black text-primary tracking-tight leading-none mb-1">
              {t('brandName')}
            </span>
            <span className="text-[9px] md:text-[10px] font-black text-accent uppercase tracking-[0.15em] opacity-80 leading-none">
              Consumer Protection Agency • Taiz
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className={`hidden xl:flex items-center gap-6 ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.key}>
                <a 
                  href={link.href} 
                  className="text-dark/70 font-black hover:text-primary transition-all relative group text-sm uppercase tracking-wide"
                >
                  {t(link.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-accent rounded-full transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          
          <div className={`flex items-center gap-4 ${dir === 'rtl' ? 'pe-4 border-e' : 'ps-4 border-s'} border-gray-200`}>
             <a 
              href="#report" 
              className="bg-accent text-white px-6 py-2.5 rounded-xl font-black shadow-lg shadow-accent/20 hover:bg-accent-dark hover:-translate-y-0.5 transition-all text-sm"
            >
              {t('report')}
            </a>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-primary font-black hover:bg-primary/5 px-3 py-2 rounded-xl transition-all text-sm border border-primary/10"
            >
              <Globe size={16} className="text-accent" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <a href="#admin" className="p-2.5 bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
               <User size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden p-2.5 bg-gray-50 rounded-xl text-primary border border-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <MotionAny
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden bg-white/98 backdrop-blur-2xl border-t border-gray-100 absolute w-full left-0 shadow-2xl z-50 p-6 space-y-6"
          >
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a 
                    href={link.href} 
                    className="block text-xl font-black text-dark hover:text-primary transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
              <a 
                href="#report" 
                className="block text-center bg-accent text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-accent/20"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('report')}
              </a>
              <button 
                onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                className="w-full flex justify-center items-center gap-3 bg-primary/5 text-primary py-4 rounded-2xl font-black text-base border border-primary/5"
              >
                <Globe size={20} className="text-accent" />
                {language === 'ar' ? 'English Version' : 'النسخة العربية'}
              </button>
            </div>
          </MotionAny>
        )}
      </AnimatePresence>
    </nav>
  );
};

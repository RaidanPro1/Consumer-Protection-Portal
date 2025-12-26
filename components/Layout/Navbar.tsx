
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Menu, X, Globe, User, AlertCircle } from 'lucide-react';
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
      <div className="container mx-auto px-4 md:px-8 py-2 md:py-3 flex justify-between items-center">
        {/* Brand */}
        <a 
          href="#home" 
          className="flex items-center gap-2 md:gap-4 group"
        >
          <div className="p-1.5 md:p-3 bg-primary rounded-xl md:rounded-2xl shadow-lg shadow-primary/20 transform group-hover:rotate-12 transition-all duration-500 flex items-center justify-center min-w-[38px] min-h-[38px] md:min-w-[52px] md:min-h-[52px]">
             {logoUrl ? (
               <img src={logoUrl} alt="Logo" className="w-5 h-5 md:w-8 md:h-8 object-contain brightness-0 invert" />
             ) : (
               <Shield className="w-5 h-5 md:w-8 md:h-8 text-white" />
             )}
          </div>
          <div className="flex flex-col">
            <span className="text-base md:text-2xl font-black text-primary tracking-tight leading-none mb-0.5 md:mb-1">
              {t('brandName')}
            </span>
            <span className="text-[8px] md:text-[10px] font-black text-secondary uppercase tracking-[0.1em] md:tracking-[0.15em] opacity-80 leading-none">
              Consumer Protection Agency • Taiz
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className={`hidden xl:flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
          <ul className="flex items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.key}>
                <a 
                  href={link.href} 
                  className="text-primary/70 font-black hover:text-secondary transition-all relative group text-xs md:text-sm uppercase tracking-wide"
                >
                  {t(link.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          
          <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'pe-3 border-e' : 'ps-3 border-s'} border-gray-200`}>
             <MotionAny.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["0px 0px 0px rgba(194, 65, 12, 0)", "0px 0px 15px rgba(194, 65, 12, 0.4)", "0px 0px 0px rgba(194, 65, 12, 0)"] }}
              transition={{ repeat: Infinity, duration: 2 }}
              href="#report" 
              className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl font-black shadow-lg hover:bg-accent-dark transition-all text-xs"
            >
              <AlertCircle size={14} className="animate-pulse" />
              {t('report')}
            </MotionAny.a>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-primary font-black hover:bg-primary/5 px-2 py-1.5 rounded-xl transition-all text-xs border border-primary/10"
            >
              <Globe size={14} className="text-secondary" />
              <span>{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            <a href="#admin" className="p-2 bg-gray-50 text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
               <User size={16} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden p-2 bg-gray-50 rounded-xl text-primary border border-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <MotionAny.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden bg-white/98 backdrop-blur-2xl border-t border-gray-100 absolute w-full left-0 shadow-2xl z-50 p-4 space-y-4"
          >
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a 
                    href={link.href} 
                    className="block text-lg font-black text-primary hover:text-secondary transition-all p-2 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <a 
                href="#report" 
                className="block text-center bg-accent text-white py-4 rounded-xl font-black text-base shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('report')}
              </a>
              <button 
                onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                className="w-full flex justify-center items-center gap-2 bg-primary/5 text-primary py-3 rounded-xl font-black text-sm border border-primary/5"
              >
                <Globe size={18} className="text-secondary" />
                {language === 'ar' ? 'English Version' : 'النسخة العربية'}
              </button>
            </div>
          </MotionAny.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Menu, X, Globe, ChevronDown } from 'lucide-react';
// Import AnimatePresence from framer-motion
import { AnimatePresence } from 'framer-motion';

interface NavbarProps {
  logoUrl?: string;
}

// Update component to accept NavbarProps and destructure logoUrl
export const Navbar: React.FC<NavbarProps> = ({ logoUrl }) => {
  const { t, toggleLanguage, language, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'news', href: '#news' },
    { key: 'prices', href: '#prices' },
    { key: 'library', href: '#library' },
  ];

  return (
    <nav className="glass-nav sticky top-0 z-[60] border-b border-gray-100 font-cairo" dir={dir}>
      <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <a href="#home" className="flex items-center gap-4 group">
          <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20 transform group-hover:rotate-12 transition-transform flex items-center justify-center min-w-[48px] min-h-[48px]">
             {logoUrl ? (
               <img src={logoUrl} alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
             ) : (
               <Shield className="w-8 h-8 text-white" />
             )}
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-primary tracking-tight">{t('brandName')}</span>
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest opacity-80">Consumer Protection Taiz</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.key}>
                <a 
                  href={link.href} 
                  className="text-dark font-black hover:text-primary transition-colors relative group text-sm uppercase tracking-wide"
                >
                  {t(link.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-accent rounded-full transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-6 ps-6 border-s border-gray-100">
             <a 
              href="#report" 
              className="bg-accent text-white px-8 py-3 rounded-full font-black shadow-xl shadow-accent/20 hover:bg-accent-dark hover:-translate-y-1 transition-all text-sm"
            >
              {t('report')}
            </a>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-3 text-primary font-black hover:bg-primary/5 px-4 py-2 rounded-xl transition-all text-sm"
            >
              <Globe size={18} />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden p-3 bg-gray-50 rounded-2xl text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="xl:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full left-0 shadow-2xl z-50 p-8 space-y-8">
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a 
                    href={link.href} 
                    className="block text-2xl font-black text-dark hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 pt-8 border-t border-gray-100">
              <a 
                href="#report" 
                className="block text-center bg-accent text-white py-4 rounded-2xl font-black text-xl shadow-xl shadow-accent/20"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('report')}
              </a>
              <button 
                onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                className="w-full flex justify-center items-center gap-3 bg-primary/5 text-primary py-4 rounded-2xl font-black text-lg"
              >
                <Globe size={20} />
                {language === 'ar' ? 'English Version' : 'النسخة العربية'}
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

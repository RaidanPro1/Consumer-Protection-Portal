
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    titleKey: 'heroTitle1',
    subKey: 'heroSub1',
    accent: 'border-accent'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    titleKey: 'news_title',
    subKey: 'heroSub1',
    accent: 'border-secondary'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Extract language from useLanguage context
  const { t, dir, language } = useLanguage();
  const motionAny = motion as any;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <div className="relative h-[95vh] w-full overflow-hidden bg-primary-dark" id="home">
      <AnimatePresence mode='wait'>
        <motionAny.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {/* Parallax Ken Burns Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motionAny.div 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms]"
              style={{ backgroundImage: `url(${SLIDES[currentIndex].image})` }}
            />
            {/* Layers of Overlays for Premium Look */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          </div>

          {/* Main Content with Parallax Text Motion */}
          <div className="relative z-10 h-full container mx-auto px-6 md:px-16 flex items-center">
            <div className="max-w-4xl">
              <motionAny.div
                initial={{ opacity: 0, x: dir === 'rtl' ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 1, type: "spring" }}
                className={`inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border-l-4 ${SLIDES[currentIndex].accent} text-white font-bold text-sm mb-8 tracking-wide shadow-2xl`}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span className="uppercase tracking-[0.2em]">{language === 'ar' ? 'نظام الحماية الذكي' : 'SMART PROTECTION SYSTEM'}</span>
              </motionAny.div>

              <motionAny.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.05] drop-shadow-2xl"
              >
                {t(SLIDES[currentIndex].titleKey)}
              </motionAny.h1>
              
              <motionAny.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-200 mb-12 font-medium leading-relaxed max-w-2xl opacity-90"
              >
                {t(SLIDES[currentIndex].subKey)}
              </motionAny.p>
              
              <motionAny.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex gap-6 flex-wrap"
              >
                <a 
                  href="#report"
                  className="group relative flex items-center gap-4 bg-accent text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-accent/40 hover:bg-accent-dark transition-all transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10">{t('cta_report')}</span>
                  <ArrowUpRight className="relative z-10 group-hover:rotate-45 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                <a 
                  href="#prices"
                  className="px-12 py-5 rounded-2xl font-black text-xl text-white bg-white/10 border border-white/30 backdrop-blur-md hover:bg-white hover:text-primary transition-all shadow-xl"
                >
                  {t('cta_prices')}
                </a>
              </motionAny.div>
            </div>
          </div>
        </motionAny.div>
      </AnimatePresence>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-12 left-12 md:left-24 flex gap-6 z-30">
        <button 
          onClick={prevSlide}
          className="group w-16 h-16 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-accent hover:border-accent transition-all duration-300"
        >
          <ChevronRight size={32} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={next}
          className="group w-16 h-16 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-accent hover:border-accent transition-all duration-300"
        >
          <ChevronLeft size={32} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-12 right-12 md:right-24 flex gap-2 z-30">
        {SLIDES.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-12 bg-accent' : 'w-4 bg-white/30'}`}
          />
        ))}
      </div>

      {/* Grounding line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent shadow-[0_-5px_20px_rgba(255,255,255,0.2)]" />
    </div>
  );
};

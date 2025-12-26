
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    titleKey: 'heroTitle1',
    subKey: 'heroSub1',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    titleKey: 'news_title',
    subKey: 'heroSub1',
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, dir } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-primary-dark" id="home">
      <AnimatePresence mode='wait'>
        {/* Fix: Using motionAny.div to bypass type issues */}
        <motionAny.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Parallax-like effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[currentIndex].image})` }}
          >
            {/* Multi-layered overlay for depth */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24">
            <div className="max-w-3xl text-start">
              {/* Fix: Using motionAny.div */}
              <motionAny.div
                initial={{ x: dir === 'rtl' ? 50 : -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent font-bold text-sm mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                رؤية جديدة لحماية المستهلك
              </motionAny.div>

              {/* Fix: Using motionAny.h1 */}
              <motionAny.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]"
              >
                {t(SLIDES[currentIndex].titleKey)}
              </motionAny.h1>
              
              {/* Fix: Using motionAny.p */}
              <motionAny.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-200 mb-10 font-medium leading-relaxed max-w-2xl"
              >
                {t(SLIDES[currentIndex].subKey)}
              </motionAny.p>
              
              {/* Fix: Using motionAny.div */}
              <motionAny.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex gap-4 flex-wrap"
              >
                <a 
                  href="#report"
                  className="group flex items-center gap-3 bg-accent text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-accent/20 hover:bg-accent-dark hover:-translate-y-1 transition-all"
                >
                  {t('cta_report')}
                  <ChevronLeft className={`transition-transform group-hover:-translate-x-1 ${dir === 'ltr' ? 'rotate-180' : ''}`} />
                </a>
                <a 
                  href="#prices"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-white hover:text-primary transition-all"
                >
                  {t('cta_prices')}
                </a>
              </motionAny.div>
            </div>
          </div>
        </motionAny.div>
      </AnimatePresence>

      {/* Slide Navigation */}
      <div className="absolute bottom-12 right-12 md:right-24 flex gap-4 z-20">
        <button 
          onClick={() => setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
          className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-accent hover:border-accent transition-all"
        >
          <ChevronRight size={24} />
        </button>
        <button 
          onClick={() => setCurrentIndex((prev) => (prev + 1) % SLIDES.length)}
          className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-accent hover:border-accent transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Decoration */}
      <div className="absolute -bottom-1 left-0 w-full h-24 bg-gradient-to-t from-light to-transparent z-10" />
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight, ChevronLeft, ArrowUpRight, PlayCircle } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    titleAr: 'استقرار الأسعار.. مسؤوليتنا جميعاً',
    titleEn: 'Price Stability is Our Responsibility',
    subAr: 'نعمل في ميدان تعز لنضمن وصول السلع إليك بالسعر العادل والجودة المطلوبة.',
    subEn: 'We work in Taiz to ensure fair prices and quality products for everyone.',
    accent: 'from-accent/20 to-transparent'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    titleAr: 'الرقابة الذكية لمستقبل أفضل',
    titleEn: 'Smart Monitoring for a Better Future',
    subAr: 'تكنولوجيا حديثة في خدمة المواطن لتعزيز الشفافية في الأسواق المحلية.',
    subEn: 'Modern technology serving citizens to enhance transparency in local markets.',
    accent: 'from-secondary/20 to-transparent'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, dir, language } = useLanguage();
  const MotionAny = motion as any;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <div className="relative h-[75vh] md:h-[90vh] w-full overflow-hidden bg-primary" id="home">
      <AnimatePresence mode='wait'>
        <MotionAny.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* Ken Burns Parallax Effect */}
            <MotionAny.div 
              initial={{ scale: 1.2, x: 20 }}
              animate={{ scale: 1.05, x: 0 }}
              transition={{ duration: 12, ease: "linear" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${SLIDES[currentIndex].image})` }}
            />
            {/* Optimized High-Contrast Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className={`absolute inset-0 bg-gradient-to-b ${SLIDES[currentIndex].accent} opacity-30`} />
          </div>

          <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex items-center">
            <div className="max-w-4xl">
              <MotionAny.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-[10px] md:text-xs mb-8 uppercase tracking-widest"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                </span>
                {language === 'ar' ? 'نظام الحماية والرقابة الذكية' : 'SMART MONITORING SYSTEM'}
              </MotionAny.div>

              <MotionAny.h1 
                initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] drop-shadow-xl"
              >
                {language === 'ar' ? SLIDES[currentIndex].titleAr : SLIDES[currentIndex].titleEn}
              </MotionAny.h1>
              
              <MotionAny.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-lg md:text-2xl text-gray-100 mb-10 font-medium leading-relaxed max-w-3xl drop-shadow-md"
              >
                {language === 'ar' ? SLIDES[currentIndex].subAr : SLIDES[currentIndex].subEn}
              </MotionAny.p>
              
              <MotionAny.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex gap-4 md:gap-8 flex-wrap"
              >
                <a 
                  href="#report"
                  className="group relative flex items-center gap-3 bg-accent hover:bg-accent-dark text-white px-10 py-4 md:px-12 md:py-5 rounded-2xl font-black text-lg md:text-xl shadow-2xl shadow-accent/40 transition-all active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">{t('cta_report')}</span>
                  <ArrowUpRight size={24} className="relative z-10 group-hover:rotate-45 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="#prices"
                  className="flex items-center gap-3 px-10 py-4 md:px-12 md:py-5 rounded-2xl font-black text-lg md:text-xl text-white bg-white/10 border border-white/30 backdrop-blur-lg hover:bg-white hover:text-primary transition-all active:scale-95"
                >
                  <PlayCircle size={24} className="opacity-70" />
                  {t('cta_prices')}
                </a>
              </MotionAny.div>
            </div>
          </div>
        </MotionAny.div>
      </AnimatePresence>

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all duration-500 rounded-full ${currentIndex === idx ? 'w-12 bg-accent' : 'w-4 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className={`absolute bottom-10 ${dir === 'rtl' ? 'left-8 md:left-12' : 'right-8 md:right-12'} flex items-center gap-4 z-30`}>
        <div className="flex gap-3">
          <button onClick={prevSlide} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center backdrop-blur-xl hover:bg-accent hover:border-accent transition-all">
            <ChevronRight size={24} />
          </button>
          <button onClick={next} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center backdrop-blur-xl hover:bg-accent hover:border-accent transition-all">
            <ChevronLeft size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};


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
    accent: 'border-accent'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    titleAr: 'الرقابة الذكية لمستقبل أفضل',
    titleEn: 'Smart Monitoring for a Better Future',
    subAr: 'تكنولوجيا حديثة في خدمة المواطن لتعزيز الشفافية في الأسواق المحلية.',
    subEn: 'Modern technology serving citizens to enhance transparency in local markets.',
    accent: 'border-secondary'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, dir, language } = useLanguage();
  const MotionAny = motion as any;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-primary-dark" id="home">
      <AnimatePresence mode='wait'>
        <MotionAny.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 overflow-hidden">
            <MotionAny.div 
              initial={{ scale: 1.15, x: -10, y: -10 }}
              animate={{ scale: 1, x: 0, y: 0 }}
              transition={{ duration: 10, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${SLIDES[currentIndex].image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex items-center">
            <div className="max-w-4xl">
              <MotionAny.div
                initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-[10px] md:text-xs mb-6"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </div>
                <span className="uppercase tracking-[0.2em]">{language === 'ar' ? 'نظام الحماية الذكي' : 'SMART PROTECTION'}</span>
              </MotionAny.div>

              <MotionAny.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-[1.1]"
              >
                {language === 'ar' ? SLIDES[currentIndex].titleAr : SLIDES[currentIndex].titleEn}
              </MotionAny.h1>
              
              <MotionAny.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-base md:text-xl text-gray-200 mb-8 md:mb-10 font-medium leading-relaxed max-w-2xl opacity-90"
              >
                {language === 'ar' ? SLIDES[currentIndex].subAr : SLIDES[currentIndex].subEn}
              </MotionAny.p>
              
              <MotionAny.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex gap-4 md:gap-6 flex-wrap"
              >
                <a 
                  href="#report"
                  className="group flex items-center gap-3 bg-accent text-white px-8 py-3.5 md:px-10 md:py-4 rounded-2xl font-black text-lg md:text-xl shadow-xl shadow-accent/20 hover:bg-accent-dark transition-all"
                >
                  <span>{t('cta_report')}</span>
                  <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                </a>
                <a 
                  href="#prices"
                  className="flex items-center gap-3 px-8 py-3.5 md:px-10 md:py-4 rounded-2xl font-black text-lg md:text-xl text-white bg-white/5 border border-white/20 backdrop-blur-md hover:bg-white hover:text-primary transition-all"
                >
                  <PlayCircle size={20} className="opacity-60" />
                  {t('cta_prices')}
                </a>
              </MotionAny.div>
            </div>
          </div>
        </MotionAny.div>
      </AnimatePresence>

      <div className={`absolute bottom-10 ${dir === 'rtl' ? 'left-8 md:left-12' : 'right-8 md:right-12'} flex items-center gap-4 md:gap-6 z-30`}>
        <div className="flex gap-2">
          <button onClick={prevSlide} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center backdrop-blur-xl hover:bg-accent transition-all">
            <ChevronRight size={20} />
          </button>
          <button onClick={next} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center backdrop-blur-xl hover:bg-accent transition-all">
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';

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
  const motionAny = motion as any;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
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
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Parallax Ken Burns Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motionAny.div 
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${SLIDES[currentIndex].image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-60" />
          </div>

          <div className="relative z-10 h-full container mx-auto px-6 md:px-16 flex items-center">
            <div className="max-w-4xl">
              <motionAny.div
                initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className={`inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border-l-4 ${SLIDES[currentIndex].accent} text-white font-bold text-sm mb-8 tracking-wide`}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span className="uppercase tracking-[0.2em]">{language === 'ar' ? 'نظام الحماية الذكي' : 'SMART PROTECTION SYSTEM'}</span>
              </motionAny.div>

              <motionAny.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] drop-shadow-2xl"
              >
                {language === 'ar' ? SLIDES[currentIndex].titleAr : SLIDES[currentIndex].titleEn}
              </motionAny.h1>
              
              <motionAny.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-200 mb-12 font-medium leading-relaxed max-w-2xl opacity-90"
              >
                {language === 'ar' ? SLIDES[currentIndex].subAr : SLIDES[currentIndex].subEn}
              </motionAny.p>
              
              <motionAny.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="flex gap-6 flex-wrap"
              >
                <a 
                  href="#report"
                  className="group relative flex items-center gap-4 bg-accent text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-accent/40 hover:bg-accent-dark transition-all transform hover:-translate-y-1"
                >
                  <span>{t('cta_report')}</span>
                  <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
                </a>
                <a 
                  href="#prices"
                  className="px-10 py-5 rounded-2xl font-black text-xl text-white bg-white/10 border border-white/30 backdrop-blur-md hover:bg-white hover:text-primary transition-all shadow-xl"
                >
                  {t('cta_prices')}
                </a>
              

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export const NewsTicker: React.FC = () => {
  const { t, dir } = useLanguage();
  const MotionAny = motion as any;

  // Split ticker text to add distinct separators if needed
  const tickerItems = [
    t('tickerText'),
    "•",
    t('tickerText'),
    "•"
  ];

  return (
    <div className="bg-primary text-white py-5 overflow-hidden relative z-40 border-b border-accent/20 shadow-xl">
      <div className="flex whitespace-nowrap">
        <MotionAny.div
          className="inline-block"
          animate={{ x: dir === 'rtl' ? ['-100%', '0%'] : ['0%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          <div className="flex items-center gap-12 px-12">
            {[1, 2, 3, 4].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-2xl font-black tracking-tight text-white/95">
                  {t('tickerText')}
                </span>
                <span className="text-accent font-black text-3xl opacity-50">•</span>
              </React.Fragment>
            ))}
          </div>
        </MotionAny.div>
        
        {/* Duplicate for seamless loop */}
        <MotionAny.div
          className="inline-block"
          animate={{ x: dir === 'rtl' ? ['-100%', '0%'] : ['0%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          <div className="flex items-center gap-12 px-12">
            {[1, 2, 3, 4].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-2xl font-black tracking-tight text-white/95">
                  {t('tickerText')}
                </span>
                <span className="text-accent font-black text-3xl opacity-50">•</span>
              </React.Fragment>
            ))}
          </div>
        </MotionAny.div>
      </div>
      
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
    </div>
  );
};

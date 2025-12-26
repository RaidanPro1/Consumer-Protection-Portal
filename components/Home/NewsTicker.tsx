
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export const NewsTicker: React.FC = () => {
  const { t, dir } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  return (
    <div className="bg-primary text-white py-3 overflow-hidden relative z-40 border-b border-secondary">
      <div className="flex whitespace-nowrap">
        {/* Fix: Using motionAny.div */}
        <motionAny.div
          className="inline-block"
          animate={{ x: dir === 'rtl' ? ['-100%', '100%'] : ['100%', '-100%'] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          <span className="text-lg font-bold px-4">
            {t('tickerText')}
          </span>
        </motionAny.div>
      </div>
    </div>
  );
};

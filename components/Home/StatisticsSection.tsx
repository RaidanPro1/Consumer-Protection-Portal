
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SiteStatistics } from '../../types';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, Users } from 'lucide-react';

interface StatisticsSectionProps {
  stats: SiteStatistics;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats }) => {
  const { t } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  const items = [
    { label: t('total_reports'), value: stats.totalReports, icon: FileText, color: 'text-primary', bg: 'bg-primary/5' },
    { label: t('verified_reports'), value: stats.verifiedDiscrepancies, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: t('active_violations'), value: stats.activeViolations, icon: AlertTriangle, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  return (
    <section className="py-20 bg-primary-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item, i) => (
            /* Fix: Using motionAny.div */
            <motionAny.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-10 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 group"
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:rotate-12 transition-transform duration-500">
                <item.icon size={36} className={item.color} strokeWidth={2} />
              </div>
              {/* Fix: Using motionAny.div */}
              <motionAny.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-5xl font-black text-white mb-2 tracking-tighter tabular-nums"
              >
                {item.value.toLocaleString()}
              </motionAny.div>
              <span className="text-gray-300 font-bold text-center text-lg">{item.label}</span>
            </motionAny.div>
          ))}
        </div>
      </div>
    </section>
  );
};

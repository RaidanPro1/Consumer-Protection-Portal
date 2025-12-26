
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SiteStatistics } from '../../types';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface StatisticsSectionProps {
  stats: SiteStatistics;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats }) => {
  const { t } = useLanguage();
  const motionAny = motion as any;

  const items = [
    { label: t('total_reports'), value: stats.totalReports, icon: FileText, color: 'text-primary' },
    { label: t('verified_reports'), value: stats.verifiedDiscrepancies, icon: CheckCircle, color: 'text-green-600' },
    { label: t('active_violations'), value: stats.activeViolations, icon: AlertTriangle, color: 'text-accent' },
  ];

  return (
    <section className="py-12 bg-primary-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motionAny.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <item.icon size={28} className={item.color} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-4xl font-black text-white tabular-nums">
                  {item.value.toLocaleString()}
                </span>
                <span className="text-xs md:text-sm text-gray-300 font-bold uppercase tracking-wider">{item.label}</span>
              </div>
            </motionAny.div>
          ))}
        </div>
      </div>
    </section>
  );
};

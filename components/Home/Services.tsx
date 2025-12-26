
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SERVICES_DATA } from '../../constants';
import { Search, Scale, Megaphone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: any = {
  search: Search,
  balance: Scale,
  bullhorn: Megaphone
};

export const Services: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const motionAny = motion as any;

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-light relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-3 leading-tight">
              {t('services_title')}
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
              نقدم مجموعة متكاملة من الخدمات لتمكين المستهلك في محافظة تعز.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motionAny.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-soft hover:shadow-elegant border border-gray-100 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <IconComponent className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black text-dark mb-3 group-hover:text-primary transition-colors">
                  {language === 'ar' ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base font-medium mb-6">
                  {language === 'ar' ? service.descAr : service.descEn}
                </p>
                <div className="flex items-center gap-2 text-primary font-black text-xs group-hover:gap-3 transition-all">
                   <span>{language === 'ar' ? 'معرفة المزيد' : 'Learn More'}</span>
                   <ArrowLeft className={`w-4 h-4 ${dir === 'ltr' ? 'rotate-180' : ''}`} />
                </div>
              </motionAny.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

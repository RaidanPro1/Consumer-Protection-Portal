
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
    <section className="section-spacing px-4 md:px-8 bg-pattern bg-light relative overflow-hidden border-y border-gray-200/50">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 leading-tight">
              نعمل لأجل <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-8">حمايتك</span>
            </h2>
            <p className="text-muted text-xl font-medium leading-relaxed">
              نقدم في جمعية حماية المستهلك - تعز منظومة متكاملة من الخدمات الرقابية التي تضمن لك الحصول على حقك في السعر والجودة.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motionAny.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white p-10 md:p-12 rounded-[3rem] shadow-elegant hover:shadow-glow border border-gray-100 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] -mr-10 -mt-10 group-hover:bg-accent/10 transition-colors" />
                
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-primary mb-4 group-hover:text-accent transition-colors">
                  {language === 'ar' ? service.titleAr : service.titleEn}
                </h3>
                
                <p className="text-muted leading-relaxed text-base md:text-lg font-medium mb-10 opacity-80">
                  {language === 'ar' ? service.descAr : service.descEn}
                </p>
                
                <div className="flex items-center gap-3 text-primary font-black text-sm md:text-base group-hover:gap-5 transition-all">
                   <span className="border-b-2 border-primary/20 group-hover:border-primary pb-1">
                    إستكشف الخدمة
                   </span>
                   <ArrowLeft className={`w-5 h-5 ${dir === 'ltr' ? 'rotate-180' : ''}`} />
                </div>
              </motionAny.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

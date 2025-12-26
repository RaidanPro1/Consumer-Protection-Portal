
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
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  return (
    <section className="py-24 px-6 md:px-16 bg-light relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 leading-tight">
              {t('services_title')}
            </h2>
            <p className="text-gray-500 text-xl font-medium leading-relaxed">
              نقدم مجموعة متكاملة من الخدمات التي تهدف إلى تمكين المستهلك وضبط التجاوزات في السوق المحلي بمحافظة تعز.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="h-1 w-24 bg-accent rounded-full mb-2"></div>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            const isCustom = service.isCustomIcon || (service.icon.startsWith('http') || service.icon.startsWith('data:'));

            return (
              <motionAny.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-soft hover:shadow-elegant border border-gray-100 hover:border-primary/10 transition-all duration-500 group relative"
              >
                <div className="flex justify-start mb-8">
                  <div className="p-5 bg-blue-50/50 rounded-2xl group-hover:bg-primary transition-all duration-500 transform group-hover:-rotate-6 group-hover:scale-110 flex items-center justify-center min-w-[80px] min-h-[80px]">
                    {isCustom ? (
                      <img 
                        src={service.icon} 
                        alt={service.titleEn} 
                        className="w-12 h-12 object-contain group-hover:brightness-0 group-hover:invert transition-all" 
                      />
                    ) : (
                      IconComponent ? (
                        <IconComponent className="w-10 h-10 text-primary group-hover:text-white transition-colors" strokeWidth={2} />
                      ) : (
                        <Search className="w-10 h-10 text-primary group-hover:text-white transition-colors" strokeWidth={2} />
                      )
                    )}
                  </div>
                </div>
                
                <h3 className="text-2xl font-extrabold text-dark mb-4 group-hover:text-primary transition-colors">
                  {language === 'ar' ? service.titleAr : service.titleEn}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-lg mb-8 font-medium">
                  {language === 'ar' ? service.descAr : service.descEn}
                </p>
                
                <div className="flex items-center gap-2 text-primary font-black group-hover:gap-4 transition-all opacity-0 group-hover:opacity-100">
                   <span className="text-sm">معرفة المزيد</span>
                   <ArrowLeft className={`w-5 h-5 ${dir === 'ltr' ? 'rotate-180' : ''}`} />
                </div>
                
                <span className="absolute top-8 end-8 text-6xl font-black text-gray-50 select-none group-hover:text-primary/5 transition-colors">
                  0{index + 1}
                </span>
              </motionAny.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

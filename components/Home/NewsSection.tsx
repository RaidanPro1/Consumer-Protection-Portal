
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { NEWS_DATA } from '../../constants';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  return (
    <section id="news" className="py-20 px-6 md:px-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary inline-block relative">
            {t('news_title')}
            <span className="block h-1.5 w-24 bg-accent mx-auto mt-4 rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_DATA.map((news, index) => (
            /* Fix: Using motionAny.div */
            <motionAny.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="overflow-hidden h-56">
                <img 
                  src={news.image} 
                  alt="News" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="text-accent" />
                  <span>{news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {language === 'ar' ? news.titleAr : news.titleEn}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {language === 'ar' ? news.descAr : news.descEn}
                </p>
                <a href="#" className="inline-flex items-center font-bold text-accent hover:text-[#e67e22] transition-colors">
                  {t('read_more')}
                </a>
              </div>
            </motionAny.div>
          ))}
        </div>
      </div>
    </section>
  );
};

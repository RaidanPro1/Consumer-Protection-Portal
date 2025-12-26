
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ABOUT_US_DATA } from '../../constants';
import { Target, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutUs: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  const cards = [
    { icon: Target, titleAr: "رسالتنا", titleEn: "Our Mission", textAr: ABOUT_US_DATA.missionAr, textEn: ABOUT_US_DATA.missionEn, color: "bg-blue-600" },
    { icon: Eye, titleAr: "رؤيتنا", titleEn: "Our Vision", textAr: ABOUT_US_DATA.visionAr, textEn: ABOUT_US_DATA.visionEn, color: "bg-accent" },
    { icon: Heart, titleAr: "قيمنا", titleEn: "Core Values", textAr: ABOUT_US_DATA.valuesAr, textEn: ABOUT_US_DATA.valuesEn, color: "bg-secondary" },
  ];

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Header */}
      <div className="bg-primary py-20 px-6 md:px-16 text-white text-center">
        <div className="container mx-auto">
          <motionAny.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-6xl font-black mb-6">{t('about')}</motionAny.h1>
          <motionAny.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl opacity-80 max-w-2xl mx-auto">تعرف على أهدافنا وتطلعاتنا في جمعية حماية المستهلك بمحافظة تعز.</motionAny.p>
        </div>
      </div>

      <div className="container mx-auto py-20 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, i) => (
            <motionAny.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-10 rounded-3xl shadow-xl border-t-8 border-transparent hover:border-accent transition-all duration-300"
            >
              <div className={`${card.color} w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg`}>
                <card.icon size={40} />
              </div>
              <h3 className="text-2xl font-black text-dark mb-4">{language === 'ar' ? card.titleAr : card.titleEn}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{language === 'ar' ? card.textAr : card.textEn}</p>
            </motionAny.div>
          ))}
        </div>

        <motionAny.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-white p-10 md:p-16 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-10"
        >
          <div className="md:w-1/2">
            <img src="https://picsum.photos/seed/about/800/600" className="rounded-3xl shadow-xl w-full h-auto" alt="About"/>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-black text-primary mb-6">تاريخ الجمعية وأهدافها</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              تأسست جمعية حماية المستهلك - تعز لتكون الصوت القوي للمستهلك في محافظة تعز، حيث تعمل الجمعية كمنظمة مجتمع مدني غير هادفة للربح.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              نحن نؤمن بأن المستهلك المطلع هو مستهلك محمي، ولذلك نكرس جهودنا للتوعية والرقابة والعمل القانوني لضمان حقوق الجميع.
            </p>
          </div>
        </motionAny.div>
      </div>
    </div>
  );
};


import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TEAM_MEMBERS } from '../../constants';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

export const Team: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  return (
    <div className="min-h-screen bg-light py-20 px-6 md:px-16">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          {/* Fix: Using motionAny.h1 */}
          <motionAny.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl md:text-5xl font-black text-primary mb-4">{t('team')}</motionAny.h1>
          {/* Fix: Using motionAny.div */}
          <motionAny.div initial={{ width: 0 }} animate={{ width: 80 }} className="h-2 bg-accent mx-auto rounded-full mb-6"></motionAny.div>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">نخبة من الكوادر الوطنية المتخصصة في حماية المستهلك والرقابة التجارية والعمل القانوني.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {TEAM_MEMBERS.map((member, i) => (
            /* Fix: Using motionAny.div */
            <motionAny.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-80 overflow-hidden relative">
                <img src={member.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={member.nameEn} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-4">
                    <button className="bg-white text-primary p-2 rounded-full hover:bg-accent hover:text-white transition-colors"><Linkedin size={20}/></button>
                    <button className="bg-white text-primary p-2 rounded-full hover:bg-accent hover:text-white transition-colors"><Twitter size={20}/></button>
                    <button className="bg-white text-primary p-2 rounded-full hover:bg-accent hover:text-white transition-colors"><Mail size={20}/></button>
                  </div>
                </div>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-black text-dark mb-1">{language === 'ar' ? member.nameAr : member.nameEn}</h3>
                <p className="text-accent font-bold mb-4">{language === 'ar' ? member.roleAr : member.roleEn}</p>
                <p className="text-gray-500 leading-relaxed italic">{language === 'ar' ? member.bioAr : member.bioEn}</p>
              </div>
            </motionAny.div>
          ))}
        </div>
      </div>
    </div>
  );
};

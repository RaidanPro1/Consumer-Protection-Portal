
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { VolunteerContent } from '../../types';
import { motion } from 'framer-motion';
import { Users, Mail, HandHeart } from 'lucide-react';

interface VolunteeringProps {
  content: VolunteerContent;
}

export const Volunteering: React.FC<VolunteeringProps> = ({ content }) => {
  const { t, language } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-secondary py-20 px-6 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">{t('volunteering')}</h1>
        <p className="opacity-80 max-w-xl mx-auto">تطوعك قوة للمجتمع وضمان لحقوق المستهلك.</p>
      </div>

      <div className="container mx-auto py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Fix: Using motionAny.div */}
          <motionAny.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <img src="https://picsum.photos/seed/vol/800/800" className="rounded-3xl shadow-2xl" alt="Volunteer"/>
          </motionAny.div>
          
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-primary">
              {language === 'ar' ? content.titleAr : content.titleEn}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {language === 'ar' ? content.descAr : content.descEn}
            </p>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-6">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                <Mail size={32} />
              </div>
              <div>
                <h4 className="font-black text-dark mb-1">للتواصل بخصوص التطوع:</h4>
                <a href={`mailto:${content.contactEmail}`} className="text-accent font-black text-xl hover:underline">
                  {content.contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-secondary font-bold">
              <HandHeart size={24} />
              <span>أكثر من 50 متطوعاً نشطاً في تعز</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

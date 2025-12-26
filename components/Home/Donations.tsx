
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DonationMethod } from '../../types';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Wallet, Banknote } from 'lucide-react';

interface DonationsProps {
  methods: DonationMethod[];
}

export const Donations: React.FC<DonationsProps> = ({ methods }) => {
  const { t, language } = useLanguage();
  const motionAny = motion as any;

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-accent py-20 px-6 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">{t('donations')}</h1>
        <p className="opacity-90 max-w-xl mx-auto">تبرعك يدعم استمرارية جهودنا في الرقابة وحماية المستهلك.</p>
      </div>

      <div className="container mx-auto py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Heart size={48} className="text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-black text-dark">طرق التبرع المتاحة</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methods.map((method) => (
              <motionAny.div
                key={method.id}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-3xl shadow-xl border border-gray-50 flex flex-col items-center text-center"
              >
                <div className="p-5 bg-gray-50 rounded-2xl mb-6 text-accent">
                  {method.methodType === 'bank' ? <CreditCard size={40}/> : method.methodType === 'wallet' ? <Wallet size={40}/> : <Banknote size={40}/>}
                </div>
                <h3 className="text-xl font-black text-primary mb-3">
                  {language === 'ar' ? method.titleAr : method.titleEn}
                </h3>
                <p className="text-gray-500 font-bold mb-8">
                  {language === 'ar' ? method.detailsAr : method.detailsEn}
                </p>
                {method.link && (
                  <a href={method.link} target="_blank" className="bg-accent text-white px-8 py-2 rounded-xl font-bold shadow-lg">
                    {language === 'ar' ? 'تبرع الآن' : 'Donate Now'}
                  </a>
                )}
              </motionAny.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

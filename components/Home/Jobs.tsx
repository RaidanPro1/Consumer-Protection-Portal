
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { JobItem } from '../../types';
import { motion } from 'framer-motion';
import { Briefcase, ChevronRight, MapPin } from 'lucide-react';

interface JobsProps {
  jobs: JobItem[];
}

export const Jobs: React.FC<JobsProps> = ({ jobs }) => {
  const { t, language } = useLanguage();
  const motionAny = motion as any;

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-primary py-20 px-6 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">{t('jobs')}</h1>
        <p className="opacity-80 max-w-xl mx-auto">انضم إلى فريقنا وساهم في حماية المجتمع.</p>
      </div>

      <div className="container mx-auto py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {jobs.map((job) => (
            <motionAny.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-primary mb-2">
                    {language === 'ar' ? job.titleAr : job.titleEn}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400 mb-6 text-sm font-bold">
                    <MapPin size={16} /> تعز، اليمن
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <div>
                      <h4 className="font-bold text-dark mb-1">الوصف:</h4>
                      <p>{language === 'ar' ? job.descAr : job.descEn}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-dark mb-1">المتطلبات:</h4>
                      <p>{language === 'ar' ? job.requirementsAr : job.requirementsEn}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <button className="bg-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-[#e67e22] transition-colors shadow-lg shadow-accent/20">
                    {language === 'ar' ? 'تقدم الآن' : 'Apply Now'}
                  </button>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-50 text-xs text-gray-400 font-bold uppercase tracking-wider">
                {language === 'ar' ? 'طريقة التقديم: ' : 'Instructions: '}
                {language === 'ar' ? job.instructionsAr : job.instructionsEn}
              </div>
            </motionAny.div>
          ))}
          {jobs.length === 0 && (
            <div className="text-center py-20 text-gray-400 italic font-bold">لا توجد وظائف شاغرة حالياً.</div>
          )}
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Testimonial } from '../../types';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const { t, language } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
        <Quote size={200} />
      </div>
      
      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary block">
            {t('testimonials')}
          </h2>
          <div className="h-1.5 w-24 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {testimonials.map((test, i) => (
            /* Fix: Using motionAny.div */
            <motionAny.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-blue-50/50 p-10 rounded-3xl relative border border-blue-100/50"
            >
              <div className="flex gap-6 items-center mb-8">
                <img 
                  src={test.image} 
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-white" 
                  alt={test.nameEn} 
                />
                <div>
                  <h4 className="text-xl font-black text-dark">
                    {language === 'ar' ? test.nameAr : test.nameEn}
                  </h4>
                  <span className="text-accent font-bold uppercase text-sm tracking-wider">
                    {language === 'ar' ? test.roleAr : test.roleEn}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-xl italic leading-relaxed font-medium">
                "{language === 'ar' ? test.feedbackAr : test.feedbackEn}"
              </p>
              <div className="absolute bottom-6 end-10 text-primary/10">
                 <Quote size={48} />
              </div>
            </motionAny.div>
          ))}
        </div>
      </div>
    </section>
  );
};

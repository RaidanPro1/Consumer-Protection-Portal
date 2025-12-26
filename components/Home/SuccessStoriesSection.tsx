
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SuccessStory } from '../../types';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface SuccessStoriesSectionProps {
  stories: SuccessStory[];
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ stories }) => {
  const { t, language } = useLanguage();
  const motionAny = motion as any;

  // Specification: fixed 3-4 blocks
  const displayStories = stories.slice(0, 4);

  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-accent/10 rounded-2xl text-accent mb-4">
             <Trophy size={32} />
          </div>
          <h2 className="text-4xl font-black text-primary block">
            {t('success_stories')}
          </h2>
          <div className="h-1.5 w-24 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {displayStories.map((story, i) => (
            <motionAny.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row group"
            >
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.titleEn} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-black text-primary mb-4">
                  {language === 'ar' ? story.titleAr : story.titleEn}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg italic">
                  {language === 'ar' ? story.descAr : story.descEn}
                </p>
              </div>
            </motionAny.div>
          ))}
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const IMAGES = [
  "https://picsum.photos/seed/gal1/400/400",
  "https://picsum.photos/seed/gal2/400/400",
  "https://picsum.photos/seed/gal3/400/400",
  "https://picsum.photos/seed/gal4/400/400"
];

export const Gallery: React.FC = () => {
  const { t } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  return (
    <section id="library" className="py-20 px-6 md:px-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary inline-block relative">
            {t('gallery_title')}
            <span className="block h-1.5 w-24 bg-accent mx-auto mt-4 rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {IMAGES.map((img, index) => (
            /* Fix: Using motionAny.div */
            <motionAny.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
            >
              <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Search className="text-white w-10 h-10" />
              </div>
            </motionAny.div>
          ))}
        </div>
      </div>
    </section>
  );
};

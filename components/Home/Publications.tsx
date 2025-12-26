
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PUBLICATIONS_DATA } from '../../constants';
import { FileText, FileSpreadsheet, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export const Publications: React.FC = () => {
  const { t } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  return (
    <section className="py-20 px-6 md:px-16 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px'}}></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white inline-block relative">
            {t('pubs_title')}
            <span className="block h-1.5 w-24 bg-accent mx-auto mt-4 rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PUBLICATIONS_DATA.map((pub, index) => (
            /* Fix: Using motionAny.div */
            <motionAny.div
              key={pub.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-lg hover:translate-x-2 transition-transform duration-300 group cursor-pointer"
            >
              <div className={`p-4 rounded-full ${pub.type === 'pdf' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}`}>
                {pub.type === 'pdf' ? <FileText size={32} /> : <FileSpreadsheet size={32} />}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                  {t(pub.titleKey)}
                </h4>
                <span className="text-sm text-gray-500 font-medium">{pub.type.toUpperCase()} - {pub.size}</span>
              </div>
              <button className="p-2 text-secondary hover:text-accent transition-colors">
                <Download size={24} />
              </button>
            </motionAny.div>
          ))}
        </div>
      </div>
    </section>
  );
};

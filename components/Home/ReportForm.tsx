import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReportForm: React.FC = () => {
  const { t } = useLanguage();
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [location, setLocation] = useState<string>('');

  const handleGetLocation = () => {
    setLoadingLoc(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
          setLoadingLoc(false);
        },
        () => {
          setLoadingLoc(false);
          alert("Could not retrieve location.");
        }
      );
    }
  };

  return (
    <section id="report" className="py-20 px-6 md:px-16 bg-light">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-secondary p-10 text-white flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
               <Send size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('report_title')}</h3>
            <p className="opacity-90">{t('heroSub1')}</p>
          </div>
          
          <div className="md:w-2/3 p-10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('product_name')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('shop_name')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('price')}</label>
                  <input type="number" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('location')}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      readOnly 
                      value={location}
                      placeholder={location ? t('loc_success') : ''}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none text-gray-500" 
                    />
                    <button 
                      type="button"
                      onClick={handleGetLocation}
                      className="absolute top-2 end-2 p-1.5 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
                    >
                      {loadingLoc ? <Loader2 size={20} className="animate-spin" /> : <MapPin size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('details')}</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"></textarea>
              </div>

              <button className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-[#e67e22] shadow-lg shadow-accent/30 transition-all transform hover:-translate-y-1">
                {t('submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
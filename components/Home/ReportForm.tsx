
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Send, Loader2, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReportForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [location, setLocation] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const MotionAny = motion as any;

  const handleGetLocation = () => {
    setLoadingLoc(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          setLoadingLoc(false);
        },
        () => {
          setLoadingLoc(false);
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="report" className="py-12 md:py-20 px-4 md:px-8 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-3 leading-tight">
              {t('report_title')}
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
              بلاغك يساعد في ضبط التجاوزات. نضمن لك السرية التامة وحماية بياناتك.
            </p>
          </div>
          <div className="flex gap-3 items-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl font-black text-xs border border-emerald-100">
             <ShieldCheck size={16} />
             {language === 'ar' ? 'بيانات مشفرة' : 'Encrypted'}
          </div>
        </div>

        <div className="bg-light rounded-[2.5rem] shadow-elegant overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          <div className="lg:w-1/3 bg-primary p-8 md:p-10 text-white relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-6">{language === 'ar' ? 'إرشادات سريعة' : 'Quick Guide'}</h3>
              <div className="space-y-6">
                {[
                  { step: "1", textAr: "حدد المنشأة والسلعة", textEn: "Identify store & item" },
                  { step: "2", textAr: "سجل السعر المرتفع", textEn: "Record price discrepancy" },
                  { step: "3", textAr: "ارسل إحداثيات الموقع", textEn: "Share GPS location" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-sm">{item.step}</span>
                    <p className="font-bold opacity-90 text-sm md:text-base">
                      {language === 'ar' ? item.textAr : item.textEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="lg:w-2/3 p-8 md:p-12 bg-white">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <MotionAny.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('product_name')}</label>
                      <input required type="text" className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-primary outline-none transition-all font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('shop_name')}</label>
                      <input required type="text" className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-primary outline-none transition-all font-bold" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('price')}</label>
                      <div className="relative">
                        <input required type="number" className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-primary outline-none font-black text-lg" />
                        <span className="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-black text-gray-300">YER</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('location')}</label>
                      <div className="relative">
                        <input type="text" readOnly value={location} className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-transparent outline-none text-gray-500 font-bold" placeholder={t('location')} />
                        <button type="button" onClick={handleGetLocation} className="absolute top-1/2 end-1.5 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-accent transition-all">
                          {loadingLoc ? <Loader2 size={18} className="animate-spin" /> : <MapPin size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('details')}</label>
                    <textarea required rows={3} className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-primary outline-none transition-all font-bold resize-none"></textarea>
                  </div>

                  <button className="w-full bg-primary text-white font-black py-4 rounded-2xl hover:bg-accent transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/10">
                    <Send size={20} />
                    {t('submit')}
                  </button>
                </MotionAny.form>
              ) : (
                <MotionAny.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-primary mb-2">تم استلام البلاغ</h3>
                  <p className="text-gray-500 font-medium">شكراً لك! مساهمتك تساعد في ضبط الأسواق.</p>
                </MotionAny.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};


import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReportForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [location, setLocation] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const motionAny = motion as any;

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
          alert(language === 'ar' ? "فشل تحديد الموقع، يرجى تفعيل الـ GPS" : "Could not retrieve location. Please enable GPS.");
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
    <section id="report" className="py-24 px-6 md:px-16 bg-white relative">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
            {t('report_title')}
          </h2>
          <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">
            بلاغك يساعدنا في الوصول إلى المخالفين وتصحيح أوضاع السوق. نضمن لك السرية التامة.
          </p>
        </div>

        <div className="bg-light rounded-[3rem] shadow-elegant overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          {/* Info Side */}
          <div className="lg:w-1/3 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-accent/20">
                 <AlertCircle size={32} />
              </div>
              <h3 className="text-3xl font-black mb-6 leading-tight">تعليمات البلاغ</h3>
              <ul className="space-y-4 opacity-90 text-lg font-medium">
                <li className="flex gap-3">
                   <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-xs">1</div>
                   <span>حدد اسم المحل بدقة</span>
                </li>
                <li className="flex gap-3">
                   <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-xs">2</div>
                   <span>أرفق السعر المرصود</span>
                </li>
                <li className="flex gap-3">
                   <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-xs">3</div>
                   <span>شارك الموقع لسرعة النزول</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 relative z-10">
              <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                <p className="text-sm italic">"صوتك هو السلاح الأقوى في مواجهة الجشع."</p>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
          </div>
          
          {/* Form Side */}
          <div className="lg:w-2/3 p-12 bg-white relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motionAny.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-gray-700">{t('product_name')}</label>
                      <input 
                        required
                        type="text" 
                        placeholder="مثال: دقيق، زيت، دواء..."
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-gray-700">{t('shop_name')}</label>
                      <input 
                        required
                        type="text" 
                        placeholder="اسم السوبر ماركت أو الصيدلية"
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-gray-700">{t('price')}</label>
                      <div className="relative">
                        <input 
                          required
                          type="number" 
                          placeholder="0.00"
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-black text-primary" 
                        />
                        <span className="absolute end-6 top-1/2 -translate-y-1/2 font-bold text-gray-300">YER</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-gray-700">{t('location')}</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          readOnly 
                          value={location}
                          placeholder={t('location')}
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent outline-none text-gray-500 font-bold" 
                        />
                        <button 
                          type="button"
                          onClick={handleGetLocation}
                          className="absolute top-1/2 end-2 -translate-y-1/2 p-2.5 bg-primary text-white rounded-xl hover:bg-primary-light transition-all shadow-lg"
                        >
                          {loadingLoc ? <Loader2 size={24} className="animate-spin" /> : <MapPin size={24} />}
                        </button>
                      </div>
                      {location && <p className="text-xs text-green-500 font-black animate-pulse">{t('loc_success')}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-black text-gray-700">{t('details')}</label>
                    <textarea 
                      required
                      rows={4} 
                      placeholder="اشرح ما حدث بالتفصيل (مثال: رفض إعطائي فاتورة، زيادة السعر عن المعلن...)"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold resize-none"
                    ></textarea>
                  </div>

                  <button className="w-full bg-primary text-white font-black py-5 rounded-[2rem] hover:bg-primary-light shadow-2xl shadow-primary/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-4 text-xl">
                    <Send size={24} />
                    {t('submit')}
                  </button>
                </motionAny.form>
              ) : (
                <motionAny.div 
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <CheckCircle size={64} />
                  </div>
                  <h3 className="text-4xl font-black text-primary mb-4">تم استلام البلاغ</h3>
                  <p className="text-gray-500 text-xl font-medium max-w-sm">شكراً لك! سيتم مراجعة البيانات والتحرك فوراً بالتنسيق مع فرق الرصد الميداني.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-10 text-primary font-black hover:underline"
                  >
                    إرسال بلاغ آخر
                  </button>
                </motionAny.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

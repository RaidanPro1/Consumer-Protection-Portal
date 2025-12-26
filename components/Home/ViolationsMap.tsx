
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MOCK_VIOLATIONS } from '../../constants';
import { MapPin, Filter, Calendar, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ViolationsMap: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');
  const [selectedViolation, setSelectedViolation] = useState<number | null>(null);

  const motionAny = motion as any;

  const filteredViolations = useMemo(() => {
    return MOCK_VIOLATIONS.filter(v => {
      const matchesType = filterType === 'all' || v.typeAr === filterType || v.typeEn === filterType;
      const matchesDate = !filterDate || v.date === filterDate;
      return matchesType && matchesDate;
    });
  }, [filterType, filterDate]);

  const violationTypes = useMemo(() => {
    const types = new Set(MOCK_VIOLATIONS.map(v => language === 'ar' ? v.typeAr : v.typeEn));
    return Array.from(types);
  }, [language]);

  return (
    <section id="map" className="py-24 px-6 md:px-16 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
            {t('map_title')}
          </h2>
          <div className="h-1.5 w-24 bg-accent mx-auto mb-10 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Filter size={20} className="text-accent" /> تصفية الخريطة</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-2">{t('filter_type')}</label>
                  <select 
                    value={filterType} 
                    onChange={e => setFilterType(e.target.value)}
                    className="w-full bg-gray-50 border p-3 rounded-xl font-bold outline-none focus:border-primary"
                  >
                    <option value="all">الكل</option>
                    {violationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-2">{t('filter_date')}</label>
                  <input 
                    type="date" 
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                    className="w-full bg-gray-50 border p-3 rounded-xl font-bold outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">إحصائيات العرض</p>
                <div className="flex justify-between items-center bg-primary/5 p-4 rounded-2xl">
                   <span className="font-bold text-primary">المخالفات المعروضة</span>
                   <span className="text-2xl font-black text-primary">{filteredViolations.length}</span>
                </div>
              </div>
            </div>

            {/* List View for smaller screens or context */}
            <div className="bg-white p-6 rounded-3xl shadow-soft border border-gray-100 h-[400px] overflow-y-auto">
               <h3 className="text-lg font-black mb-4 px-2">قائمة البلاغات</h3>
               <div className="space-y-3">
                 {filteredViolations.map(v => (
                   <button 
                    key={v.id}
                    onClick={() => setSelectedViolation(v.id)}
                    className={`w-full text-start p-4 rounded-2xl transition-all border ${selectedViolation === v.id ? 'bg-primary/10 border-primary' : 'bg-gray-50 border-transparent hover:bg-white hover:border-gray-200'}`}
                   >
                     <p className="font-black text-sm mb-1">{language === 'ar' ? v.typeAr : v.typeEn}</p>
                     <p className="text-xs text-gray-400 font-bold">{v.date}</p>
                   </button>
                 ))}
               </div>
            </div>
          </div>

          {/* Simulated Map View */}
          <div className="lg:col-span-3 relative h-[600px] lg:h-auto min-h-[500px] bg-white rounded-[3rem] shadow-elegant border-8 border-white overflow-hidden">
            {/* Visual background simulation (Simplified Map grid) */}
            <div className="absolute inset-0 bg-[#e5e7eb] opacity-30" style={{backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
            
            {/* Legend */}
            <div className="absolute top-8 left-8 z-10 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl flex flex-col gap-2 border border-white/50">
               <div className="flex items-center gap-2 text-xs font-black"><span className="w-3 h-3 rounded-full bg-red-500"></span> تلاعب سعري</div>
               <div className="flex items-center gap-2 text-xs font-black"><span className="w-3 h-3 rounded-full bg-orange-500"></span> غش تجاري</div>
               <div className="flex items-center gap-2 text-xs font-black"><span className="w-3 h-3 rounded-full bg-blue-500"></span> احتكار</div>
            </div>

            {/* Pins */}
            {filteredViolations.map(v => (
              <motionAny.button
                key={v.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2, zIndex: 30 }}
                onClick={() => setSelectedViolation(v.id)}
                className={`absolute z-20 group transition-transform ${selectedViolation === v.id ? 'scale-150 z-40' : ''}`}
                style={{ 
                  top: `${((v.lat - 13.56) / 0.03) * 100}%`, 
                  left: `${((v.lng - 44.0) / 0.03) * 100}%` 
                }}
              >
                <div className={`p-2 rounded-full shadow-lg ${v.typeAr === 'تلاعب بالأسعار' ? 'bg-red-500' : v.typeAr === 'غش تجاري' ? 'bg-orange-500' : 'bg-blue-500'} text-white`}>
                  <MapPin size={selectedViolation === v.id ? 24 : 16} />
                </div>
                
                {/* Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {language === 'ar' ? v.typeAr : v.typeEn}
                </div>
              </motionAny.button>
            ))}

            {/* Info Modal / Detail View Overlay */}
            <AnimatePresence>
              {selectedViolation && (
                <motionAny.div 
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className={`absolute top-8 bottom-8 ${dir === 'rtl' ? 'left-8' : 'right-8'} w-full max-w-sm bg-white rounded-[2rem] shadow-2xl z-50 p-8 border border-gray-100 overflow-y-auto`}
                >
                  <button 
                    onClick={() => setSelectedViolation(null)}
                    className="absolute top-6 end-6 text-gray-400 hover:text-dark"
                  >
                    <Info size={24} />
                  </button>
                  
                  {(() => {
                    const v = MOCK_VIOLATIONS.find(item => item.id === selectedViolation);
                    if (!v) return null;
                    return (
                      <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-xs">
                          <AlertTriangle size={14} /> تفاصيل المخالفة
                        </div>
                        
                        <div>
                          <h4 className="text-2xl font-black text-dark mb-2">{language === 'ar' ? v.typeAr : v.typeEn}</h4>
                          <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                            <Calendar size={14} /> {v.date}
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl">
                          <p className="text-gray-600 font-medium leading-relaxed">
                            {language === 'ar' ? v.descriptionAr : v.descriptionEn}
                          </p>
                        </div>

                        <div className="pt-6 border-t">
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">حالة البلاغ</p>
                          <div className={`flex items-center gap-3 font-black ${v.status === 'verified' ? 'text-green-600' : v.status === 'resolved' ? 'text-blue-600' : 'text-orange-500'}`}>
                            {v.status === 'verified' ? <CheckCircle /> : v.status === 'resolved' ? <CheckCircle /> : <Clock />}
                            {v.status === 'verified' ? 'مؤكد' : v.status === 'resolved' ? 'تم الحل' : 'قيد المراجعة'}
                          </div>
                        </div>

                        <button className="w-full bg-primary text-white py-4 rounded-xl font-black shadow-xl shadow-primary/20 hover:bg-primary-light transition-all">
                          متابعة البلاغ
                        </button>
                      </div>
                    );
                  })()}
                </motionAny.div>
              )}
            </AnimatePresence>
            
            {!selectedViolation && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 font-bold text-sm bg-white/50 backdrop-blur px-6 py-2 rounded-full border">
                انقر على العلامات في الخريطة لعرض التفاصيل
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

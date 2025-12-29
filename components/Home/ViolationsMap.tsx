
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MOCK_VIOLATIONS } from '../../constants';
import { MapPin, Filter, Calendar, Info, AlertTriangle, CheckCircle, Clock, X, Eye, FileText, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Violation } from '../../types';

interface Cluster {
  id: string;
  lat: number;
  lng: number;
  count: number;
  items: Violation[];
}

export const ViolationsMap: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');
  const [selectedViolationId, setSelectedViolationId] = useState<number | null>(null);
  const [viewingDetail, setViewingDetail] = useState<Violation | null>(null);

  const motionAny = motion as any;

  const filteredViolations = useMemo(() => {
    return MOCK_VIOLATIONS.filter(v => {
      const matchesType = filterType === 'all' || v.typeAr === filterType || v.typeEn === filterType;
      const matchesDate = !filterDate || v.date === filterDate;
      return matchesType && matchesDate;
    });
  }, [filterType, filterDate]);

  // Public clustering logic
  const clusteredMarkers = useMemo(() => {
    const clusters: Cluster[] = [];
    const threshold = 0.005; 
    const processedIds = new Set<number>();

    filteredViolations.forEach((v) => {
      if (processedIds.has(v.id)) return;

      const clusterItems = filteredViolations.filter((other) => {
        if (processedIds.has(other.id)) return false;
        const dist = Math.sqrt(Math.pow(v.lat - other.lat, 2) + Math.pow(v.lng - other.lng, 2));
        return dist < threshold;
      });

      if (clusterItems.length > 1) {
        const avgLat = clusterItems.reduce((sum, item) => sum + item.lat, 0) / clusterItems.length;
        const avgLng = clusterItems.reduce((sum, item) => sum + item.lng, 0) / clusterItems.length;
        
        clusters.push({
          id: `cluster-${v.id}`,
          lat: avgLat,
          lng: avgLng,
          count: clusterItems.length,
          items: clusterItems
        });
        
        clusterItems.forEach(i => processedIds.add(i.id));
      } else {
        clusters.push({
          id: `single-${v.id}`,
          lat: v.lat,
          lng: v.lng,
          count: 1,
          items: [v]
        });
        processedIds.add(v.id);
      }
    });

    return clusters;
  }, [filteredViolations]);

  const violationTypes = useMemo(() => {
    const types = new Set(MOCK_VIOLATIONS.map(v => language === 'ar' ? v.typeAr : v.typeEn));
    return Array.from(types);
  }, [language]);

  const selectedViolation = useMemo(() => 
    MOCK_VIOLATIONS.find(v => v.id === selectedViolationId) || null
  , [selectedViolationId]);

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

            {/* List View */}
            <div className="bg-white p-6 rounded-3xl shadow-soft border border-gray-100 h-[400px] overflow-y-auto">
               <h3 className="text-lg font-black mb-4 px-2">قائمة البلاغات</h3>
               <div className="space-y-3">
                 {filteredViolations.map(v => (
                   <button 
                    key={v.id}
                    onClick={() => setSelectedViolationId(v.id)}
                    className={`w-full text-start p-4 rounded-2xl transition-all border ${selectedViolationId === v.id ? 'bg-primary/10 border-primary' : 'bg-gray-50 border-transparent hover:bg-white hover:border-gray-200'}`}
                   >
                     <p className="font-black text-sm mb-1">{language === 'ar' ? v.typeAr : v.typeEn}</p>
                     <p className="text-xs text-gray-400 font-bold">{v.date}</p>
                   </button>
                 ))}
               </div>
            </div>
          </div>

          {/* Map View */}
          <div className="lg:col-span-3 relative h-[600px] lg:h-auto min-h-[500px] bg-white rounded-[3rem] shadow-elegant border-8 border-white overflow-hidden">
            <div className="absolute inset-0 bg-[#e5e7eb] opacity-30" style={{backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
            
            <div className="absolute top-8 left-8 z-10 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl flex flex-col gap-2 border border-white/50">
               <div className="flex items-center gap-2 text-xs font-black"><span className="w-3 h-3 rounded-full bg-red-500"></span> تلاعب سعري</div>
               <div className="flex items-center gap-2 text-xs font-black"><span className="w-3 h-3 rounded-full bg-orange-500"></span> غش تجاري</div>
               <div className="flex items-center gap-2 text-xs font-black"><span className="w-3 h-3 rounded-full bg-blue-500"></span> احتكار</div>
            </div>

            {clusteredMarkers.map(cluster => (
              <motionAny.button
                key={cluster.id}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                whileHover={{ scale: 1.1, zIndex: 30 }}
                onClick={() => cluster.count === 1 ? setSelectedViolationId(cluster.items[0].id) : null}
                className={`absolute z-20 group transition-transform ${selectedViolationId === cluster.items[0].id ? 'scale-125 z-40' : ''}`}
                style={{ 
                  top: `${((cluster.lat - 13.56) / 0.03) * 100}%`, 
                  left: `${((cluster.lng - 44.0) / 0.03) * 100}%` 
                }}
              >
                {cluster.count > 1 ? (
                  <div className="w-10 h-10 bg-accent text-white rounded-full border-2 border-white shadow-xl flex items-center justify-center font-black text-xs animate-pulse">
                    {cluster.count}
                  </div>
                ) : (
                  <div className={`p-2 rounded-full shadow-lg ${cluster.items[0].typeAr === 'تلاعب بالأسعار' ? 'bg-red-500' : cluster.items[0].typeAr === 'غش تجاري' ? 'bg-orange-500' : 'bg-blue-500'} text-white`}>
                    <MapPin size={selectedViolationId === cluster.items[0].id ? 24 : 16} />
                  </div>
                )}
              </motionAny.button>
            ))}

            <AnimatePresence>
              {selectedViolation && (
                <motionAny.div 
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className={`absolute top-8 bottom-8 ${dir === 'rtl' ? 'left-8' : 'right-8'} w-full max-w-sm bg-white rounded-[2rem] shadow-2xl z-50 p-8 border border-gray-100 overflow-y-auto`}
                >
                  <button onClick={() => setSelectedViolationId(null)} className="absolute top-6 end-6 text-gray-400 hover:text-dark"><X size={24} /></button>
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-xs">
                      <AlertTriangle size={14} /> تفاصيل المخالفة
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-dark mb-2">{language === 'ar' ? selectedViolation.typeAr : selectedViolation.typeEn}</h4>
                      <div className="flex items-center gap-2 text-gray-400 text-sm font-bold"><Calendar size={14} /> {selectedViolation.date}</div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl">
                      <p className="text-gray-600 font-medium leading-relaxed line-clamp-3 italic">
                        {language === 'ar' ? selectedViolation.descriptionAr : selectedViolation.descriptionEn}
                      </p>
                    </div>
                    <button 
                      onClick={() => setViewingDetail(selectedViolation)}
                      className="w-full bg-primary text-white py-4 rounded-xl font-black shadow-xl hover:bg-accent transition-all flex items-center justify-center gap-2"
                    >
                      <Eye size={18} /> عرض كامل التفاصيل
                    </button>
                  </div>
                </motionAny.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {viewingDetail && (
          <motionAny.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-dark/80 backdrop-blur-md flex items-center justify-center p-6">
            <motionAny.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="bg-white rounded-[3rem] w-full max-w-3xl overflow-hidden shadow-2xl">
              <div className="bg-primary p-10 text-white flex justify-between items-center">
                <h2 className="text-3xl font-black">{language === 'ar' ? viewingDetail.typeAr : viewingDetail.typeEn}</h2>
                <button onClick={() => setViewingDetail(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"><X size={24} /></button>
              </div>
              <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-6 rounded-3xl">
                    <span className="block text-[10px] font-black text-gray-400 uppercase mb-2">تاريخ الرصد</span>
                    <p className="text-xl font-black text-primary">{viewingDetail.date}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl">
                    <span className="block text-[10px] font-black text-gray-400 uppercase mb-2">حالة البلاغ</span>
                    <span className={`px-4 py-1.5 rounded-full font-black text-sm bg-emerald-100 text-emerald-700`}>{viewingDetail.status.toUpperCase()}</span>
                  </div>
                </div>
                <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10 flex justify-around">
                  <div className="text-center">
                    <span className="block text-[10px] font-black text-muted uppercase mb-1">LATITUDE</span>
                    <span className="font-black text-xl text-primary">{viewingDetail.lat.toFixed(6)}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] font-black text-muted uppercase mb-1">LONGITUDE</span>
                    <span className="font-black text-xl text-primary">{viewingDetail.lng.toFixed(6)}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-black text-primary flex items-center gap-2"><FileText size={20} className="text-accent" /> تفاصيل إضافية</h4>
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 italic">
                    <p className="text-lg font-medium leading-relaxed">{language === 'ar' ? viewingDetail.descriptionAr : viewingDetail.descriptionEn}</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50 border-t">
                <button onClick={() => setViewingDetail(null)} className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg hover:bg-accent transition-all">إغلاق</button>
              </div>
            </motionAny.div>
          </motionAny.div>
        )}
      </AnimatePresence>
    </section>
  );
};

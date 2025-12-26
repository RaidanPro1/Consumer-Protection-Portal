
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MOCK_PRICES, PRICE_CATEGORIES } from '../../constants';
import { Scan, Search, Filter, Tag, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { BarcodeScanner } from './BarcodeScanner';
import { AnimatePresence, motion } from 'framer-motion';

export const PriceList: React.FC = () => {
  const { t, language } = useLanguage();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [filterCat, setFilterCat] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const MotionAny = motion as any;

  const filteredPrices = useMemo(() => {
    return MOCK_PRICES.filter(p => {
      const matchesCat = filterCat === 'all' || p.categoryId === filterCat;
      const matchesSearch = 
        p.nameAr.includes(searchTerm) || 
        p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.code.includes(searchTerm);
      return matchesCat && matchesSearch;
    });
  }, [filterCat, searchTerm]);

  return (
    <section id="prices" className="section-spacing px-4 md:px-8 bg-gray-50 border-y border-gray-100 relative">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-4">
              دليل <span className="text-accent">الأسعار</span> المرجعي
            </h2>
            <p className="text-muted text-lg font-medium leading-relaxed">
              نوفر لك قائمة محدثة يومياً بأسعار السلع الأساسية والأدوية وفقاً للوائح الرسمية الصادرة عن الجهات المختصة.
            </p>
          </div>
          
          <MotionAny.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsScannerOpen(true)}
            className="w-full lg:w-auto flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black text-lg shadow-elegant hover:bg-primary-light transition-all"
          >
            <Scan size={24} className="text-accent" />
            {t('scan_barcode')}
          </MotionAny.button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 md:p-6 rounded-[2.5rem] border border-gray-100 mb-8 space-y-4 shadow-soft">
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 start-5 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="ابحث عن منتج، كود، أو باركود..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full ps-14 pe-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-accent outline-none font-bold text-base shadow-sm transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
               <button 
                onClick={() => setFilterCat('all')} 
                className={`px-6 py-4 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${filterCat === 'all' ? 'bg-primary text-white shadow-lg' : 'bg-gray-50 text-muted border border-gray-100 hover:border-accent'}`}
               >
                <Tag size={16} /> الكل
               </button>
               {PRICE_CATEGORIES.map(cat => (
                 <button 
                  key={cat.id} 
                  onClick={() => setFilterCat(cat.id)} 
                  className={`px-6 py-4 rounded-xl font-black text-sm transition-all ${filterCat === cat.id ? 'bg-primary text-white shadow-lg' : 'bg-gray-50 text-muted border border-gray-100 hover:border-accent'}`}
                 >
                  {language === 'ar' ? cat.nameAr : cat.nameEn}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Dynamic List/Table */}
        <div className="bg-white rounded-[2rem] shadow-elegant border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-6 px-8 text-start font-black uppercase tracking-wider text-xs">كود السلعة</th>
                  <th className="py-6 px-8 text-start font-black uppercase tracking-wider text-xs">اسم المنتج بالتفصيل</th>
                  <th className="py-6 px-8 text-center font-black uppercase tracking-wider text-xs">السعر الرسمي (YER)</th>
                  <th className="py-6 px-8 text-end font-black uppercase tracking-wider text-xs">حالة التحديث</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPrices.map((item, idx) => (
                  <MotionAny.tr 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-primary/5 transition-all cursor-default"
                  >
                    <td className="py-5 px-8">
                       <span className="inline-block px-3 py-1 bg-gray-100 text-muted rounded-lg font-black text-xs">#{item.code}</span>
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex flex-col">
                        <span className="font-black text-primary text-lg">{language === 'ar' ? item.nameAr : item.nameEn}</span>
                        <span className="text-xs font-bold text-accent uppercase tracking-wide">
                          {PRICE_CATEGORIES.find(c => c.id === item.categoryId)?.nameAr}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-8 text-center">
                      <div className="inline-flex items-baseline gap-1.5 bg-emerald-50 px-4 py-2 rounded-xl">
                        <span className="text-2xl font-black text-emerald-700">{item.price.toLocaleString()}</span>
                        <span className="text-xs font-black text-emerald-500/70">ريال</span>
                      </div>
                    </td>
                    <td className="py-5 px-8 text-end">
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 text-emerald-600 font-black text-xs">
                          <CheckCircle2 size={14} /> {language === 'ar' ? 'معتمد' : 'Verified'}
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 font-bold text-[10px]">
                          <Clock size={12} /> {item.lastUpdated}
                        </div>
                      </div>
                    </td>
                  </MotionAny.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isScannerOpen && <BarcodeScanner onClose={() => setIsScannerOpen(false)} />}
      </AnimatePresence>
    </section>
  );
};

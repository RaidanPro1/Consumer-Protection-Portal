
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MOCK_PRICES, PRICE_CATEGORIES } from '../../constants';
import { Scan, Search, Filter, ArrowUpRight } from 'lucide-react';
import { BarcodeScanner } from './BarcodeScanner';
import { AnimatePresence, motion } from 'framer-motion';

export const PriceList: React.FC = () => {
  const { t, language } = useLanguage();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [filterCat, setFilterCat] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const motionAny = motion as any;

  const filteredPrices = MOCK_PRICES.filter(p => {
    const matchesCat = filterCat === 'all' || p.categoryId === filterCat;
    const matchesSearch = p.nameAr.includes(searchTerm) || p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  return (
    <section id="prices" className="py-12 md:py-20 px-4 md:px-8 bg-white relative">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-3">
              دليل <span className="text-accent">الأسعار</span> الذكي
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">تحديثات يومية مباشرة لقوائم السلع المعتمدة.</p>
          </div>
          
          <motionAny.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsScannerOpen(true)}
            className="w-full lg:w-auto flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-primary-light transition-all shadow-lg"
          >
            <Scan size={24} />
            {t('scan_barcode')}
          </motionAny.button>
        </div>

        {/* Compact Filters */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-[2rem] border border-gray-100 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 start-4 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="ابحث عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full ps-11 pe-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary outline-none font-bold text-sm shadow-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
               <button onClick={() => setFilterCat('all')} className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all ${filterCat === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100'}`}>الكل</button>
               {PRICE_CATEGORIES.map(cat => (
                 <button key={cat.id} onClick={() => setFilterCat(cat.id)} className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all ${filterCat === cat.id ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100'}`}>{language === 'ar' ? cat.nameAr : cat.nameEn}</button>
               ))}
            </div>
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-hidden bg-white rounded-3xl shadow-soft border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary/5">
                <tr>
                  <th className="py-4 px-6 text-start text-primary font-black">الكود</th>
                  <th className="py-4 px-6 text-start text-primary font-black">المنتج</th>
                  <th className="py-4 px-6 text-center text-primary font-black">السعر</th>
                  <th className="py-4 px-6 text-end text-primary font-black">التحديث</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPrices.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-all cursor-pointer">
                    <td className="py-4 px-6">
                       <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-lg text-gray-500 font-bold">#{item.code}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-black text-dark">{language === 'ar' ? item.nameAr : item.nameEn}</span>
                        <span className="text-[10px] text-gray-400 font-bold">{PRICE_CATEGORIES.find(c => c.id === item.categoryId)?.nameAr}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-xl font-black text-accent">{item.price.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-gray-400">YER</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-end">
                      <span className="text-gray-400 font-bold text-[11px]">{item.lastUpdated}</span>
                    </td>
                  </tr>
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

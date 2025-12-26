
import React, { useState } from 'react';
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
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  const filteredPrices = MOCK_PRICES.filter(p => {
    const matchesCat = filterCat === 'all' || p.categoryId === filterCat;
    const matchesSearch = p.nameAr.includes(searchTerm) || p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  return (
    <section id="prices" className="py-24 px-6 md:px-16 bg-white relative">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
              دليل <span className="text-accent">الأسعار</span> الذكي
            </h2>
            <p className="text-gray-500 text-xl font-medium leading-relaxed">تحديثات يومية ومباشرة لقوائم أسعار السلع الأساسية والمواد الغذائية المعتمدة من الجهات المختصة.</p>
          </div>
          
          {/* Fix: Using motionAny.button */}
          <motionAny.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsScannerOpen(true)}
            className="w-full lg:w-auto flex items-center justify-center gap-4 bg-primary text-white px-10 py-6 rounded-3xl font-black text-xl hover:bg-primary-light transition-all shadow-elegant group"
          >
            <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform">
              <Scan size={32} />
            </div>
            {t('scan_barcode')}
            <ArrowUpRight size={24} className="opacity-50" />
          </motionAny.button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 mb-10 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute top-1/2 start-4 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="ابحث عن منتج، كود، أو اسم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full ps-12 pe-4 py-4 rounded-2xl bg-white border border-gray-200 focus:border-primary outline-none font-bold transition-all shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
             <button 
              onClick={() => setFilterCat('all')}
              className={`px-8 py-4 rounded-2xl font-black text-sm transition-all ${filterCat === 'all' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
             >
               الكل
             </button>
             {PRICE_CATEGORIES.map(cat => (
               <button 
                key={cat.id}
                onClick={() => setFilterCat(cat.id)}
                className={`px-8 py-4 rounded-2xl font-black text-sm transition-all ${filterCat === cat.id ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
               >
                 {language === 'ar' ? cat.nameAr : cat.nameEn}
               </button>
             ))}
          </div>
        </div>

        {/* Modern Table Layout */}
        <div className="overflow-hidden bg-white rounded-[2.5rem] shadow-elegant border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="bg-primary/5">
                  <th className="py-8 px-10 text-start text-primary font-black uppercase text-sm tracking-widest">الكود</th>
                  <th className="py-8 px-10 text-start text-primary font-black uppercase text-sm tracking-widest">اسم المنتج</th>
                  <th className="py-8 px-10 text-start text-primary font-black uppercase text-sm tracking-widest text-center">السعر الرسمي</th>
                  <th className="py-8 px-10 text-start text-primary font-black uppercase text-sm tracking-widest text-end">آخر تحديث</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPrices.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-all group cursor-pointer">
                    <td className="py-8 px-10">
                       <span className="px-4 py-2 bg-gray-100 text-gray-500 font-bold rounded-xl text-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">#{item.code}</span>
                    </td>
                    <td className="py-8 px-10">
                      <div className="flex flex-col">
                        <span className="text-xl font-extrabold text-dark mb-1 group-hover:text-primary transition-colors">{language === 'ar' ? item.nameAr : item.nameEn}</span>
                        <span className="text-sm text-gray-400 font-bold">{PRICE_CATEGORIES.find(c => c.id === item.categoryId)?.nameAr}</span>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-center">
                      <div className="inline-flex items-baseline gap-2">
                        <span className="text-3xl font-black text-accent">{item.price.toLocaleString()}</span>
                        <span className="text-sm font-bold text-gray-400">YER</span>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-end">
                      <div className="flex flex-col items-end">
                        <span className="text-gray-500 font-bold">{item.lastUpdated}</span>
                        <span className="text-xs text-green-500 font-black uppercase tracking-tighter">معتمد ✓</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPrices.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={48} className="text-gray-200" />
              </div>
              <p className="text-gray-400 text-2xl font-black italic">لا توجد نتائج مطابقة لعملية البحث</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isScannerOpen && <BarcodeScanner onClose={() => setIsScannerOpen(false)} />}
      </AnimatePresence>
    </section>
  );
};

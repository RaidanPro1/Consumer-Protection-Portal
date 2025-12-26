
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Camera, AlertCircle, CheckCircle2, MapPin, Send, Loader2, ScanLine, Info } from 'lucide-react';
import { MOCK_PRICES } from '../../constants';
import { PriceItem } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

declare const Html5QrcodeScanner: any;

interface BarcodeScannerProps {
  onClose: () => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onClose }) => {
  const { t, language } = useLanguage();
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [product, setProduct] = useState<PriceItem | null>(null);
  const [isReporting, setIsReporting] = useState(false);
  const [userPrice, setUserPrice] = useState('');
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const scannerRef = useRef<any>(null);
  const MotionAny = motion as any;

  const startScanner = () => {
    const scanner = new Html5QrcodeScanner(
      "reader", 
      { fps: 20, qrbox: { width: 280, height: 180 }, aspectRatio: 1.0 },
      false
    );

    const onScanSuccess = (decodedText: string) => {
      setScannedResult(decodedText);
      const found = MOCK_PRICES.find(p => p.barcode === decodedText);
      setProduct(found || null);
      scanner.clear();
    };

    scanner.render(onScanSuccess, (err: any) => {});
    scannerRef.current = scanner;
  };

  useEffect(() => {
    startScanner();
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (scannedResult && product && !isReporting) {
      const timer = setTimeout(() => {
        resetScanner();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [scannedResult, product, isReporting]);

  const resetScanner = () => {
    setScannedResult(null);
    setProduct(null);
    setIsReporting(false);
    setUserPrice('');
    setReportStatus('idle');
    setTimeout(() => startScanner(), 100);
  };

  const submitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setReportStatus('submitting');
    setTimeout(() => {
      setReportStatus('success');
      setTimeout(() => resetScanner(), 2000);
    }, 1500);
  };

  return (
    <MotionAny.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
    >
      <div className="bg-white rounded-[3.5rem] w-full max-w-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] relative">
        <button 
          onClick={onClose} 
          className="absolute top-8 end-8 z-30 p-4 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all shadow-lg"
        >
          <X size={24} />
        </button>

        <div className="p-1 md:p-12">
          {!scannedResult ? (
            <div className="text-center py-10">
              <div className="mb-10 inline-flex flex-col items-center">
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-4 relative">
                  <Camera size={44} />
                  <MotionAny.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 border-4 border-primary/20 rounded-3xl"
                  />
                </div>
                <h3 className="text-3xl font-black text-primary mb-2">{t('scan_barcode')}</h3>
                <p className="text-gray-500 font-bold">{t('scan_desc')}</p>
              </div>

              <div className="relative mx-auto max-w-sm rounded-[2.5rem] overflow-hidden border-8 border-gray-50 shadow-inner group">
                <div id="reader" className="w-full h-full bg-black" />
                {/* Viewfinder corners */}
                <div className="absolute top-10 left-10 w-12 h-12 border-t-4 border-l-4 border-accent rounded-tl-2xl pointer-events-none" />
                <div className="absolute top-10 right-10 w-12 h-12 border-t-4 border-r-4 border-accent rounded-tr-2xl pointer-events-none" />
                <div className="absolute bottom-10 left-10 w-12 h-12 border-b-4 border-l-4 border-accent rounded-bl-2xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-12 h-12 border-b-4 border-r-4 border-accent rounded-br-2xl pointer-events-none" />
                <MotionAny.div 
                  animate={{ top: ['15%', '85%', '15%'] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute left-[15%] right-[15%] h-1 bg-accent/60 shadow-[0_0_15px_#F39C12] pointer-events-none"
                />
              </div>
            </div>
          ) : (
            <MotionAny.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="py-6"
            >
              {product ? (
                <div className="space-y-8">
                  <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-[3rem] text-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500 text-white rounded-full text-sm font-black mb-8 shadow-lg">
                      <CheckCircle2 size={18} />
                      {language === 'ar' ? 'تم العثور على المنتج' : 'Product Found'}
                    </div>
                    
                    <h4 className="text-4xl font-black text-dark mb-4 leading-tight">
                      {language === 'ar' ? product.nameAr : product.nameEn}
                    </h4>
                    
                    <div className="flex flex-col items-center justify-center gap-2 mb-4">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{language === 'ar' ? 'السعر المعتمد' : 'OFFICIAL PRICE'}</span>
                      <div className="flex items-baseline gap-3">
                        <MotionAny.span 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-7xl font-black text-emerald-600"
                        >
                          {product.price.toLocaleString()}
                        </MotionAny.span>
                        <span className="text-2xl font-black text-emerald-400">YER</span>
                      </div>
                    </div>
                  </div>

                  {!isReporting ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button 
                        onClick={resetScanner} 
                        className="py-5 px-8 rounded-2xl bg-gray-100 text-gray-600 font-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                      >
                        <ScanLine size={20} />
                        {language === 'ar' ? 'مسح منتج آخر' : 'Scan Next'}
                      </button>
                      <button 
                        onClick={() => setIsReporting(true)} 
                        className="py-5 px-8 rounded-2xl bg-accent text-white font-black shadow-xl shadow-accent/20 hover:bg-accent-dark transition-all"
                      >
                        {t('report')}
                      </button>
                    </div>
                  ) : (
                    <MotionAny.form 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={submitReport} 
                      className="bg-gray-50 p-8 rounded-[2.5rem] border-2 border-dashed border-gray-200"
                    >
                      <div className="mb-6">
                        <label className="block text-sm font-black text-primary mb-3 flex items-center gap-2">
                          <AlertCircle size={16} /> {language === 'ar' ? 'كم السعر الذي دفعته؟' : 'How much did you pay?'}
                        </label>
                        <div className="relative">
                          <input 
                            required 
                            type="number" 
                            autoFocus
                            value={userPrice} 
                            onChange={(e) => setUserPrice(e.target.value)} 
                            className="w-full px-8 py-5 bg-white rounded-2xl font-black text-3xl text-primary border-2 border-transparent focus:border-accent outline-none shadow-sm transition-all" 
                            placeholder="0"
                          />
                          <span className="absolute end-8 top-1/2 -translate-y-1/2 font-black text-gray-300">YER</span>
                        </div>
                      </div>
                      <button 
                        disabled={reportStatus === 'submitting'} 
                        className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl flex items-center justify-center gap-3"
                      >
                        {reportStatus === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                        {reportStatus === 'submitting' ? t('loc_fetching') : t('submit')}
                      </button>
                    </MotionAny.form>
                  )}
                  
                  {reportStatus === 'success' && (
                    <MotionAny.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="fixed inset-0 z-50 bg-emerald-600/95 backdrop-blur-md flex flex-col items-center justify-center text-white p-10">
                       <CheckCircle2 size={120} className="mb-8" />
                       <h2 className="text-5xl font-black mb-4">{language === 'ar' ? 'تم الإرسال!' : 'Submitted!'}</h2>
                       <p className="text-xl font-medium opacity-90">{language === 'ar' ? 'شكراً لمساهمتك في الرقابة' : 'Thanks for helping monitor prices'}</p>
                    </MotionAny.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-rose-50 border-2 border-rose-100 rounded-[3rem] p-10">
                  <AlertCircle size={80} className="text-rose-500 mx-auto mb-8" />
                  <h4 className="text-3xl font-black text-rose-900 mb-4">
                    {language === 'ar' ? 'عذراً، المنتج غير متوفر في القاعدة' : 'Product Not in Database'}
                  </h4>
                  <p className="text-rose-700/60 mb-10 font-bold max-w-sm mx-auto">
                    {language === 'ar' ? 'تأكد من رمز الباركود أو حاول مع منتج آخر.' : 'Check the barcode or try another item.'}
                  </p>
                  <button onClick={resetScanner} className="bg-rose-500 text-white px-12 py-5 rounded-2xl font-black shadow-xl shadow-rose-200">
                    {language === 'ar' ? 'جرب مرة أخرى' : 'Try Again'}
                  </button>
                </div>
              )}
            </MotionAny.div>
          )}
        </div>
      </div>
    </MotionAny.div>
  );
};

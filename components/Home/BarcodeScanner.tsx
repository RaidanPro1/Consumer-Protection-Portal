
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Camera, AlertCircle, CheckCircle2, MapPin, Send, Loader2, RefreshCw, ScanLine } from 'lucide-react';
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
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const scannerRef = useRef<any>(null);
  const motionAny = motion as any;

  const startScanner = () => {
    // We target the same div even if it was previously used
    const scanner = new Html5QrcodeScanner(
      "reader", 
      { fps: 20, qrbox: { width: 280, height: 180 }, aspectRatio: 1.0 },
      /* verbose= */ false
    );

    const onScanSuccess = (decodedText: string) => {
      // Logic for immediate feedback without full stop
      setScannedResult(decodedText);
      const found = MOCK_PRICES.find(p => p.barcode === decodedText);
      setProduct(found || null);
      
      // We clear the scanner UI but we keep the logic ready for reset
      scanner.clear();
    };

    scanner.render(onScanSuccess, (err: any) => {});
    scannerRef.current = scanner;
  };

  useEffect(() => {
    startScanner();
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((e: any) => console.log(e));
      }
    };
  }, []);

  const resetScanner = () => {
    setScannedResult(null);
    setProduct(null);
    setIsReporting(false);
    setUserPrice('');
    setReportStatus('idle');
    // Reinject the scanner UI
    setTimeout(() => startScanner(), 100);
  };

  const handleReport = () => {
    setIsReporting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => alert("يرجى تفعيل الموقع لإرسال البلاغ بدقة")
      );
    }
  };

  const submitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setReportStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setReportStatus('success');
      // After success, automatically return to scanning mode for "immediate re-scanning"
      setTimeout(() => resetScanner(), 2000);
    }, 1500);
  };

  return (
    <motionAny.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-dark/90 backdrop-blur-2xl flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl relative border-8 border-white">
        <button 
          onClick={onClose}
          className="absolute top-6 end-6 z-20 p-3 bg-white/80 backdrop-blur shadow-xl rounded-2xl hover:bg-red-50 hover:text-red-500 text-gray-500 transition-all"
        >
          <X size={24} />
        </button>

        <div className="relative">
          {!scannedResult ? (
            <div className="p-10 text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary relative">
                  <Camera size={48} />
                  <motionAny.div 
                    animate={{ top: ['10%', '90%', '10%'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute left-0 right-0 h-1 bg-accent/50 shadow-[0_0_15px_#F39C12]"
                  />
                </div>
              </div>
              <h3 className="text-3xl font-black text-primary mb-4">{t('scan_barcode')}</h3>
              <p className="text-gray-500 mb-10 text-lg font-medium">{t('scan_desc')}</p>
              
              <div className="relative group">
                <div id="reader" className="overflow-hidden rounded-[2rem] border-4 border-dashed border-primary/20 bg-gray-50 aspect-square flex items-center justify-center">
                  <div className="text-gray-300 flex flex-col items-center gap-2">
                    <ScanLine size={48} className="animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">Live Camera Preview</span>
                  </div>
                </div>
                {/* Visual corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-xl pointer-events-none"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-xl pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-xl pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-xl pointer-events-none"></div>
              </div>
            </div>
          ) : (
            <motionAny.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-10"
            >
              {product ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-100 text-green-700 rounded-full text-sm font-black mb-6 shadow-sm">
                      <CheckCircle2 size={18} /> تم التحقق بنجاح
                    </div>
                    <h4 className="text-3xl font-black text-dark mb-2">{language === 'ar' ? product.nameAr : product.nameEn}</h4>
                    <p className="text-gray-400 font-mono tracking-widest bg-gray-50 py-1 px-4 rounded-lg inline-block">{scannedResult}</p>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative bg-white p-8 rounded-[2rem] border-2 border-primary/5 shadow-elegant text-center">
                      <p className="text-xs text-primary/40 font-black uppercase tracking-[0.2em] mb-3">Official Market Price</p>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-5xl font-black text-primary">{product.price.toLocaleString()}</span>
                        <span className="text-xl font-bold text-accent">YER</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-4">
                    {!isReporting ? (
                      <>
                        <button 
                          onClick={handleReport}
                          className="w-full bg-accent text-white font-black py-5 rounded-2xl hover:bg-accent-dark shadow-2xl shadow-accent/20 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                          <AlertCircle size={24} /> هل السعر مختلف؟ بلغ الآن
                        </button>
                        <button 
                          onClick={resetScanner}
                          className="w-full bg-primary/5 text-primary font-black py-5 rounded-2xl hover:bg-primary/10 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                          <RefreshCw size={24} /> مسح منتج آخر فوراً
                        </button>
                      </>
                    ) : (
                      <motionAny.form 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        onSubmit={submitReport} className="space-y-6 pt-6 border-t"
                      >
                        <div className="space-y-2">
                          <label className="block text-sm font-black text-gray-700">السعر المرصود في المنشأة</label>
                          <div className="relative">
                            <input 
                              required
                              type="number" 
                              value={userPrice}
                              onChange={(e) => setUserPrice(e.target.value)}
                              placeholder="0.00"
                              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-accent rounded-2xl outline-none font-black text-2xl text-primary transition-all"
                            />
                            <span className="absolute end-6 top-1/2 -translate-y-1/2 font-bold text-gray-300">YER</span>
                          </div>
                        </div>
                        {location && (
                          <div className="flex items-center gap-3 text-sm text-green-600 font-black bg-green-50 px-4 py-3 rounded-xl border border-green-100">
                            <MapPin size={18} /> تم تحديد الإحداثيات الجغرافية بدقة
                          </div>
                        )}
                        <button 
                          disabled={reportStatus === 'submitting'}
                          className={`w-full py-5 rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 ${reportStatus === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white hover:bg-red-700 shadow-red-500/20'}`}
                        >
                          {reportStatus === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={24} />}
                          {reportStatus === 'success' ? 'تم الإرسال.. جاري التحويل للمسح' : 'تأكيد البلاغ وإرسال الموقع'}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setIsReporting(false)}
                          className="w-full text-gray-400 font-black text-sm uppercase tracking-widest"
                        >
                          إلغاء والعودة للبيانات
                        </button>
                      </motionAny.form>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-24 h-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <AlertCircle size={48} />
                  </div>
                  <h4 className="text-3xl font-black text-dark mb-4">المنتج غير مسجل</h4>
                  <p className="text-gray-500 mb-10 text-lg font-medium leading-relaxed">عذراً، هذا الباركود غير متوفر في قواعد بيانات الأسعار الرسمية حالياً. قد يكون منتجاً جديداً أو غير مسعر رسمياً.</p>
                  <div className="flex flex-col gap-4">
                     <button onClick={resetScanner} className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20">محاولة مسح أخرى</button>
                     <button onClick={onClose} className="w-full py-5 bg-gray-100 text-gray-400 rounded-2xl font-black text-lg">إغلاق النافذة</button>
                  </div>
                </div>
              )}
            </motionAny.div>
          )}
        </div>
      </div>
    </motionAny.div>
  );
};

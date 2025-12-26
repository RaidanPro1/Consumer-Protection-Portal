
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Camera, AlertCircle, CheckCircle2, MapPin, Send, Loader2, RefreshCw } from 'lucide-react';
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
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  const startScanner = () => {
    const scanner = new Html5QrcodeScanner(
      "reader", 
      { fps: 10, qrbox: { width: 250, height: 150 } },
      /* verbose= */ false
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
        scannerRef.current.clear();
      }
    };
  }, []);

  const resetScanner = () => {
    setScannedResult(null);
    setProduct(null);
    setIsReporting(false);
    setUserPrice('');
    setReportStatus('idle');
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
    
    console.log("Submitting report to DB:", {
      product: product?.nameAr,
      barcode: scannedResult,
      officialPrice: product?.price,
      userPrice: userPrice,
      location: location,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setReportStatus('success');
      setTimeout(() => resetScanner(), 1500);
    }, 1500);
  };

  return (
    /* Fix: Using motionAny.div */
    <motionAny.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 end-4 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-500"
        >
          <X size={24} />
        </button>

        {!scannedResult ? (
          <div className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Camera size={40} />
              </div>
            </div>
            <h3 className="text-2xl font-black text-primary mb-2">{t('scan_barcode')}</h3>
            <p className="text-gray-500 mb-8">{t('scan_desc')}</p>
            <div id="reader" className="overflow-hidden rounded-2xl border-2 border-primary/20"></div>
          </div>
        ) : (
          <div className="p-8">
            {product ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
                    <CheckCircle2 size={16} /> تم العثور على المنتج
                  </div>
                  <h4 className="text-2xl font-black text-dark">{language === 'ar' ? product.nameAr : product.nameEn}</h4>
                  <p className="text-gray-400 font-mono text-sm">Barcode: {scannedResult}</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
                  <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">السعر الرسمي</p>
                  <div className="text-4xl font-black text-primary">{product.price.toLocaleString()} <span className="text-lg">YER</span></div>
                </div>

                <div className="flex flex-col gap-3">
                  {!isReporting ? (
                    <>
                      <button 
                        onClick={handleReport}
                        className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-[#e67e22] shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2"
                      >
                        <AlertCircle size={20} /> هل السعر مختلف؟ بلغ الآن
                      </button>
                      <button 
                        onClick={resetScanner}
                        className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw size={18} /> مسح منتج آخر
                      </button>
                    </>
                  ) : (
                    /* Fix: Using motionAny.form */
                    <motionAny.form 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      onSubmit={submitReport} className="space-y-4 pt-4 border-t"
                    >
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">السعر في المحل</label>
                        <input 
                          required
                          type="number" 
                          value={userPrice}
                          onChange={(e) => setUserPrice(e.target.value)}
                          placeholder="أدخل السعر الذي وجدته..."
                          className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-accent/20 outline-none"
                        />
                      </div>
                      {location && (
                        <div className="flex items-center gap-2 text-xs text-green-600 font-bold">
                          <MapPin size={14} /> تم التقاط الموقع تلقائياً
                        </div>
                      )}
                      <button 
                        disabled={reportStatus === 'submitting'}
                        className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                      >
                        {reportStatus === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                        {reportStatus === 'success' ? 'تم إرسال البلاغ بنجاح' : 'إرسال البلاغ والموقع'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setIsReporting(false)}
                        className="w-full text-gray-500 font-bold text-sm"
                      >
                        إلغاء البلاغ والعودة
                      </button>
                    </motionAny.form>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={32} />
                </div>
                <h4 className="text-xl font-bold text-dark mb-2">المنتج غير موجود</h4>
                <p className="text-gray-500 mb-8">عذراً، هذا الباركود غير مسجل في قاعدة بياناتنا الرسمية حالياً.</p>
                <div className="flex flex-col gap-3">
                   <button onClick={resetScanner} className="w-full py-3 bg-primary text-white rounded-xl font-bold">إعادة المحاولة</button>
                   <button onClick={onClose} className="w-full py-3 bg-gray-100 text-gray-500 rounded-xl font-bold">إغلاق</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motionAny.div>
  );
};


import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';
import { 
  LayoutDashboard, FileText, Tag, LogOut, Settings, Users, Plus, 
  Trash2, Pencil, CheckCircle, Save, Image as ImageIcon, Palette, Map as MapIcon,
  AlertTriangle, Navigation, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsItem, PriceItem, SiteSettings, User, Violation } from '../../types';

type TabType = 'dashboard' | 'news' | 'prices' | 'map' | 'users' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { dir, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isViolationModalOpen, setIsViolationModalOpen] = useState(false);
  const [editingViolation, setEditingViolation] = useState<Violation | null>(null);
  const [users] = useState<User[]>([
    { id: '1', name: 'Admin Root', email: 'admin@cpa-ye.org', role: 'admin' },
  ]);
  
  const MotionAny = motion as any;

  useEffect(() => {
    const loadData = async () => {
      const [newsData, priceData, settingsData, mapData] = await Promise.all([
        apiService.getAllNews(),
        apiService.getPrices(),
        apiService.getSettings(),
        apiService.getViolations()
      ]);
      setNews(newsData);
      setPrices(priceData);
      setSettings(settingsData);
      setViolations(mapData);
    };
    loadData();
  }, []);

  const handleDeleteViolation = async (id: number) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا البلاغ؟' : 'Delete this violation?')) {
      await apiService.deleteViolation(id);
      setViolations(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleSaveViolation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const v: Violation = {
      id: editingViolation?.id || Date.now(),
      lat: parseFloat(formData.get('lat') as string),
      lng: parseFloat(formData.get('lng') as string),
      typeAr: formData.get('typeAr') as string,
      typeEn: formData.get('typeEn') as string,
      date: formData.get('date') as string,
      descriptionAr: formData.get('descAr') as string,
      descriptionEn: formData.get('descEn') as string,
      status: formData.get('status') as any,
    };
    await apiService.saveViolation(v);
    const updated = await apiService.getViolations();
    setViolations(updated);
    setIsViolationModalOpen(false);
    setEditingViolation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-cairo" dir={dir}>
      {/* CMS Sidebar */}
      <aside className={`w-72 bg-primary text-white flex flex-col fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0 shadow-2xl z-50'}`}>
        <div className="p-8 border-b border-white/10 flex flex-col items-center gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-glow">
            <img src={settings?.logoUrl} className="h-12 w-auto object-contain" alt="Logo" />
          </div>
          <span className="font-black text-xl tracking-tighter">نظام الإدارة الذكي</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'الرئيسية' },
            { id: 'news', icon: FileText, label: 'الأخبار' },
            { id: 'prices', icon: Tag, label: 'قوائم الأسعار' },
            { id: 'map', icon: MapIcon, label: 'إدارة الخريطة' },
            { id: 'users', icon: Users, label: 'المستخدمين' },
            { id: 'settings', icon: Settings, label: 'الإعدادات' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-accent text-white shadow-lg' : 'text-white/60 hover:bg-white/5'}`}>
              <tab.icon size={20} /> <span className="font-bold">{tab.label}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => window.location.hash = '#home'} className="m-6 p-4 rounded-xl border border-white/10 flex items-center justify-center gap-3 text-white/60 hover:text-white hover:bg-red-500/20 transition-all">
          <LogOut size={20} /> تسجيل الخروج
        </button>
      </aside>

      <main className={`flex-1 ${dir === 'rtl' ? 'pr-72' : 'pl-72'}`}>
        <header className="bg-white/80 backdrop-blur-md border-b px-12 py-8 flex justify-between items-center sticky top-0 z-40">
          <h1 className="text-3xl font-black text-primary capitalize">
            {activeTab === 'map' ? 'إدارة نقاط الرصد' : activeTab}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="font-black text-primary">أدمن النظام</span>
              <span className="text-[10px] uppercase font-bold text-accent">Super Admin</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/5 border flex items-center justify-center text-primary font-black">AD</div>
          </div>
        </header>

        <div className="p-12">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <MotionAny.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                  {[
                    { label: 'الأخبار', val: news.length, color: 'text-blue-600' },
                    { label: 'السلع', val: prices.length, color: 'text-emerald-600' },
                    { label: 'المخالفات', val: violations.length, color: 'text-accent' },
                    { label: 'المستخدمين', val: users.length, color: 'text-purple-600' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] shadow-soft border border-gray-100">
                      <p className="text-gray-400 font-bold mb-1 text-xs uppercase tracking-widest">{stat.label}</p>
                      <p className={`text-4xl font-black ${stat.color}`}>{stat.val}</p>
                    </div>
                  ))}
                </div>
              </MotionAny.div>
            )}

            {activeTab === 'map' && (
              <MotionAny.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-dark mb-1">نقاط رصد المخالفات</h2>
                    <p className="text-muted font-bold text-sm">إدارة البيانات المعروضة على خارطة الرصد الميداني.</p>
                  </div>
                  <button 
                    onClick={() => { setEditingViolation(null); setIsViolationModalOpen(true); }}
                    className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-lg hover:bg-accent transition-all"
                  >
                    <Plus size={20} /> إضافة نقطة جديدة
                  </button>
                </div>
                
                <div className="bg-white rounded-[2rem] shadow-soft border border-gray-100 overflow-hidden">
                  <table className="w-full text-start">
                    <thead className="bg-gray-50 border-b">
                      <tr className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        <th className="px-8 py-6 text-start">النوع الموقع</th>
                        <th className="px-8 py-6 text-center">الإحداثيات</th>
                        <th className="px-8 py-6 text-center">التاريخ</th>
                        <th className="px-8 py-6 text-center">الحالة</th>
                        <th className="px-8 py-6 text-end">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {violations.map(v => (
                        <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${v.typeAr === 'تلاعب بالأسعار' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                <AlertTriangle size={18} />
                              </div>
                              <span className="font-black text-primary">{language === 'ar' ? v.typeAr : v.typeEn}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-xs font-bold text-muted">
                              <Navigation size={12} className="text-accent" />
                              {v.lat.toFixed(4)}, {v.lng.toFixed(4)}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-center font-bold text-sm text-gray-500">{v.date}</td>
                          <td className="px-8 py-6 text-center">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${v.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                              {v.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => { setEditingViolation(v); setIsViolationModalOpen(true); }} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Pencil size={18} /></button>
                              <button onClick={() => handleDeleteViolation(v.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </MotionAny.div>
            )}

            {activeTab === 'news' && (
               <MotionAny.div key="news" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black text-dark">إدارة المقالات الإخبارية</h2>
                    <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2">
                      <Plus size={20} /> خبر جديد
                    </button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {news.map(n => (
                      <div key={n.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft flex gap-6">
                        <img src={n.image} className="w-24 h-24 rounded-2xl object-cover" alt="" />
                        <div className="flex-1">
                          <h4 className="font-black text-primary text-lg mb-2 line-clamp-1">{n.titleAr}</h4>
                          <p className="text-xs font-bold text-muted mb-4">{n.date}</p>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-gray-50 rounded-lg text-xs font-black">تعديل</button>
                            <button className="px-4 py-2 bg-red-50 text-red-500 rounded-lg text-xs font-black">حذف</button>
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
               </MotionAny.div>
            )}
          </AnimatePresence>
        </div>

        {/* Violation Modal */}
        <AnimatePresence>
          {isViolationModalOpen && (
            <MotionAny.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
            >
              <MotionAny.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[2.5rem] w-full max-w-2xl p-10 shadow-2xl relative"
              >
                <button onClick={() => setIsViolationModalOpen(false)} className="absolute top-8 end-8 text-gray-400 hover:text-primary"><X size={24} /></button>
                <h2 className="text-2xl font-black text-primary mb-8">{editingViolation ? 'تعديل نقطة رصد' : 'إضافة نقطة رصد جديدة'}</h2>
                <form onSubmit={handleSaveViolation} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">النوع (عربي)</label>
                      <input name="typeAr" defaultValue={editingViolation?.typeAr} required className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">Type (EN)</label>
                      <input name="typeEn" defaultValue={editingViolation?.typeEn} required className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">خط العرض (Lat)</label>
                      <input name="lat" type="number" step="0.000001" defaultValue={editingViolation?.lat} required className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">خط الطول (Lng)</label>
                      <input name="lng" type="number" step="0.000001" defaultValue={editingViolation?.lng} required className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">التاريخ</label>
                      <input name="date" type="date" defaultValue={editingViolation?.date || new Date().toISOString().split('T')[0]} required className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">الحالة</label>
                      <select name="status" defaultValue={editingViolation?.status || 'pending'} className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold">
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-accent transition-all">حفظ البيانات</button>
                </form>
              </MotionAny.div>
            </MotionAny.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

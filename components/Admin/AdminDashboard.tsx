
import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';
import { 
  LayoutDashboard, FileText, Tag, LogOut, Settings, Users, Plus, 
  Trash2, Pencil, CheckCircle, Save, Image as ImageIcon, Palette, Map as MapIcon,
  AlertTriangle, Navigation, X, Table as TableIcon, Eye, Calendar, Clock, MapPin,
  Briefcase, Globe, Layers, ArrowRight, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsItem, PriceItem, SiteSettings, User, Violation, ServiceItem } from '../../types';
import { RichTextEditor } from './RichTextEditor';

type TabType = 'dashboard' | 'news' | 'prices' | 'map' | 'services' | 'users' | 'settings';
type ViewMode = 'table' | 'map';

interface Cluster {
  id: string;
  lat: number;
  lng: number;
  count: number;
  items: Violation[];
}

export const AdminDashboard: React.FC = () => {
  const { dir, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  
  const [isViolationModalOpen, setIsViolationModalOpen] = useState(false);
  const [editingViolation, setEditingViolation] = useState<Violation | null>(null);
  const [viewingViolation, setViewingViolation] = useState<Violation | null>(null);
  
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsFormContentAr, setNewsFormContentAr] = useState('');
  const [newsFormContentEn, setNewsFormContentEn] = useState('');

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [users] = useState<User[]>([
    { id: '1', name: 'Admin Root', email: 'admin@cpa-ye.org', role: 'admin' },
  ]);
  
  const MotionAny = motion as any;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [newsData, priceData, settingsData, mapData, servicesData] = await Promise.all([
      apiService.getAllNews(),
      apiService.getPrices(),
      apiService.getSettings(),
      apiService.getViolations(),
      apiService.getServices()
    ]);
    setNews(newsData);
    setPrices(priceData);
    setSettings(settingsData);
    setViolations(mapData);
    setServices(servicesData);
  };

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated: SiteSettings = {
      ...settings!,
      logoUrl: formData.get('logoUrl') as string,
      sidebarBgUrl: formData.get('sidebarBgUrl') as string,
      brandNameAr: formData.get('brandNameAr') as string,
      brandNameEn: formData.get('brandNameEn') as string,
      primaryColor: formData.get('primaryColor') as string,
      accentColor: formData.get('accentColor') as string,
    };
    await apiService.updateSettings(updated);
    setSettings(updated);
    alert(language === 'ar' ? 'تم حفظ الإعدادات' : 'Settings saved');
  };

  // News CRUD Logic
  const handleAddNews = () => {
    setEditingNews(null);
    setNewsFormContentAr('');
    setNewsFormContentEn('');
    setIsNewsModalOpen(true);
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setNewsFormContentAr(item.contentAr || '');
    setNewsFormContentEn(item.contentEn || '');
    setIsNewsModalOpen(true);
  };

  const handleDeleteNews = async (id: number) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الخبر؟' : 'Are you sure you want to delete this news item?')) {
      await apiService.deleteNews(id);
      loadData();
    }
  };

  const handleSaveNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newsItem: Partial<NewsItem> = {
      id: editingNews?.id,
      titleAr: formData.get('titleAr') as string,
      titleEn: formData.get('titleEn') as string,
      descAr: formData.get('descAr') as string,
      descEn: formData.get('descEn') as string,
      image: formData.get('image') as string,
      date: formData.get('date') as string || new Date().toISOString().split('T')[0],
      contentAr: newsFormContentAr,
      contentEn: newsFormContentEn,
    };
    await apiService.saveNews(newsItem as NewsItem);
    setIsNewsModalOpen(false);
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-cairo" dir={dir}>
      {/* CMS Sidebar */}
      <aside 
        className={`w-72 bg-primary text-white flex flex-col fixed inset-y-0 ${dir === 'rtl' ? 'right-0 shadow-[-10px_0_30px_rgba(0,0,0,0.1)]' : 'left-0 shadow-[10px_0_30px_rgba(0,0,0,0.1)]'} z-50 overflow-hidden`}
        style={{
          backgroundImage: settings?.sidebarBgUrl ? `url(${settings.sidebarBgUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {settings?.sidebarBgUrl && <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm z-0" />}

        <div className="relative z-10 flex flex-col h-full">
          <div className="p-8 border-b border-white/10 flex flex-col items-center gap-4">
            <div className="bg-white p-3 rounded-2xl shadow-glow">
              <img src={settings?.logoUrl} className="h-12 w-auto object-contain" alt="Logo" />
            </div>
            <span className="font-black text-xl tracking-tighter">نظام الإدارة الذكي</span>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'الرئيسية' },
              { id: 'news', icon: FileText, label: 'الأخبار' },
              { id: 'prices', icon: Tag, label: 'قوائم الأسعار' },
              { id: 'map', icon: MapIcon, label: 'إدارة الخريطة' },
              { id: 'services', icon: Layers, label: 'الخدمات' },
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
        </div>
      </aside>

      <main className={`flex-1 ${dir === 'rtl' ? 'pr-72' : 'pl-72'}`}>
        <header className="bg-white/80 backdrop-blur-md border-b px-12 py-8 flex justify-between items-center sticky top-0 z-40">
          <h1 className="text-3xl font-black text-primary capitalize">
            {activeTab}
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

            {activeTab === 'news' && (
              <MotionAny.div key="news-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-black text-primary">إدارة المقالات الإخبارية</h2>
                  <button onClick={handleAddNews} className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-lg hover:bg-accent transition-all">
                    <Plus size={20} /> إضافة خبر جديد
                  </button>
                </div>

                <div className="bg-white rounded-[2rem] shadow-soft border overflow-hidden">
                  <table className="w-full text-start">
                    <thead className="bg-gray-50 border-b">
                      <tr className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        <th className="px-8 py-6 text-start">العنوان</th>
                        <th className="px-8 py-6 text-start">التاريخ</th>
                        <th className="px-8 py-6 text-end">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {news.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                              <span className="font-black text-primary line-clamp-1">{language === 'ar' ? item.titleAr : item.titleEn}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-gray-500 font-bold">{item.date}</td>
                          <td className="px-8 py-6">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleEditNews(item)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Pencil size={18} /></button>
                              <button onClick={() => handleDeleteNews(item.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </MotionAny.div>
            )}

            {/* Other tabs implementations... */}
            {activeTab === 'settings' && (
              <MotionAny.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-white p-12 rounded-[3rem] shadow-soft border max-w-4xl mx-auto">
                  <h2 className="text-3xl font-black text-primary mb-8">إعدادات الهوية البصرية</h2>
                  <form onSubmit={handleSaveSettings} className="space-y-8">
                    {/* Settings fields... */}
                    <button type="submit" className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-xl shadow-xl hover:bg-accent transition-all">حفظ التغييرات</button>
                  </form>
                </div>
              </MotionAny.div>
            )}
          </AnimatePresence>
        </div>

        {/* News Edit Modal */}
        <AnimatePresence>
          {isNewsModalOpen && (
            <MotionAny.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto"
            >
              <MotionAny.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[2.5rem] w-full max-w-4xl p-10 shadow-2xl relative my-8"
              >
                <button onClick={() => setIsNewsModalOpen(false)} className="absolute top-8 end-8 text-gray-400 hover:text-primary"><X size={24} /></button>
                <h2 className="text-2xl font-black text-primary mb-8">{editingNews ? 'تعديل الخبر' : 'إضافة خبر جديد'}</h2>
                <form onSubmit={handleSaveNews} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">العنوان (AR)</label>
                      <input name="titleAr" defaultValue={editingNews?.titleAr} required className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">Title (EN)</label>
                      <input name="titleEn" defaultValue={editingNews?.titleEn} required className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase">رابط الصورة (Image URL)</label>
                    <input name="image" defaultValue={editingNews?.image} required className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" placeholder="https://..." />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">ملخص (AR)</label>
                      <textarea name="descAr" defaultValue={editingNews?.descAr} className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold h-20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">Summary (EN)</label>
                      <textarea name="descEn" defaultValue={editingNews?.descEn} className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold h-20" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase block">المحتوى التفصيلي (AR)</label>
                    <RichTextEditor dir="rtl" initialValue={newsFormContentAr} onChange={setNewsFormContentAr} />
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase block">Detailed Content (EN)</label>
                    <RichTextEditor dir="ltr" initialValue={newsFormContentEn} onChange={setNewsFormContentEn} />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-accent transition-all">حفظ المقال</button>
                    <button type="button" onClick={() => setIsNewsModalOpen(false)} className="px-8 py-5 border-2 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-all">إلغاء</button>
                  </div>
                </form>
              </MotionAny.div>
            </MotionAny.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

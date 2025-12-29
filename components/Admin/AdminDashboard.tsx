
import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';
import { 
  LayoutDashboard, FileText, Tag, LogOut, Settings, Users, Plus, 
  Trash2, Pencil, CheckCircle, Save, Image as ImageIcon, Palette, Map as MapIcon,
  AlertTriangle, Navigation, X, Table as TableIcon, Eye, Calendar, Clock, MapPin,
  Briefcase, Globe, Layers, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsItem, PriceItem, SiteSettings, User, Violation, ServiceItem } from '../../types';

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
  
  // Filters for Map
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');

  const [isViolationModalOpen, setIsViolationModalOpen] = useState(false);
  const [editingViolation, setEditingViolation] = useState<Violation | null>(null);
  const [viewingViolation, setViewingViolation] = useState<Violation | null>(null);
  const [selectedMapItem, setSelectedMapItem] = useState<Violation | null>(null);
  const [expandedCluster, setExpandedCluster] = useState<Cluster | null>(null);

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [users] = useState<User[]>([
    { id: '1', name: 'Admin Root', email: 'admin@cpa-ye.org', role: 'admin' },
  ]);
  
  const MotionAny = motion as any;

  useEffect(() => {
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
    loadData();
  }, []);

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

  const handleSaveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingService) return;
    const formData = new FormData(e.currentTarget);
    const updated: ServiceItem = {
      ...editingService,
      titleAr: formData.get('titleAr') as string,
      titleEn: formData.get('titleEn') as string,
      descAr: formData.get('descAr') as string,
      descEn: formData.get('descEn') as string,
      isCustomIcon: formData.get('isCustomIcon') === 'true',
      iconUrl: formData.get('iconUrl') as string,
    };
    await apiService.updateService(updated);
    const refreshed = await apiService.getServices();
    setServices(refreshed);
    setEditingService(null);
  };

  const handleDeleteViolation = async (id: number) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا البلاغ؟' : 'Delete this violation?')) {
      await apiService.deleteViolation(id);
      const updated = await apiService.getViolations();
      setViolations(updated);
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

  // Filter violations by Date Range
  const filteredViolations = useMemo(() => {
    return violations.filter(v => {
      const vDate = new Date(v.date);
      const start = dateStart ? new Date(dateStart) : null;
      const end = dateEnd ? new Date(dateEnd) : null;
      
      if (start && vDate < start) return false;
      if (end && vDate > end) return false;
      return true;
    });
  }, [violations, dateStart, dateEnd]);

  // Clustering logic with refined dynamic simulation
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

  return (
    <div className="min-h-screen bg-gray-50 flex font-cairo" dir={dir}>
      {/* CMS Sidebar with Custom Background */}
      <aside 
        className={`w-72 bg-primary text-white flex flex-col fixed inset-y-0 ${dir === 'rtl' ? 'right-0 shadow-[-10px_0_30px_rgba(0,0,0,0.1)]' : 'left-0 shadow-[10px_0_30px_rgba(0,0,0,0.1)]'} z-50 overflow-hidden`}
        style={{
          backgroundImage: settings?.sidebarBgUrl ? `url(${settings.sidebarBgUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Darkened overlay for custom background readability */}
        {settings?.sidebarBgUrl && <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm z-0" />}

        <div className="relative z-10">
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
            {activeTab === 'map' ? 'إدارة نقاط الرصد' : activeTab === 'services' ? 'إدارة الخدمات' : activeTab}
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

            {activeTab === 'services' && (
              <MotionAny.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {services.map(s => (
                     <div key={s.id} className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-gray-100 flex flex-col items-center text-center group">
                        <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all overflow-hidden">
                          {s.isCustomIcon && s.iconUrl ? (
                            <img src={s.iconUrl} className="w-full h-full object-cover" alt="icon" />
                          ) : (
                            <Globe size={40} />
                          )}
                        </div>
                        <h3 className="text-2xl font-black text-primary mb-2">{language === 'ar' ? s.titleAr : s.titleEn}</h3>
                        <p className="text-muted mb-8 line-clamp-3 italic">{language === 'ar' ? s.descAr : s.descEn}</p>
                        <button 
                          onClick={() => setEditingService(s)}
                          className="w-full py-4 bg-gray-50 border rounded-xl font-black text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <Pencil size={18} /> تعديل الخدمة
                        </button>
                     </div>
                   ))}
                </div>
              </MotionAny.div>
            )}

            {activeTab === 'map' && (
              <MotionAny.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-white p-6 rounded-[2rem] shadow-soft border mb-8 flex flex-col lg:flex-row items-center gap-6">
                  <div className="flex-1 flex flex-col md:flex-row gap-4 w-full">
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">من تاريخ</label>
                      <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl outline-none font-bold" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">إلى تاريخ</label>
                      <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl outline-none font-bold" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                      <button onClick={() => setViewMode('table')} className={`p-3 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}><TableIcon size={18} /></button>
                      <button onClick={() => setViewMode('map')} className={`p-3 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}><MapIcon size={18} /></button>
                    </div>
                    <button onClick={() => { setEditingViolation(null); setIsViolationModalOpen(true); }} className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-lg hover:bg-accent transition-all"><Plus size={20} /> إضافة بلاغ</button>
                  </div>
                </div>
                
                {viewMode === 'table' ? (
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
                        {filteredViolations.map(v => (
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
                                <button onClick={() => setViewingViolation(v)} className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"><Eye size={18} /></button>
                                <button onClick={() => { setEditingViolation(v); setIsViolationModalOpen(true); }} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Pencil size={18} /></button>
                                <button onClick={() => handleDeleteViolation(v.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="relative h-[650px] bg-white rounded-[2.5rem] shadow-elegant border-8 border-white overflow-hidden group">
                    <div className="absolute inset-0 bg-[#eef2f3] opacity-40" style={{backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
                    
                    {clusteredMarkers.map(cluster => (
                      <MotionAny.div
                        key={cluster.id}
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute cursor-pointer z-20"
                        style={{ 
                          top: `${((cluster.lat - 13.56) / 0.03) * 100}%`, 
                          left: `${((cluster.lng - 44.0) / 0.03) * 100}%` 
                        }}
                        onClick={() => {
                          if (cluster.count > 1) {
                            setExpandedCluster(cluster);
                          } else {
                            setSelectedMapItem(cluster.items[0]);
                          }
                        }}
                      >
                        <MotionAny.div whileHover={{ scale: 1.1 }} className={`relative flex items-center justify-center transition-transform`}>
                          {cluster.count > 1 ? (
                            <div className="w-12 h-12 bg-accent text-white rounded-full border-4 border-white shadow-xl flex items-center justify-center font-black text-lg">
                              {cluster.count}
                            </div>
                          ) : (
                            <div className={`p-3 rounded-full shadow-lg ${cluster.items[0].typeAr === 'تلاعب بالأسعار' ? 'bg-red-500' : 'bg-blue-500'} text-white border-2 border-white`}>
                              <MapPin size={24} />
                            </div>
                          )}
                        </MotionAny.div>
                      </MotionAny.div>
                    ))}

                    {/* Cluster Expanded Preview - Refined Visual Feedback */}
                    <AnimatePresence>
                      {expandedCluster && (
                        <MotionAny.div 
                          initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          className="absolute inset-0 z-50 bg-primary/20 backdrop-blur-sm flex items-center justify-center p-12"
                        >
                          <div className="bg-white rounded-[3rem] w-full max-w-xl p-8 shadow-2xl relative">
                            <button onClick={() => setExpandedCluster(null)} className="absolute top-6 end-6 text-gray-400 hover:text-primary"><X size={24} /></button>
                            <h3 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
                              <MapIcon size={24} className="text-accent" />
                              {language === 'ar' ? 'محتويات التجمع' : 'Cluster Items'} ({expandedCluster.count})
                            </h3>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto px-2">
                              {expandedCluster.items.map(v => (
                                <div key={v.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center group hover:bg-primary/5 transition-all">
                                  <div>
                                    <p className="font-black text-primary">{language === 'ar' ? v.typeAr : v.typeEn}</p>
                                    <p className="text-xs text-muted font-bold">{v.date}</p>
                                  </div>
                                  <button onClick={() => { setViewingViolation(v); setExpandedCluster(null); }} className="p-2 bg-white text-primary rounded-lg border group-hover:bg-primary group-hover:text-white transition-all"><ArrowRight size={18} /></button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </MotionAny.div>
                      )}
                    </AnimatePresence>

                    {/* Quick View Info Card for Map */}
                    <AnimatePresence>
                      {selectedMapItem && (
                        <MotionAny.div 
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                          className={`absolute bottom-10 ${dir === 'rtl' ? 'left-10' : 'right-10'} w-80 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 border z-40`}
                        >
                          <button onClick={() => setSelectedMapItem(null)} className="absolute top-4 end-4 text-gray-400 hover:text-dark"><X size={18} /></button>
                          <h4 className="text-xl font-black text-primary mb-2 line-clamp-1">{language === 'ar' ? selectedMapItem.typeAr : selectedMapItem.typeEn}</h4>
                          <div className="flex gap-2 text-xs font-bold text-muted mb-4">
                            <Calendar size={12} /> {selectedMapItem.date}
                          </div>
                          <p className="text-sm text-gray-600 mb-6 line-clamp-2 italic">
                            {language === 'ar' ? selectedMapItem.descriptionAr : selectedMapItem.descriptionEn}
                          </p>
                          <button 
                            onClick={() => { setViewingViolation(selectedMapItem); setSelectedMapItem(null); }}
                            className="w-full bg-primary text-white py-3 rounded-xl font-black text-sm hover:bg-accent transition-all flex items-center justify-center gap-2"
                          >
                            <Eye size={16} /> عرض كامل التفاصيل
                          </button>
                        </MotionAny.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </MotionAny.div>
            )}

            {activeTab === 'settings' && (
              <MotionAny.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-white p-12 rounded-[3rem] shadow-soft border max-w-4xl mx-auto">
                  <h2 className="text-3xl font-black text-primary mb-8">إعدادات الهوية البصرية</h2>
                  <form onSubmit={handleSaveSettings} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">رابط الشعار (Logo)</label>
                        <input name="logoUrl" defaultValue={settings?.logoUrl} className="w-full p-4 rounded-2xl bg-gray-50 border outline-none font-bold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">خلفية الشريط الجانبي (Sidebar Bg)</label>
                        <input name="sidebarBgUrl" defaultValue={settings?.sidebarBgUrl} placeholder="https://..." className="w-full p-4 rounded-2xl bg-gray-50 border outline-none font-bold" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">اسم الجهة (AR)</label>
                        <input name="brandNameAr" defaultValue={settings?.brandNameAr} className="w-full p-4 rounded-2xl bg-gray-50 border outline-none font-bold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Brand Name (EN)</label>
                        <input name="brandNameEn" defaultValue={settings?.brandNameEn} className="w-full p-4 rounded-2xl bg-gray-50 border outline-none font-bold" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">اللون الأساسي</label>
                        <div className="flex gap-4">
                           <input name="primaryColor" type="color" defaultValue={settings?.primaryColor} className="h-14 w-14 rounded-xl border-none p-0 cursor-pointer" />
                           <input defaultValue={settings?.primaryColor} className="flex-1 p-4 bg-gray-50 rounded-2xl font-bold uppercase" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">اللون المميز</label>
                        <div className="flex gap-4">
                           <input name="accentColor" type="color" defaultValue={settings?.accentColor} className="h-14 w-14 rounded-xl border-none p-0 cursor-pointer" />
                           <input defaultValue={settings?.accentColor} className="flex-1 p-4 bg-gray-50 rounded-2xl font-bold uppercase" />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-xl shadow-xl hover:bg-accent transition-all">حفظ التغييرات</button>
                  </form>
                </div>
              </MotionAny.div>
            )}
          </AnimatePresence>
        </div>

        {/* Edit Service Modal */}
        <AnimatePresence>
          {editingService && (
            <MotionAny.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
            >
              <MotionAny.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[2.5rem] w-full max-w-2xl p-10 shadow-2xl relative"
              >
                <button onClick={() => setEditingService(null)} className="absolute top-8 end-8 text-gray-400 hover:text-primary"><X size={24} /></button>
                <h2 className="text-2xl font-black text-primary mb-8">تعديل الخدمة</h2>
                <form onSubmit={handleSaveService} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">العنوان (AR)</label>
                      <input name="titleAr" defaultValue={editingService.titleAr} required className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">Title (EN)</label>
                      <input name="titleEn" defaultValue={editingService.titleEn} required className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase">تفعيل أيقونة مخصصة</label>
                    <select name="isCustomIcon" defaultValue={editingService.isCustomIcon ? 'true' : 'false'} className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold">
                       <option value="false">أيقونة افتراضية</option>
                       <option value="true">أيقونة مخصصة (رابط)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase">رابط الأيقونة (Icon URL)</label>
                    <input name="iconUrl" defaultValue={editingService.iconUrl} className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold" placeholder="https://..." />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">الوصف (AR)</label>
                      <textarea name="descAr" defaultValue={editingService.descAr} className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold h-24" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase">Description (EN)</label>
                      <textarea name="descEn" defaultValue={editingService.descEn} className="w-full p-4 rounded-xl bg-gray-50 border outline-none font-bold h-24" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-accent transition-all">حفظ بيانات الخدمة</button>
                </form>
              </MotionAny.div>
            </MotionAny.div>
          )}
        </AnimatePresence>

        {/* Detail Viewing Modal */}
        <AnimatePresence>
          {viewingViolation && (
            <MotionAny.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[105] bg-dark/70 backdrop-blur-md flex items-center justify-center p-6"
            >
              <MotionAny.div 
                initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
                className="bg-white rounded-[3rem] w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col"
              >
                <div className="bg-primary p-10 text-white flex justify-between items-center">
                  <div>
                    <span className="bg-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Violation ID #{viewingViolation.id}</span>
                    <h2 className="text-3xl font-black">{language === 'ar' ? viewingViolation.typeAr : viewingViolation.typeEn}</h2>
                  </div>
                  <button onClick={() => setViewingViolation(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"><X size={24} /></button>
                </div>
                
                <div className="p-10 space-y-8 overflow-y-auto max-h-[70vh]">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-3xl">
                      <div className="flex items-center gap-3 text-gray-400 text-xs font-black uppercase mb-4"><Calendar size={16} /> تاريخ الرصد</div>
                      <p className="text-lg font-black text-primary">{viewingViolation.date}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-3xl">
                      <div className="flex items-center gap-3 text-gray-400 text-xs font-black uppercase mb-4"><CheckCircle size={16} /> حالة البلاغ</div>
                      <span className={`px-4 py-1.5 rounded-full font-black text-sm ${viewingViolation.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                        {viewingViolation.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-black text-primary flex items-center gap-2">
                       <Navigation size={20} className="text-accent" /> الموقع الجغرافي
                    </h4>
                    <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex justify-around">
                       <div className="text-center">
                         <span className="block text-xs font-bold text-muted uppercase mb-1">LATITUDE</span>
                         <span className="font-black text-xl text-primary">{viewingViolation.lat.toFixed(6)}</span>
                       </div>
                       <div className="w-px h-12 bg-primary/10" />
                       <div className="text-center">
                         <span className="block text-xs font-bold text-muted uppercase mb-1">LONGITUDE</span>
                         <span className="font-black text-xl text-primary">{viewingViolation.lng.toFixed(6)}</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-black text-primary flex items-center gap-2">
                       <FileText size={20} className="text-accent" /> تفاصيل المخالفة المرصودة
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                        <span className="block text-[10px] font-black text-gray-400 uppercase mb-3">البيان باللغة العربية</span>
                        <p className="text-lg font-medium leading-relaxed italic">{viewingViolation.descriptionAr}</p>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                        <span className="block text-[10px] font-black text-gray-400 uppercase mb-3">English Statement</span>
                        <p className="text-lg font-medium leading-relaxed italic">{viewingViolation.descriptionEn}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gray-50 border-t flex gap-4">
                  <button 
                    onClick={() => { setEditingViolation(viewingViolation); setViewingViolation(null); setIsViolationModalOpen(true); }}
                    className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-accent transition-all flex items-center justify-center gap-2"
                  >
                    <Pencil size={20} /> تعديل البيانات
                  </button>
                  <button 
                    onClick={() => setViewingViolation(null)}
                    className="flex-1 bg-white text-primary border-2 border-primary/10 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all"
                  >
                    إغلاق العرض
                  </button>
                </div>
              </MotionAny.div>
            </MotionAny.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

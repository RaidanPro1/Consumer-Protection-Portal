
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, FileText, Tag, LogOut, AlertTriangle, Plus, Pencil, Trash2, X,
  Image as ImageIcon, Upload, Monitor, Briefcase, HandHeart, Heart, Settings,
  Activity, Trophy, MessageSquare, Key, Shield, Info, History, User, Clock, CheckCircle,
  MapPin, Eye, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  NEWS_DATA, MOCK_PRICES, PRICE_CATEGORIES, TEAM_MEMBERS, ABOUT_US_DATA,
  JOB_LISTINGS, VOLUNTEER_DATA, DONATION_METHODS, INITIAL_STATS, 
  INITIAL_SETTINGS, SUCCESS_STORIES, TESTIMONIALS, SERVICES_DATA, MOCK_VIOLATIONS
} from '../../constants';
import { 
  NewsItem, PriceItem, PriceCategory, TeamMember, AboutUsContent,
  JobItem, VolunteerContent, DonationMethod, SiteStatistics, SiteSettings,
  SuccessStory, Testimonial, AuditLog, ServiceItem, Violation
} from '../../types';
import { RichTextEditor } from './RichTextEditor';

type TabType = 'dashboard' | 'violations' | 'services' | 'news' | 'stories' | 'jobs' | 'volunteering' | 'donations' | 'prices' | 'seo' | 'settings' | 'logs';

export const AdminDashboard: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const motionAny = motion as any;

  // CMS States
  const [news, setNews] = useState<NewsItem[]>(NEWS_DATA);
  const [prices, setPrices] = useState<PriceItem[]>(MOCK_PRICES);
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [violations, setViolations] = useState<Violation[]>(MOCK_VIOLATIONS);
  const [jobs, setJobs] = useState<JobItem[]>(JOB_LISTINGS);
  const [volunteer, setVolunteer] = useState<VolunteerContent>(VOLUNTEER_DATA);
  const [donations, setDonations] = useState<DonationMethod[]>(DONATION_METHODS);
  const [stats, setStats] = useState<SiteStatistics>(INITIAL_STATS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [stories, setStories] = useState<SuccessStory[]>(SUCCESS_STORIES);
  const [logs, setLogs] = useState<AuditLog[]>([
    { id: 1, action: 'دخول النظام', user: 'المشرف العام', details: 'تم تسجيل الدخول إلى لوحة التحكم', timestamp: new Date().toISOString() }
  ]);

  // Modals
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<Partial<NewsItem> | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<ServiceItem> | null>(null);

  const addLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: Date.now(),
      action,
      user: 'المشرف العام',
      details,
      timestamp: new Date().toISOString(),
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleLogout = () => { 
    addLog('تسجيل خروج', 'تم مغادرة لوحة التحكم');
    window.location.hash = '#home'; 
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
         setSiteSettings({...siteSettings, logoUrl: reader.result as string});
         addLog('تحديث الشعار', 'تم تغيير شعار المنصة الرئيسي');
       };
       reader.readAsDataURL(file);
    }
  };

  const handleServiceIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentService) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentService({ ...currentService, icon: reader.result as string, isCustomIcon: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex relative font-cairo" dir={dir}>
      {/* Sidebar */}
      <aside className={`w-72 bg-primary text-white flex flex-col shadow-2xl z-50 fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'}`}>
        <div className="p-8 border-b border-white/10 flex flex-col items-center gap-4">
           <img src={siteSettings.logoUrl} alt="Logo" className="w-24 h-24 object-contain bg-white rounded-2xl p-2" />
           <span className="text-xl font-black">لوحة الإدارة</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'الرئيسية' },
            { id: 'violations', icon: MapPin, label: 'المخالفات' },
            { id: 'services', icon: Briefcase, label: 'الخدمات' },
            { id: 'news', icon: FileText, label: 'الأخبار' },
            { id: 'stories', icon: Trophy, label: 'الإنجازات' },
            { id: 'jobs', icon: Briefcase, label: 'الوظائف' },
            { id: 'prices', icon: Tag, label: 'الأسعار' },
            { id: 'seo', icon: Key, label: 'SEO' },
            { id: 'settings', icon: Settings, label: 'الإعدادات' },
            { id: 'logs', icon: History, label: 'السجلات' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-accent text-white shadow-lg' : 'hover:bg-white/10 text-white/70'}`}>
              <tab.icon size={20} /> <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/10">
          <button onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-4 w-full px-5 py-4 hover:bg-red-600 rounded-2xl transition-all font-bold"><LogOut size={20} /> خروج</button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 flex flex-col min-w-0 ${dir === 'rtl' ? 'pr-72' : 'pl-72'}`}>
        <header className="bg-white border-b px-12 py-8 flex justify-between items-center sticky top-0 z-40 shadow-sm">
          <h1 className="text-3xl font-black text-primary uppercase">{activeTab}</h1>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="font-black text-dark">المشرف العام</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Administrator</p>
             </div>
             <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white font-black shadow-lg">AD</div>
          </div>
        </header>

        <div className="p-12 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motionAny.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                   <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-2">
                      <MapPin className="text-red-500" size={32} />
                      <p className="text-gray-400 font-bold">المخالفات المرصودة</p>
                      <p className="text-4xl font-black text-primary">{violations.length}</p>
                   </div>
                   <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-2">
                      <Tag className="text-blue-500" size={32} />
                      <p className="text-gray-400 font-bold">قائمة الأسعار</p>
                      <p className="text-4xl font-black text-primary">{prices.length}</p>
                   </div>
                   <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-2">
                      <FileText className="text-purple-500" size={32} />
                      <p className="text-gray-400 font-bold">إجمالي الأخبار</p>
                      <p className="text-4xl font-black text-primary">{news.length}</p>
                   </div>
                   <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-2">
                      <Trophy className="text-yellow-500" size={32} />
                      <p className="text-gray-400 font-bold">الإنجازات</p>
                      <p className="text-4xl font-black text-primary">{stories.length}</p>
                   </div>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                   <h2 className="text-2xl font-black mb-8 flex items-center gap-3"><Activity /> تعديل الإحصائيات المباشرة</h2>
                   <div className="grid md:grid-cols-3 gap-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2">إجمالي البلاغات</label>
                        <input type="number" value={stats.totalReports} onChange={e => setStats({...stats, totalReports: parseInt(e.target.value)})} className="w-full bg-gray-50 p-4 rounded-xl border-none focus:ring-2 focus:ring-primary/20 font-bold" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2">بلاغات مؤكدة</label>
                        <input type="number" value={stats.verifiedDiscrepancies} onChange={e => setStats({...stats, verifiedDiscrepancies: parseInt(e.target.value)})} className="w-full bg-gray-50 p-4 rounded-xl border-none focus:ring-2 focus:ring-primary/20 font-bold" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2">مخالفات نشطة</label>
                        <input type="number" value={stats.activeViolations} onChange={e => setStats({...stats, activeViolations: parseInt(e.target.value)})} className="w-full bg-gray-50 p-4 rounded-xl border-none focus:ring-2 focus:ring-primary/20 font-bold" />
                      </div>
                   </div>
                   <button onClick={() => addLog('تحديث الإحصائيات', 'تغيير أرقام العدادات الرئيسية')} className="mt-8 bg-primary text-white px-8 py-3 rounded-xl font-black hover:bg-primary-light transition-all shadow-lg shadow-primary/20">تحديث الإحصائيات</button>
                </div>
              </motionAny.div>
            )}

            {activeTab === 'violations' && (
              <motionAny.div key="violations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-primary">إدارة البلاغات والمخالفات</h2>
                  <div className="flex gap-4">
                    <button className="bg-white border px-6 py-2 rounded-xl font-bold flex items-center gap-2"><Eye size={18} /> عرض الكل</button>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-right">
                    <thead className="bg-gray-50 border-b">
                      <tr className="text-gray-500 font-black text-sm">
                        <th className="p-6">التاريخ</th>
                        <th className="p-6">النوع</th>
                        <th className="p-6">الوصف</th>
                        <th className="p-6">الحالة</th>
                        <th className="p-6">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {violations.map(v => (
                        <tr key={v.id} className="hover:bg-gray-50/50">
                          <td className="p-6 font-bold">{v.date}</td>
                          <td className="p-6 font-black">{v.typeAr}</td>
                          <td className="p-6 text-gray-500 max-w-xs truncate">{v.descriptionAr}</td>
                          <td className="p-6">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black ${v.status === 'verified' ? 'bg-green-100 text-green-700' : v.status === 'resolved' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                              {v.status === 'verified' ? 'مؤكد' : v.status === 'resolved' ? 'تم الحل' : 'قيد المراجعة'}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil size={18} /></button>
                              <button onClick={() => {
                                setViolations(violations.filter(item => item.id !== v.id));
                                addLog('حذف بلاغ', `حذف البلاغ رقم: ${v.id}`);
                              }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motionAny.div>
            )}

            {activeTab === 'services' && (
              <motionAny.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-primary">إدارة الخدمات والأيقونات</h2>
                  <button onClick={() => { setCurrentService({ id: Date.now(), titleAr: '', titleEn: '', icon: 'search' }); setIsServiceModalOpen(true); }} className="bg-primary text-white px-8 py-3 rounded-2xl font-black flex items-center gap-3 shadow-lg">
                    <Plus size={20}/> إضافة خدمة جديدة
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {services.map(s => (
                    <div key={s.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative group">
                       <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                          {s.isCustomIcon || (s.icon.startsWith('http') || s.icon.startsWith('data:')) ? (
                            <img src={s.icon} className="w-10 h-10 object-contain" alt="Icon" />
                          ) : (
                            <Activity size={32} className="text-primary" />
                          )}
                       </div>
                       <h4 className="text-xl font-black mb-2">{s.titleAr}</h4>
                       <p className="text-gray-400 text-sm line-clamp-2 mb-6">{s.descAr}</p>
                       <div className="flex gap-4">
                          <button onClick={() => { setCurrentService(s); setIsServiceModalOpen(true); }} className="text-blue-500 font-bold text-sm">تعديل</button>
                          <button onClick={() => {
                             setServices(services.filter(item => item.id !== s.id));
                             addLog('حذف خدمة', `حذف الخدمة: ${s.titleAr}`);
                          }} className="text-red-500 font-bold text-sm">حذف</button>
                       </div>
                    </div>
                  ))}
                </div>
              </motionAny.div>
            )}

            {activeTab === 'logs' && (
              <motionAny.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-black flex items-center gap-3"><History className="text-primary" /> سجل العمليات الإدارية</h2>
                      <button onClick={() => setLogs([])} className="text-red-500 font-bold flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"><Trash2 size={18} /> مسح السجل</button>
                   </div>
                   
                   <div className="overflow-x-auto">
                     <table className="w-full text-right">
                        <thead>
                           <tr className="bg-gray-50 text-gray-500 uppercase text-sm font-black border-b">
                              <th className="py-4 px-6">الوقت والتاريخ</th>
                              <th className="py-4 px-6">المستخدم</th>
                              <th className="py-4 px-6">العملية</th>
                              <th className="py-4 px-6">التفاصيل</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           {logs.map(log => (
                              <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                                 <td className="py-5 px-6 font-bold text-gray-500 flex items-center gap-2">
                                    <Clock size={16} className="text-gray-300" />
                                    {new Date(log.timestamp).toLocaleString('ar-YE', { dateStyle: 'medium', timeStyle: 'short' })}
                                 </td>
                                 <td className="py-5 px-6 font-black text-dark">{log.user}</td>
                                 <td className="py-5 px-6">
                                    <span className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-xs font-black">{log.action}</span>
                                 </td>
                                 <td className="py-5 px-6 text-gray-600 font-medium">{log.details}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                   </div>
                </div>
              </motionAny.div>
            )}

            {/* Other tabs follow similar pattern (SEO, News, etc.) */}
          </AnimatePresence>
        </div>
      </main>

      {/* Service Modal with Icon Upload */}
      <AnimatePresence>
        {isServiceModalOpen && currentService && (
          <motionAny.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
             <div className="bg-white p-10 rounded-3xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
                <button onClick={() => setIsServiceModalOpen(false)} className="absolute top-8 left-8 text-gray-300 hover:text-dark transition-colors"><X size={32}/></button>
                <h2 className="text-3xl font-black mb-10 text-primary">إدارة الخدمة والأيقونة</h2>
                <div className="space-y-8">
                   <div className="flex flex-col md:flex-row gap-10">
                      <div className="w-48 h-48 bg-gray-50 rounded-3xl border-4 border-dashed flex flex-col items-center justify-center relative group overflow-hidden">
                         {(currentService.isCustomIcon || (currentService.icon && (currentService.icon.startsWith('http') || currentService.icon.startsWith('data:')))) ? (
                           <img src={currentService.icon} className="w-24 h-24 object-contain" alt="Icon" />
                         ) : (
                           <ImageIcon size={48} className="text-gray-300" />
                         )}
                         <label className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-xs font-black">
                            <Upload />
                            رفع أيقونة مخصصة
                            <input type="file" accept="image/*" onChange={handleServiceIconUpload} className="hidden" />
                         </label>
                      </div>
                      <div className="flex-1 space-y-6">
                         <div className="grid md:grid-cols-2 gap-4">
                            <div>
                               <label className="block text-sm font-bold text-gray-500 mb-2">العنوان (عربي)</label>
                               <input value={currentService.titleAr || ''} onChange={e => setCurrentService({...currentService, titleAr: e.target.value})} className="w-full bg-gray-50 border-none p-4 rounded-xl font-bold" />
                            </div>
                            <div>
                               <label className="block text-sm font-bold text-gray-500 mb-2">Title (English)</label>
                               <input value={currentService.titleEn || ''} onChange={e => setCurrentService({...currentService, titleEn: e.target.value})} className="w-full bg-gray-50 border-none p-4 rounded-xl font-bold" />
                            </div>
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-500 mb-2">الوصف (عربي)</label>
                            <textarea value={currentService.descAr || ''} onChange={e => setCurrentService({...currentService, descAr: e.target.value})} className="w-full bg-gray-50 border-none p-4 rounded-xl font-bold" rows={3}></textarea>
                         </div>
                      </div>
                   </div>

                   <button onClick={() => {
                      const isUpdate = services.find(s => s.id === currentService.id);
                      if (isUpdate) {
                        setServices(services.map(s => s.id === currentService.id ? currentService as ServiceItem : s));
                        addLog('تحديث خدمة', `تعديل الخدمة: ${currentService.titleAr}`);
                      } else {
                        setServices([...services, currentService as ServiceItem]);
                        addLog('إضافة خدمة', `إضافة الخدمة الجديدة: ${currentService.titleAr}`);
                      }
                      setIsServiceModalOpen(false);
                   }} className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-primary-light transition-all">حفظ الخدمة</button>
                </div>
             </div>
          </motionAny.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogoutConfirm && (
          <motionAny.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-white p-10 rounded-3xl max-w-sm w-full text-center shadow-2xl">
                <AlertTriangle size={64} className="text-red-500 mx-auto mb-6" />
                <h3 className="text-2xl font-black mb-2">تأكيد الخروج</h3>
                <p className="text-gray-400 mb-8 font-bold">هل أنت متأكد من رغبتك في تسجيل الخروج؟</p>
                <div className="flex gap-4">
                  <button onClick={handleLogout} className="flex-1 bg-red-600 text-white font-black py-3 rounded-xl">خروج</button>
                  <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 bg-gray-100 font-black py-3 rounded-xl text-gray-500">إلغاء</button>
                </div>
             </div>
          </motionAny.div>
        )}
      </AnimatePresence>
    </div>
  );
};

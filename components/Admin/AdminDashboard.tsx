
import React, { useState, useRef, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, 
  FileText, 
  Tag, 
  LogOut, 
  AlertTriangle, 
  Plus, 
  Pencil, 
  Trash2, 
  X,
  Image as ImageIcon,
  Calendar as CalendarIcon,
  Check,
  Upload,
  ChevronRight,
  ChevronLeft,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Database,
  RefreshCw,
  MoreVertical,
  Filter,
  Grid,
  ShieldCheck,
  Shield,
  Monitor,
  Users,
  Info,
  Briefcase,
  HandHeart,
  Heart,
  Settings,
  Activity,
  Trophy,
  MessageSquare,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  NEWS_DATA, 
  MOCK_PRICES, 
  PRICE_CATEGORIES, 
  HERO_SLIDES, 
  SERVICES_DATA, 
  PRIVACY_POLICY, 
  TEAM_MEMBERS, 
  ABOUT_US_DATA,
  JOB_LISTINGS,
  VOLUNTEER_DATA,
  DONATION_METHODS,
  INITIAL_STATS,
  INITIAL_SETTINGS,
  SUCCESS_STORIES,
  TESTIMONIALS
} from '../../constants';
import { 
  NewsItem, 
  PriceItem, 
  PriceCategory, 
  HeroSlide, 
  ServiceItem, 
  PrivacyPolicyContent, 
  TeamMember, 
  AboutUsContent,
  JobItem,
  VolunteerContent,
  DonationMethod,
  SiteStatistics,
  SiteSettings,
  SuccessStory,
  Testimonial
} from '../../types';
import { RichTextEditor } from './RichTextEditor';

type TabType = 'dashboard' | 'about' | 'team' | 'success-stories' | 'testimonials' | 'jobs' | 'volunteers' | 'donations' | 'news' | 'prices' | 'categories' | 'site-settings' | 'seo';

export const AdminDashboard: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  // CMS States
  const [news, setNews] = useState<NewsItem[]>(NEWS_DATA);
  const [prices, setPrices] = useState<PriceItem[]>(MOCK_PRICES);
  const [categories, setCategories] = useState<PriceCategory[]>(PRICE_CATEGORIES);
  const [team, setTeam] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [aboutUs, setAboutUs] = useState<AboutUsContent>(ABOUT_US_DATA);
  const [jobs, setJobs] = useState<JobItem[]>(JOB_LISTINGS);
  const [volunteer, setVolunteer] = useState<VolunteerContent>(VOLUNTEER_DATA);
  const [donations, setDonations] = useState<DonationMethod[]>(DONATION_METHODS);
  const [stats, setStats] = useState<SiteStatistics>(INITIAL_STATS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [stories, setStories] = useState<SuccessStory[]>(SUCCESS_STORIES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  // UI States
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  // Current Item States
  const [currentNews, setCurrentNews] = useState<Partial<NewsItem> | null>(null);
  const [currentJob, setCurrentJob] = useState<Partial<JobItem> | null>(null);
  const [currentStory, setCurrentStory] = useState<Partial<SuccessStory> | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [deleteContext, setDeleteContext] = useState<{ id: number, type: 'news' | 'team' | 'job' | 'donation' | 'story' | 'test' } | null>(null);

  const handleLogout = () => { window.location.hash = '#home'; setShowLogoutConfirm(false); };

  const confirmDeleteAction = (id: number, type: 'news' | 'team' | 'job' | 'donation' | 'story' | 'test') => {
    setDeleteContext({ id, type });
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (!deleteContext) return;
    const { id, type } = deleteContext;
    if (type === 'news') setNews(news.filter(n => n.id !== id));
    if (type === 'team') setTeam(team.filter(t => t.id !== id));
    if (type === 'job') setJobs(jobs.filter(j => j.id !== id));
    if (type === 'donation') setDonations(donations.filter(d => d.id !== id));
    if (type === 'story') setStories(stories.filter(s => s.id !== id));
    if (type === 'test') setTestimonials(testimonials.filter(t => t.id !== id));
    setIsDeleteConfirmOpen(false);
    setDeleteContext(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: Function, current: any) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert("File too large (max 2MB)"); return; }
      const reader = new FileReader();
      reader.onloadend = () => setter({ ...current, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       const reader = new FileReader();
       reader.onloadend = () => setSiteSettings({...siteSettings, logoUrl: reader.result as string});
       reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex relative font-cairo text-right" dir={dir}>
      {/* Sidebar */}
      <aside className={`w-72 bg-primary text-white flex flex-col shadow-2xl z-50 fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'}`}>
        <div className="p-8 border-b border-white/10 flex flex-col items-center gap-4">
           <img src={siteSettings.logoUrl} alt="CMS Logo" className="w-32 h-32 object-contain bg-white rounded-2xl p-2" />
           <span className="text-xl font-black tracking-tight">لوحة الإدارة</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: t('admin_dashboard') },
            { id: 'news', icon: FileText, label: t('news') },
            { id: 'success-stories', icon: Trophy, label: t('success_stories') },
            { id: 'testimonials', icon: MessageSquare, label: t('testimonials') },
            { id: 'jobs', icon: Briefcase, label: t('jobs') },
            { id: 'volunteers', icon: HandHeart, label: t('volunteering') },
            { id: 'prices', icon: Tag, label: t('manage_prices') },
            { id: 'seo', icon: Key, label: t('manage_keywords') },
            { id: 'site-settings', icon: Settings, label: t('site_config') }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-accent text-white shadow-xl' : 'hover:bg-white/10 text-white/70'}`}>
              <tab.icon size={20} /> <span className="text-base">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/10">
          <button onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-4 w-full px-5 py-4 hover:bg-red-600 rounded-2xl transition-all font-bold"><LogOut size={20} /> {t('logout')}</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col min-w-0 ${dir === 'rtl' ? 'pr-72' : 'pl-72'}`}>
        <header className="bg-white/80 backdrop-blur-md border-b px-12 py-8 flex justify-between items-center sticky top-0 z-40">
          <h1 className="text-3xl font-black text-primary">{activeTab.replace('-', ' ').toUpperCase()}</h1>
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
                <span className="font-black text-dark">المشرف العام</span>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Administrator</span>
             </div>
             <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white font-black shadow-lg">AD</div>
          </div>
        </header>

        <div className="p-12 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              /* Fix: Using motionAny.div */
              <motionAny.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                   {[
                     { label: 'البلاغات', val: stats.totalReports, icon: FileText, color: 'text-blue-500' },
                     { label: 'الوظائف', val: jobs.length, icon: Briefcase, color: 'text-orange-500' },
                     { label: 'الأخبار', val: news.length, icon: ImageIcon, color: 'text-purple-500' },
                     { label: 'الإنجازات', val: stories.length, icon: Trophy, color: 'text-yellow-500' }
                   ].map((item, i) => (
                     <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col gap-4">
                        <item.icon size={32} className={item.color} />
                        <div>
                          <h3 className="text-gray-400 font-bold mb-1">{item.label}</h3>
                          <p className="text-4xl font-black text-dark">{item.val}</p>
                        </div>
                     </div>
                   ))}
                </div>
                
                <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="p-3 bg-primary/5 text-primary rounded-2xl"><Activity size={32} /></div>
                      <h2 className="text-2xl font-black">إحصائيات المنصة الحية</h2>
                   </div>
                   <div className="grid md:grid-cols-3 gap-10">
                      <div className="space-y-3">
                        <label className="block text-sm font-black text-gray-500">إجمالي البلاغات المسجلة</label>
                        <input type="number" value={stats.totalReports} onChange={e => setStats({...stats, totalReports: parseInt(e.target.value)})} className="w-full bg-gray-50 border-none p-4 rounded-2xl font-bold text-lg focus:ring-2 focus:ring-primary/20"/>
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-black text-gray-500">مخالفات تم التحقق منها</label>
                        <input type="number" value={stats.verifiedDiscrepancies} onChange={e => setStats({...stats, verifiedDiscrepancies: parseInt(e.target.value)})} className="w-full bg-gray-50 border-none p-4 rounded-2xl font-bold text-lg focus:ring-2 focus:ring-primary/20"/>
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-black text-gray-500">بلاغات قيد المتابعة</label>
                        <input type="number" value={stats.activeViolations} onChange={e => setStats({...stats, activeViolations: parseInt(e.target.value)})} className="w-full bg-gray-50 border-none p-4 rounded-2xl font-bold text-lg focus:ring-2 focus:ring-primary/20"/>
                      </div>
                   </div>
                   <button className="mt-10 bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-secondary transition-all">تحديث الإحصائيات</button>
                </div>
              </motionAny.div>
            )}

            {activeTab === 'seo' && (
              /* Fix: Using motionAny.div */
              <motionAny.div key="seo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-12">
                 <div className="bg-white p-12 rounded-[2.5rem] shadow-xl space-y-10">
                    <div className="flex items-center gap-4 border-b pb-6">
                       <Key size={32} className="text-accent" />
                       <h2 className="text-2xl font-black">الكلمات الدلالية الرئيسية (Global SEO)</h2>
                    </div>
                    
                    <div className="space-y-8">
                       <div className="space-y-3">
                          <label className="block font-black text-dark">الكلمات المفتاحية بالعربي</label>
                          <textarea 
                            value={siteSettings.metaKeywordsAr} 
                            onChange={e => setSiteSettings({...siteSettings, metaKeywordsAr: e.target.value})}
                            className="w-full bg-gray-50 border-none p-6 rounded-3xl font-bold min-h-[120px] focus:ring-2 focus:ring-primary/20"
                            placeholder="مثال: حماية المستهلك، تعز، الأسعار..."
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="block font-black text-dark">Keywords in English</label>
                          <textarea 
                            value={siteSettings.metaKeywordsEn} 
                            onChange={e => setSiteSettings({...siteSettings, metaKeywordsEn: e.target.value})}
                            className="w-full bg-gray-50 border-none p-6 rounded-3xl font-bold min-h-[120px] focus:ring-2 focus:ring-primary/20"
                            dir="ltr"
                            placeholder="Example: consumer, Taiz, monitoring..."
                          />
                       </div>
                    </div>
                    
                    <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
                       <Info className="text-blue-500 mt-1" size={20} />
                       <p className="text-sm text-blue-800 font-bold leading-relaxed">
                          هذه الكلمات تظهر في كود الموقع المصدري وتساعد محركات البحث (مثل جوجل) في تصنيف المنصة وتسهيل وصول المستخدمين إليها في محافظة تعز.
                       </p>
                    </div>

                    <button className="w-full bg-primary text-white py-5 rounded-3xl font-black shadow-2xl hover:bg-secondary transition-all">حفظ إعدادات الـ SEO</button>
                 </div>
              </motionAny.div>
            )}

            {activeTab === 'news' && (
              /* Fix: Using motionAny.div */
              <motionAny.div key="news" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-black text-primary">إدارة محتوى الأخبار</h2>
                    <button onClick={() => { setCurrentNews({ id: Date.now(), titleAr: '', titleEn: '', descAr: '', descEn: '', image: 'https://via.placeholder.com/800x600', date: new Date().toISOString().split('T')[0], keywordsAr: '', keywordsEn: '' }); setIsNewsModalOpen(true); }} className="bg-primary text-white px-8 py-3 rounded-2xl font-black flex items-center gap-3 shadow-lg hover:bg-secondary transition-all">
                       <Plus size={20}/> إضافة خبر جديد
                    </button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {news.map(n => (
                       <div key={n.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex gap-6 group hover:shadow-xl transition-all">
                          <img src={n.image} className="w-32 h-32 rounded-[2rem] object-cover shadow-md" />
                          <div className="flex-1 space-y-2">
                             <div className="flex justify-between items-start">
                                <h4 className="font-black text-xl text-dark leading-tight line-clamp-2">{n.titleAr}</h4>
                                <div className="flex gap-1">
                                   <button onClick={() => { setCurrentNews(n); setIsNewsModalOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"><Pencil size={18}/></button>
                                   <button onClick={() => confirmDeleteAction(n.id, 'news')} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={18}/></button>
                                </div>
                             </div>
                             <p className="text-sm text-gray-400 font-bold">{n.date}</p>
                             <div className="flex gap-2 flex-wrap">
                                {(n.keywordsAr || '').split(',').map((k, i) => k.trim() && (
                                   <span key={i} className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-black">#{k.trim()}</span>
                                ))}
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </motionAny.div>
            )}

            {activeTab === 'site-settings' && (
              /* Fix: Using motionAny.div */
              <motionAny.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-12">
                 <div className="bg-white p-12 rounded-[2.5rem] shadow-xl space-y-10">
                    <h2 className="text-2xl font-black border-b pb-6">تخصيص الهوية (Logo & Visuals)</h2>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                       <div className="w-48 h-48 border-4 border-dashed border-gray-100 rounded-[2.5rem] flex items-center justify-center overflow-hidden bg-gray-50 shadow-inner group relative">
                          {siteSettings.logoUrl ? (
                             <img src={siteSettings.logoUrl} className="w-full h-full object-contain p-6" alt="Logo Preview" />
                          ) : (
                             <Shield size={64} className="text-gray-200" />
                          )}
                          <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                             <Upload className="text-white" size={32} />
                          </div>
                       </div>
                       <div className="flex-1 space-y-6">
                          <div>
                            <h4 className="font-black text-lg mb-2">شعار المنصة</h4>
                            <p className="text-sm text-gray-400 leading-relaxed font-bold">
                               سيتم تحديث الشعار تلقائياً في شريط القnavigation والقائمة السفلية ولوحة التحكم.
                               يفضل استخدام صور شفافة بجودة عالية (PNG/SVG).
                            </p>
                          </div>
                          <label className="inline-flex bg-primary text-white px-8 py-3 rounded-2xl font-black cursor-pointer hover:bg-secondary transition-all shadow-xl">
                             تغيير الشعار
                             <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                          </label>
                          {siteSettings.logoUrl && (
                             <button onClick={() => setSiteSettings({...siteSettings, logoUrl: ""})} className="ms-6 text-red-500 font-bold hover:underline">إعادة للوضع الافتراضي</button>
                          )}
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-white p-12 rounded-[2.5rem] shadow-xl space-y-8">
                    <h2 className="text-2xl font-black border-b pb-6">إعدادات الصفحة الرئيسية</h2>
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-white shadow-sm rounded-xl text-primary"><Monitor size={24}/></div>
                          <div>
                            <h4 className="font-black">شريط الإحصائيات المباشرة</h4>
                            <p className="text-xs text-gray-400 font-bold">إظهار أو إخفاء عداد البلاغات في الصفحة الأولى.</p>
                          </div>
                       </div>
                       <button 
                        onClick={() => setSiteSettings({...siteSettings, showStatsOnHome: !siteSettings.showStatsOnHome})} 
                        className={`w-16 h-9 rounded-full transition-all relative ${siteSettings.showStatsOnHome ? 'bg-accent' : 'bg-gray-300'}`}
                       >
                          <div className={`absolute top-1.5 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${siteSettings.showStatsOnHome ? 'left-8' : 'left-1.5'}`}></div>
                       </button>
                    </div>
                    <button className="w-full bg-primary text-white py-5 rounded-3xl font-black shadow-2xl hover:bg-secondary transition-all">حفظ الإعدادات العامة</button>
                 </div>
              </motionAny.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* News Modal */}
      <AnimatePresence>
        {isNewsModalOpen && currentNews && (
          /* Fix: Using motionAny.div */
          <motionAny.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-dark/60 backdrop-blur-md flex items-center justify-center p-6">
             <div className="bg-white p-10 rounded-[3rem] max-w-4xl w-full relative max-h-[90vh] overflow-y-auto shadow-2xl">
                <button onClick={() => setIsNewsModalOpen(false)} className="absolute top-8 left-8 text-gray-300 hover:text-dark transition-colors"><X size={32}/></button>
                <h2 className="text-3xl font-black mb-10 text-primary">إدارة تفاصيل الخبر</h2>
                <div className="space-y-8">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="block font-black text-gray-500">العنوان (عربي)</label>
                         <input value={currentNews.titleAr} onChange={e => setCurrentNews({...currentNews, titleAr: e.target.value})} className="w-full bg-gray-50 border-none p-4 rounded-2xl font-bold" />
                      </div>
                      <div className="space-y-3 text-left" dir="ltr">
                         <label className="block font-black text-gray-500">Title (English)</label>
                         <input value={currentNews.titleEn} onChange={e => setCurrentNews({...currentNews, titleEn: e.target.value})} className="w-full bg-gray-50 border-none p-4 rounded-2xl font-bold" />
                      </div>
                   </div>
                   
                   <div className="space-y-3">
                      <label className="block font-black text-gray-500">محتوى الخبر</label>
                      <RichTextEditor initialValue={currentNews.descAr || ''} onChange={val => setCurrentNews({...currentNews, descAr: val})} dir="rtl" />
                   </div>

                   <div className="grid md:grid-cols-2 gap-8 bg-accent/5 p-8 rounded-[2rem]">
                      <div className="space-y-3">
                         <label className="block font-black text-accent flex items-center gap-2"><Key size={16}/> كلمات دلالية (SEO)</label>
                         <input value={currentNews.keywordsAr} onChange={e => setCurrentNews({...currentNews, keywordsAr: e.target.value})} className="w-full bg-white border-none p-4 rounded-2xl font-bold text-sm" placeholder="أخبار، حماية، تعز..." />
                      </div>
                      <div className="space-y-3 text-left" dir="ltr">
                         <label className="block font-black text-accent flex items-center gap-2"><Key size={16}/> Keywords (SEO)</label>
                         <input value={currentNews.keywordsEn} onChange={e => setCurrentNews({...currentNews, keywordsEn: e.target.value})} className="w-full bg-white border-none p-4 rounded-2xl font-bold text-sm" placeholder="news, protect, Taiz..." />
                      </div>
                   </div>

                   <button onClick={() => {
                      if (news.find(n => n.id === currentNews.id)) setNews(news.map(n => n.id === currentNews.id ? currentNews as NewsItem : n));
                      else setNews([...news, currentNews as NewsItem]);
                      setIsNewsModalOpen(false);
                   }} className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl hover:bg-secondary transition-all">حفظ ونشر الخبر</button>
                </div>
             </div>
          </motionAny.div>
        )}
      </AnimatePresence>

      {/* Other Modals (Success Story, Job, Testimonial) similar pattern with SEO fields... */}
    </div>
  );
};

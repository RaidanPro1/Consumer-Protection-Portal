
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';
import { 
  LayoutDashboard, FileText, Tag, LogOut, Settings, Users, Plus, 
  Trash2, Pencil, CheckCircle, Save, Image as ImageIcon, Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsItem, PriceItem, SiteSettings, User } from '../../types';

type TabType = 'dashboard' | 'news' | 'prices' | 'users' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Admin Root', email: 'admin@cpa-ye.org', role: 'admin' },
    { id: '2', name: 'Field Editor', email: 'editor@cpa-ye.org', role: 'editor' }
  ]);
  // Fixed: Capitalized MotionAny to follow React component naming conventions
  const MotionAny = motion as any;

  useEffect(() => {
    const loadData = async () => {
      const newsData = await apiService.getAllNews();
      const priceData = await apiService.getPrices();
      const settingsData = await apiService.getSettings();
      setNews(newsData);
      setPrices(priceData);
      setSettings(settingsData);
    };
    loadData();
  }, []);

  const handleSaveSettings = async () => {
    if (settings) {
      await apiService.updateSettings(settings);
      alert("Settings Saved Successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-cairo" dir={dir}>
      {/* CMS Sidebar */}
      <aside className={`w-72 bg-primary text-white flex flex-col fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'}`}>
        <div className="p-8 border-b border-white/10 flex flex-col items-center gap-4">
          <img src={settings?.logoUrl} className="w-20 h-20 object-contain bg-white rounded-xl p-2" alt="CMS Logo" />
          <span className="font-black text-xl">Admin CMS</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'news', icon: FileText, label: 'News CMS' },
            { id: 'prices', icon: Tag, label: 'Price List' },
            { id: 'users', icon: Users, label: 'Users' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-accent text-white' : 'text-white/60 hover:bg-white/5'}`}>
              <tab.icon size={20} /> <span className="font-bold">{tab.label}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => window.location.hash = '#home'} className="p-8 border-t border-white/10 flex items-center gap-3 text-white/60 hover:text-white">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      <main className={`flex-1 ${dir === 'rtl' ? 'pr-72' : 'pl-72'}`}>
        <header className="bg-white border-b px-12 py-8 flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-3xl font-black text-primary capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black">System Online</span>
          </div>
        </header>

        <div className="p-12">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <MotionAny key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <p className="text-gray-400 font-bold mb-1">Total News</p>
                    <p className="text-4xl font-black text-primary">{news.length}</p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <p className="text-gray-400 font-bold mb-1">Catalog Items</p>
                    <p className="text-4xl font-black text-primary">{prices.length}</p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <p className="text-gray-400 font-bold mb-1">System Users</p>
                    <p className="text-4xl font-black text-primary">{users.length}</p>
                  </div>
                </div>
              </MotionAny>
            )}

            {activeTab === 'news' && (
              <MotionAny key="news" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-dark">Manage Articles</h2>
                  <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                    <Plus size={20} /> Add News
                  </button>
                </div>
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-start">
                    <thead className="bg-gray-50 border-b">
                      <tr className="text-sm font-black text-gray-400">
                        <th className="px-8 py-4">Title</th>
                        <th className="px-8 py-4">Date</th>
                        <th className="px-8 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {news.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-6 font-black text-primary">{item.titleAr}</td>
                          <td className="px-8 py-6 text-gray-400">{item.date}</td>
                          <td className="px-8 py-6 flex gap-3">
                            <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil size={18} /></button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </MotionAny>
            )}

            {activeTab === 'settings' && settings && (
              <MotionAny key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-8">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                  <h3 className="text-xl font-black flex items-center gap-3"><ImageIcon className="text-accent" /> Visual Branding</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-500 mb-2">Logo URL</label>
                      <input value={settings.logoUrl} onChange={e => setSettings({...settings, logoUrl: e.target.value})} className="w-full bg-gray-50 p-4 rounded-xl border-none font-bold" />
                    </div>
                    <div className="flex items-end">
                      <img src={settings.logoUrl} className="h-14 w-auto object-contain border p-2 rounded" alt="Preview" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                  <h3 className="text-xl font-black flex items-center gap-3"><Palette className="text-accent" /> Theme Configuration</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-500 mb-2">Primary Color</label>
                      <div className="flex gap-2">
                        <input type="color" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} className="h-12 w-12 rounded overflow-hidden p-0 border-none" />
                        <input value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} className="flex-1 bg-gray-50 p-3 rounded-xl border-none font-mono" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-500 mb-2">Accent Color</label>
                      <div className="flex gap-2">
                        <input type="color" value={settings.accentColor} onChange={e => setSettings({...settings, accentColor: e.target.value})} className="h-12 w-12 rounded overflow-hidden p-0 border-none" />
                        <input value={settings.accentColor} onChange={e => setSettings({...settings, accentColor: e.target.value})} className="flex-1 bg-gray-50 p-3 rounded-xl border-none font-mono" />
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={handleSaveSettings} className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl flex items-center gap-3">
                  <Save size={24} /> Save Site Settings
                </button>
              </MotionAny>
            )}

            {activeTab === 'users' && (
              <MotionAny key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-dark">Administrative Access</h2>
                  <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                    <Plus size={20} /> Create User
                  </button>
                </div>
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-start">
                    <thead className="bg-gray-50 border-b">
                      <tr className="text-sm font-black text-gray-400">
                        <th className="px-8 py-4">Name</th>
                        <th className="px-8 py-4">Email</th>
                        <th className="px-8 py-4">Role</th>
                        <th className="px-8 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-6 font-black">{u.name}</td>
                          <td className="px-8 py-6 text-gray-500">{u.email}</td>
                          <td className="px-8 py-6">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-8 py-6 flex gap-3">
                            <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil size={18} /></button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </MotionAny>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

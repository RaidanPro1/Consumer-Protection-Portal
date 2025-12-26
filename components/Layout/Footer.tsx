
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
// Added 'Search' to the lucide-react imports
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, ShieldCheck, Shield, ExternalLink, ArrowUpRight, Search } from 'lucide-react';

interface FooterProps {
  logoUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  const { t, language } = useLanguage();

  const quickLinks = [
    { key: 'about', href: '#about' },
    { key: 'jobs', href: '#jobs' },
    { key: 'volunteering', href: '#volunteering' },
    { key: 'donations', href: '#donations' },
    { key: 'privacy', href: '#privacy' },
  ];

  return (
    <footer className="bg-primary text-white font-cairo overflow-hidden">
      {/* Upper Footer: Branding & Call to Action */}
      <div className="border-b border-white/5 bg-primary-dark/30 py-16 px-6 md:px-16">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white rounded-2xl shadow-glow">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
                ) : (
                  <Shield className="text-primary" size={32} />
                )}
              </div>
              <h3 className="text-3xl font-black text-white">{t('brandName')}</h3>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              نعمل بشراكة مجتمعية واسعة لحماية حقوقك كمستهلك وضمان استقرار الأسواق في محافظة تعز.
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col md:flex-row gap-6 justify-end">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-[2rem] border border-white/10 flex-1 flex items-center justify-between group cursor-pointer hover:bg-accent transition-all duration-500">
               <div>
                 <h4 className="font-black text-lg mb-1">{language === 'ar' ? 'هل رصدت مخالفة؟' : 'Saw a violation?'}</h4>
                 <p className="text-sm opacity-60">{language === 'ar' ? 'بلغ الآن وحافظ على حقك' : 'Report now and save your rights'}</p>
               </div>
               <a href="#report" className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                 <ArrowUpRight size={24} />
               </a>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-[2rem] border border-white/10 flex-1 flex items-center justify-between group cursor-pointer hover:bg-secondary transition-all duration-500">
               <div>
                 <h4 className="font-black text-lg mb-1">{language === 'ar' ? 'دليل الأسعار' : 'Price Guide'}</h4>
                 <p className="text-sm opacity-60">{language === 'ar' ? 'تأكد من السعر العادل' : 'Verify the fair price'}</p>
               </div>
               <a href="#prices" className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Search size={24} />
               </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 px-6 md:px-16 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Quick Nav */}
          <div>
            <h4 className="text-accent font-black text-xl mb-8 flex items-center gap-2">
              <span className="w-2 h-6 bg-accent rounded-full inline-block"></span>
              روابط تهمك
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors font-bold group">
                    <span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-accent transition-all group-hover:w-4"></span>
                    {t(link.key)}
                  </a>
                </li>
              ))}
              <li><a href="#admin" className="text-white/30 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">{t('admin')}</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-accent font-black text-xl mb-8 flex items-center gap-2">
              <span className="w-2 h-6 bg-accent rounded-full inline-block"></span>
              قنوات التواصل
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent"><Mail size={20} /></div>
                <div>
                  <p className="text-xs text-white/40 font-black uppercase">البريد الإلكتروني</p>
                  <a href="mailto:info@cpa-ye.org" className="text-lg font-bold hover:text-accent transition-colors">info@cpa-ye.org</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent"><Phone size={20} /></div>
                <div>
                  <p className="text-xs text-white/40 font-black uppercase">الخط الساخن</p>
                  <a href="tel:+9674123456" className="text-lg font-bold hover:text-accent transition-colors">+967 4 123 456</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent"><MapPin size={20} /></div>
                <div>
                  <p className="text-xs text-white/40 font-black uppercase">المقر الرئيسي</p>
                  <p className="text-base font-bold">تعز، الجمهورية اليمنية</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Follow */}
          <div>
            <h4 className="text-accent font-black text-xl mb-8 flex items-center gap-2">
              <span className="w-2 h-6 bg-accent rounded-full inline-block"></span>
              تابعنا على المنصات
            </h4>
            <p className="text-gray-400 mb-6 font-medium">كن أول من يعرف بآخر الحملات الرقابية وأخبار السوق.</p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all border border-white/10"><Facebook size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-sky-500 hover:scale-110 transition-all border border-white/10"><Twitter size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-gradient-to-tr from-yellow-500 to-purple-600 hover:scale-110 transition-all border border-white/10"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Partnership & Security */}
          <div>
            <h4 className="text-accent font-black text-xl mb-8 flex items-center gap-2">
              <span className="w-2 h-6 bg-accent rounded-full inline-block"></span>
              التوثيق والأمان
            </h4>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-500" size={24} />
                <span className="text-sm font-black uppercase tracking-wider">نظام بلاغات مشفر</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-accent" size={24} />
                <span className="text-sm font-black uppercase tracking-wider">مرخص رسمياً</span>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5">
                <p className="text-[10px] text-white/30 font-black mb-2 tracking-widest uppercase">شريك التكنولوجيا</p>
                <a href="https://raidan.pro" target="_blank" className="flex items-center gap-2 text-white hover:text-accent transition-colors font-black">
                   RAIDAN PRO <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="bg-primary-dark/50 py-8 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40 font-bold">
          <p>جميع الحقوق محفوظة لجمعية حماية المستهلك - تعز © 2026</p>
          <div className="flex gap-8">
            <a href="#privacy" className="hover:text-white transition-colors">اتفاقية الاستخدام</a>
            <a href="#about" className="hover:text-white transition-colors">من نحن</a>
            <a href="mailto:it@cpa-ye.org" className="hover:text-white transition-colors">الإبلاغ عن خلل تقني</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

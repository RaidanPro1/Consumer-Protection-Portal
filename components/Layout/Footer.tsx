
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, ShieldCheck, Shield } from 'lucide-react';

interface FooterProps {
  logoUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white pt-16 pb-8 px-6 md:px-16 border-t-4 border-accent">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <Shield className="text-accent" size={32} />
            )}
            <h3 className="text-2xl font-bold text-accent">{t('brandName')}</h3>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">
            {t('footer_desc')}
          </p>
          <div className="flex gap-4">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-white transition-colors"><Instagram size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-accent mb-6">{t('home')}</h3>
          <ul className="space-y-3">
            <li><a href="#about" className="text-gray-300 hover:text-accent transition-colors hover:pe-2">{t('about')}</a></li>
            <li><a href="#jobs" className="text-gray-300 hover:text-accent transition-colors hover:pe-2">{t('jobs')}</a></li>
            <li><a href="#volunteering" className="text-gray-300 hover:text-accent transition-colors hover:pe-2">{t('volunteering')}</a></li>
            <li><a href="#donations" className="text-gray-300 hover:text-accent transition-colors hover:pe-2">{t('donations')}</a></li>
            <li><a href="#privacy" className="text-accent font-bold hover:underline flex items-center gap-2"><ShieldCheck size={18}/> {t('privacy')}</a></li>
            <li><a href="#admin" className="text-gray-300 hover:text-accent transition-colors hover:pe-2">{t('admin')}</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-accent mb-6">{t('footer_contact')}</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-300">
              <Mail className="text-accent" size={20} />
              <span>info@cpa-ye.org</span>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <MapPin className="text-accent" size={20} />
              <span>Taiz, Republic of Yemen</span>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <Phone className="text-accent" size={20} />
              <span>+967 4 123 456</span>
            </li>
          </ul>
        </div>

        <div>
           <h3 className="text-2xl font-bold text-accent mb-6">شارك برأيك</h3>
           <p className="text-gray-300 text-sm mb-4">آراءكم تهمنا لتحسين الخدمات الرقابية في المحافظة.</p>
           <a href="#report" className="block text-center bg-accent text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-all">بلغ الآن</a>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
        <p>{t('rights')}</p>
        <p className="font-bold">
          Powered by <a href="https://raidan.pro" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Raidan Pro</a>
        </p>
      </div>
    </footer>
  );
};

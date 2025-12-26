
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';
import { NewsItem } from '../../types';
import { motion } from 'framer-motion';
import { Calendar, Facebook, Twitter, MessageCircle, Share2, Loader2, ArrowLeft } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const motionAny = motion as any;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await apiService.getLatestNews();
        setNewsList(data);
      } catch (err) {
        console.error("Failed to fetch news", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleShare = (news: NewsItem, platform: 'fb' | 'x' | 'wa') => {
    const url = window.location.href;
    const title = language === 'ar' ? news.titleAr : news.titleEn;
    const shareText = encodeURIComponent(`${title}\n${url}`);
    
    const links = {
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      x: `https://twitter.com/intent/tweet?text=${shareText}`,
      wa: `https://api.whatsapp.com/send?text=${shareText}`
    };
    
    window.open(links[platform], '_blank');
  };

  if (loading) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <section id="news" className="section-spacing px-4 md:px-16 bg-white relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-4">
              {t('news_title')}
            </h2>
            <div className="h-1.5 w-24 bg-accent rounded-full"></div>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-primary font-black hover:text-accent transition-colors">
            {language === 'ar' ? 'جميع الأخبار' : 'All News'}
            <ArrowLeft className={`w-5 h-5 ${dir === 'ltr' ? 'rotate-180' : ''}`} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news, index) => (
            <motionAny.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-soft hover:shadow-elegant border border-gray-100 transition-all duration-500 group flex flex-col"
            >
              <div className="relative overflow-hidden h-56">
                <img src={news.image} alt="News" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-2 border border-white/10">
                    <Calendar size={12} className="text-accent" />
                    {news.date}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-primary mb-3 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                  {language === 'ar' ? news.titleAr : news.titleEn}
                </h3>
                <p className="text-muted mb-6 line-clamp-3 leading-relaxed font-medium text-sm">
                  {language === 'ar' ? news.descAr : news.descEn}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                  <a href="#" className="font-black text-sm text-primary hover:text-accent transition-all">
                    {t('read_more')}
                  </a>
                  
                  <div className="flex gap-2">
                    <button onClick={() => handleShare(news, 'fb')} className="p-2 bg-gray-50 rounded-xl text-primary hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <Facebook size={16} />
                    </button>
                    <button onClick={() => handleShare(news, 'wa')} className="p-2 bg-gray-50 rounded-xl text-primary hover:bg-green-500 hover:text-white transition-all shadow-sm">
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motionAny.div>
          ))}
        </div>
      </div>
    </section>
  );
};

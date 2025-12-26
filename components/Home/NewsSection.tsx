
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';
import { NewsItem } from '../../types';
import { motion } from 'framer-motion';
import { Calendar, Facebook, Twitter, MessageCircle, Share2, Loader2 } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { t, language } = useLanguage();
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
    <section id="news" className="py-24 px-6 md:px-16 bg-white relative">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <motionAny.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-black text-primary inline-block relative mb-4">
              {t('news_title')}
            </h2>
            <div className="h-2 w-32 bg-accent mx-auto rounded-full"></div>
          </motionAny.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsList.map((news, index) => (
            <motionAny.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-elegant border border-gray-100 transition-all duration-500 group flex flex-col"
            >
              <div className="relative overflow-hidden h-64">
                <img src={news.image} alt="News" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 left-6">
                  <span className="bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2">
                    <Calendar size={14} className="text-accent" />
                    {news.date}
                  </span>
                </div>
              </div>

              <div className="p-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                  {language === 'ar' ? news.titleAr : news.titleEn}
                </h3>
                <p className="text-gray-500 mb-8 line-clamp-3 leading-relaxed font-medium">
                  {language === 'ar' ? news.descAr : news.descEn}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                  <a href="#" className="font-black text-primary hover:text-accent transition-all">
                    {t('read_more')}
                  </a>
                  
                  <div className="flex gap-2">
                    <button onClick={() => handleShare(news, 'fb')} className="p-2.5 bg-gray-50 rounded-xl text-primary hover:bg-blue-600 hover:text-white transition-all">
                      <Facebook size={18} />
                    </button>
                    <button onClick={() => handleShare(news, 'x')} className="p-2.5 bg-gray-50 rounded-xl text-primary hover:bg-black hover:text-white transition-all">
                      <Twitter size={18} />
                    </button>
                    <button onClick={() => handleShare(news, 'wa')} className="p-2.5 bg-gray-50 rounded-xl text-primary hover:bg-green-500 hover:text-white transition-all">
                      <MessageCircle size={18} />
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


import { NEWS_DATA, MOCK_PRICES, INITIAL_SETTINGS } from '../constants';
import { NewsItem, PriceItem, SiteSettings, User } from '../types';

// Mocking backend delay and storage
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // News CMS
  getLatestNews: async (): Promise<NewsItem[]> => {
    await sleep(800);
    return [...NEWS_DATA].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  },
  
  getAllNews: async (): Promise<NewsItem[]> => {
    await sleep(500);
    return NEWS_DATA;
  },

  saveNews: async (item: Partial<NewsItem>) => {
    console.log("Saving news to MongoDB...", item);
    await sleep(1000);
    return true;
  },

  // Prices CMS
  getPrices: async (): Promise<PriceItem[]> => {
    await sleep(500);
    return MOCK_PRICES;
  },

  // Site Configuration
  getSettings: async (): Promise<SiteSettings> => {
    const saved = localStorage.getItem('site_settings');
    return saved ? JSON.parse(saved) : {
      brandNameAr: "حماية المستهلك - تعز",
      brandNameEn: "CPA - Taiz",
      logoUrl: "https://i.ibb.co/VpMTT0M6/logo.png",
      primaryColor: "#0F4C75",
      accentColor: "#F39C12",
      showStatsOnHome: true,
      metaKeywordsAr: "تعز, حماية المستهلك",
      metaKeywordsEn: "Taiz, Consumer Protection"
    };
  },

  updateSettings: async (settings: SiteSettings) => {
    localStorage.setItem('site_settings', JSON.stringify(settings));
    await sleep(1000);
    return true;
  }
};


import { NEWS_DATA, MOCK_PRICES, INITIAL_SETTINGS, MOCK_VIOLATIONS, SERVICES_DATA } from '../constants';
import { NewsItem, PriceItem, SiteSettings, Violation, ServiceItem } from '../types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // News CMS
  getLatestNews: async (): Promise<NewsItem[]> => {
    const news = await apiService.getAllNews();
    return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  },
  
  getAllNews: async (): Promise<NewsItem[]> => {
    const saved = localStorage.getItem('site_news');
    if (saved) return JSON.parse(saved);
    return NEWS_DATA;
  },

  saveNews: async (newsItem: NewsItem) => {
    const current = await apiService.getAllNews();
    const index = current.findIndex(n => n.id === newsItem.id);
    if (index > -1) {
      current[index] = { ...current[index], ...newsItem };
    } else {
      current.push({ ...newsItem, id: Date.now() });
    }
    localStorage.setItem('site_news', JSON.stringify(current));
    await sleep(600);
    return true;
  },

  deleteNews: async (id: number) => {
    const current = await apiService.getAllNews();
    const filtered = current.filter(n => n.id !== id);
    localStorage.setItem('site_news', JSON.stringify(filtered));
    await sleep(500);
    return true;
  },

  // Map CMS
  getViolations: async (): Promise<Violation[]> => {
    const saved = localStorage.getItem('map_violations');
    if (saved) return JSON.parse(saved);
    return MOCK_VIOLATIONS;
  },

  saveViolation: async (violation: Violation) => {
    const current = await apiService.getViolations();
    const index = current.findIndex(v => v.id === violation.id);
    if (index > -1) {
      current[index] = violation;
    } else {
      current.push({ ...violation, id: Date.now() });
    }
    localStorage.setItem('map_violations', JSON.stringify(current));
    await sleep(600);
    return true;
  },

  deleteViolation: async (id: number) => {
    const current = await apiService.getViolations();
    const filtered = current.filter(v => v.id !== id);
    localStorage.setItem('map_violations', JSON.stringify(filtered));
    await sleep(500);
    return true;
  },

  // Prices CMS
  getPrices: async (): Promise<PriceItem[]> => {
    await sleep(500);
    return MOCK_PRICES;
  },

  // Services CMS
  getServices: async (): Promise<ServiceItem[]> => {
    const saved = localStorage.getItem('site_services');
    return saved ? JSON.parse(saved) : SERVICES_DATA;
  },

  updateService: async (service: ServiceItem) => {
    const current = await apiService.getServices();
    const index = current.findIndex(s => s.id === service.id);
    if (index > -1) {
      current[index] = service;
    }
    localStorage.setItem('site_services', JSON.stringify(current));
    await sleep(500);
    return true;
  },

  // Site Configuration
  getSettings: async (): Promise<SiteSettings> => {
    const saved = localStorage.getItem('site_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  },

  updateSettings: async (settings: SiteSettings) => {
    localStorage.setItem('site_settings', JSON.stringify(settings));
    await sleep(1000);
    return true;
  }
};

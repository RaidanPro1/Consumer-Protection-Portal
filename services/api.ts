
import { NEWS_DATA, MOCK_PRICES, INITIAL_SETTINGS, MOCK_VIOLATIONS, SERVICES_DATA } from '../constants';
import { NewsItem, PriceItem, SiteSettings, Violation, ServiceItem } from '../types';

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

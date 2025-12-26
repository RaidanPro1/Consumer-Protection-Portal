
export type Language = 'ar' | 'en';
export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin?: string;
}

export interface SiteSettings {
  brandNameAr: string;
  brandNameEn: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  showStatsOnHome: boolean;
  metaKeywordsAr: string;
  metaKeywordsEn: string;
}

// ... (Existing types remains same but updated to support API fetching)
export interface NewsItem {
  id: number;
  date: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  contentAr?: string;
  contentEn?: string;
  image: string;
  author?: string;
}

export interface PriceItem {
  id: number;
  code: string;
  barcode?: string;
  nameAr: string;
  nameEn: string;
  price: number;
  categoryId: number;
  lastUpdated: string;
}

export interface ServiceItem {
  id: number;
  icon: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}
// ... rest of the types from previous version

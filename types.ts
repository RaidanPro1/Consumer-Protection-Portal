
export type Language = 'ar' | 'en';

export interface TranslationDictionary {
  [key: string]: {
    [key: string]: string;
  };
}

export interface NewsItem {
  id: number;
  date: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  image: string;
  keywordsAr?: string;
  keywordsEn?: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  titleAr: string;
  titleEn: string;
  subAr: string;
  subEn: string;
}

export interface TeamMember {
  id: number;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  bioAr: string;
  bioEn: string;
  image: string;
}

export interface SuccessStory {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  image: string;
  keywordsAr?: string;
  keywordsEn?: string;
}

export interface Testimonial {
  id: number;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  feedbackAr: string;
  feedbackEn: string;
  image: string;
}

export interface AboutUsContent {
  missionAr: string;
  missionEn: string;
  visionAr: string;
  visionEn: string;
  valuesAr: string;
  valuesEn: string;
}

export interface JobItem {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  requirementsAr: string;
  requirementsEn: string;
  instructionsAr: string;
  instructionsEn: string;
  keywordsAr?: string;
  keywordsEn?: string;
}

export interface VolunteerContent {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  contactEmail: string;
}

export interface DonationMethod {
  id: number;
  titleAr: string;
  titleEn: string;
  detailsAr: string;
  detailsEn: string;
  methodType: 'bank' | 'wallet' | 'external';
  link?: string;
}

export interface SiteStatistics {
  totalReports: number;
  verifiedDiscrepancies: number;
  activeViolations: number;
}

export interface AnimationSettings {
  type: 'fade' | 'slide' | 'zoom' | 'none';
  speed: number; // in seconds
  enabled: boolean;
}

export interface SiteSettings {
  showStatsOnHome: boolean;
  animations: AnimationSettings;
  logoUrl: string;
  metaKeywordsAr: string;
  metaKeywordsEn: string;
}

export interface Publication {
  id: number;
  type: 'pdf' | 'excel';
  titleKey: string;
  size: string;
}

export interface ServiceItem {
  id: number;
  icon: 'search' | 'balance' | 'bullhorn';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export interface PriceCategory {
  id: number;
  nameAr: string;
  nameEn: string;
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

export interface PrivacyPolicyContent {
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
}
